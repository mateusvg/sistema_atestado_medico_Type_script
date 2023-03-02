import {
    Box,
    Button,
    Divider,
    Heading,
    Input,
    List,
    ListIcon,
    ListItem,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons'



const ThreeTierPricingHorizontal = () => {
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
                        <Input
                            placeholder="ID ou Nome do Produto"
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

                        />
                    </Stack>
                </Stack>
                <Divider />
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
                    <Heading size={'md'}>Nome produto</Heading>
                    <List spacing={3} textAlign="start">

                        <ListItem >

                            <Input
                                placeholder="Quant"
                                value={1}
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
                    <Heading size={'xl'}>R$ 1.00</Heading>
                    <Stack>
                        <Button
                            size="md">
                            Add
                        </Button>
                    </Stack>
                </Stack>
                <Divider />
                <Heading size={'xl'}>Total:</Heading>
                <Heading size={'xl'}>R$ 1.00</Heading>
                <Button
                    size="md">
                    Finalizar
                </Button>
            </Stack>
        </Box>
    );
};

export default ThreeTierPricingHorizontal;