import { Button, FormControl, FormLabel, Input, Heading, VStack, Box, Icon, Text, useToast } from '@chakra-ui/react'
import { LockIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { verifyCode } from '../service/verifyCode'
import { resendEmail } from '../service/resendEmail'

type VerifyCodeProps = {
    setDone: (value: boolean) => void
    email: string
    machineId: string
    setSendEmail: (value: boolean) => void
}

export default function VerifyCode({ setDone, email, machineId, setSendEmail }: VerifyCodeProps) {
    const [code, setCode] = useState('')
    const toast = useToast()

    const handleVerify = async () => {
        if (!code) {
            toast({
                title: 'Code required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        const response = await verifyCode(email, machineId, code)
        if (!response.ok) {
            toast({
                title: 'Error verifying code.',
                description: response.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        toast({
            title: 'Code verified',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        setDone(true)
    }

    const handleResend = async () => {
        console.log(import.meta.env.VITE_URL)
        const response = await resendEmail(email)
        if (!response.ok) {
            toast({
                title: 'Error resending email.',
                description: response.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        toast({
            title: 'Email resent',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <VStack spacing={6} align="stretch">
            <Box textAlign="center">
                <Icon as={LockIcon} w={10} h={10} color="green.500" />
                <Heading as="h2" size="lg" mt={2}>Verify Code</Heading>
                <Text color="gray.600">Enter the code sent to: <strong>{email}</strong></Text>
            </Box>
            <FormControl isRequired>
                <FormLabel htmlFor="code">Code</FormLabel>
                <Input
                    id="code"
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </FormControl>
            <Button colorScheme="green" size="lg" onClick={handleVerify}>
                Verify
            </Button>
            <Button variant="link" colorScheme="blue" onClick={() => {
                handleResend()
            }}>
                Resend code
            </Button>
            <Button variant="link" colorScheme="blue" onClick={() => setSendEmail(false)}>
                Back to send email
            </Button>
        </VStack>
    )
}
