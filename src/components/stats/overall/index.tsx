import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import type { ComponentDailyData, DailyStat } from "../../../types";
import { useEffect, useState } from "react";
import { SingleLineCustomGraph } from "../customGraphs/singleLineGraph";
import { MultiLineStatsGraph } from "../customGraphs/multiLineGraph";

interface OverralProps {
  dailyData: DailyStat[];
}

const items = [
  { key: "timeSpent", label: "minutes spent" },
  { key: "linesWritten", label: "lines written" },
  { key: "lettersWritten", label: "characters written" },
  { key: "filesCreated", label: "files created" },
] as const;

export default function Overall({ dailyData }: OverralProps) {
  const [averages, setAverages] = useState<Record<keyof DailyStat, number>>({
    timeSpent: 0,
    linesWritten: 0,
    lettersWritten: 0,
    filesCreated: 0,
    date: 0,
  });
  const [timeData, setTimeData] = useState<ComponentDailyData[]>([]);
  const [linesData, setLinesData] = useState<ComponentDailyData[]>([]);

  useEffect(() => {
    const total: Record<keyof DailyStat, number> = {
      timeSpent: 0,
      linesWritten: 0,
      lettersWritten: 0,
      filesCreated: 0,
      date: 0,
    };

    dailyData.forEach((entry) => {
      total.timeSpent += entry.timeSpent;
      total.linesWritten += entry.linesWritten;
      total.lettersWritten += entry.lettersWritten;
      total.filesCreated += entry.filesCreated;
    });

    const length = dailyData.length || 1;

    setAverages({
      timeSpent: total.timeSpent / length,
      linesWritten: total.linesWritten / length,
      lettersWritten: total.lettersWritten / length,
      filesCreated: total.filesCreated / length,
      date: 0,
    });
    const timeData = dailyData.map((entry) => ({
      date: entry.date,
      value: entry.timeSpent,
    }));
    setTimeData(timeData);
    const linesData = dailyData.map((entry) => ({
      date: entry.date,
      value: entry.linesWritten,
    }));
    setLinesData(linesData);
  }, [dailyData]);

  const today = dailyData[dailyData.length - 1];

  return (
    <Flex h="100%" w="100%" alignItems="center" justifyContent="center" bg="#0D0D0D" py={8}>
      <Flex w="25%" h="100%" flexDir="column" justifyContent="center" alignItems="center">
        <Text h="40%" textAlign="left" fontSize="26px" fontWeight="600" w="85%">
          Overall ({dailyData[dailyData.length - 1].date})
        </Text>
        {items.map((item) => {
          const todayValue = today[item.key];
          const avgValue = averages[item.key];
          const isAboveAverage = todayValue > avgValue;
          const percentage = Math.round(
            Math.abs((todayValue - avgValue) / avgValue) * 100
          );

          return (
            <Flex
              key={item.key}
              bg="#1D1D20"
              w="85%"
              h="100%"
              m={2}
              borderRadius="8px"
              alignItems="center"
              justifyContent="center"
              fontWeight="400"
            >
              <Flex flexDir="column" alignItems="center" justifyContent="center" gap={4}>
                <Flex alignItems="baseline">
                  <Text fontSize="38px">{todayValue}&nbsp;</Text>
                  <Text fontSize="15px">{item.label}</Text>
                </Flex>
                <Flex alignSelf="flex-start" alignItems="center" gap={2}>
                  {isAboveAverage ? (
                    <>
                      <Icon as={FiArrowUpRight} boxSize={8} color="#90E595" />
                      <Text fontSize="12px">{percentage}% more than average</Text>
                    </>
                  ) : (
                    <>
                      <Icon as={FiArrowDownLeft} boxSize={8} color="#D02020" />
                      <Text fontSize="12px">{percentage}% less than average</Text>
                    </>
                  )}
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Flex>

      <Flex w="75%" h="100%" justifyContent="center" flexDir="column" alignItems="center">
        <Flex h="100%" w="100%" justifyContent="center" pb={4}>
          <Flex w="100%" flexDir="column" justifyContent="center" alignItems="center">
            <Text h="25%" textAlign="left" w="85%" fontSize="26px" fontWeight="600">
              Time (min)
            </Text>
            <Flex w="85%" bg="#1D1D20" h="100%" justifyContent="center" alignItems="center" pr={2} borderRadius={8}>
              <SingleLineCustomGraph data={timeData} />
            </Flex>
          </Flex>
          <Flex w="100%" flexDir="column" justifyContent="center" alignItems="center">
            <Text h="25%" textAlign="left" w="85%" fontSize="26px" fontWeight="600">
              Lines
            </Text>
            <Flex w="85%" bg="#1D1D20" h="100%" justifyContent="center" alignItems="center" pr={2} borderRadius={8}>
              <SingleLineCustomGraph data={linesData} />
            </Flex>
          </Flex>
        </Flex>
        <Flex h="100%" w="100%" justifyContent="center" alignItems="center" flexDir="column">
          <Text h="25%" textAlign="left" w="92%" fontSize="26px" fontWeight="600">
            All Stats
          </Text>
          <Flex h="100%" w="92%" bg="#1D1D20" borderRadius="md" pr={2}>
            <MultiLineStatsGraph data={dailyData} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
