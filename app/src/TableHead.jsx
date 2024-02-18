function TableHead({ths}){
    return(
        <thead>
        <tr>
            {
                ths.map((th, index) => <th key={index} className="pad-y-2 pad-x-1 bac-s">{th}</th>)
            }
        </tr>
        </thead>
    )
}

export default TableHead