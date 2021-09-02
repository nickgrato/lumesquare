export const debounce = (func, wait, immediate) => {
  var timeout

  return function() {
    var context = this,
      args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    var callNow = immediate && !timeout

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

export const isObject = (value) => {
  let isObject = false
  if( (typeof value === "object" || typeof value === 'function') && (value !== null) ) {
    isObject = true
  }
  return isObject
}

export const hash = (str) => {
  var hash = 0,
    i,
    chr

  if (str.length === 0) return hash

  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }

  return hash
}

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}


export const convertJsonToUl = (obj) => {
  var list = '<ul>'

  obj.forEach(value => {
    list += `<li>${value}</li>`
  });

  list += '</ul>'

  return list
}



export const percentage = ( partialValue, totalValue) => {
  // Cover some zero errors
  if (partialValue === 0 && totalValue === 0) return 100

  if (partialValue > totalValue) return 100

  return (100 * partialValue) / totalValue
}

/**
  This handles a weird edge case caused by the theme editor.
  When customizing a theme, for some reason HTML comments are injected
  into templates, breaking the response data. This means we need to
  remove the comments and parse it back into JSON format, allowing for
  the data to load properly when the theme editor is open.

  @param data The response to check.
*/
export const parseDataForEditor = (data) => {
  if (typeof data === 'string') {
    let parsed = data.replace(/<!--[\s\S]*?-->/g, '')

    try {
      return JSON.parse(parsed)
    } catch (error) {
      console.error('Could not parse data:', data)
      return
    }
  }

  return data
}

/**
 * @desc get the shopify cdn file url from the file name.
 * @param {String} filename
 * @returns {String}
 */
export const fileUrl = (filename) =>
  window.lumeCube.fileUrl.replace('test.jpg', `${filename}`)

/**
 * @desc modify a shopify cdn image url to return a specific size image.
 * @param {String} file
 * @param {String} size
 * @returns String
 */
export const imageSize = (file, size) =>
  file.replace(/\.(png|jpg|jpeg|gif|webp)/, `_${size}.$1`)

/**
 * @desc modify a shopify cdn image url to return a cropped version of the image
 * @param {String} file
 * @param {String} size
 * @returns String
 */
export const imageCrop = (file, position) =>
  file.replace(/\.(png|jpg|jpeg|gif|webp)/, `_crop_${position}.$1`)

/**
 * Returns a badge if available
 * @prop {Object} product
 * @prop {Object} variant
 * @returns {String} */
export const badge = (product, variant) => {
  if (!variant.available) {
    return 'Out of Stock'
  } else if (
    variant.compare_at_price &&
    variant.price < variant.compare_at_price
  ) {
    return 'Sale'
  } else if (product.tags.some((t) => t.toLowerCase() === 'limited')) {
    return 'Limited'
  } else if (product.tags.some((t) => t.toLowerCase() === 'new')) {
    return 'New'
  } else if (product.tags.some((t) => t.toLowerCase() === 'best seller')) {
    return 'Best Seller'
  }
}

/**
 * @typedef Truncate
 * @type {Function}
 * @param {String} str
 * @returns {String}
 */

/**
 * @param {Number} count
 * @returns {Truncate}
 */
export const truncateEllipsis = (count) => (str) => {
  if (str && str.length > count) return `${str.substring(0, count)}...`
  return str
}

/**
 * @param {Object} [collection]
 * @param {Object} product
 * @param {Object} [variant]
 * @returns {String}
 */
export const getProductUrl = (collection, product, variant) => {
  return `${collection ? `/collections/${collection.handle}` : ''}/products/${
    product.handle
  }?variant=${(variant || product.variants[0]).id}`
}


/**
 * @param {String} param
 * @returns {String}
 */
export const getUrlParam = (key) => {
  const uri = window.location.search.substring(1);
  const params = new URLSearchParams(uri);
  const value = params.get(key)

  return value
}

/**
 * @param {String} domain
 * @param {Object} [collection]
 * @param {Object} product
 * @param {Object} [variant]
 * @returns {Object}
 */
// export const getProductSocialLinks = (domain, collection, product, variant) => {
//   const url = window.encodeURIComponent(`https://${domain}/${getProductUrl(collection, product, variant)}`);
//   let image = product.images[0] || '';
//   let imageUrl = image.src;
//   if(variant && variant.image) {
//     if(!(/no-image/.test(variant.image.src)))
//       image = variant.image;
//     else
//       image = product.images[0];
//   }

//   if(typeof image.src === 'string')
//     imageUrl = image.src.replace(/^\/\//, 'https://');

//   const encodedImageUrl = window.encodeURIComponent(imageUrl);
//   return {
//     facebook: `https://facebook.com/sharer/sharer.php?u=${url})}`,
//     twitter: `https://twitter.com/intent/tweet?url=${url}`,
//     pinterest: `https://pinterest.com/pin/create/button/?url=${url}&media=${encodedImageUrl}&description=${window.encodeURIComponent(product.title)}`,
//     email: `mailto:info@example.com?&subject=&body=${url}`
//   }
// }

export const getHTML = (enc) => {
  var doc = new DOMParser().parseFromString(enc, "text/html")
  return doc.documentElement.textContent
}

export const generateId = () =>
  'generated-id' +
  Math.random()
    .toString(16)
    .substring(2)

export const getKitLineItemHeader = (items) => {
  switch (items.length) {
    case 2:
      return 'LUNCHBOX'
    default:
      return 'LUNCHBOX KIT'
  }
}

/**
  * @param { number } count
  * returns array 0 - Count
  */
export const getCountArray = (count) => {
  let loop = []

  for (let index = 0; index < count; index++) {
    const element = { id: generateId() }
    loop.push(element)
  }

  return loop
}

/**
 * @typedef Prices
 * @type {Object}
 * @prop {Number} price
 * @prop {Number|null} compare_at_price
 *
 *
 * @param {*} variant
 * @param  {undefined|...Prices} additionalVaraints
 * @returns Prices
 */
export const sumVariantPrices = (variant, ...additionalVaraints) => {
  if (!variant) return

  const prices = {
    price: variant.price,
    compare_at_price: variant.compare_at_price || 0,
  }

  return additionalVaraints.filter(Boolean).reduce((prices, variant) => {
    if (typeof variant.price === 'number') prices.price += variant.price
    if (typeof variant.compare_at_price === 'number')
      prices.compare_at_price += variant.compare_at_price
    return prices
  }, prices)
}

export const isHiddenProduct = (product) =>
  product.tags.some((tag) => tag.toLowerCase().trim() === 'hide-product')



export const dispatchForCode = function(event) {

  let code;

  if (event.key !== undefined) {
      code = event.key;
  } else if (event.keyCode !== undefined) {
      code = getKeyCodeName(event.keyCode)
  }

  return code
};


/**
 * @param numberic number
 */
const getKeyCodeName = function(numeric) {

  // Will need to add more key codes here
  const codes = [
    {
      'name':'Tab',
      'code': 9
    },
    {
      'name':'Enter',
      'code': 13
    },
    {
      'name':'Escape',
      'code': 27
    }
  ]

  const code = codes.filter((_code) => {
    return _code.code == numeric
  })

  return code.name
}
