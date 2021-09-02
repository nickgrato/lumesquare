import { DataService } from '~/services/data.service'
import { LocalHostService } from '~/services/localhost'


export default ({ $axios,$shopofy, $config: { shopifyDomain,shopifyToken }}, inject) => {
  // create an instance of the Service
  const dataService = new DataService($axios,shopifyDomain,shopifyToken)
  const localHostService = new LocalHostService()

  // inject the service, making it available in the context, component, store, etc.
  inject('localHostService', localHostService)
  inject('dataService', dataService)

}

