import { GraphQLClient } from "graphql-request";
// import Query from "../const/product.query.const";
import { QueryService } from "./query.service";
const queryService = new QueryService();

export class DataService {
  constructor($axios,shopifyDomain,shopifyToken) {
    this.$axios = $axios
    const STORE = `https://${shopifyDomain}/api/graphql`
    this.client = new GraphQLClient(STORE, {
      headers: { "X-Shopify-Storefront-Access-Token": shopifyToken }
    })
  }

  // getData = new Promise((resolve, reject) => {
  //   client.request(Query.DataQuery).then((data) => {
  //     this.data = data;
  //     resolve(data);
  //   });
  // });


  getProductList(params){
    return this.$axios.get('cool_get_url', { params })
  };

  /**
   * GET PRODUCTS
   */
  // getProducts = new Promise((resolve, reject) => {
  //   this.getData.then((data) => {
  //     resolve(data.shop.products.edges);
  //   });
  // });

  getProductData(handleId) {
    let promise = new Promise((resolve, reject) => {
      // Get Graphql query
      let productQuery = queryService.getProductQuery(handleId);
      // Fetch query data
      this.client.request(productQuery).then((data) => {
        resolve(data.productByHandle);
      });

    });
    return promise;
  }


  // This is used to get any additional product data you might need,
  // just throw the additional product key in the coorisponding query.
  getAdditionalProductData(handleId){
    let promise = new Promise((resolve, reject) => {
      // Get Graphql query
      let productQuery = queryService.getAdditionalProductDataQuery(handleId);
      // Fetch query data
      this.client.request(productQuery).then((data) => {
        resolve(data.productByHandle);
      });

    });
    return promise;
  };



  getProductMetafieldData(handleId) {
    let promise = new Promise((resolve, reject) => {
      // Get Graphql query
      let productQuery = queryService.getProductMetafielsQuery(handleId);
      // Fetch query data
      this.client.request(productQuery).then((data) => {
        resolve(data.productByHandle);
      })

    })
    return promise;
  }

  /**
   * GET SHOP DATA
   */
  // getShopData = new Promise((resolve, reject) => {
  //   this.getData.then((data) => {
  //     console.log(data);
  //     resolve(data.shop);
  //   });
  // });
}
