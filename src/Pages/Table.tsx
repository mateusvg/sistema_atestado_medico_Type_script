import { Input, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { CircleIcon } from '../Components/CircleIconStatus'
import { EditIcon, DownloadIcon, Search2Icon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  InputGroup,
} from '@chakra-ui/react'


import { useDisclosure } from '@chakra-ui/react'
export default function Simple() {

  const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure()

  const aptidao = 'apto'

  type resultProps = {
    idForm: string
    nomePaciente: string
    cpf: string
    anexo: string
    nomeMedico: string
    data: string
    aptidao: string
    Status: string
  };

  const [result, setResult] = useState<resultProps[]>([]);
  useEffect(() => {
    getAllRegisters()
  }, [])

  const getAllRegisters = async () => {
    const data = await fetch("http://localhost:8080/admin/table", {
      method: "GET"
    });
    const jsonData = await data.json();
    setResult(jsonData);
  };


  const setStatusColorIcon = (Status: string) => {
    if (Status == 'Reprovado') {
      return 'red.500'
    } else if (Status == 'Aprovado') {
      return 'green.500'
    } else {
      return 'blue.500'
    }
  }

  const [searchInput, setSearchInput] = useState("")

  const handleChange = (e: any) => {
    e.preventDefault()
    console.log(searchInput)
    setSearchInput(e.target.value)
  }

  if (searchInput.length > 0) {
    result.filter((data) => {
      console.log(`dados: ${data.cpf}`)
      return data.cpf.includes(searchInput)
    })
  }


  return (
    <>
      <InputGroup>
      <InputLeftElement>
          <Search2Icon mt={6} />
        </InputLeftElement>
        <Input
          placeholder="Procurar CPF"
          mb={3}
          mt={3}
          variant={'solid'}
          borderWidth={1}
          color={'gray.800'}
          _placeholder={{
            color: 'gray.400',
          }}
          type="search"
          id="outlined-basic"
          onChange={handleChange}
          value={searchInput}
        />
      </InputGroup>
      <TableContainer>
        <Table variant='simple' colorScheme='#E6FFFA' size='sm'>
          <TableCaption>Pacientes</TableCaption>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>CPF</Th>
              <Th>Anexo</Th>
              <Th>Médico</Th>
              <Th>Aptidão</Th>
              <Th>Status</Th>
              <Th></Th>
              <Th>Ação</Th>
            </Tr>
          </Thead>
          {
            result.filter(post => {
              if (searchInput === '') {
                return post;
              } else if (post.cpf.toLowerCase().includes(searchInput.toLowerCase())) {
                return post;
              }
            }).map((post, index) => (
              <Tbody >
                <Tr >
                  <Td>{post.nomePaciente}</Td>
                  <Td>{post.cpf}</Td>
                  <Td><Button><DownloadIcon /></Button></Td>
                  <Td>{post.nomeMedico}</Td>
                  <Td>{post.aptidao}</Td>
                  <Td>{post.Status}</Td>
                  <Td><CircleIcon color={`${setStatusColorIcon(post.Status)}`} /></Td>
                  <Td><Button><EditIcon onClick={onOpenModal} /></Button></Td>
                </Tr>
              </Tbody>
            ))
          }
        </Table>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Alterar configurações de status</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Select placeholder='Selecione o status'>
                <option value='option1'>Em processamento</option>
                <option value='option2'>Aprovado</option>
                <option value='option3'>Reprovado</option>
              </Select>
            </ModalBody>

            <ModalFooter>

              <Button colorScheme='blue' mr={'25%'} w={'50%'} onClick={onClose}>
                Atualizar
              </Button>

            </ModalFooter>
          </ModalContent>
        </Modal>
      </TableContainer>
    </>
  )
}