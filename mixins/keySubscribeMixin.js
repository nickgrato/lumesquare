

/**
  ABSTRACT METHODS MUST USE IN TARGET COMPONENT

  - close() { .ie close modal}

 */

export default {

  mounted () {
    this.setupWatchers()
  },

  methods: {

    /**
     * Setup Key Press watchers
     */
    setupWatchers() {
      const self = this

      document.addEventListener('keydown', (e) => {
        const code = this.dispatchForCode(e)

        // close subscriber
        if(code == 'Escape') {
          self.close()
        }

      })

    },


    dispatchForCode(event) {

      let code;
      if (event.key !== undefined) {
          code = event.key;
      } else if (event.keyCode !== undefined) {
          code = getKeyCodeName(event.keyCode)
      }

      return code
    }


   }
}
