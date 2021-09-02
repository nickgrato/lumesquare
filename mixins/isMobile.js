export default {
  computed: {
    isMobile() {
      return this.$mq === 'mobile_small' || this.$mq === 'mobile'
    },
    
    isTablet() {
      return this.$mq === 'mobile_small' || this.$mq === 'mobile' || this.$mq === 'tablet'
    }
  },
  methods: {
    checkMobile() {
      return this.$mq === 'mobile_small' || this.$mq === 'mobile'
    },
    
    checkTablet() {
      return this.$mq === 'mobile_small' || this.$mq === 'mobile' || this.$mq === 'tablet'
    }
  }
}