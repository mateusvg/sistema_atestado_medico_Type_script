import { ReactNode, useContext } from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
} from '@chakra-ui/react';
import {
    FiHome,
    FiMenu,
    FiBell,
    FiChevronDown,
    FiShoppingCart,
    FiBookOpen,
    FiBarChart,
    FiBox,
    FiUsers
} from 'react-icons/fi';
import { Context } from "../contexts/Context";
import Logo from '../assets/img/Logo.png'
import { useNavigate } from 'react-router-dom';
import MenuSideBar from './MenuSidebar'


export default function SidebarWithHeader({
    children,
}: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('white.100', 'white.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>

            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}



const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const navigate = useNavigate();
    const { context, setContext } = useContext(Context);
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    <img src={Logo} alt="Logo" onClick={() => navigate('/')} />
                </Text>

                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
{/* <MenuSideBar/> */}

                <NavItem onClick={() => navigate('/')}>
                    <Stack mr={2}>
                        <FiHome />
                    </Stack>
                    Home
                </NavItem>

                <NavItem onClick={() => context ? navigate('/login/table') : navigate('login')}>
                    <Stack mr={2}>
                        <FiUsers />

                    </Stack>
                    {context ? <Text>Funcionários</Text> : <Text>Admin</Text>}
                </NavItem>

                <NavItem onClick={() => navigate('/login/calendar')}>
                    <Stack mr={2}>
                        <FiBookOpen />
                    </Stack>
                    Agenda
                </NavItem>

                <NavItem onClick={() => navigate('/login/vendas')}>
                    <Stack mr={2}>
                        <FiShoppingCart />
                    </Stack>
                    Vendas
                </NavItem>

                <NavItem onClick={() => navigate('/login/stock')}>
                    <Stack mr={2}>
                        <FiBox />
                    </Stack>
                    Estoque
                </NavItem>

                <NavItem onClick={() => navigate('/login/reports')}>
                    <Stack mr={2}>
                        <FiBarChart />
                    </Stack>
                    Relatórios
                </NavItem>

        </Box>
    );
};

interface NavItemProps extends FlexProps {

}
const NavItem = ({ ...rest }: NavItemProps) => {
    return (
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const navigate = useNavigate();
    const { context, setContext } = useContext(Context);
    function handleLogout() {
        setContext(false)
        console.log(`menu context ${context}`)
        navigate('/')
    }
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                <img src={Logo} alt="Logo" onClick={() => navigate('/')} />
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={'https://bit.ly/broken-link'}
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">Admin</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem onClick={() => { navigate('/login/settings') }}>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={() => { handleLogout() }}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};