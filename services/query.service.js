export class QueryService {
  getProductQuery(handleId) {
    let query = `
          {
            productByHandle(handle:"${handleId}") {
              title
              id
              productType
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
              handle
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
              featured_video : metafield(namespace: "video", key: "video_id") {
                value
              }
              featured_video_title : metafield(namespace: "video", key: "title") {
                value
              }
              ff_show : metafield(namespace: "fifty_fifty", key: "ff_show") {
                value
              }
              ff_enable_cta : metafield(namespace: "fifty_fifty", key: "ff_enable_cta") {
                value
              }
              ff_cta_url : metafield(namespace: "fifty_fifty", key: "ff_cta_url") {
                value
              }
              ff_image_mobile : metafield(namespace: "fifty_fifty", key: "ff_image_mobile") {
                value
              }
              ff_heading : metafield(namespace: "fifty_fifty", key: "ff_heading") {
                value
              }
              ff_cta : metafield(namespace: "fifty_fifty", key: "ff_cta") {
                value
              }
              ff_subheading : metafield(namespace: "fifty_fifty", key: "ff_subheading") {
                value
              }
              ff_body : metafield(namespace: "fifty_fifty", key: "ff_body") {
                value
              }
              ff_image : metafield(namespace: "fifty_fifty", key: "ff_image") {
                value
              }


              compare_show : metafield(namespace: "compare", key: "show") {
                value
              }
              compare_products : metafield(namespace: "compare", key: "products") {
                value
              }
              compare_title : metafield(namespace: "compare", key: "title") {
                value
              }
              compare_cta : metafield(namespace: "compare", key: "cta") {
                value
              }
              compare_cta_url : metafield(namespace: "compare", key: "cta_url") {
                value
              }
              compare_data : metafield(namespace: "compare", key: "data") {
                value
              }

            }
          }`;
    return query;
  }
}








