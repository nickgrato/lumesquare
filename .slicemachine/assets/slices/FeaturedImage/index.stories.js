import MyComponent from '../../../../slices/FeaturedImage';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/FeaturedImage'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"featured_image","items":[],"primary":{"title":[{"type":"heading1","text":"Monetize efficient niches","spans":[]}],"headline":[{"type":"paragraph","text":"Aliqua fugiat sint tempor. Laborum veniam nulla tempor. Nostrud aliqua ullamco anim eu voluptate consectetur ea cillum voluptate quis.","spans":[]}],"label":{"link_type":"Web","url":"https://prismic.io"},"linkLabel":"harness frictionless communities","featuredImage":{"dimensions":{"width":727,"height":402},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1494173853739-c21f58b16055?w=727&h=402&fit=crop"}},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
