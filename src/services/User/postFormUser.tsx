var relativeURI2 = require('../../helpers/RelativeURI').relativeURI()
export const postFormUser = async (...props: any) => {
    const uri = `${relativeURI2}form`
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
            console.log("Formulario enviado")
        }
    } catch (error) {
        console.error(error);
    }
}