import { Flex } from "@chakra-ui/react";

interface OtherStatsProps {
    page: string;
}

export default function OtherStats({page}: OtherStatsProps) {
    return (
        <Flex h="100%" w="100%" alignItems="center" justifyContent="center" bg="#0D0D0D">
            <Flex>{page}</Flex>
        </Flex>
    )
}