import { relativeURI } from '../../../helpers/RelativeURI'
const uriRelative = relativeURI()
export const deleteProductsStock = async (...props: any) => {
    const uri = `${uriRelative}admin/stock/products/delete`
    try {
        const response = await fetch(
            uri, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props[0]),
        })
        if (response.ok) {
            console.log("Successfully deleted item")
        }
    } catch (error) {
        console.error(error);
    }
}