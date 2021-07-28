import MyComponent from '../../../../slices/BannerSlice';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/BannerSlice'
}


export const _DefaultSlice = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"banner_slice","items":[],"primary":{"title":[{"type":"heading1","text":"Productize e-business models","spans":[]}],"description":[{"type":"paragraph","text":"Dolor enim ex nisi laborum deserunt dolor non cillum.","spans":[]}],"link":{"link_type":"Web","url":"http://twitter.com"},"linkLabel":"morph world-class infomediaries","background":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1547082299-de196ea013d6?w=900&h=500&fit=crop"}},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
