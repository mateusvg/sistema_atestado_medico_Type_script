import {
    Center,
    Stack,
    InputGroup,
    InputLeftAddon,
    Input,
    Button
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons';
import { ChangeEvent, useState } from 'react';

export default function SettingsPage() {
    const [state, setState] = useState<'initial' | 'submitting' | 'success'>(
        'initial'
    );
    const [senha, setSenha] = useState('')
    return (
        <Stack mt={10}>
            <Center mb={5}>Configurações</Center>
            <Center>
                <Stack spacing={4} mr={10}>
                    <InputGroup>
                        <InputLeftAddon children='Usuário:' />
                        <Input type='tel' placeholder='Usuário' required />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftAddon children='Senha:' />
                        <Input
                            type='password'
                            placeholder='Senha'
                            required
                            disabled={state !== 'initial'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setSenha(e.target.value)
                            } />
                    </InputGroup>

                    <Stack mt={4}>
                        <InputGroup mt={4}>
                            <InputLeftAddon children='Nova Senha:' />
                            <Input
                                type='password'
                                placeholder='Senha'
                                required
                                disabled={state !== 'initial'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setSenha(e.target.value)
                                } />
                        </InputGroup>
                        <Button
                            colorScheme={state === 'success' ? 'green' : 'blue'}
                            isLoading={state === 'submitting'}
                            w="100%"
                            type={state === 'success' ? 'button' : 'submit'}>
                            {state === 'success' ? <CheckIcon /> : 'Alterar'}
                        </Button>
                    </Stack>
                </Stack>
            </Center>
        </Stack>
    )
}