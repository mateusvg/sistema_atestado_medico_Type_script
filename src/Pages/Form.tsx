import { FormEvent, ChangeEvent, useState } from 'react';
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
import { postFormUser } from '../services/User/postFormUser'

export default function Simple() {
    const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure()
    const navigate = useNavigate();
    const [nomePaciente, setNomePaciente] = useState('');
    const [cpf, setCPF] = useState('');
    const [nomeMedico, setNomeMedico] = useState('');
    const [data, setData] = useState('');
    const [state, setState] = useState<'initial' | 'submitting' | 'success'>(
        'initial'
    );
    const [aptidao, setAptidao] = useState<String>();

    const [postImage, setPostImage] = useState({
        myFile: '',
    });

    const [error, setError] = useState(false);

    // Post form
    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {

        const postForm = async () => {
            try {
                await postFormUser({ nomePaciente: nomePaciente, cpf: cpf, nomeMedico: nomeMedico, data: data, aptidao: aptidao, postImage: postImage })

            } catch (err) {
                console.log(err);
            }
        }
        postForm()
        setNomeMedico('')
        setNomePaciente('')
        setCPF('')
        setData('')
        setAptidao('')
        setPostImage({ myFile: '' })
    };


    //CPF mask
    function handleChangeMask(event: any) {
        const { value } = event.target
        setCPF(mask(value))
    }

    // Convert to base64
    const convertToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, myFile: `${base64}` });
    };

    // This function will be triggered when a radio button is selected
    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAptidao(event.target.value);
    };

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
                            onOpenModal()
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
                            name={nomePaciente}
                            required
                            placeholder={'Nome Paciente'}
                            aria-label={'Seu nome'}
                            value={nomePaciente}
                            disabled={state !== 'initial'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNomePaciente(e.target.value)
                            }
                        />
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
                            required
                            disabled={state !== 'initial'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setData(e.target.value)
                            }
                            size="md"
                            type="date"
                        />
                        <RadioGroup defaultValue='1' mb={2}>
                            <Stack spacing={5} direction='row'>
                                <Radio colorScheme='green' value='Apto' onChange={radioHandler} >
                                    Apto
                                </Radio>
                                <Radio colorScheme='red' value='Inapto' onChange={radioHandler}>
                                    Inapto
                                </Radio>
                            </Stack>
                        </RadioGroup>
                        <Input
                            borderWidth={0}
                            mb={2}
                            size="md"
                            name='myFile'
                            type="file"
                            required
                            id=''
                            accept="image/png, image/jpeg"
                            onChange={(e) => handleFileUpload(e)}
                        />
                    </FormControl>
                    <FormControl w={{ base: '100%', md: '40%' }}>
                        <Button
                            colorScheme={state === 'success' ? 'green' : 'blue'}
                            isLoading={state === 'submitting'}
                            w="100%"
                            type={state === 'success' ? 'button' : 'submit'}>
                            {state === 'success' ? <CheckIcon /> : 'Enviar'}
                        </Button>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Sucesso!</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text>Você pode acompanhar o status do pedido no link abaixo:</Text>
                                </ModalBody>

                                <ModalFooter>

                                    <Button colorScheme='blue' mr={'25%'} w={'50%'} onClick={() => navigate('status')}>
                                        Acompanhar Status
                                    </Button>

                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                    </FormControl>
                </Stack>

            </Container>
        </Flex>
    );
}