<template>
<!-- v-view="viewHandler" -->
  <div class="featured-video-wrapper"  >

    <transition class="featured-video-animation" name="fade">
      <div class="featured-video-container">

        <div class="title-wrapper">
          <div class="title h2">{{ title }}</div>
        </div>

        <section class="video">
          <div class="video-wrapper">
            <div class="video-container">
              <youtube
                ref="youtube"
                height="100%"
                width="100%"
                :video-id="id"
                :player-vars="playerVars">
              </youtube>
            </div>
          </div>
        </section>

      </div>
    </transition>
  </div>
</template>

<script>
// Components
import { Youtube } from 'vue-youtube'

export default {
  name: 'FeaturedVideo',
  components: {
    Youtube,
  },
  props: {
    title: String,
    id: String,
  },
  data() {
    return {
      showSection: false,
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        rel: 0
      },
    }
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    }
  },
  methods: {
    viewHandler(e){
      if(e.percentInView === 1) {
        this.showSection = true
      }
    }
  },
  mounted() {},
}
</script>

<style scoped lang="scss">
.featured-video {
  &-wrapper {
    padding: 70px;
    display: flex;
    justify-content: center;

    @include tablet-down {
      padding: 10px;
    }
  }

  &-container, &-animation {
    width: 100%;
    max-width: 1400px;
  }
}

.video {
  display: flex;
  justify-content: center;

  &-wrapper {
    width: 900px;
    height: 100%;
    min-height: 100px;
    max-width: 100%;
  }
  &-container {
    height: auto;
    width: 100%;
    padding: 56.25% 0 0 0;
    position: relative;

    ::v-deep iframe {
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
    }

  }
}

.title {
  &-wrapper {
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
  }
}
</style>
