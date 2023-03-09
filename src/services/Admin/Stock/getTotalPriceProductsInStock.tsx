import { relativeURI } from '../../../helpers/RelativeURI'
const uriRelative = relativeURI()
export const getTotalPriceProductsInStock = async () => {
    const uri = `${uriRelative}admin/stock/products/total`
    try {
      const response = await fetch(
        uri, {
        method: 'GET',

      })
      const jsonObj = await response.json();
      console.log(`getTotalPriceProductsInStock resp ${JSON.stringify(jsonObj)}`)
      return jsonObj
    } catch (error) {
      console.error(error);
    }
  };