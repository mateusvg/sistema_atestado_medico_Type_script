export const deleteScheduleApointment = async (...props: any) => {
    const uri = 'http://localhost:8080/admin/table/schedule/delete';
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
            console.log("Schedule deleted")
        }
    } catch (error) {
        console.error(error);
    }
}