
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button, 
    Center
} from '@chakra-ui/react'

export default function Reports() {
    return (

        <Box ml ={"25%"}w={"45%"}>
   
            <Accordion>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Estoque
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        <Button >
                            Total em estoque
                        </Button>
                    </AccordionPanel>
                    <AccordionPanel>
                        <Button >
                            Estoque detalhado
                        </Button>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Vendas
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Button >
                            Total em vendas
                        </Button>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Funcionarios
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        <Button >
                            Relação Status/Funcionários
                        </Button>
                    </AccordionPanel>
                </AccordionItem>

            </Accordion>

        </Box>
    )
}