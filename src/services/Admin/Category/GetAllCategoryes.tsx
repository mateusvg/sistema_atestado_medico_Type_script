import { relativeURI } from '../../../helpers/RelativeURI'
const uriRelative = relativeURI()
export const getAllCategoryService = async () => {
    const uri = `${uriRelative}admin/category/all`
    try {
        const response = await fetch(
            uri, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            const jsonObj = await response.json();
            return jsonObj
        }
    } catch (error) {
        console.error(error);
    }
};