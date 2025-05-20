import { Flex } from "@chakra-ui/react";
import OtherStats from "./otherStats";
import Overral from "./overral";
import type { UserInfo } from "../../types";
import { useEffect, useState } from "react";

interface StatsContentProps {
    page: string;
    userInfo: UserInfo;
}

export default function StatsContent({ page, userInfo }: StatsContentProps) {
    const [fixedData, setFixedData] = useState<UserInfo | null>(null);
    useEffect(() => {
        const fixedUserInfo = {
            ...userInfo,
            dailyStats: userInfo.dailyStats.map((entry) => ({
                ...entry,
                timeSpent: Math.round(entry.timeSpent / 60),
            })),
            yearlyStats: userInfo.yearlyStats.map((entry) => ({
                ...entry,
                timeSpent: Math.round(entry.timeSpent / 60),
            })),
        };
        setFixedData(fixedUserInfo);
    }, [userInfo]);
    return (
        <Flex h="100vh" w="100vw" alignItems="center" justifyContent="center" bg="#0D0D0D">
            {fixedData && (
                <>
                    {page === "Overral" && <Overral dailyData={fixedData.dailyStats} yearlyData={fixedData.yearlyStats} />}
                    {(page === "Time" || page === "Lines" || page === "Characters" || page === "Files") && (
                        <OtherStats page={page} />
                    )}
                </>
            )}
        </Flex>
    )
}
