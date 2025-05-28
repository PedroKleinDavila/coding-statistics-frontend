import { Box } from "@chakra-ui/react";
import type { DailyStat } from "../../../types";

interface CustomTooltipProps {
    active?: boolean;
    label?: string;
    originalData: DailyStat[];
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, label, originalData }) => {
    if (!active) return null;

    const realData = originalData.find(d => d.date === label);
    if (!realData) return null;

    return (
        <Box bg="#222" border="1px solid #555" p={3} borderRadius="md" color="#fff">
            <strong>{label}</strong>
            <br />
            <div>Time Spent: {realData.timeSpent}</div>
            <div>Characters Written: {realData.lettersWritten}</div>
            <div>Lines Written: {realData.linesWritten}</div>
            <div>Files Created: {realData.filesCreated}</div>
        </Box>
    );
};
