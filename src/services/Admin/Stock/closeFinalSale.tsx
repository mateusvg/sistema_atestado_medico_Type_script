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
    console.log(`UPDATE 4 ${JSON.stringify(updated2[0].idStock)}`)



    console.log(JSON.stringify(updated2[0]) + "comprimento")
    let newArray: any = []
    for (let i = 0; i < updated2[0].length; i++) {
        console.log(`iterações ${JSON.stringify(updated2[0][i][0].idStock)}`)
        newArray.push(updated2[0][i][0].idStock)
    }
    console.log(`NOVO ARRAY ${newArray}`)
        const uri = `${uriRelative}admin/sale/products/sale`
        try {
            const response = await fetch(
                uri, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updated2[0]),
                //body: JSON.stringify(updated2[0][i]),
            })
            if (response.ok) {
                console.log("Products successfully sale")
            }
        } catch (error) {
            console.error(error);
        }
    // }
};
