import { useNavigate } from "react-router-dom"

function ErrorSite(){
	const navigate = useNavigate();
	const back = () => {
        navigate(-1)
    }

    return(
        <div className="dis-f dir-c jus-c ali-c vie-h-100">
            <div className="wid-30 hei-30" style={{background: `url('/public/404.png') center no-repeat`}}></div>
            <button className="dis-i-b hei-5 adj-c wid-20 tex-1-8 perwid-100 rad-0-5 neu-1 trasha-0-3 hovneu-1-r bac-p" onClick={back}>Volver</button>
        </div>
    )
}

export default ErrorSite