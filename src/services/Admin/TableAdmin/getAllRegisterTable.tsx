import { relativeURI } from '../../../helpers/RelativeURI'
const uriRelative = relativeURI()
export const getAllRegistersAdmin = async () => {
    const uri = `${uriRelative}admin/table`
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