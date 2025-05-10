import { useState } from 'react'
import Done from './components/done'
import SendEmail from './components/sendEmail'
import VerifyCode from './components/verifyCode'
import { Container, Box } from '@chakra-ui/react'
import { useParams } from 'react-router'

function App() {
  const { email, machineId } = useParams()
  const [verifyCode, setVerifyCode] = useState(false)
  const [done, setDone] = useState(false)

  return (
    <>
      <Container centerContent mt={10}>
        <Box p={8} borderWidth="1px" borderRadius="lg" boxShadow="lg" w="100%" h="100%" maxW="md">
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
    </>
  )
}

export default App