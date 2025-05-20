import { useState } from 'react'
import { Container, Box, Flex } from '@chakra-ui/react'
import { useParams } from 'react-router'
import Done from '../components/createAccount/done'
import SendEmail from '../components/createAccount/sendEmail'
import VerifyCode from '../components/createAccount/verifyCode'

function CreateAccount() {
    const { email, machineId } = useParams()
    const [verifyCode, setVerifyCode] = useState(false)
    const [done, setDone] = useState(false)

    return (
        <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center" bg="gray.800">
            <Container centerContent mt={10}>
                <Box p={8} bg="gray.200" borderWidth="1px" borderRadius="lg" boxShadow="lg" w="100%" h="100%" maxW="md">
                    {
                        done ? (
                            <Done />
                        ) : verifyCode ? (
                            <VerifyCode email={email!} machineId={machineId!} setDone={setDone} setSendEmail={() => setVerifyCode(false)} />
                        ) : (
                            <SendEmail email={email!} setVerifyCode={setVerifyCode} />
                        )
                    }
                </Box>
            </Container>
        </Flex>
    )
}

export default CreateAccount