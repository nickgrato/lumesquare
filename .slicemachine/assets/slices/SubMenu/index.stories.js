import MyComponent from '../../../../slices/SubMenu';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/SubMenu'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"sub_menu","items":[],"primary":{"title":[{"type":"heading1","text":"Benchmark customized schemas","spans":[]}],"description":[{"type":"paragraph","text":"Nostrud est enim eu sunt commodo ullamco dolore aliqua eu. Laboris mollit irure officia incididunt quis ut cupidatat fugiat officia nulla elit. Amet veniam et sit esse Lorem.","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
