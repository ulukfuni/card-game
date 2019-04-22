import React, { useState, FunctionComponent } from 'react'
import Button from './Button'

interface CounterProps {
    initial?: number
}

export const Counter:FunctionComponent<CounterProps> = ({ initial = 0 }) => {
    const [ count, setCount ] = useState(initial)
    const increment = () => setCount(count + 1)
    const decrement = () => setCount(count - 1)
    return (
        <>
            <p>{count}</p>
            <Button onClick={() => increment()}>+</Button>
            <Button onClick={() => decrement()}>-</Button>
        </>
    )
}