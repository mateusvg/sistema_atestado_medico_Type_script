import {
    Box,
    Button,
    Center,
    Divider,
    FormControl,
    Heading,
    Input,
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { Search2Icon, DeleteIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react';
import SearchProducts from '../components/SearchProducts'
import { closeFinalSaleService } from '../services/Admin/Stock/closeFinalSale'


const ThreeTierPricingHorizontal = () => {
    const { isOpen: isOpenFinalSale, onOpen: onOpenFinalSale, onClose: onCloseFinalSale } = useDisclosure()

    type resultProps = {
        [x: string]: any;
        idStock: number
        nome: string
        preco: number
        quantidade: number
    }
    const [cart, setCart] = useState<resultProps[]>([])
    interface valorTotal {
        preco: number
    }
    const [totalValue, setTotalValue] = useState<valorTotal[]>([])
    console.log(totalValue)
    const fetchCart = (...data: any) => {
        console.log(`data : ${JSON.stringify(data)}`)
        setCart([...cart, data]);
        setTotalValue([...totalValue, data[0].preco])
        setIdProductInCart([...idProductInCart, data[0].idStock])
    }
    let totalRound = totalValue?.reduce((t: any, preco: any) => t + preco, 0)
    useEffect(() => {
    }, [cart]);

    const [idProductInCart, setIdProductInCart] = useState<valorTotal[]>([])



    function handlePushProductFromArray(idParan: any) {
        cart.find((product, index) => {
            product?.find((prod: any) => {

                // console.log(`index é ${index}`)
                // console.log(`produto = ${JSON.stringify(prod)}`)
                // console.log(`${prod.idStock}`)
                // console.log(`${idParan}`)

                if (prod.idStock === idParan) {
                    //console.log(`o index ${JSON.stringify(cart[index])}`)
                    delete cart[index]
                    setCart([...cart])
                    delete totalValue[index]
                    //setTotalValue([...totalValue])
                    //console.log('valor total'+JSON.stringify(totalValue[index]))
                    console.log(`tamanho total value ${totalValue.length}`)
                }

            });
        });
        fetchCart()
    }

    function handleClearArray() {
        setCart([])
        setTotalValue([])
    }

    function handleCloseSale(...cart: any) {
        onOpenFinalSale()
        console.log(`CARRINHO FINAL ${JSON.stringify(cart[0])}`)
    }

    // CLOSE FINAL SALE
    const handleSubmit = (e: any): void => {
        e.preventDefault()
        const closeFinalSale = async () => {
            const updateProductsAttributes = await closeFinalSaleService(cart)
        }
        closeFinalSale()
        onCloseFinalSale()
        setTimeout(() => {

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
                {cart.length > 0 ? cart.map((carts) => {
                    return <Stack>
                        {carts?.map((product: any) => (
                            <Stack
                                p={3}
                                py={3}
                                justifyContent={{
                                    base: 'flex-start',
                                    md: 'space-around',
                                }}
                                direction={{
                                    base: 'column',
                                    md: 'row',
                                }}
                                alignItems={{ md: 'center' }}>
                                <Heading size={'md'}>{product.nome}</Heading>
                                <List spacing={3} textAlign="start">
                                    <ListItem >
                                        <Input
                                            placeholder="Quant"
                                            variant={'solid'}
                                            borderWidth={1}
                                            color={'gray.800'}
                                            _placeholder={{
                                                color: 'gray.400',
                                            }}
                                            type="search"
                                            id="outlined-basic"
                                        />
                                    </ListItem>
                                </List>
                                <Heading size={'xl'}>R$ {product.preco}</Heading>
                                <Heading><Button colorScheme='red' onClick={() => { handlePushProductFromArray(product.idStock) }}> <DeleteIcon /></Button></Heading>
                            </Stack>
                        ))}
                    </Stack>
                }) : <Center>Carrinho vazio</Center>}
                <Divider />
                <Heading size={'xl'}>Total:</Heading>
                <Heading size={'xl'}>R$ {totalRound.toFixed(2)}
                    <Button
                        onClick={handleClearArray}
                        size="md" ml={20}>
                        Limpar produtos
                    </Button>
                </Heading>
                <Button
                    size="md" onClick={() => { handleCloseSale(idProductInCart) }}>
                    Finalizar
                </Button>
            </Stack>
            
                {/* MODAL DELETE PRODUCT */}
                <Modal isOpen={isOpenFinalSale} onClose={onCloseFinalSale} >
                    <ModalOverlay />
                    <form onSubmit={(e)=>{handleSubmit(e)}} >
                        <ModalContent>
                            <ModalHeader>Finalizar compra</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl >
                                    <Text>Deseja finalizar a compra?</Text>
                                    <Text>R$ {totalRound.toFixed(2)}</Text>
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={'25%'} w={'50%'} type='submit'>
                                    Finalizar compra
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </form>
                </Modal>
        </Box>
        
    );
};

export default ThreeTierPricingHorizontal;