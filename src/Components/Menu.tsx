import { ReactNode } from 'react';
import {
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Center,
    Text
} from '@chakra-ui/react';


export default function NavLink(props:any) {

    const isLoggedIn = props.auth
    console.log(`logado? ${isLoggedIn}`)
    return (
    
    <div>
        { isLoggedIn ?
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
            <MenuItem>Logout</MenuItem>
        </MenuList>
    </Menu>
        :
        <></>
        }

    </div>
        
    )

    
}
