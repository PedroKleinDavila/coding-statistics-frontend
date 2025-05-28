import { Box } from "@chakra-ui/react";
import type { DailyStat } from "../../../types";

interface CustomMultiTooltipProps {
    active?: boolean;
    label?: string;
    originalData: DailyStat[];
}

export const CustomMultiTooltip: React.FC<CustomMultiTooltipProps> = ({ active, label, originalData }) => {
    if (!active) return null;

    const realData = originalData.find(d => d.date === label);
    if (!realData) return null;

    return (
        <Box bg="#222" border="1px solid #555" p={3} borderRadius="md" color="#fff">
            <strong>{label}</strong>
            <br />
            <div>{realData.timeSpent} minutes</div>
            <div>{realData.lettersWritten} characters</div>
            <div>{realData.linesWritten} lines</div>
            <div>{realData.filesCreated} files</div>
        </Box>
    );
};
