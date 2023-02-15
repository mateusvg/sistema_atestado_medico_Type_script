import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { CircleIcon } from '../Components/CircleIconStatus'
import { SettingsIcon, DownloadIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function Simple() {
  const aptidao = 'apto'

  type resultProps = {
    idForm: string
    nomePaciente: string
    cpf: string
    anexo: string
    nomeMedico: string
    data: string
    aptidao: string
    Status:string
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


  return (
    <>
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
          {result?.map((row) => (
          <Tbody >
            <Tr>
              <Td>{row.nomePaciente}</Td>
              <Td>{row.cpf}</Td>
              <Td><Button><DownloadIcon /></Button></Td>
              <Td>{row.nomeMedico}</Td>
              <Td>{row.aptidao}</Td>
              <Td>{row.Status}</Td>
              <Td><CircleIcon color={`${setStatusColorIcon(row.Status)}`} /></Td>
              <Td><Button><SettingsIcon /></Button></Td>
            </Tr>
          </Tbody>
            ))}
        </Table>
      </TableContainer>
    </>
  )
}