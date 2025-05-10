import {
    Button,
    Heading,
    VStack,
    Text,
    Box,
    Icon,
    useToast,
    Input,
    FormControl,
    FormLabel,
    Tooltip,
} from '@chakra-ui/react'
import { EmailIcon, InfoIcon } from '@chakra-ui/icons'
import { sendEmail } from '../service/sendEmail'
import { useState } from 'react'
import { z } from 'zod'

type SendEmailProps = {
    setVerifyCode: (value: boolean) => void
    email: string
}

const emailZodSchema = z.string().email()

export default function SendEmail({ setVerifyCode, email }: SendEmailProps) {
    const [sendToEmail, setSendToEmail] = useState('')
    const toast = useToast()

    const handleSend = async () => {
        const targetEmail = sendToEmail.trim() || email

        if (!emailZodSchema.safeParse(targetEmail).success) {
            toast({
                title: 'Invalid email address.',
                description: 'Please enter a valid email address.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }

        const response = await sendEmail(email, targetEmail)

        if (!response.ok) {
            toast({
                title: 'Error sending email.',
                description: response.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        localStorage.setItem('sendToEmail', targetEmail)
        toast({
            title: 'Email sent.',
            description: `An email was sent to ${targetEmail}.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })

        setVerifyCode(true)
    }

    return (
        <VStack spacing={6} align="stretch">
            <Box textAlign="center">
                <Icon as={EmailIcon} w={10} h={10} color="blue.500" />
                <Heading as="h2" size="lg" mt={2}>Send Email</Heading>
                <Text color="gray.600">We’ll send a code to: <strong>{email}</strong></Text>
            </Box>

            <FormControl>
                <FormLabel>
                    Enter another email (optional)
                    <Tooltip label="Academic emails may not receive the code. Prefer a Gmail address.">
                        <InfoIcon ml={2} color="gray.500" />
                    </Tooltip>
                </FormLabel>
                <Input
                    placeholder="Enter an alternative email"
                    value={sendToEmail}
                    onChange={(e) => setSendToEmail(e.target.value)}
                    type="email"
                />
            </FormControl>

            <Button colorScheme="blue" size="lg" onClick={handleSend}>
                Send Code
            </Button>

            <Button variant="link" colorScheme="blue" onClick={() => setVerifyCode(true)}>
                Have a code? Verify it
            </Button>
        </VStack>
    )
}
