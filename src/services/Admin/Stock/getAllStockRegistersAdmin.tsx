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
      console.log(` getAllStockRegistersAdmin resposta stock`)
      return jsonObj
    } catch (error) {
      console.error(error);
    }
  };

  export const getAllStockRegistersAdminStatusActive = async () => {
    const uri = `${uriRelative}admin/stock/active`
    try {
      const response = await fetch(
        uri, {
        method: 'GET',

      })
      const jsonObj = await response.json();
      console.log(` getAllStockRegistersAdminStatusActive resposta stock`)
      return jsonObj
    } catch (error) {
      console.error(error);
    }
  };