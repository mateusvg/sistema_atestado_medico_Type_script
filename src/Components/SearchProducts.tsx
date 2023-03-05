
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Button,
    Tr,
    Tbody,
    Td,
    Table,
    InputGroup,
    InputLeftElement,
    Input,
    Thead,
    Th,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../contexts/Context'
import { getAllStockRegistersAdmin } from '../services/Admin/Stock/getAllStockRegistersAdmin'
import { CloseIcon } from '@chakra-ui/icons'

export default function PlacementExample(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    //Get all registers products
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
    //Get All registers products END

    const [searchInput, setSearchInput] = useState("")
    const handleChange = (e: any) => {
        e.preventDefault()
        console.log(searchInput)
        setSearchInput(e.target.value)
    }
    if (searchInput.length > 0) {
        result.filter((data) => {
            console.log(`Nome produto: ${data.nome}`)
            return data.nome.includes(searchInput)
        })
    }
    function handleSendParent(idStock: any, nome: any, preco: any, quantidade: any){
        props.func({idStock: idStock, nome:nome, preco:preco, quantidade:quantidade})
        onClose()
    }

    return (
        <>
            <Button colorScheme='blue' onClick={onOpen}>
                Procurar produtos
            </Button>
            <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Procurar produtos
                        <InputGroup >
                            <InputLeftElement >
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
                        <Button ml={3}  mt={3} onClick={onClose} ><CloseIcon /></Button>
                        </InputGroup>
                        
                    </DrawerHeader>
                    <DrawerBody>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Nome</Th>
                                    <Th>Preço</Th>
                                    <Th>Quant.</Th>
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
                                            <Td>{post.preco}</Td>
                                            <Td>{post.quantidade}</Td>
                                            <Td>
                                                <Button
                                                    size="md" 
                                                    onClick={()=>{handleSendParent(post.idStock, post.nome, post.preco, post.quantidade)}}
                                                    >
                                                    Add
                                                </Button>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                ))
                            }
                        </Table>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    )

}