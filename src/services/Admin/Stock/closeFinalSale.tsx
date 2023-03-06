import { relativeURI } from '../../../helpers/RelativeURI'
const uriRelative = relativeURI()
export const closeFinalSaleService = async (...props: any) => {

    console.log(JSON.stringify(props[0]) + "propriedades")
    const uri = `${uriRelative}admin/stock/products/sale`
    try {
        const response = await fetch(
            uri, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props[0]),
        })
        if (response.ok) {
            console.log("Products successfully sale")
        }
    } catch (error) {
        console.error(error);
    }
};