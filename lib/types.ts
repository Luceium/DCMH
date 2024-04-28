export interface Item {
    name: string;
    target: number;
    quantity: number;
    unverifiedQuantity: number;
    description: string;
    trend: Trend;
    imageURL: string;
}

export enum Trend {
    DECREASE,
    INCREASE,
    CONSTANT
}
