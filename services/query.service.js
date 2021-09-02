export class QueryService {
  getProductQuery(handleId) {
    let query = `
          {
            productByHandle(handle:"${handleId}") {
              title
              id
              description
              descriptionHtml
              onlineStoreUrl
              handle
              createdAt
              variants(first:1) {
                edges {
                  node {
                    priceV2 {
                      currencyCode
                      amount
                    }
                    compareAtPriceV2 {
                      currencyCode
                      amount
                    }
                    id
                  }
                }
              }
              tags
              announcement_text: metafield(namespace: "info", key: "announcement_text") {
                value
                id
              }
              product_description: metafield(namespace: "info", key: "description") {
                value
                id
              }
              collections(first: 10){
                edges {
                  node {
                    title
                    id
                  }
                }
              }
              images(first: 10){
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
            }
          }`;
      return query;
  }


  getAdditionalProductDataQuery(handleId) {
    let query = `
          {
            productByHandle(handle:"${handleId}") {
              tags
            }
          }`;
      return query;
  }



  getProductMetafielsQuery(handleId) {
    let query = `
          {
            productByHandle(handle:"${handleId}") {
              show_announcement_text: metafield(namespace: "info", key: "show_announcement_text") {
                value
                id
              }
              announcement_text: metafield(namespace: "info", key: "announcement_text") {
                value
                id
              }
              description_text: metafield(namespace: "info", key: "description") {
                value
              }
              box: metafield(namespace: "info", key: "box") {
                value
              }
              features: metafield(namespace: "info", key: "features") {
                value
              }
              has_video_button: metafield(namespace: "info", key: "has_video_button") {
                value
              }
              review_summary : metafield(namespace: "okendo", key: "summaryData") {
                value
              }
              upsell_handle : metafield(namespace: "upsell", key: "handle") {
                value
              }
              upsell_description : metafield(namespace: "upsell", key: "description") {
                value
              }
            }
          }`;
    return query;
  }
}








