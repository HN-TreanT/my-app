import { useState } from "react"

const App = () => {
    const [count, setCount] = useState(0)
    return <div>
        <h2>{count}</h2>
        <button onClick={() => setCount(count + 1)}>click</button>
    </div>
}

export default App