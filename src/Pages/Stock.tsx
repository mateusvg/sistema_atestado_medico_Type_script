import { useState, useEffect, ChangeEvent } from 'react';
import { EditIcon, DownloadIcon, Search2Icon, DeleteIcon } from '@chakra-ui/icons'
import CircleStatus from '../components/StatusCircleChakra'
import {
    Button,
    Center,
    FormControl,
    Input,
    InputLeftElement,
    useColorModeValue,
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
    Stack,
    InputLeftAddon
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'
import { deleteTableRegister } from '../services/Admin/TableAdmin/deleteRegisterTable'
import { updateStatusTableAdmin } from '../services/Admin/TableAdmin/updateStatusTable'
import { getAllStockRegistersAdmin } from '../services/Admin/Stock/getAllStockRegistersAdmin'
import { getStatusCountRegistersAdmin } from '../services/Admin/TableAdmin/getStatusCountAdminTable'
import React, { useContext } from "react";
import { Context } from "../contexts/Context";
import { currency } from '../utils/MaskPriceFormater'

export default function Simple(props: any) {
    const [nomeProduto, setNomeProduto] = useState('');
    const [idProduto, setIdProduto] = useState('')
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');

    //CPF mask
    function handleChangeMaskCurrency(event: any) {
        const { value } = event.target
        console.log(value)
        if (value === "NaN") {
            setPreco('0')
        } else {
            setPreco(currency(value))

        }
    }

    //Modal
    const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure()
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()

    type resultProps = {
        idStock: string
        nome: string
        foto: string
        preco: any
        quantidade: string
        status: string
        Status: string
    }
    //Get all registers
    const [result, setResult] = useState<resultProps[]>([]);
    const getAllRegisters = async () => {
        const data = await getAllStockRegistersAdmin()
        setResult(data)
    }

    const { context, setContext } = useContext(Context)
    useEffect(() => {
        getAllRegisters()
        setContext(true)
        console.log(`context table ${context}`)
    }, [])

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
            const updateStatusAdminTable = await updateStatusTableAdmin({})
        }
        updateStatus()
        onClose()
        setTimeout(() => {
            getAllRegisters()
            getAllStatus()
        }, 100)
    };


    const setStatusColorIconChakra = (Status: string) => {
        if (Status === 'Reprovado') {
            return 'red.500'
        } else if (Status === 'Aprovado') {
            return 'green.500'
        } else {
            return 'blue.500'
        }
    }

    //Search products
    const [searchInput, setSearchInput] = useState("")
    const handleChange = (e: any) => {
        e.preventDefault()
        console.log(searchInput)
        setSearchInput(e.target.value)
    }
    if (searchInput.length > 0) {
        result.filter((data) => {
            console.log(`dados: ${data.nome}`)
            return data.nome.includes(searchInput)
        })
    }

    const handleOpenModal = (id: string, nome: string, preco: string, quantidade: string) => {
        setIdProduto(id)
        setQuantidade(quantidade)
        setPreco(preco)
        setNomeProduto(nome);
        onOpenModal();
    }

    const [idDelete, setIdDelete] = useState('')
    const handleOpenModalDelete = (id: any) => {
        onOpenDelete();
        setIdDelete(id)
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
        let novoArray: any = ["ID"]
        let arraySemAnexo: any = []
        result.map(function (item, indice, array) {
            arraySemAnexo.push(` \n ${result[indice]['idStock']}}`)
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
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' shadow='sm' p={3}>
                    Total produtos: {allStatusMap[2] + allStatusMap[0] + allStatusMap[1]}
                </Box>
            </Stack>
            <Center m={4}>
                <Stack direction={'row'}>
                    <InputGroup >
                        <InputLeftElement >
                            <Search2Icon mt={6} />
                        </InputLeftElement>
                        <Input
                            placeholder="Procurar produto"
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
                            <Th>ID</Th>
                            <Th>Nome</Th>
                            <Th>Foto</Th>
                            <Th>R$</Th>
                            <Th>Quantidade</Th>
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
                            } else if (post.nome.toLowerCase().includes(searchInput.toLowerCase())) {
                                return post;
                            }
                        }).map((post, index) => (
                            <Tbody>
                                <Tr>
                                    <Td>{post.idStock}</Td>
                                    <Td>{post.nome}</Td>
                                    <Td><Button onClick={() => handleDownload(post.foto)}><DownloadIcon /></Button></Td>
                                    <Td>{post.preco}</Td>
                                    <Td>{post.quantidade}</Td>
                                    <Td>{post.status}</Td>
                                    <Td><CircleStatus status={setStatusColorIconChakra(post.Status)} /></Td>
                                    <Td><Button onClick={() => handleOpenModal(post.idStock, post.nome, post.preco, post.quantidade)}><EditIcon /></Button></Td>
                                    <Td><Button colorScheme='red' onClick={() => handleOpenModalDelete(post.idStock)}> <DeleteIcon /></Button></Td>
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
                                    <InputGroup>
                                        <InputLeftAddon children='Nome' />
                                        <Input
                                            mb={2}
                                            variant={'solid'}
                                            borderWidth={1}
                                            color={'gray.800'}
                                            _placeholder={{
                                                color: 'gray.400',
                                            }}
                                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                                            id={'nomeProduto'}
                                            type={'nomeProduto'}
                                            name={nomeProduto}
                                            required
                                            placeholder={'Nome Produto'}
                                            aria-label={'Seu nome'}
                                            value={nomeProduto}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                setNomeProduto(e.target.value)
                                            }
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputLeftAddon children='R$         ' />
                                        <Input
                                            mb={2}
                                            variant={'solid'}
                                            borderWidth={1}
                                            color={'gray.800'}
                                            _placeholder={{
                                                color: 'gray.400',
                                            }}
                                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                                            id={'preco'}
                                            type={'preco'}
                                            name={preco}
                                            required
                                            placeholder={'Preço'}
                                            aria-label={'Seu nome'}
                                            value={preco}
                                            onChange={handleChangeMaskCurrency}
                                        />
                                    </InputGroup>

                                    <InputGroup>
                                        <InputLeftAddon children='Quant.' />
                                        <Input
                                            mb={2}
                                            variant={'solid'}
                                            borderWidth={1}
                                            color={'gray.800'}
                                            _placeholder={{
                                                color: 'gray.400',
                                            }}
                                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                                            id={'quantidade'}
                                            type={'quantidade'}
                                            name={quantidade}
                                            required
                                            placeholder={'Nome Produto'}
                                            aria-label={'Seu nome'}
                                            value={quantidade}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                setQuantidade(e.target.value)
                                            }
                                        />
                                    </InputGroup>
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