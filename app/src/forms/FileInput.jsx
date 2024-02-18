import { useState } from "react"
import { useEffect } from "react"

function FileInput({label, name, required=false, accept="", multiple=false}){
    const [file, setFile] = useState("")

    useEffect(() => {
        setFile(file)
    }, [])

    const fileChanger = (e) => {
        setFile(e.target.value)
    }

    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <input className="pad-1 mar-t-1 bor-0-3 rad-0-5 col-s" id={name} type="file" name={name} required={required} onChange={fileChanger} accept={accept} multiple={multiple} value={file} />
        </div>
    )
}

export default FileInput