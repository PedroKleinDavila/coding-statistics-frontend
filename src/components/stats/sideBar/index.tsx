import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface SideBarProps {
    email: string;
    pageFunction: (page: string) => void;
}
export default function SideBar({email, pageFunction}: SideBarProps) {
    const [selected, setSelected] = useState("Overral");

    useEffect(() => {
        pageFunction(selected);
    }
    , [pageFunction, selected]);
    const menuItems = ["Overral", "Time", "Lines", "Characters", "Files"];
    const itemHeight = 48;
    const itemGap = 30;
    return (
        <Flex h="100vh" w="15vw" bg="#1A1A1A" color="white" justifyContent={"space-between"} flexDirection="column">
            <Flex fontSize="30px" pt={4} p={4} fontWeight="700">Menu</Flex>
            <Box position="relative">
                <Box
                    position="absolute"
                    left="0"
                    width="4px"
                    height={`${itemHeight}px`}
                    bg="white"
                    transition="top 0.3s ease"
                    top={`${menuItems.indexOf(selected) * (itemHeight + itemGap)}px`}
                />

                <Flex flexDirection="column" gap={`${itemGap}px`} fontWeight="400" fontSize="24px">
                    {menuItems.map((item) => (
                        <Flex
                            key={item}
                            cursor="pointer"
                            onClick={() => setSelected(item)}
                            bg="transparent"
                            px={3}
                            py={2}
                            pl={4}
                            transition={"all 0.3s ease"}
                            alignItems="center"
                            height={`${itemHeight}px`}
                            fontWeight={selected === item ? "600" : "400"}
                        >
                            {item}
                        </Flex>
                    ))}
                </Flex>
            </Box>
            <Flex p={4} fontSize="14px" fontWeight="400">{email}</Flex>
        </Flex>
    )
}