import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,

    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    HStack,
} from '@chakra-ui/react';

import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
} from '@chakra-ui/icons'

import Menu from './Menu'
import Logo from '../assets/img/Logo.png'

import { useNavigate } from 'react-router-dom';

export default function WithSubnavigation(props: any) {
    const navigate = useNavigate();
    const { isOpen, onToggle } = useDisclosure();
    const isLogged = props.auth

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
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
                                bg: useColorModeValue('gray.200', 'gray.700'),
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
                                bg: useColorModeValue('gray.200', 'gray.700'),
                            }} >Formulário</Link>
                    </HStack>
                </Flex>

                {isLogged ? <Stack
                    mr={2}
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
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
                </Stack> : <> </> }


                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <Button
                        onClick={() => props.auth ? navigate('/login/table') : navigate('login')}
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
                        Admin
                    </Button>
                    <Menu auth={props.auth} setAuth={props.setAuth} />
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const MobileNav = (props:any) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem } />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem, props:any) => {
    const { isOpen, onToggle } = useDisclosure();
    console.log(`propriedade link ${ props.auth }`)
    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Admin',
        href: '/login',
    },
    {
        label: 'Formulario',
        href: '/form',
    },
    {
        label: 'Status',
        href: '/status',
    },
    {
        label: 'Agendamento',
        href: 'login/calendar',
    },
];