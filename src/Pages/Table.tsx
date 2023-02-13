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
import {CircleIcon} from '../Components/CircleIconStatus'
import { SettingsIcon, DownloadIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react';

export default function Simple() {


  return (
    <>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
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
          <Tbody>
            <Tr>
              <Td>Tobias Silva</Td>
              <Td>242.417.550-03</Td>
              <Td><Button><DownloadIcon /></Button></Td>
              <Td>Jose Maria</Td>
              <Td>Apto</Td>
              <Td>Em análise </Td>
              <Td><CircleIcon color='blue.500' /></Td>
              <Td><Button><SettingsIcon /></Button></Td>
            </Tr>
            <Tr>
              <Td>Mateus Manfredo</Td>
              <Td>485.815.450-50</Td>
              <Td><Button><DownloadIcon /></Button></Td>
              <Td>Jose Maria</Td>
              <Td>Inapto</Td>
              <Td>Reprovado</Td>
              <Td><CircleIcon color='red.500' /></Td>
              <Td><Button><SettingsIcon /></Button></Td>
            </Tr>
            <Tr>
              <Td>Natalia Amorin</Td>
              <Td>464.802.400-14</Td>
              <Td><Button><DownloadIcon /></Button></Td>
              <Td>Jose Maria</Td>
              <Td>Apto</Td>
              <Td>Aprovado</Td>
              <Td><CircleIcon color='green.500' /></Td>
              <Td><Button><SettingsIcon /></Button></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}