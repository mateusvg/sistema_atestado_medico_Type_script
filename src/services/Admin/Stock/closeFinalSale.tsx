import { relativeURI } from '../../../helpers/RelativeURI'
const uriRelative = relativeURI()
export const closeFinalSaleService = async (...props: any) => {

    var updated2 = props.filter(function (a: any) {
        console.log(`COME a ${JSON.stringify(a)}`)
        return a.some(function (val: any) {
            console.log(`COME VALE ${JSON.stringify(val)}`)
            return val !== undefined;
        });;
    });
    console.log(`UPDATE 4 ${JSON.stringify(updated2[0])}`)



    console.log(JSON.stringify(updated2[0].length) + "comprimento")
    for (let i = 0; i < updated2[0].length; i++) {
        console.log(`iterações ${JSON.stringify(updated2[0][i][0].idStock)}`)
        const uri = `${uriRelative}admin/stock/products/sale`
        try {
            const response = await fetch(
                uri, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updated2[0][i]),
            })
            if (response.ok) {
                console.log("Products successfully sale")
            }
        } catch (error) {
            console.error(error);
        }
    }
};
