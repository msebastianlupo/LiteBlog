import { useState } from 'react'
import { useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../../public/quill-fix.css'


function LiteEditor({styles = 'mar-t-1 pad-0 mar-t-1 rad-0-5 ove-h', name = "LiteEditor", max="", required=false, value = ""}){
    const [text, setText] = useState(value)
    useEffect(() => {
        setText(value)
    }, [value])

    const modules = {
        toolbar: [
            [
                {
                    header: [2, 3, 4 ,5, 6, false]
                }
            ],
            [
                { 
                    'color': [] 
                },
                { 
                    'background': [] 
                }
            ],
            [
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote"
            ],
            [
                { 
                    'size': [] 
                }
            ],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            [
                {
                    list: "ordered"
                },
                {
                    list: "bullet"
                }
            ],
            [
                "link",
                "image",
                "video"
            ]
        ]
    }

    return(
        <div>
            <p className="wei-400">{name}</p>
            <ReactQuill theme="snow" className={styles} modules={modules} value={text} onChange={setText} />
            <input type="hidden" name="text" value={text} required={required} />
        </div>
    )
}

export default LiteEditor