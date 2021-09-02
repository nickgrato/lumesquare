import MyComponent from '../../../../slices/SubNav';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/SubNav'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"sub_nav","items":[{"linkBlocks":{"link_type":"Web","url":"http://twitter.com"}},{"linkBlocks":{"link_type":"Web","url":"https://prismic.io"}},{"linkBlocks":{"link_type":"Web","url":"http://google.com"}},{"linkBlocks":{"link_type":"Web","url":"https://prismic.io"}}],"primary":{"title":[{"type":"heading1","text":"Grow open-source partnerships","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
