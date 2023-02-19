import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { mask } from "../components/Mask"
import { Center, Text, Stack, FormControl, useColorModeValue, Input, Button } from '@chakra-ui/react'

export default function () {

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const payload = { nomePaciente: nomePaciente, cpf: cpf, date: data }
        const uri2 = 'http://localhost:8080/admin/table/schedule/date';
        console.log(payload)
        const postRafle = async () => {
            try {
                console.log(payload)
                const resp = await fetch(uri2, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nomePaciente: nomePaciente, cpf: cpf, date: data }),
                })
                if (resp.ok) {
                    console.log("Formulario enviado")
                }
            } catch (err) {
                console.log(err);
            }
        }
        postRafle()
        setNomePaciente('')
        setCPF('')
    };


    const [nomePaciente, setNomePaciente] = useState('');
    const [cpf, setCPF] = useState('');
    const [data, setData] = useState('');

    //CPF mask
    function handleChangeMask(event: any) {
        const { value } = event.target
        setCPF(mask(value))
    }

    type resultProps = {
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
        const response = await data.json()
        console.log(`a resposta ${response.length}`)
        setSchedule(response)
    };

    function convert(str: any) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    console.log(convert(`${value}`))

    function ScheduleTrue(props: any) {
        const teste = props.schedule
        return (

            teste.map((post: any) =>
                <Text>
                    <Text>{post.nomePaciente} - {post.cpf}</Text>
                </Text>
            )
        )
    }

    const ScheduleFalse = () => {
        return (
            <Text>
                <Text>Sem agendamentos</Text>
            </Text>
        )
    }

    return (
        <Center mt={4}>
            <Stack direction='row' justify='center'>
                <Stack direction='column' justify='center' mt={7}>
                    <Calendar onChange={onChange} value={value} />
                    <Text>Pacientes agendados do dia:</Text>
                    {schedule.length > 0 ? <ScheduleTrue schedule={schedule} /> : <ScheduleFalse />}
                </Stack>
                <Stack onSubmit={handleSubmit}>
                    <form >
                        <Stack>


                            <Text mt={7}>Agendamento</Text>
                            <Input mb={2}
                                mt={7}
                                variant={'solid'}
                                borderWidth={1}
                                color={'gray.800'}
                                _placeholder={{
                                    color: 'gray.400',
                                }}
                                borderColor={useColorModeValue('gray.300', 'gray.700')}
                                placeholder={'Nome Paciente'}
                                aria-label={'nome Paciente'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNomePaciente(e.target.value)
                                }
                                value={nomePaciente}
                                required
                                maxLength={14} />
                            <Input mb={2}

                                variant={'solid'}
                                borderWidth={1}
                                color={'gray.800'}
                                _placeholder={{
                                    color: 'gray.400',
                                }}
                                borderColor={useColorModeValue('gray.300', 'gray.700')}
                                placeholder={'CPF'}
                                onChange={handleChangeMask}
                                value={cpf}
                                aria-label={'Seu CPF'}
                                required
                                maxLength={14} />
                            <Input
                                mb={2}
                                variant={'solid'}
                                borderWidth={1}
                                color={'gray.800'}
                                _placeholder={{
                                    color: 'gray.400',
                                }}
                                borderColor={useColorModeValue('gray.300', 'gray.700')}
                                id={data}
                                value={data}
                                required
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setData(e.target.value)
                                }
                                size="md"
                                type="date"
                            />
                            <Button w="100%" value="Submit" type="submit"> Agendar
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Stack>
        </Center>
    );
}