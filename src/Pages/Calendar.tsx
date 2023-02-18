import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Center, Text, Stack } from '@chakra-ui/react'

export default function () {

    type resultProps = {
        resultado: string,
        nomePaciente: string,
        cpf: string
    };

    const [value, onChange] = useState(new Date())
    const [schedule, setSchedule] = useState<resultProps[]>([]);

    useEffect(() => {
        getAllRegisters()
    }, [value])

    const getAllRegisters = async () => {
        const value2 = convert(value)
        const data = await fetch("http://localhost:8080/admin/table/schedule", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ date: value2 }),
        });
        const parsedValue = await data.json()
        const response = await parsedValue
        if (response == undefined) {
            setSchedule([])
        } else {

            setSchedule(response)
        }
    };


    function convert(str: any) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    console.log(convert(`${value}`))
    return (
        <Center mt={4}>
            <Stack direction='column' justify='center' mt={7}>
                <Calendar onChange={onChange} value={value} />
                <Text>Pacientes agendados do dia:</Text>
                {
                    schedule.map((row) =>
                        <text>
                            <Text>{row.cpf}</Text>
                            <Text>{row.nomePaciente}</Text>
                        </text>

                    )}
            </Stack>

        </Center>
    );
}