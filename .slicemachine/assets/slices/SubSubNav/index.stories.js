import MyComponent from '../../../../slices/SubSubNav';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/SubSubNav'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"sub_sub_nav","items":[{"link":{"link_type":"Web","url":"https://prismic.io"},"label":[{"type":"paragraph","text":"Adipisicing amet nostrud dolore commodo enim elit non ad veniam velit nulla ipsum. Mollit ipsum nostrud Lorem reprehenderit. Sunt reprehenderit nulla reprehenderit pariatur irure consequat incididunt officia exercitation est.","spans":[]}]},{"link":{"link_type":"Web","url":"https://prismic.io"},"label":[{"type":"paragraph","text":"Incididunt nulla nostrud culpa do amet id tempor aute. Nulla labore aliquip sint ullamco quis non consequat tempor culpa elit enim ex velit.","spans":[]}]},{"link":{"link_type":"Web","url":"http://twitter.com"},"label":[{"type":"paragraph","text":"Cillum culpa amet ipsum anim do reprehenderit dolore quis magna ea ipsum aliqua anim dolor cupidatat.","spans":[]}]},{"link":{"link_type":"Web","url":"https://prismic.io"},"label":[{"type":"paragraph","text":"Dolore officia velit pariatur duis quis esse Lorem in proident duis sunt. Quis consectetur occaecat voluptate. Esse deserunt consequat enim deserunt ipsum officia aliquip aute ipsum nisi reprehenderit reprehenderit incididunt ut.","spans":[]}]}],"primary":{"title":[{"type":"heading1","text":"Evolve world-class e-business","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
