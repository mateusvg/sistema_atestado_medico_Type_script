import { relativeURI } from '../../../helpers/RelativeURI'
const uriRelative = relativeURI()
export const insertStockProducts = async (...props: any) => {
    console.log(...props)
    if (props[0].status === 'Ativado') {
        props[0].status = 1
      } else if (props[0].status === 'Inativo'){
        props[0].status = 2
      } else if (props[0].status ===''){
        props[0].status = 2
      }
    //console.log(JSON.stringify(props[0]) + "propriedades......................")
    const uri = `${uriRelative}admin/stock/products/add`
    try {
        const response = await fetch(
            uri, {
            method: 'POST',
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