import { relativeURI } from '../../../helpers/RelativeURI'
const uriRelative = relativeURI()
export const getStatusCountRegistersAdmin = async () => {
    const uri = `${uriRelative}admin/table/status/count`
    try {
      const response = await fetch(
        uri, {
        method: 'GET',

      })
      const jsonObj = await response.json();
      return jsonObj
    } catch (error) {
      console.error(error);
    }
  };