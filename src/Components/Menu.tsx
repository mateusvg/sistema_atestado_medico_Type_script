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

import { useContext } from "react";
import { Context } from "../contexts/Context";

export default function NavLink() {
    const { context, setContext } = useContext(Context);
    const navigate = useNavigate();
    function handleLogout() {
        setContext(false)
        console.log(`menu context ${context}`)
        navigate('/')
    }

    return (

        <div>
            {context ?
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
                        <MenuItem onClick={() => { navigate('/login/settings') }}>Configurações</MenuItem>
                        <MenuItem onClick={() => { handleLogout() }}>Logout</MenuItem>
                    </MenuList>
                </Menu>
                :
                <></>
            }

        </div>

    )


}
