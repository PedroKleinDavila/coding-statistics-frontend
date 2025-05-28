import { Box } from "@chakra-ui/react";
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";
import { CustomTooltip } from "../customComponents/customTooltip";

export type DailyStat = {
    lettersWritten: number;
    linesWritten: number;
    timeSpent: number;
    filesCreated: number;
    date: string;
};

interface MultiLineStatsGraphProps {
    data: DailyStat[];
}

export const MultiLineStatsGraph: React.FC<MultiLineStatsGraphProps> = ({ data }) => {
    if (data.length === 0) return null;

    const firstDate = data[0].date;
    const lastDate = data[data.length - 1].date;

    const metrics = ["lettersWritten", "linesWritten", "timeSpent", "filesCreated"] as const;
    const minMax = metrics.reduce((acc, key) => {
        const values = data.map(d => d[key]);
        acc[key] = {
            min: Math.min(...values),
            max: Math.max(...values),
        };
        return acc;
    }, {} as Record<typeof metrics[number], { min: number; max: number }>);

    const normalizedData = data.map(d => {
        const normalizedEntry: Record<string, number | string> = { date: d.date };
        metrics.forEach(key => {
            const { min, max } = minMax[key];
            normalizedEntry[key] =
                max === min ? 1 : (d[key] - min) / (max - min);
        });
        return normalizedEntry;
    });

    return (
        <Box width="100%" height="100%">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={normalizedData}
                    margin={{ top: 20, right: 20, left: 40, bottom: 30 }}
                >
                    <CartesianGrid stroke="#444" strokeDasharray="none" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#fff", dy: 20 }}
                        ticks={[firstDate, lastDate]}
                    />
                    <YAxis
                        domain={[0, 1]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#fff", dx: -30 }}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#222", borderColor: "#555" }}
                        labelStyle={{ color: "#fff" }}
                        itemStyle={{ color: "#fff" }}
                        content={<CustomTooltip originalData={data} />}
                    />
                    <Legend
                        wrapperStyle={{ color: "#fff", fontSize: 12, bottom: 0 }}
                    />
                    <Line type="monotone" dataKey="timeSpent" stroke="#ffc658" strokeWidth={2} dot={{ stroke: "#ffc658", strokeWidth: 2, r: 2 }} activeDot={{ r: 3 }} name="Time Spent" />
                    <Line type="monotone" dataKey="lettersWritten" stroke="#8884d8" strokeWidth={2} dot={{ stroke: "#8884d8", strokeWidth: 2, r: 2 }} activeDot={{ r: 3 }} name="Characters Written" />
                    <Line type="monotone" dataKey="linesWritten" stroke="#82ca9d" strokeWidth={2} dot={{ stroke: "#82ca9d", strokeWidth: 2, r: 2 }} activeDot={{ r: 3 }} name="Lines Written" />
                    <Line type="monotone" dataKey="filesCreated" stroke="#ff7300" strokeWidth={2} dot={{ stroke: "#ff7300", strokeWidth: 2, r: 2 }} activeDot={{ r: 3 }} name="Files Created" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};