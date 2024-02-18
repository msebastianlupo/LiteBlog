import { Link } from 'react-router-dom'
import ImageExtractor from './ImageExtractor.jsx'

function PostCard({title, category, created, text, link}){

    return(
        <div className="mar-t-4">
            <div className="dis-f dir-c ali-c swi1024dir-r mar-t-4 ove-h">
                <ImageExtractor string={text} title={title} styles="perwid-100 swi768perwid-75 swi1024perwid-30 rad-1" />
                <div className="mar-t-2 swi1024mar-t-0 swi1024mar-l-4 dis-f dir-c ali-c swi1024ali-s">
                    <p className="tex-1-2">{created} | <a href={`/posts?category=${category}`} className="col-t">{category}</a></p>
                    <h2 className="tex-2-5">{title}</h2>
                    <Link to={link} className="dis-i-b mar-t-2 swi1024mar-t-3 pad-1 tex-1-6 bac-s col-p hovbac-t rad-0-5">Leer entrada</Link>
                </div>
            </div>
        </div>
    )
}

export default PostCard