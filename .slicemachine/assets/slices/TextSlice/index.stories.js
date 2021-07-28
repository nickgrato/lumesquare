import MyComponent from '../../../../slices/TextSlice';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/TextSlice'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"text_slice","items":[],"primary":{"Text":[{"type":"paragraph","text":"Id duis laboris nostrud laborum. Consectetur nostrud ad ex id.","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'

export const _TwoColumn = () => ({
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
      mock: {"variation":"twoColumn","name":"twoColumn","slice_type":"text_slice","items":[],"primary":{"Text":[{"type":"paragraph","text":"Dolor anim pariatur aliqua. Incididunt laboris nisi excepteur sunt aliqua amet. Sit culpa culpa eiusmod in quis eu proident non culpa labore enim incididunt.","spans":[]}]},"id":"_TwoColumn"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_TwoColumn.storyName = 'twoColumn'
