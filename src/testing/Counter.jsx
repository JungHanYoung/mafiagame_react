import React, { useState } from 'react'
import Sub from './Sub'

export default function Counter() {
    const [count, setCount] = useState(0)

    const increase = () => setCount(count + 1)

    return (
        <div>
            <span data-testid="count">{count}</span>
            <button onClick={increase}>Up</button>
            <Sub />
        </div>
    )
}