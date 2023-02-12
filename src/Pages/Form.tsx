import { FormEvent, ChangeEvent, useState } from 'react';
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
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
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

export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();
    const [nomePaciente, setNomePaciente] = useState('');
    const [cpf, setCPF] = useState('');
    const [nomeMedico, setNomeMedico] = useState('');
    const [data, setData] = useState('');
    const [aptidao, setAptidao] = useState('');
    const [anexo, setAnexo] = useState('');
    const [state, setState] = useState<'initial' | 'submitting' | 'success'>(
        'initial'
    );
    const [error, setError] = useState(false);


    return (

        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>

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
                    Formulário Paciente
                </Heading>
                <Stack
                    direction={{ base: 'column' }}
                    as={'form'}

                    spacing={'12px'}
                    onSubmit={(e: FormEvent) => {
                        e.preventDefault();
                        setError(false);
                        setState('submitting');

                        // remove this code and implement your submit logic right here
                        setTimeout(() => {
                            if (nomePaciente === 'teste') {
                                setError(true);
                                setState('initial');
                                return;
                            }

                            setState('success');

                        }, 1000);

                    }}>
                    <FormControl>
                        <Input
                            mb={2}
                            variant={'solid'}
                            borderWidth={1}
                            color={'gray.800'}
                            _placeholder={{
                                color: 'gray.400',
                            }}
                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                            id={'nomePaciente'}
                            type={'nomePaciente'}
                            required
                            placeholder={'Nome Paciente'}
                            aria-label={'Seu nome'}
                            value={nomePaciente}
                            disabled={state !== 'initial'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNomePaciente(e.target.value)
                            }
                        />
                        <Input
                            mb={2}
                            variant={'solid'}
                            borderWidth={1}
                            color={'gray.800'}
                            _placeholder={{
                                color: 'gray.400',
                            }}
                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                            id={'cpf'}
                            type={'cpf'}
                            required
                            placeholder={'CPF'}
                            aria-label={'Seu CPF'}
                            value={cpf}
                            disabled={state !== 'initial'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCPF(e.target.value)
                            }
                        />
                        <Input
                            mb={2}
                            variant={'solid'}
                            borderWidth={1}
                            color={'gray.800'}
                            _placeholder={{
                                color: 'gray.400',
                            }}
                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                            id={'nomeMedico'}
                            type={'nomeMedico'}
                            required
                            placeholder={'Nome Médico'}
                            aria-label={'Seu CPF'}
                            value={nomeMedico}
                            disabled={state !== 'initial'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNomeMedico(e.target.value)
                            }
                        />
                        <Input
                            mb={2}
                            variant={'solid'}
                            borderWidth={1}
                            color={'gray.800'}
                            _placeholder={{
                                color: 'gray.400',
                            }}
                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                            id={data}
                            value={data}
                            size="md"
                            type="date"
                        />
                        <RadioGroup defaultValue='1' mb={2}>
                            <Stack spacing={5} direction='row'>
                                <Radio colorScheme='green' value='1' id={aptidao}>
                                    Apto
                                </Radio>
                                <Radio colorScheme='red' value='2' id={aptidao}>
                                    Inapto
                                </Radio>
                            </Stack>
                        </RadioGroup>
                        <Input
                            borderWidth={0}
                            mb={2}
                            size="md"
                            type="file"
                            accept="image/png, image/jpeg"
                        />
                    </FormControl>
                    <FormControl w={{ base: '100%', md: '40%' }}>
                        <Button
                            colorScheme={state === 'success' ? 'green' : 'blue'}
                            isLoading={state === 'submitting'}
                            w="100%"
                            onClick={onOpen}
                            type={state === 'success' ? 'button' : 'submit'}>
                            {state === 'success' ? <CheckIcon /> : 'Enviar'}
                        </Button>


                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Modal Title</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text></Text>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button variant='ghost'>Secondary Action</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                    </FormControl>
                </Stack>

            </Container>
        </Flex>
    );
}