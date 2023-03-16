import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Link,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    HStack,
    Center,
    Divider,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
} from '@chakra-ui/icons'
import Menu from './Menu'
import Logo from '../assets/img/Logo.png'
import { useNavigate } from 'react-router-dom';

import { useContext } from "react";
import { Context } from "../contexts/Context";

export default function WithSubnavigation(props:any) {
    const navigate = useNavigate();
    const { isOpen, onToggle } = useDisclosure();
    const { context, setContext } = useContext(Context);
    const color = useColorModeValue('gray.200', 'gray.700')

    return (
        <Box > 
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                position="fixed" w="100%"
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>

                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}>
                        <img src={Logo} alt="Logo" onClick={() => navigate('/')} />
                    </Text>
                    {
                        context ?
                            <></> : <Flex>
                                <HStack
                                    ml={7}
                                    as={'nav'}
                                    spacing={4}
                                    display={{ base: 'none', md: 'flex' }}>
                                    <Link px={2}
                                        onClick={() => navigate('status')}
                                        py={1}
                                        rounded={'md'}
                                        _hover={{
                                            textDecoration: 'none',
                                            bg: color,
                                        }} >Status</Link>
                                </HStack>

                                <HStack
                                    ml={4}
                                    as={'nav'}
                                    spacing={4}
                                    display={{ base: 'none', md: 'flex' }}>
                                    <Link px={2}
                                        onClick={() => navigate('/form')}
                                        py={1}
                                        rounded={'md'}
                                        _hover={{
                                            textDecoration: 'none',
                                            bg: color,
                                        }} >Formulário</Link>
                                    <Center height='90%'>
                                        <Divider orientation='vertical' />
                                    </Center>
                                </HStack> </Flex>}
                </Flex>

                {
                    context ?
                        <Stack
                            mr={5}
                            flex={{ base: 1, md: 0 }}
                            justify={'flex-end'}
                            direction={'row'}
                            spacing={6}>
                            
                            <Button
                                onClick={() => navigate('/login/reports')}
                                as={'a'}
                                display={{ base: 'none', md: 'inline-flex' }}
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                bg={'blue.400'}
                                href={'#'}
                                _hover={{
                                    bg: 'blue.300',
                                }}>
                                Relatórios
                            </Button>
                            <Button
                                onClick={() => navigate('/login/vendas')}
                                as={'a'}
                                display={{ base: 'none', md: 'inline-flex' }}
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                bg={'blue.400'}
                                href={'#'}
                                _hover={{
                                    bg: 'blue.300',
                                }}>
                                Vendas
                            </Button>
                            <Button
                                onClick={() => navigate('/login/stock')}
                                as={'a'}
                                display={{ base: 'none', md: 'inline-flex' }}
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                bg={'blue.400'}
                                href={'#'}
                                _hover={{
                                    bg: 'blue.300',
                                }}>
                                Estoque
                            </Button>
                            <Button
                                onClick={() => navigate('/login/calendar')}
                                as={'a'}
                                display={{ base: 'none', md: 'inline-flex' }}
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                bg={'blue.400'}
                                href={'#'}
                                _hover={{
                                    bg: 'blue.300',
                                }}>
                                Agendamento
                            </Button>
                            
                        </Stack>
                        
                        :
                        <> </>
                }

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <Button
                        onClick={() => context ? navigate('/login/table') : navigate('login')}
                        as={'a'}
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'blue.400'}
                        href={'#'}
                        _hover={{
                            bg: 'blue.300',
                        }}>
                        {context ? <Text>Funcionários</Text> : <Text>Admin</Text>}
                    </Button>
                    <Menu />
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>

            <MobileNavItem />

        </Stack>
    );
};

const MobileNavItem = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    const navigate = useNavigate();
    const { context, setContext } = useContext(Context);
    const color = useColorModeValue('gray.600', 'gray.200')

    return (
        <Stack spacing={4} onClick={onToggle}>
            <Flex
                py={2}
                as={Link}
                flexDirection={"column"}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    m={2}
                    fontWeight={600}
                    color={color}
                    onClick={() => context ? navigate('/login/table') : navigate('login')}
                >
                    Admin
                </Text>
                {context ?
                    <>
                        <Text
                            m={2}
                            fontWeight={600}
                            color={color}
                            onClick={() => navigate('/login/calendar')}>
                            Agendamento
                        </Text>
                        <Text
                            m={2}
                            fontWeight={600}
                            color={color}
                            onClick={() => navigate('/login/stock')}
                        >
                            Estoque
                        </Text>

                        <Text
                            m={2}
                            fontWeight={600}
                            color={color}
                            onClick={() => navigate('/login/vendas')}
                        >
                            Vendas
                        </Text>

                        <Text
                            m={2}
                            fontWeight={600}
                            color={color}
                            onClick={() => navigate('/login/reports')}
                        >
                            Relatórios
                        </Text>
                    </>
                    : <></>}
                <Text
                    m={2}
                    fontWeight={600}
                    color={color}
                    onClick={() => navigate('/form')}
                >
                    Formulário
                </Text>
                <Text
                    m={2}
                    fontWeight={600}
                    color={color}
                    onClick={() => navigate('/status')}
                >
                    Status
                </Text>
                <Text
                    m={2}
                    fontWeight={600}
                    color={color}
                    onClick={() => navigate('login')}
                >
                    Login
                </Text>
            </Flex>
        </Stack>
    );
};
