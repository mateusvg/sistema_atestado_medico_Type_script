import { Button, useToast, Wrap, WrapItem } from "@chakra-ui/react"

export default function ToastStatusExample() {
    const toast = useToast()
    return (
      <Wrap>

          <WrapItem >
            <Button colorScheme='blue'
              onClick={() =>
                toast({
                  title: `Compra finalizada`,
                  status: 'success',
                  isClosable: true,
                })
              }
              
            >
                Finalizar compra
            </Button>
          </WrapItem>

      </Wrap>
    )
  }