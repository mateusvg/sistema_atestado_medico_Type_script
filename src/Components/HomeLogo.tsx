import { Center, Text, Stack } from '@chakra-ui/react'
import LogoX from '../assets/img/LogoX.png'
export default function () {
    return (
        <Center >
            <Stack spacing={5} direction='column' justify='center' mt={7}>
                <Center>
                    <Text color='black' >Sistema de gerenciamento de loja e RH</Text>
                </Center>
                <Center>
                    <img src={LogoX} alt="Logo" width={"40%"} />
                </Center>
            </Stack>
        </Center>
    )
}