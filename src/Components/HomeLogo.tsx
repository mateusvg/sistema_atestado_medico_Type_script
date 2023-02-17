import { Center, Text, Stack } from '@chakra-ui/react'
import LogoX from '../img/LogoX.png'
export default function () {
    return (
        <Center h='100px' color='white' mt={270}>
            <Stack spacing={5} direction='column' justify='center' mt={4}>
                <Center>

                <Text  color='tomato' >Sistema de agendamento e atestado médico</Text>
                </Center>
                <img src={LogoX} alt="Logo" />
            </Stack>
        </Center>
    )
}