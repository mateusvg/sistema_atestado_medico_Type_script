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
import Logo from '../assets/img/Logo.png'
import { useState, FormEvent, ChangeEvent } from 'react'
import { CheckIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { getLoginUserAdmin } from '../services/Login/getLoginAdmin'
import React, { useContext } from "react";
import { Context } from "../contexts/Context";

export default function Login() {

    const [state, setState] = useState<'initial' | 'submitting' | 'success'>(
        'initial'
    );

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [wrong, setWrongText] = useState('')

    const navigate = useNavigate();

    const { context, setContext } = useContext(Context);
    console.log(`login context ${context}`)
    // Post form
    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const authUser = async () => {
            try {
                console.log(`context table${context}`)
                const parsedValue = await getLoginUserAdmin({ user: user, password: password })
                console.log(`valor parsed ${JSON.stringify(parsedValue[0])}`)
                const response = await parsedValue[0]?.AdminUserEmail
                const senha = await parsedValue[0]?.AdminUserPassword
                console.log(`responsta e :${response}`)
                if (response === user && senha === password) {
                    setContext(true)
                    navigate('table')
                } else {
                    console.log('não autenticado')
                    setWrongText('Usuario ou senha não cadastrados')
                }

            } catch (err) {
                console.log(err);
            }
        }
        authUser()

    };

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
                                Sistema Gerenciamento estoque e RH
                            </Text>
                        </Stack>
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    onSubmit={handleSubmit}
                >
                    <form>
                        <Stack spacing={4} onSubmit={(e: FormEvent) => { e.preventDefault() }}>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    value={user}
                                    type="user"
                                    id="user"
                                    disabled={state !== 'initial'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setUser(e.target.value)
                                    } />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Senha</FormLabel>
                                <Input
                                    value={password}
                                    id="password"
                                    disabled={state !== 'initial'}
                                    type="password"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setPassword(e.target.value)
                                    } />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Lembrar-me</Checkbox>
                                    <Link color={'blue.400'}>Esqueceu sua senha?</Link>
                                </Stack>
                                <FormControl >
                                    <Button
                                        colorScheme={state === 'success' ? 'green' : 'blue'}
                                        isLoading={state === 'submitting'}
                                        w="100%"
                                        type={state === 'success' ? 'button' : 'submit'}>
                                        {state === 'success' ? <CheckIcon /> : 'Enviar'}
                                    </Button>
                                    <Text>{wrong}</Text>
                                </FormControl>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}