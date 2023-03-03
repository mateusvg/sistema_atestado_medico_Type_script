import { Center, FormControl, Input, InputLeftElement } from '@chakra-ui/react';
import { CircleIcon } from '../components/CircleIconStatus'
import { EditIcon, DownloadIcon, Search2Icon, DeleteIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import CircleStatus from '../components/StatusCircleChakra'
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
import { deleteTableRegister } from '../services/Admin/TableAdmin/deleteRegisterTable'
import { updateStatusTableAdmin } from '../services/Admin/TableAdmin/updateStatusTable'
import { getAllRegistersAdmin } from '../services/Admin/TableAdmin/getAllRegisterTable'
import { getStatusCountRegistersAdmin } from '../services/Admin/TableAdmin/getStatusCountAdminTable'
import React, { useContext } from "react";
import { Context } from "../contexts/Context";

export default function Simple(props: any) {

    //Modal
    const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure()
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()

    //Get all registers products
    type resultProps = {
        idForm: string
        nomePaciente: string
        cpf: string
        anexo: any
        nomeMedico: string
        data: string
        aptidao: string
        Status: string
    }
    const [result, setResult] = useState<resultProps[]>([]);
    const getAllRegisters = async () => {
        const data = await getAllRegistersAdmin()
        setResult(data)
    }

    const { context, setContext } = useContext(Context)
    useEffect(() => {
        getAllRegisters()
        setContext(true)
        console.log(`context table ${context}`)
    }, [])
    //Get All registers products END

    type allStatus = {
        status: string
    }
    const [allStatus, setAllStatus] = useState<allStatus[]>([]);
    useEffect(() => {
        getAllStatus()
        console.log(allStatus)
    }, [])
    let allStatusMap = allStatus.map(a => a.status)


    const getAllStatus = async () => {
        const data1 = await getStatusCountRegistersAdmin()
        setAllStatus(data1);
    };

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
        const updateStatus = async () => {
            const updateStatusAdminTable = await updateStatusTableAdmin({ status: status, cpf: cpf })
        }
        updateStatus()
        onClose()
        setTimeout(() => {
            getAllRegisters()
            getAllStatus()
        }, 100)
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

    const setStatusColorIconChakra= (Status: string) => {
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
    }

    const [idDelete, setIdDelete] = useState('')
    const handleOpenModalDelete = (id: any, cpf: any) => {
        onOpenDelete();
        setIdDelete(id)
        setCpf(cpf)
    }
    function handleDelete(e: any) {
        e.preventDefault()
        const deleteSchedule = async () => {
            const deleteTableById = await deleteTableRegister({ id: idDelete })
        }
        deleteSchedule()
        onCloseDelete()
        setTimeout(() => {
            getAllRegisters()
            getAllStatus()
        }, 100)
    }


    // Download file report XLS OR TXT
    function downloadFile(e: any) {
        const element = document.createElement("a")
        let novoArray : any =["ID", "CPF", "Status", "Aptidão"] 
        let arraySemAnexo : any =[]
        result.map(function (item, indice, array) {
            arraySemAnexo.push(` \n ${result[indice]['idForm']}, ${result[indice]['cpf']} , ${result[indice]['Status']} , ${result[indice]['aptidao']}` ) 
            console.log(item)
          });
        
        const file = new Blob([`${novoArray} \n ${arraySemAnexo}`]);
        
        e.preventDefault()
        if (e.target.value === 'XLSX') {
            element.href = URL.createObjectURL(file);
            element.download = `Relatorio.xls`
            element.click();
        } else {
            element.href = URL.createObjectURL(file);
            element.download = `Relatorio.txt`
            element.click();
        }

    }


    return (
        <>
            <Stack spacing={5} direction='row' justify='center' mt={4}>

                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' shadow='sm' p={3} >
                    <CircleIcon color={'blue'} />Em processamento: {allStatusMap[0]}
                </Box>
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' shadow='sm' p={3}>
                    <CircleIcon color={'green'} />Aprovado: {allStatusMap[1]}
                </Box>
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' shadow='sm' p={3}>
                    <CircleIcon color={'red'} /> Reprovado: {allStatusMap[2]}
                </Box>
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' shadow='sm' p={3}>
                    Total: {allStatusMap[2] + allStatusMap[0] + allStatusMap[1]}
                </Box>
            </Stack>

            <Center m={4}>
                <Stack direction={'row'}>
                    <InputGroup >
                        <InputLeftElement >
                            <Search2Icon mt={6} />
                        </InputLeftElement>
                        <Input
                            placeholder="Procurar CPF"
                            mb={5}
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
                </Stack>
                <Stack ml={4} mb={2}>
                    <Select placeholder='Exportar' onChange={downloadFile}>
                        <option value='XLSX'>XLSX</option>
                        <option value='TXT'>TXT</option>
                    </Select>
                </Stack>
            </Center>
            <TableContainer m={2}>
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
                            <Th>Editar</Th>
                            <Th></Th>
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
                            <Tbody>
                                <Tr>
                                    <Td>{post.nomePaciente}</Td>
                                    <Td>{post.cpf}</Td>
                                    <Td><Button onClick={() => handleDownload(post.anexo)}><DownloadIcon /></Button></Td>
                                    <Td>{post.nomeMedico}</Td>
                                    <Td>{post.aptidao}</Td>
                                    <Td>{post.Status}</Td>
                                    <Td><CircleStatus status={setStatusColorIconChakra(post.Status)}/></Td>
                                    {/* <Td><CircleIcon color={`${setStatusColorIcon(post.Status)}`} /></Td> */}
                                    <Td><Button onClick={() => handleOpenModal(post.cpf, post.Status)}><EditIcon /></Button></Td>
                                    <Td><Button colorScheme='red' onClick={() => handleOpenModalDelete(post.idForm, post.cpf)}> <DeleteIcon /></Button></Td>
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

                <Modal isOpen={isOpenDelete} onClose={onCloseDelete} >
                    <ModalOverlay />
                    <form onSubmit={handleSubmit} >
                        <ModalContent>
                            <ModalHeader>Deletar registro</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl >
                                    <Text>Deseja deletar o registro?</Text>
                                    <Text>{cpf}</Text>
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
            </TableContainer>
        </>
    )
}