import { useState } from "react"
import { useEffect } from "react"

function EmailInput({label, name, min = "6", required=false, value = ""}){
    const [email, setEmail] = useState("")

    useEffect(() => {
        setEmail(value)
    }, [value])

    const emailChanger = (e) => {
        setEmail(e.target.value)
    }

    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <input className="pad-1 mar-t-1 bor-0-3 rad-0-5 col-s" id={name} type="email" name={name} minLength={min} maxLength="255" required={required} value={email} onChange={emailChanger} />
        </div>
    )
}

export default EmailInput