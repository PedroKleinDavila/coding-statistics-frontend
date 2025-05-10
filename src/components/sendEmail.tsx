import { Button, Heading, VStack, Text, Box, Icon, useToast } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { sendEmail } from '../service/sendEmail'

type SendEmailProps = {
    setVerifyCode: (value: boolean) => void
    email: string
}

export default function SendEmail({ setVerifyCode, email }: SendEmailProps) {
    const toast = useToast()

    const handleSend = async () => {
        const response = await sendEmail(email)
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
        toast({
            title: 'Email sent.',
            description: `An email was sent to ${email}.`,
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
            <Button colorScheme="blue" size="lg" onClick={handleSend}>
                Send Code
            </Button>
            <Button variant="link" colorScheme="blue" onClick={() => setVerifyCode(true)}>
                Have a code? Verify it
            </Button>
        </VStack>
    )
}
