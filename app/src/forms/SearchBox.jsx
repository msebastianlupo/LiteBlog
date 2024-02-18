import { useState } from "react"

function SearchBox(min=2, max=100, required=true){
    const [query, setQuery] = useState("")
    const [type, setType] = useState("title")
    const queryChanger = (e) => {
        setQuery(e.target.value)
    }
    const typeChanger = (e) => {
        setType(e.target.value)
    }

    const searchPosts = (e) => {
        e.preventDefault()
        location.href=`/posts?${type}=${query}`
    }

    return (
        <>
            <form className="pos-f lef-0 perwid-100 mar-t-1 pad-1 bac-q" action="/posts" onSubmit={searchPosts}>
                <div className="dis-f mar-t-1">
                    <label className="dis-n wei-500" htmlFor="title">Buscar posts</label>
                    <div className="gro-1 dis-f dir-c">
                        <input className="pad-1 rad-0-5 tex-1-5 sha-i-4" type="text" id="title" name="title" minLength={min} maxLength={max} placeholder="Buscá publicaciones" required={required} value={query} onChange={queryChanger} />
                        <div className="dis-f jus-e mar-t-1 chicol-t">
                            <label className="wei-500 mar-r-1" htmlFor="title2">Título:</label>
                            <input className="acc-t" type="radio" id="title2" name="filters" value="title" defaultChecked onChange={typeChanger} />
                            <label className="wei-500 mar-l-2 mar-r-1" htmlFor="category">Categoría:</label>
                            <input className="acc-t" type="radio" id="category" name="filters" value="category" onChange={typeChanger} />
                        </div>
                    </div>
                    <input className="pad-1 mar-l-1 bac-s hovbac-t rad-0-5 col-q cur-p" value="Buscar" type="submit" />
                </div>
            </form>
        </>
    )
}

export default SearchBox