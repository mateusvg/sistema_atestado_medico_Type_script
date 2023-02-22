import { FormEvent, useState } from 'react';
import { mask } from "../utils/MaskFormaterCPF"
import {
    Stack,
    FormControl,
    Input,
    Button,
    useColorModeValue,
    Heading,
    Text,
    Container,
    Flex,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import React from 'react';
import { getStatusUser } from '../services/User/getStatusUser'

export default function Simple() {

    const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure()
    const [cpf, setCPF] = useState('');
    const [state, setState] = useState<'initial' | 'submitting' | 'success'>(
        'initial'
    );
    const [error, setError] = useState(false);
    const [status, setStatus] = useState('')


    // Post form
    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const postUserForm = async () => {
            try {
                await getStatusUser({ cpf: cpf })
                    .then(json => {
                        console.log("First status in the array:");
                        console.log(json[0]);
                        setStatus(json[0])
                    })

            } catch (err) {
                console.log(err);
            }
        }
        postUserForm()
        setCPF('')
        setTimeout(() => {
            setState('initial')
        }, 2000);
    };

    function teste() {
        setTimeout(() => {
            if (cpf === 'fail@example.com') {
                setError(true);
                setState('initial');
                return;
            }

            setState('success');
            onOpenModal()
        }, 1000);
    }

    //CPF mask
    function handleChangeMask(event: any) {
        const { value } = event.target
        setCPF(mask(value))
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
            onSubmit={handleSubmit}>
            <Container
                maxW={'lg'}
                bg={useColorModeValue('white', 'whiteAlpha.100')}
                boxShadow={'xl'}
                rounded={'lg'}
                p={6}
            >
                <Heading
                    as={'h2'}
                    fontSize={{ base: 'xl', sm: '2xl' }}
                    textAlign={'center'}
                    mb={5}>
                    Status do envio
                </Heading>
                <Stack
                    direction={{ base: 'column' }}
                    as={'form'}

                    spacing={'12px'}
                    onSubmit={(e: FormEvent) => {
                        e.preventDefault();
                        setError(false);
                        setState('submitting');
                        teste()
                        // remove this code and implement your submit logic right here

                    }}>
                    <FormControl>
                        <Input mb={2}
                            variant={'solid'}
                            borderWidth={1}
                            color={'gray.800'}
                            _placeholder={{
                                color: 'gray.400',
                            }}
                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                            placeholder={'CPF'}
                            aria-label={'Seu CPF'}
                            disabled={state !== 'initial'}
                            required
                            onChange={handleChangeMask}
                            value={cpf}
                            maxLength={14} />
                    </FormControl>
                    <FormControl w={{ base: '100%', md: '40%' }}>
                        <Button
                            colorScheme={state === 'success' ? 'green' : 'blue'}
                            isLoading={state === 'submitting'}
                            w="100%"
                            type={state === 'success' ? 'button' : 'submit'}>
                            {state === 'success' ? <CheckIcon /> : 'Enviar'}
                        </Button>
                    </FormControl>
                </Stack>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Status</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>O status do pedido é: {status === null ? 'CPF não encontrado' : `${status}`}</Text>

                        </ModalBody>

                        <ModalFooter>

                            <Button colorScheme='red' mr={'25%'} w={'50%'} onClick={onClose}>
                                Fechar
                            </Button>

                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Container>
        </Flex>
    );
}