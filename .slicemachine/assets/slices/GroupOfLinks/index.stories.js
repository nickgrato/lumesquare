import MyComponent from '../../../../slices/GroupOfLinks';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/GroupOfLinks'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"group_of_links","items":[{"categoryLinkLabel":"disintermediate strategic ROI","categoryLink":{"link_type":"Web","url":"https://slicemachine.dev"}},{"categoryLinkLabel":"utilize impactful bandwidth","categoryLink":{"link_type":"Web","url":"https://prismic.io"}},{"categoryLinkLabel":"iterate impactful e-services","categoryLink":{"link_type":"Web","url":"http://twitter.com"}}],"primary":{"groupLabel":"utilize value-added interfaces","link":{"link_type":"Web","url":"http://google.com"}},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
