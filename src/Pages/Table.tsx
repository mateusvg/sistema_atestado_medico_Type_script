import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'


  
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
        <Th>Ação</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Tobias Silva</Td>
        <Td>242.417.550-03</Td>
        <Td>inches</Td>
        <Td>Jose Maria</Td>
        <Td>Apto</Td>
        <Td>Em análise</Td>
        <Td>25.4</Td>
      </Tr>
      <Tr>
        <Td>Mateus Manfredo</Td>
        <Td>485.815.450-50</Td>
        <Td>inches</Td>
        <Td>Jose Maria</Td>
        <Td>Inapto</Td>
        <Td>Reprovado</Td>
        <Td >30.48</Td>
      </Tr>
      <Tr>
        <Td>Natalia Amorin</Td>
        <Td>464.802.400-14</Td>
        <Td>inches</Td>
        <Td>Jose Maria</Td>
        <Td>Apto</Td>
        <Td>Aprovado</Td>
        <Td >0.91444</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
        </>
    )
}