import MyComponent from '../../../../slices/ImageGallery';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ImageGallery'
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
      mock: {"variation":"default-slice","name":"Default slice","slice_type":"image_gallery","items":[{"image":{"dimensions":{"width":727,"height":402},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=727&h=402&fit=crop"},"imageDescription":[{"type":"paragraph","text":"Aliqua mollit Lorem excepteur cupidatat occaecat commodo reprehenderit aute pariatur dolor duis dolore ipsum nostrud laborum. Aliquip ea proident sunt duis et et quis mollit reprehenderit laboris adipisicing ex incididunt elit.","spans":[]}],"link":{"link_type":"Web","url":"https://prismic.io"},"linkLabel":"deploy cutting-edge convergence"},{"image":{"dimensions":{"width":727,"height":402},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1607582278043-57198ac8da43?w=727&h=402&fit=crop"},"imageDescription":[{"type":"paragraph","text":"Amet laboris sunt aute nulla adipisicing qui adipisicing nisi tempor magna aliquip minim pariatur irure id.","spans":[]}],"link":{"link_type":"Web","url":"https://prismic.io"},"linkLabel":"morph end-to-end relationships"},{"image":{"dimensions":{"width":727,"height":402},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1600804931749-2da4ce26c869?w=727&h=402&fit=crop"},"imageDescription":[{"type":"paragraph","text":"Aliquip velit tempor incididunt consectetur ex laborum.","spans":[]}],"link":{"link_type":"Web","url":"https://slicemachine.dev"},"linkLabel":"transition integrated users"}],"primary":{"title":[{"type":"heading1","text":"Revolutionize global partnerships","spans":[]}]},"id":"_DefaultSlice"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_DefaultSlice.storyName = 'Default slice'
