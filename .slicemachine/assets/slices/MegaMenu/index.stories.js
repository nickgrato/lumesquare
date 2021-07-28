import MyComponent from '../../../../slices/MegaMenu';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/MegaMenu'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"mega_menu","items":[],"primary":{"title":[{"type":"heading1","text":"Innovate back-end portals","spans":[]}],"description":[{"type":"paragraph","text":"Ea laborum adipisicing Lorem quis. Minim aliqua duis nisi deserunt.","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
