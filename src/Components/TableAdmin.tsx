import { FormControl, Input, InputLeftElement } from '@chakra-ui/react';
import { CircleIcon } from './CircleIconStatus'
import { EditIcon, DownloadIcon, Search2Icon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    InputGroup,
    Text,
    Box,
    Stack
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'

export default function Simple() {

    const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure()

    type resultProps = {
        idForm: string
        nomePaciente: string
        cpf: string
        anexo: any
        nomeMedico: string
        data: string
        aptidao: string
        Status: string
    };
    type allStatus={
        status:string
    }

    const [result, setResult] = useState<resultProps[]>([]);
    useEffect(() => {
        getAllRegisters()
    }, [])

    const [allStatus, setAllStatus] = useState<allStatus[]>([]);
    useEffect(() => {
        getAllStatus()
        console.log(allStatus)
    }, [])
    let allStatusMap = allStatus.map(a => a.status)

    //Get all registers
    const getAllRegisters = async () => {
        const data = await fetch("http://localhost:8080/admin/table", {
            method: "GET"
        });
        const jsonData = await data.json();
        setResult(jsonData);
    };

    const getAllStatus = async () => {
        const data = await fetch("http://localhost:8080/admin/table/status/count", {
            method: "GET"
        });
        const jsonData = await data.json();
        console.log(`Dados Json ${jsonData}`)
        setAllStatus(jsonData);
        console.log(`todos status ${JSON.stringify(allStatus)}`)
    };

    // Post form update status
    const handleDownload = (anexo: any) => {
        anexo = anexo.replace('data:image/png;base64,', '')
        const payload = { anexo: anexo }
        // console.log(payload.anexo)
        var a = document.createElement("a"); //Create <a>
        a.href = "data:image/png;base64," + payload.anexo; //Image Base64 Goes here
        a.download = "Image.png"; //File name Here
        a.click(); //Downloaded file
    };

    // Post form update status
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const payload = { status: status, cpf: cpf }
        console.log(payload)

        const uri2 = 'http://localhost:8080/status/status/update/admin';
        const updateStatus = async () => {
            try {
                console.log(`try console.log ${JSON.stringify(payload)}`)
                const req = await fetch(uri2, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: status, cpf: cpf }),
                })

            } catch (err) {
                console.log(err);
            }
        }
        updateStatus()
        window.location.reload()
    };

    const setStatusColorIcon = (Status: string) => {
        if (Status === 'Reprovado') {
            return 'red.500'
        } else if (Status === 'Aprovado') {
            return 'green.500'
        } else {
            return 'blue.500'
        }
    }

    const [searchInput, setSearchInput] = useState("")
    const handleChange = (e: any) => {
        e.preventDefault()
        console.log(searchInput)
        setSearchInput(e.target.value)
    }
    if (searchInput.length > 0) {
        result.filter((data) => {
            console.log(`dados: ${data.cpf}`)
            return data.cpf.includes(searchInput)
        })
    }

    const [status, setStatusDropDown] = useState('')
    const [cpf, setCpf] = useState('')
    const handleChangeDropDown = (e: any) => {
        e.preventDefault()
        if (e.target.value === 'Em processamento') {
            setStatusDropDown('1')
        } else if (e.target.value === 'Aprovado') {
            setStatusDropDown('2')
        } else {
            setStatusDropDown('3')
        }
    }
    const handleOpenModal = (cpf: string, Status: string) => {
        setStatusDropDown(Status)
        setCpf(cpf);
        onOpenModal();
    };

    return (
        <>
            <Stack spacing={5} direction='row' justify='center' mt={4}>
                
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' shadow='sm' p={3} >
                    <CircleIcon color={'blue'} />Total "Em processamento": {allStatusMap[0]}
                </Box>
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' shadow='sm' p={3}>
                    <CircleIcon color={'green'} />Total "Aprovado": {allStatusMap[1]}
                </Box>
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' shadow='sm' p={3}>
                    <CircleIcon color={'red'} /> Total "Reprovado": {allStatusMap[2]}
                </Box>
            </Stack>

            <InputGroup shadow='sm'>
                <InputLeftElement >
                    <Search2Icon mt={6} />
                </InputLeftElement>
                <Input
                    placeholder="Procurar CPF"
                    mb={3}
                    mt={3}
                    variant={'solid'}
                    borderWidth={1}
                    color={'gray.800'}
                    _placeholder={{
                        color: 'gray.400',
                    }}
                    type="search"
                    id="outlined-basic"
                    onChange={handleChange}
                    value={searchInput}
                />
            </InputGroup>
            <TableContainer>
                <Table variant='simple' colorScheme='#E6FFFA' size='sm'>
                    <TableCaption>Pacientes</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>CPF</Th>
                            <Th>Anexo</Th>
                            <Th>Médico</Th>
                            <Th>Aptidão</Th>
                            <Th>Status</Th>
                            <Th></Th>
                            <Th>Ação</Th>
                        </Tr>
                    </Thead>
                    {
                        result.filter(post => {
                            if (searchInput === '') {
                                return post;
                            } else if (post.cpf.toLowerCase().includes(searchInput.toLowerCase())) {
                                return post;
                            }
                        }).map((post, index) => (
                            <Tbody >
                                <Tr >
                                    <Td>{post.nomePaciente}</Td>
                                    <Td>{post.cpf}</Td>
                                    <Td><Button onClick={() => handleDownload(post.anexo)}><DownloadIcon /></Button></Td>
                                    <Td>{post.nomeMedico}</Td>
                                    <Td>{post.aptidao}</Td>
                                    <Td>{post.Status}</Td>
                                    <Td><CircleIcon color={`${setStatusColorIcon(post.Status)}`} /></Td>
                                    <Td><Button onClick={() => handleOpenModal(post.cpf, post.Status)}><EditIcon /></Button></Td>
                                </Tr>
                            </Tbody>
                        ))
                    }
                </Table>

                <Modal isOpen={isOpen} onClose={onClose} >
                    <ModalOverlay />
                    <form onSubmit={handleSubmit} >
                        <ModalContent>
                            <ModalHeader>Alterar configurações de status</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl >
                                    <Text>{cpf}</Text>
                                    <Select placeholder='Selecione o status' onChange={handleChangeDropDown} >
                                        <option value='Em processamento'>Em processamento</option>
                                        <option value='Aprovado'>Aprovado</option>
                                        <option value='Reprovado'>Reprovado</option>
                                    </Select>
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={'25%'} w={'50%'} type='submit' onClick={onClose}>
                                    Atualizar
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </form>
                </Modal>

            </TableContainer>
        </>
    )
}