import { Box } from "@chakra-ui/react";
import type { ComponentDailyData } from "../../../types";

interface CustomSingleTooltipProps {
    active?: boolean;
    label?: string;
    originalData: ComponentDailyData[];
    type: string;
}

export const CustomSingleTooltip: React.FC<CustomSingleTooltipProps> = ({ active, label, originalData, type }) => {
    if (!active) return null;

    const realData = originalData.find(d => d.date === label);
    if (!realData) return null;

    const types = [
        {
            type: "Time",
            content: "minutes"
        },
        {
            type: "Lines",
            content: "lines"
        },
        {
            type: "Characters",
            content: "characters"
        },
        {
            type: "Files",
            content: "files"
        }
    ]

    return (
        <Box bg="#222" border="1px solid #555" p={3} borderRadius="md" color="#fff">
            <strong>{label}</strong>
            <br />
            <div>
                {realData.value} {types.find(t => t.type === type)?.content}
            </div>
        </Box>
    );
};
