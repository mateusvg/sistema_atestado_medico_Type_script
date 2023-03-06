import { useState, useEffect, ChangeEvent } from 'react';
import { EditIcon, DownloadIcon, Search2Icon, DeleteIcon, AddIcon } from '@chakra-ui/icons'
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
    Box,
    Stack,
    InputLeftAddon,
    NumberInputField,
    NumberIncrementStepper,
    NumberInput,
    NumberInputStepper,
    NumberDecrementStepper,
    useDisclosure,
    Text
} from '@chakra-ui/react'

import { deleteProductsStock } from '../services/Admin/Stock/deleteStockProduct'
import { updateStockProductsAttributes } from '../services/Admin/Stock/updateStockProductsAttributes'
import { getAllStockRegistersAdmin } from '../services/Admin/Stock/getAllStockRegistersAdmin'
import { getTotalProductsStock } from '../services/Admin/Stock/getTotalProductsStock'
import { getTotalPriceProductsInStock } from '../services/Admin/Stock/getTotalPriceProductsInStock'
import { insertStockProducts } from '../services/Admin/Stock/insertStockProduct'

import React, { useContext } from "react";
import { Context } from "../contexts/Context";
import { currency } from '../utils/MaskPriceFormater'

export default function Simple(props: any) {
    const [nomeProduto, setNomeProduto] = useState('');
    const [idProduto, setIdProduto] = useState('')
    const [quantidade, setQuantidade] = useState<number>(0)
    const [preco, setPreco] = useState<number>(0)
    const [statusProdutoHabilitado, setStatusProdutoHabilitado] = useState('');
    const [postImage, setPostImage] = useState({
        foto: '',
    });
    //Currency, moeda mask
    // function handleChangeMaskCurrency(event: any) {
    //     const { value } = event.target
    //     setPreco(currency(value))
    //     console.log(value)

    // }

    //Modal
    const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure()
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const { isOpen: isOpenAddProduct, onOpen: onOpenAddProduct, onClose: onCloseAddProduct } = useDisclosure()

    type resultProps = {
        idStock: string
        nome: string
        foto: string
        preco: number
        quantidade: number
        status: string
        Status: string
    }
    //Get all registers
    const [result, setResult] = useState<resultProps[]>([]);
    const getAllRegistersStockProducts = async () => {
        const data = await getAllStockRegistersAdmin()
        setResult(data)
    }

    const { context, setContext } = useContext(Context)
    useEffect(() => {
        getAllRegistersStockProducts()
        setContext(true)
        console.log(`context table ${context}`)
    }, [])


    // GET TOTAL PRODUCTS
    type totalProducts = {
        total: number
    }
    const [totalProducts, settotalProducts] = useState<totalProducts[] | []>([]);
    useEffect(() => {
        getTotalProducts()
        console.log(totalProducts)
    }, [])
    let totalProductsMap = totalProducts.map((item, index) => item.total)

    const getTotalProducts = async () => {
        const data1 = await getTotalProductsStock()
        console.log(`TOTAL REGISTROS ${JSON.stringify(data1)}`)
        settotalProducts(data1);
    };
    // GET TOTAL PRODUCTS END


    // GET TOTAL PRODUCTS PRICE
    type totalProductsPrice = {
        precoTotal: Number,
        quantTotal: Number
    }
    const [totalProductsPrice, settotalProductsPrice] = useState<totalProductsPrice[]>([]);
    useEffect(() => {
        getTotalPriceProducts()
        console.log(totalProductsPrice)
    }, [])
    const [totalPriceProductsGeral, setTotalPriceProducts] = useState(0)
    const getTotalPriceProducts = async () => {
        const dataTotalPrice = await getTotalPriceProductsInStock()
        console.log(`TOTAL PRICE ${JSON.stringify(dataTotalPrice)}`)
        let soma = dataTotalPrice[0].precoTotal * dataTotalPrice[0].quantTotal
        setTotalPriceProducts(soma)
    };
    // GET TOTAL PRODUCTS PRICE END

    const handleDownload = (anexo: any) => {
        anexo = anexo.replace('data:image/png;base64,', '')
        const payload = { anexo: anexo }
        // console.log(payload.anexo)
        var a = document.createElement("a"); //Create <a>
        a.href = "data:image/png;base64," + payload.anexo; //Image Base64 Goes here
        a.download = "Image.png"; //File name Here
        a.click(); //Downloaded file
    };

    const handleChangeDropDown = (e: any) => {
        e.preventDefault()
        console.log(`console.produto ativado ${e.target.value}`)
        if (e.target.value === 'Ativado') {
            setStatusProdutoHabilitado('1')
        } else {
            setStatusProdutoHabilitado('2')
        }
    }



    // INSERT PRODUCTS PRICE, QUANTITY, NAME
    const handleSubmitAddProduct = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const insertProductStock = async () => {
            console.log(`base64 foto = ${JSON.stringify(postImage)}`)
            const insertProductsAttributes = await insertStockProducts({ nome: nomeProduto, foto: postImage, preco: preco, quantidade: quantidade, status: statusProdutoHabilitado })
        }
        insertProductStock()
        onClose()
        setTimeout(() => {
            getAllRegistersStockProducts()
            getTotalProducts()
            getTotalPriceProducts()
        }, 100)
        setNomeProduto('')
        setQuantidade(0)
        setPreco(0)
    };

    // Convert to base64
    const convertToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, foto: `${base64}` });
    };

    // UPDATE PRODUCTS PRICE, QUANTITY, NAME
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const updateProductAttributes = async () => {
            const updateProductsAttributes = await updateStockProductsAttributes({ idStock: idProduto, nome: nomeProduto, preco: preco, quantidade: quantidade, status: statusProdutoHabilitado })
        }
        updateProductAttributes()
        onClose()
        setTimeout(() => {
            getAllRegistersStockProducts()
            getTotalProducts()
            getTotalPriceProducts()
        }, 100)
        setNomeProduto('')
        setQuantidade(0)
        setPreco(0)
    };

    //SetStatusIconCircularCollor
    const setStatusColorIconChakra = (status: string) => {
        if (status === 'Inativo') {
            return 'red.500'
        } else {
            return 'green.500'
        }
    }
    //SetStatusIconCircularCollorEND

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
    //Search products end

    //UPDATE PRODUCTS
    const handleOpenModal = (id: string, nome: string, preco: number, quantidade: number, status: string) => {
        setIdProduto(id)
        setStatusProdutoHabilitado(status)
        setQuantidade(quantidade)
        setPreco(preco)
        setNomeProduto(nome);
        onOpenModal();
    }


    const [idDelete, setIdDelete] = useState('')
    const handleOpenModalDelete = (id: any, nome: any) => {
        onOpenDelete();
        setIdDelete(id)
        setNomeProduto(nome)
    }
    function handleDelete(e: any) {
        e.preventDefault()
        const deleteSchedule = async () => {
            const deleteTableById = await deleteProductsStock({ id: idDelete })
        }
        deleteSchedule()
        onCloseDelete()
        setTimeout(() => {
            getAllRegistersStockProducts()
            getTotalPriceProducts()
            getTotalProducts()
        }, 100)
        setNomeProduto('')
        setQuantidade(0)
        setPreco(0)
    }


    // Download file report XLS OR TXT
    function downloadFile(e: any) {
        const element = document.createElement("a")
        let novoArray: any = ["ID", "NOME", "PRECO", "QUANTIDADE"]
        let arraySemAnexo: any = []
        result.map(function (item, indice, array) {
            arraySemAnexo.push(` \n ${result[indice]['idStock']}, ${result[indice]['nome']} ,${result[indice]['preco']} , ${result[indice]['quantidade']}`)
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
                    Total produtos: {totalProductsMap}
                </Box>
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' shadow='sm' p={3}>
                    Total do estoque R$: {totalPriceProductsGeral}
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

                <Stack ml={4} mb={2}>
                    <Button

                        as={'a'}
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'blue.400'}
                        href={'#'}
                        _hover={{
                            bg: 'blue.300',
                        }}
                        onClick={() => { onOpenAddProduct() }}
                    > Adicionar Produto
                        <AddIcon ml={3} />
                    </Button>
                </Stack>
            </Center>
            <TableContainer m={2}>
                <Table variant='simple' colorScheme='#E6FFFA' size='sm'>
                    <TableCaption>Produtos</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Nome</Th>
                            <Th>Foto</Th>
                            <Th>R$</Th>
                            <Th>Quant.</Th>
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
                                    <Td > <img title={post.nome} src={post.foto} width='45px'/></Td>
                                    <Td>{post.preco}</Td>
                                    <Td>{post.quantidade}</Td>
                                    <Td>{post.status}</Td>
                                    <Td><CircleStatus status={setStatusColorIconChakra(post.status)} /></Td>
                                    <Td><Button onClick={() => handleOpenModal(post.idStock, post.nome, post.preco, post.quantidade, post.status)}><EditIcon /></Button></Td>
                                    <Td><Button colorScheme='red' onClick={() => handleOpenModalDelete(post.idStock, post.nome)}> <DeleteIcon /></Button></Td>
                                </Tr>
                            </Tbody>
                        ))
                    }
                </Table>


                {/*MODAL CONFIGURAÇÕES PRODUTO*/}
                <Modal isOpen={isOpen} onClose={onClose} >
                    <ModalOverlay />
                    <form onSubmit={handleSubmit} >
                        <ModalContent>
                            <ModalHeader>Alterar configurações de produto</ModalHeader>
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
                                        <InputLeftAddon children='R$' />
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
                                            required
                                            placeholder={'Preço'}
                                            value={preco}
                                            onChange={(val) => {
                                                setPreco(Number(val.target.value));
                                            }}
                                        />
                                    </InputGroup>

                                    <InputGroup>
                                        <InputLeftAddon children='Quant.' />
                                        <NumberInput value={quantidade}
                                            onChange={(val) => {
                                                setQuantidade(Number(val));
                                            }} >
                                            <NumberInputField />
                                            <NumberInputStepper >
                                                <NumberIncrementStepper
                                                    onChange={(val) => {
                                                        setQuantidade(Number(val.target));
                                                    }} />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                    <Select placeholder='Selecione o status' onChange={handleChangeDropDown} >
                                        <option value='Ativado'>Ativado</option>
                                        <option value='Inativado'>Inativo</option>
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


                {/*MODAL ADD PRODUTO*/}
                <Modal isOpen={isOpenAddProduct} onClose={onCloseAddProduct} >
                    <ModalOverlay />
                    <form onSubmit={handleSubmitAddProduct} >
                        <ModalContent>
                            <ModalHeader>Add de produto</ModalHeader>
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
                                    <Input
                                        borderWidth={0}
                                        mb={2}
                                        size="md"
                                        name='myFile'
                                        type="file"
                                        placeholder={'Foto Produto'}
                                        required
                                        id=''
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => handleFileUpload(e)}
                                    />
                                    <InputGroup>
                                        <InputLeftAddon children='R$' />
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
                                            required
                                            placeholder={'Preço'}
                                            value={preco}
                                            onChange={(val) => {
                                                setPreco(Number(val.target.value));
                                            }}
                                        />
                                    </InputGroup>

                                    <InputGroup>
                                        <InputLeftAddon children='Quant.' />
                                        <NumberInput value={quantidade}
                                            onChange={(val) => {
                                                setQuantidade(Number(val));
                                            }} >
                                            <NumberInputField />
                                            <NumberInputStepper >
                                                <NumberIncrementStepper
                                                    onChange={(val) => {
                                                        setQuantidade(Number(val.target));
                                                    }} />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                    <Select placeholder='Selecione o status' onChange={handleChangeDropDown} >
                                        <option value='Ativado'>Ativado</option>
                                        <option value='Inativado'>Inativo</option>
                                    </Select>
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={'25%'} w={'50%'} type='submit' onClick={onCloseAddProduct}>
                                    ADD
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </form>
                </Modal>


                {/* MODAL DELETE PRODUCT */}
                <Modal isOpen={isOpenDelete} onClose={onCloseDelete} >
                    <ModalOverlay />
                    <form onSubmit={handleSubmit} >
                        <ModalContent>
                            <ModalHeader>Deletar produto</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl >
                                    <Text>Deseja deletar o produto?</Text>
                                    <Text>{nomeProduto}</Text>
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