import {
    Box,
    Button,
    Divider,
    Heading,
    Input,
    List,
    ListItem,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Search2Icon, DeleteIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react';
import SearchProducts from '../components/SearchProducts'


const ThreeTierPricingHorizontal = () => {

    type resultProps = {
        [x: string]: any;
        idStock: number
        nome: string
        preco: any
        quantidade: number
    }
    const [cart, setCart] = useState<resultProps[]>([])
    const fetchCart = (...data: any) => {
            setCart([ ...cart,data]);
    }
    useEffect(() => {
    }, [cart]);

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
                {cart.map((carts) => {
                return <Stack>
                    {carts.map((product: any) => (
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
                            <Heading><Button colorScheme='red' > <DeleteIcon /></Button></Heading>
                        </Stack>
                    ))}
                </Stack>
                })} 
                <Divider />
                <Heading size={'xl'}>Total:</Heading>
                {/* <Heading size={'xl'}>R$ {Object.values(cart).reduce((t, {preco}) => t + preco, 0)}
                </Heading> */}
                <Heading size={'xl'}>R$ {Object.values(cart).reduce((t, { preco }) => t + preco, 0)}
                </Heading>
                <Button
                    size="md">
                    Finalizar
                </Button>
            </Stack>
        </Box>
    );
};

export default ThreeTierPricingHorizontal;