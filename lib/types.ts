export interface Item {
    name: string;
    description: string;
    quantity: number;
    potentialQuantity: number;
    targetQuantity: number;
    arrival: Date;
    imageURL: string;
}

export enum Trend {
    DECREASE,
    INCREASE,
    CONSTANT
}
