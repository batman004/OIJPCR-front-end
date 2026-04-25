import box from '../../assets/submitArticleBtn.svg'
import {Link} from "react-router-dom";

function SubmitArticleFormFullWidth() {
    return (
        <div className="p-6 pb-8 mx-1 mt-6 mb-6 card-surface md:mt-10 noprint">
            <div className="flex flex-col justify-center md:ml-2">
                <p
                    className="px-2 my-3 text-3xl md:text-4xl font-bold text-left font-serif leading-tight"
                    style={{ color: 'var(--color-primary)' }}
                >
                    Interested in seeing your article in this space?
                </p>
                <p
                    className="px-2 leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    Submit a draft of your article and we'll get back to you.
                </p>
                <Link to="/submitArticle" className="btn-academic mt-8 ml-2 max-w-max">
                    <img src={box} alt="" className="inline w-4 h-4 mb-1 mr-2" style={{ filter: 'brightness(0) invert(1)' }}/>
                    Submit Article
                </Link>
            </div>
        </div>
    )
}

export default SubmitArticleFormFullWidth