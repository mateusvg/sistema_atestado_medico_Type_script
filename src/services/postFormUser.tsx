export const postFormUser = async (...props: any) => {
    console.log(`props post user form ${JSON.stringify(props)}`)
    const uri = 'http://localhost:8080/form';
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