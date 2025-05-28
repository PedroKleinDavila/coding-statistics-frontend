import {
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";

interface CustomDateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (value: { start: string; end: string }) => void;
}

export function DatePickerModal({ isOpen, onClose, onApply }: CustomDateModalProps) {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const toast = useToast();

    const handleApply = () => {
        if (!start && !end) {
            toast({
                title: "Erro",
                description: "Por favor, selecione um intervalo válido.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        const thisYear = new Date().getFullYear();
        const startDate = start ? new Date(start).toISOString().split("T")[0] : new Date(thisYear, 0, 1).toISOString().split("T")[0];
        const endDate = end ? new Date(end).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
        if (!startDate || !endDate || new Date(startDate).getFullYear() !== thisYear || new Date(endDate).getFullYear() !== thisYear) {
            toast({
                title: "Erro",
                description: "Por favor, selecione um intervalo válido dentro deste ano.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        onApply({ start: startDate, end: endDate });
        clearStates();
        toast({
            title: "Intervalo aplicado",
            description: `Intervalo de ${startDate} a ${endDate} aplicado com sucesso.`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        onClose();
    };

    const clearStates = () => {
        setStart("");
        setEnd("");
    }

    return (
        <Modal isOpen={isOpen} onClose={() => { clearStates(); onClose(); }} isCentered>
            <ModalOverlay />
            <ModalContent bg="#1D1D20" color="white">
                <ModalHeader>Escolher intervalo personalizado</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction="column" gap={2}>
                        <Input
                            type="date"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            bg="transparent"
                        />
                        <Input
                            type="date"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            bg="transparent"
                        />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" color="white" _hover={{ bg: "black" }} mr={3} onClick={() => { clearStates(); onClose(); }}>
                        Cancelar
                    </Button>
                    <Button bg="purple.900" color="white" _hover={{ bg: "purple.600" }} onClick={handleApply}>
                        Aplicar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
