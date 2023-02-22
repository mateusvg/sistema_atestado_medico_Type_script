export const updateScheduleApointment = async (...props: any) => {
    const uri = 'http://localhost:8080/admin/table/schedule/date';
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
            console.log("Cliente agendado")
        }
    } catch (error) {
        console.error(error);
    }
}