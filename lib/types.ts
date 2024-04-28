export interface Item {
    name: string;
    target: number;
    quantity: number;
    unverifiedQuantity: number;
    description: string;
    trend: Trend;
}

export enum Trend {
    DECREASE,
    INCREASE,
    CONSTANT
}
