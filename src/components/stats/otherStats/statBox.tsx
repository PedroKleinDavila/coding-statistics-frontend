import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";

interface StatBoxProps {
    label: string;
    value: string | number;
    percentage?: number;
    isUp?: boolean;
}

export function StatBox({ label, value, percentage, isUp }: StatBoxProps) {
    return (
        <Flex
            flexDir="column"
            bg="#1D1D20"
            h="100%"
            w="32%"
            borderRadius="lg"
            px={4}
            py={2}
            justifyContent="center"
        >
            <Text textAlign="left" fontSize="20px" fontWeight="600">
                {label}
            </Text>
            <Text fontSize="28px" fontWeight="700">
                {value}
            </Text>
            {percentage !== undefined && (
                <Flex alignItems="center" mt={1} gap={1}>
                    <Icon
                        as={isUp ? FiArrowUpRight : FiArrowDownLeft}
                        color={isUp ? "#90E595" : "#D02020"}
                        boxSize={5}
                    />
                    <Text fontSize="14px">
                        {percentage}% {isUp ? "more" : "less"}
                    </Text>
                </Flex>
            )}
        </Flex>
    );
}