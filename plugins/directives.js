import Vue from 'vue'

// for more information visit:
// https://css-tricks.com/lazy-loading-images-with-vue-js-directives-and-intersection-observer/
Vue.directive('lazyload', {
  inserted: (el) => {

    /**
     * Load the image
     */
    function loadImage() {
      const imageElement = el

      if (imageElement) {
        imageElement.addEventListener('load', () => {
          setTimeout(() => el.classList.add('loaded'), 100)
        })
        imageElement.addEventListener('error', () => console.log('error'))

        imageElement.src = imageElement.dataset.url
      }
    }

    /**
     * Handle Insersection Observer
     * @param {*} entries
     * @param {*} observer
     */
    function handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage()
          observer.unobserve(el)
        }
      })
    }


    /**
     * Create Observer
     */
    function createObserver() {
      const options = {
        root: null,
        threshold: '0',
      }
      const observer = new IntersectionObserver(handleIntersect, options)
      observer.observe(el)
    }


    // Init Directive
    if (window['IntersectionObserver']) {
      createObserver()
    } else {
      loadImage()
    }

  }
})
