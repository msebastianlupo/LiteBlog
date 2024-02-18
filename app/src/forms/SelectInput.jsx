import { useState } from "react"
import { useEffect } from "react"

function SelectInput({label, name, options, required, value = ""}){
    const [opt, setOpt] = useState("")

    useEffect(() => {
        setOpt(value)
    }, [value])

    const optionChanger = (e) => {
        setOpt(e.target.value)
    }

    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <select className="pad-1 mar-t-1 bor-0-3 rad-0-5 chitex-2 bac-p col-s" id={name} name={name} required={required} onChange={optionChanger} value={opt}>
                {options.map((option, index) =>
                    <option key={option} value={option}>{option}</option>
                )}
            </select>
        </div>
    )
}

export default SelectInput