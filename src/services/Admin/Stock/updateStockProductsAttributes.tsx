import { relativeURI } from '../../../helpers/RelativeURI'
const uriRelative = relativeURI()
export const updateStockProductsAttributes = async (...props: any) => {
    if (props[0].status === 'Ativo') {
        props[0].status = 1
      } else if (props[0].status === 'Inativo'){
        props[0].status = 2
      }
    console.log(JSON.stringify(props[0].status) + "propriedades")
    const uri = `${uriRelative}admin/stock/products/update`
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
            console.log("Products successfully update")
        }
    } catch (error) {
        console.error(error);
    }
};