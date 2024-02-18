import { useState } from "react"
import { useEffect } from "react"

function TextInput({label, name, min, max, required, value = ""}){
    const [text, setText] = useState("")

    useEffect(() => {
        setText(value)
    }, [value])

    const textChanger = (e) => {
        setText(e.target.value)
    }

    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <input className="pad-1 mar-t-1 bor-0-3 rad-0-5 col-s" id={name} type="text" name={name} minLength={min} maxLength={max} required={required} value={text} onChange={textChanger} />
        </div>
    )
}

export default TextInput