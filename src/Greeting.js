import React from "react"
import { ThemeContext } from "./App"
import { useContext } from "react"
function Content ({handleClick}) {
    const theme = useContext(ThemeContext)
    console.log(theme)
    // return <h1>Hello, {props.name}</h1>
    console.log("click")
    return <button onClick={handleClick}>Click</button>
}

export default React.memo(Content)