function Submit({text, styles = "mar-t-4 rad-0-5 pad-2 tex-1-8 cur-p hovbac-t"}){
    
    return (
        <div className="dis-f">
            <button className={styles} type="submit">{text}</button>
        </div>
    )
}

export default Submit