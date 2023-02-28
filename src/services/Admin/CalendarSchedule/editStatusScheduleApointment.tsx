import { relativeURI } from '../../../helpers/RelativeURI'
const uriRelative = relativeURI()
export const editStatusScheduleApointment = async (...props: any) => {
    const uri = `${uriRelative}admin/table/schedule/status`
    console.log(`pauload status = ${JSON.stringify(props)}`)
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