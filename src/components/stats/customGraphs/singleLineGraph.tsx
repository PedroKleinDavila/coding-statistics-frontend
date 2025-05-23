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
} from "recharts";
import type { ComponentDailyData } from "../../../types";

interface SingleLineCustomGraphProps {
  data: ComponentDailyData[];
}

export const SingleLineCustomGraph: React.FC<SingleLineCustomGraphProps> = ({ data }) => {
  if (data.length === 0) return null;

  const firstDate = data[0].date;
  const lastDate = data[data.length - 1].date;

  return (
    <Box width="100%" height="300px">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data} // usa os dados originais, sem modificar displayDate
          margin={{ top: 20, right: 20, left: 40, bottom: 30 }}
        >
          <CartesianGrid stroke="#444" strokeDasharray="none" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#fff", dy: 20 }}
            ticks={[firstDate, lastDate]} // só primeiro e último tick aparecem
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#fff", dx: -30 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#222", borderColor: "#555" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ stroke: "#8884d8", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
