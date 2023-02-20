import {
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Center
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


export default function NavLink(props: any) {

    const navigate = useNavigate();
    function handleLogout(props: any) {
        props.setAuth(false)
        navigate('/')

    }
    const isLoggedIn = props.auth
    console.log(`logado? ${isLoggedIn}`)
    return (

        <div>
            {isLoggedIn ?
                <Menu>
                    <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                        <Avatar
                            size={'sm'}
                            src={'https://bit.ly/broken-link'}
                        />
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                        <br />
                        <Center>
                            <Avatar
                                size={'2xl'}
                                src={'https://bit.ly/broken-link'}
                            />
                        </Center>
                        <br />
                        <Center>
                            <p>Username</p>
                        </Center>
                        <br />
                        <MenuDivider />
                        <MenuItem>Configurações</MenuItem>
                        <MenuItem onClick={() => { handleLogout(props) }}>Logout</MenuItem>
                    </MenuList>
                </Menu>
                :
                <></>
            }

        </div>

    )


}
