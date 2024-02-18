import { useState } from "react"
import { useEffect } from "react"

function ImageExtractor({string, alt="", title="", number=0, styles=""}){
const [src, setSrc] = useState("")

useEffect(() => {
    const html = new DOMParser().parseFromString(string, "text/html")
    if(html.images.length){
        setSrc(html.images[number].src)
    }
}, [])

    return (
       <img src={src} alt={alt} title={title} className={styles} />
    )

}

export default ImageExtractor