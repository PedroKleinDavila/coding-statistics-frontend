export type APIError = {
    response: {
        data: {
            message: string;
        };
    };
}

export type APIResponse = {
    message: string;
    ok: boolean;
}

export type DailyStat = {
    lettersWritten: number;
    linesWritten: number;
    timeSpent: number;
    filesCreated: number;
    date: string;
};

export type YearlyStat = {
    lettersWritten: number;
    linesWritten: number;
    timeSpent: number;
    filesCreated: number;
    year: number;
};

export type UserInfo = {
    email: string;
    dailyStats: DailyStat[];
    yearlyStats: YearlyStat[];
};

export type ComponentDailyData = {
    date: string;
    value: number
};

export type ComponentYearlyData = {
    year: number;
    value: number
};