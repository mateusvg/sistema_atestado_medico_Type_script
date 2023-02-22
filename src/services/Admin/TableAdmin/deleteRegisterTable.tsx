export const deleteTableRegister = async (...props: any) => {
    const uri = 'http://localhost:8080/admin/table/delete';
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