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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"mega_menu","items":[],"primary":{"title":[{"type":"heading1","text":"Innovate synergistic solutions","spans":[]}],"description":[{"type":"paragraph","text":"Minim veniam aute nisi consectetur ea commodo enim reprehenderit commodo. Ad voluptate irure id in sint laboris et.","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
