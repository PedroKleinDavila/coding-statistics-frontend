import { Box, Heading, Text, Icon } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

export default function Done() {
    return (
        <Box textAlign="center" py={10} px={6}>
            <Icon as={CheckCircleIcon} w={16} h={16} color="green.500" />
            <Heading as="h2" size="xl" mt={6} mb={2}>
                Success!
            </Heading>
            <Text color="gray.600">
                Your email has been sent and verified successfully.
            </Text>
        </Box>
    )
}
