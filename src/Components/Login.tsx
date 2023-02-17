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
import { useState, FormEvent, ChangeEvent } from 'react'
import { CheckIcon } from '@chakra-ui/icons';

import { useNavigate } from 'react-router-dom';


export default function Login() {

    const [state, setState] = useState<'initial' | 'submitting' | 'success'>(
        'initial'
    );

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [wrong, setWrongText]= useState('')

    const navigate = useNavigate();

    // Post form
    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const payload = await { user: user, password: password }
        console.log(payload)
        const uri2 = 'http://localhost:8080/admin';
        const postRafle = async () => {
            try {
                console.log(payload)
                const req = await fetch(uri2, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({ user: user }),

                }).then(res => res.json())
                    .then(json => {
                        console.log("First status in the array:");
                        console.log(json[0]);
                        if (json[0].AdminUserEmail === `${user}`) {
                            navigate('table')
                        } 

                    })

            } catch (err) {
                console.log(err);
            }
        }
        postRafle()
        setPassword('')
        setUser('')
        setWrongText('Usuario ou senha não cadastrados')
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
                                Sistema Atestado Médico
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
                        <Stack spacing={4} onSubmit={(e: FormEvent) => {e.preventDefault()}}>
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