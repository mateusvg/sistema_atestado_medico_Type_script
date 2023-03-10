import {
    Box,
    Button,
    Center,
    Divider,
    FormControl,
    Heading,
    List,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,

} from '@chakra-ui/react';
import { Search2Icon, DeleteIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react';
import SearchProducts from '../components/SearchProducts'
import Alert from '../components/AlertProductSale'
import { closeFinalSaleService } from '../services/Admin/Stock/closeFinalSale'

interface ObjectInterface {
    idStock: number
    nome: string
    preco: number
    quantidade: number
}


const ThreeTierPricingHorizontal = () => {
    const { isOpen: isOpenFinalSale, onOpen: onOpenFinalSale, onClose: onCloseFinalSale } = useDisclosure()
    const [cart, setCart] = useState<ObjectInterface[]>([]);
    const [totalGeral, setTotalGeral] = useState<number>(0)

    async function fetchCart(...data: any) {
        setCart([...cart, data[0]]);
        setTotalGeral(totalGeral + data[0].preco)
        console.log(`GERAL SOMA ${JSON.stringify(totalGeral)}`)
    }

    function deleteObject(id: number, preco: number) {
        const filteredArray = cart.filter((obj) => obj.idStock !== id);
        setCart(filteredArray);
        setTotalGeral(totalGeral - preco)
    }

    function handleCloseSale(...cart: any) {
        onOpenFinalSale()
        console.log(`CARRINHO FINAL ${JSON.stringify(cart[0])}`)
    }

    function clearProducts() {
        setCart([]);
        setTotalGeral(0)
    }

    // CLOSE FINAL SALE
    const handleSubmit = (e: any): void => {
        e.preventDefault()
        const closeFinalSale = async () => {
            await closeFinalSaleService(cart)
        }
        closeFinalSale()
        onCloseFinalSale()
        setTimeout(() => {
            setCart([]);
            setTotalGeral(0)
        }, 100)


    };


    return (
        <Box py={6} px={5} >

            <Stack spacing={4} width={'100%'} direction={'column'}>
                <Stack
                    p={5}
                    alignItems={'center'}
                    justifyContent={{
                        base: 'flex-start',
                        md: 'space-around',
                    }}
                    direction={{
                        base: 'column',
                        md: 'row',
                    }}>
                    <Stack
                        width={{
                            base: '100%',
                            md: '40%',
                        }}
                        textAlign={'center'}>
                        <Heading size={'lg'}>
                            <Search2Icon /> <Text color="purple.400">Produtos</Text>
                        </Heading>
                    </Stack>
                    <Stack
                        width={{
                            base: '100%',
                            md: '60%',
                        }}>
                        <SearchProducts func={fetchCart} />
                    </Stack>
                </Stack>
                <Divider />
                {totalGeral == 0 ? <><Center><Heading size={'xl'}>Carrinho Vazio</Heading></Center></> :
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Nome</Th>
                                <Th>Quant.</Th>
                                <Th>Preço</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        {cart.map((carts) => {
                            return <Tbody>
                                <Tr>
                                    <Td><Heading size={'xl'}>{carts.nome}</Heading></Td>
                                    <Td><Heading size={'xl'}>1 </Heading></Td>
                                    <Td><Heading size={'xl'}>R$ {carts.preco}</Heading></Td>
                                    <Td><Heading><Button colorScheme='red' onClick={() => deleteObject(carts.idStock, carts.preco)} > <DeleteIcon /></Button></Heading></Td>
                                </Tr>
                            </Tbody>
                        })}
                    </Table>
                }
                <Divider/>
                <Heading size={'xl'}>Total:</Heading>
                <Heading size={'xl'}>R$ {totalGeral}
                    <Button
                        onClick={() => { clearProducts() }}
                        size="md" ml={20}>
                        Limpar produtos
                    </Button>
                </Heading>
                    <Button
                        size="md" onClick={() => { handleCloseSale(cart) }}>
                        Finalizar
                    </Button>
            </Stack>



            {/* MODAL DELETE PRODUCT */}
            <Modal isOpen={isOpenFinalSale} onClose={onCloseFinalSale} >
                <ModalOverlay />
                <form onSubmit={(e) => { handleSubmit(e) }} >
                    <ModalContent>
                        <ModalHeader>Finalizar compra</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl >
                                <Text>Deseja finalizar a compra?</Text>
                                <Text>R$ 1</Text>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={'25%'} w={'50%'} type='submit'>
                                <Alert />
                            </Button>

                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>



        </Box>




    );
};

export default ThreeTierPricingHorizontal;