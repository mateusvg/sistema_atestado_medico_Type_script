import { relativeURI } from '../../../helpers/RelativeURI'
const uriRelative = relativeURI()
export const getAllStockRegistersAdmin = async () => {
    const uri = `${uriRelative}admin/stock/`
    try {
      const response = await fetch(
        uri, {
        method: 'GET',

      })
      const jsonObj = await response.json();
      console.log(`resposta stock ${jsonObj}`)
      return jsonObj
    } catch (error) {
      console.error(error);
    }
  };