import { Flex, Text } from "@chakra-ui/react";
import type { ComponentDailyData } from "../../../types";
import { SingleLineCustomGraph } from "../customGraphs/singleLineGraph";
import { StatBox } from "./statBox";

interface OtherStatsProps {
    page: string;
    dailyData: ComponentDailyData[];
}

export default function OtherStats({ page, dailyData }: OtherStatsProps) {
    const today = dailyData[dailyData.length - 1];
    const yesterday = dailyData[dailyData.length - 2];
    const average = dailyData.reduce((sum, curr) => sum + curr.value, 0) / dailyData.length;

    const calcDiff = (val: number, base: number) => {
        const diff = val - base;
        const percentage = base === 0 ? 0 : Math.round((Math.abs(diff) / base) * 100);
        const isUp = diff >= 0;
        return { isUp, percentage };
    };

    const todayAvg = calcDiff(today.value, average);
    const todayYest = yesterday ? calcDiff(today.value, yesterday.value) : null;

    const formatValue = (val: number) => {
        return page === "Time" ? `${val} min` : val;
    };

    return (
        <Flex
            h="100%"
            w="100%"
            alignItems="center"
            flexDir="column"
            justifyContent="space-evenly"
            bg="#0D0D0D"
            py={6}
        >
            <Text fontSize="26px" h="5%" fontWeight="600" w="90%" textAlign="left">
                {page} ({today.date})
            </Text>

            <Flex h="30%" w="95%" justifyContent="space-between">
                <StatBox label={`${page} Today`} value={formatValue(today.value)} />

                <StatBox
                    label={`${page} Today/Average`}
                    value={`${formatValue(today.value)} vs ${formatValue(Number(average.toFixed(1)))}`}
                    percentage={todayAvg.percentage}
                    isUp={todayAvg.isUp}
                />

                <StatBox
                    label={`${page} Today/Yesterday`}
                    value={
                        yesterday
                            ? `${formatValue(today.value)} vs ${formatValue(yesterday.value)}`
                            : "N/A"
                    }
                    percentage={todayYest?.percentage}
                    isUp={todayYest?.isUp}
                />
            </Flex>

            <Flex h="50%" w="95%" justifyContent="space-between" gap={4}>
                <Flex
                    flex={1}
                    bg="#1D1D20"
                    borderRadius="lg"
                    alignItems="center"
                    justifyContent="center"
                    flexDir="column"
                    p={4}
                >
                    <Text fontSize="20px" fontWeight="500" mb={2} w="100%" textAlign="left">
                        Daily
                    </Text>
                    <SingleLineCustomGraph data={dailyData} />
                </Flex>

                <Flex
                    flex={1}
                    bg="#1D1D20"
                    borderRadius="lg"
                    alignItems="center"
                    justifyContent="center"
                    p={4}
                >
                    <Text fontSize="18px" color="gray.400">
                        Yearly Graph (coming soon)
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}