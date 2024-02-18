import { useState } from "react"
import { useEffect } from "react"

function PasswordInput({label, name, min, max, value = ""}){
    const [password, setPassword] = useState('')

    useEffect(() => {
        setPassword(value)
    }, [value])

    const passwordChanger = (e) => {
        setPassword(e.target.value)
    }

    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <input className="pad-1 mar-t-1 bor-0-3 rad-0-5 col-s" id={name} type="password" name={name} minLength={min} maxLength={max} required value={password} onChange={passwordChanger} />
        </div>
    )
}

export default PasswordInput