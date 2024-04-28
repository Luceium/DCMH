import React from 'react'

enum Trend {
    DECREASE,
    INCREASE,
    CONSTANT
}

interface CardProps {
    name: string;
    target: number;
    quantity: number;
    unverifiedQuantity: number;
    description: string;
    trend: Trend;
}

const Card = ({name, target, quantity, unverifiedQuantity, description, trend} : CardProps) => {
  return (
    <div>
        
    </div>
  )
}

export default Card