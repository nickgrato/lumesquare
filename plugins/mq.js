import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    mobile_small: parseInt(581, 10),
    mobile: parseInt(768, 10),
    tablet: parseInt(1025, 10),
    desktop: parseInt(1312, 10),
    hd: Infinity
  }
})
