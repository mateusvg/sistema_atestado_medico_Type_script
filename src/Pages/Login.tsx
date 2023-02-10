import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import Logo from '../img/Logo.png'

import { useNavigate } from 'react-router-dom';



export default function SimpleCard() {
    const navigate = useNavigate();
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'} >
                    <Heading fontSize={'4xl'}>Painel Administrativo</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}  >
                        <Stack spacing={5} direction='row'>
                            <img src={Logo} alt="Logo" />
                            <Text>
                                Sistema Atestado Médico
                            </Text>
                        </Stack>
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Senha</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Lembrar-me</Checkbox>
                                <Link color={'blue.400'}>Esqueceu sua senha?</Link>
                            </Stack>
                            <Button
                                onClick={() => navigate('table')}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Entrar
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}