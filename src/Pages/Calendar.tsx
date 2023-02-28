import React, { useState, useEffect, ChangeEvent } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { mask } from "../utils/MaskFormaterCPF"
import { phoneMask } from "../utils/MaskPhone"
import { Center, Text, Stack, FormControl, useColorModeValue, Input, Button, Box, Divider, Spacer, Thead, Tr, Th, Table, Tbody, Td, TableContainer, TableCaption, Select } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { deleteScheduleApointment } from '../services/Admin/CalendarSchedule/deleteSchedule'
import { updateScheduleApointment } from '../services/Admin/CalendarSchedule/updateScheduleApointment'
import { getAllScheduleApointments } from '../services/Admin/CalendarSchedule/getAllSchedule'

export default function () {
    const [state, setState] = useState<'initial' | 'submitting' | 'success'>(
        'initial'
    );

    const { isOpen, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const postScheduleApointment = async () => {
            const resp = updateScheduleApointment({ nomePaciente: nomePaciente, cpf: cpf, date: data, phone: phone })
        }
        postScheduleApointment()
        setNomePaciente('')
        setCPF('')
        setData('')
        setPhone('')
        setState('success')
        setTimeout(() => {
            onCloseModal()
            getAllRegisters()
        }, 1000)
        setTimeout(() => {
            setState('initial')
        }, 3000);
    };


    const [nomePaciente, setNomePaciente] = useState('');
    const [cpf, setCPF] = useState('');
    const [data, setData] = useState('');
    const [phone, setPhone] = useState('');

    //CPF mask
    function handleChangeMask(event: any) {
        const { value } = event.target
        setCPF(mask(value))
    }
    function handlePhoneMaskChange(event: any) {
        const { value } = event.target
        setPhone(phoneMask(value))
    }

    type resultProps = {
        nomePaciente: string,
        cpf: string,
        phone: string
    };

    const [value, onChange] = useState(new Date())
    const [schedule, setSchedule] = useState<resultProps[]>([]);

    useEffect(() => {
        getAllRegisters()
    }, [value])

    const getAllRegisters = async () => {
        const value2 = convert(value)
        const response = await Promise.resolve(getAllScheduleApointments(value2))
        setSchedule(response)
    };

    function convert(str: any) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    console.log(convert(`${value}`))

    const [idDelete, setIdDelete] = useState('')
    const handleOpenModalDelete = (id: any, cpf: any) => {
        onOpenDelete();
        setIdDelete(id)
        setCPF(cpf)
    }
    function handleDelete(e: any) {
        const deleteSchedule = async () => {
            await deleteScheduleApointment({ id: idDelete })
        }
        e.preventDefault()
        setCPF('')
        deleteSchedule()
        onCloseDelete()
        setTimeout(() => {
            getAllRegisters()
        }, 100)
    }

    const [idEdit, setIdEdit] = useState('')
    const handleOpenModalEdit = (id: any) => {
        onOpenEdit();
        setIdEdit(id)
    }

    function ScheduleTrue(props: any) {
        const dadosBack = props.schedule
        return (
            <TableContainer m={2}>
                <Table>
                    <TableCaption>Agendamentos do dia</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>CPF</Th>
                            <Th>Telefone</Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    {
                        dadosBack.map((post: any) => (
                            <Tbody>
                                <Tr>
                                    <Td>{post.nomePaciente}</Td>
                                    <Td>{post.cpf}</Td>
                                    <Td>{post.phone}</Td>
                                    <Td><Button colorScheme='red' size='xs' onClick={() => handleOpenModalDelete(post.idSchedule, post.cpf)} ><DeleteIcon /></Button></Td>
                                    <Td><Button size='xs' onClick={() => handleOpenModalEdit(post.idSchedule)}><EditIcon /></Button></Td>
                                    <Td><Button size='xs'>CONFIRMADO</Button></Td>
                                </Tr>
                            </Tbody>
                        ))
                    }
                </Table>
            </TableContainer>
        )

    }

    const ScheduleFalse = () => {
        return (
            <Text>
                <Center>
                    <Text m={6}>Sem agendamentos</Text>
                </Center>
            </Text>
        )
    }


    return (
        <Center mt={4}>
            <Stack direction='row' justify='center'>
                <Stack direction='column' justify='center' mt={7}>
                    <Center mb={5}>
                        <Calendar onChange={onChange} value={value} locale={'pt'} />
                    </Center>

                    {schedule.length > 0 ? <ScheduleTrue schedule={schedule} /> : <ScheduleFalse />}
                    <Button w="100%" colorScheme={'blue'} onClick={onOpenModal}> Agendar
                    </Button>
                </Stack>
                <Stack >
                    <Stack>
                        <Modal isOpen={isOpen} onClose={onCloseModal}>
                            <form onSubmit={handleSubmit}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Status</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
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
                                            id={phone}
                                            placeholder={'(xx) xxxxx-xxxx'}
                                            value={phone}
                                            maxLength={15}
                                            required
                                            onChange={handlePhoneMaskChange}
                                            size="md"
                                            type="phone"
                                        />
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

                                    </ModalBody>
                                    <ModalFooter>
                                        <FormControl>
                                            <Button
                                                colorScheme={state === 'success' ? 'green' : 'blue'}
                                                isLoading={state === 'submitting'}
                                                w="100%"
                                                type={state === 'success' ? 'button' : 'submit'}>
                                                {state === 'success' ? <CheckIcon /> : 'Enviar'}
                                            </Button>
                                        </FormControl>
                                    </ModalFooter>
                                </ModalContent>
                            </form>
                        </Modal>

                        <Modal isOpen={isOpenDelete} onClose={onCloseDelete} >
                            <ModalOverlay />
                            <form>
                                <ModalContent>
                                    <ModalHeader>Deletar registro</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <FormControl >
                                            <Text>Deseja deletar o registro? {cpf}</Text>
                                        </FormControl>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme='red' mr={'25%'} w={'50%'} type='submit' onClick={(event => handleDelete(event))}>
                                            Deletar
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </form>
                        </Modal>


                        <Modal isOpen={isOpenEdit} onClose={onCloseEdit} >
                            <ModalOverlay />
                            <form>
                                <ModalContent>
                                    <ModalHeader>Alterar configurações de status agendamento</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <FormControl >
                                            <Text>{cpf}</Text>
                                            <Select placeholder='Selecione o status'  >
                                                <option value='Em processamento'>Remarcado</option>
                                                <option value='Aprovado'>Confirmado</option>
                                                <option value='Reprovado'>A Confirmar</option>
                                            </Select>
                                        </FormControl>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme='blue' mr={'25%'} w={'50%'} type='submit' onClick={onCloseEdit}>
                                            Atualizar
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </form>
                        </Modal>

                    </Stack>
                </Stack>
            </Stack>
        </Center>
    );
}