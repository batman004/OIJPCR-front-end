import box from '../../../assets/submitArticleBtn.svg'
import {Link} from "react-router-dom";

export default function SubmitArticleForm() {
    return (
        <div className="p-5 pb-6 mx-1 mb-6 mt-6 md:mt-10 card-surface">
            <div className="flex flex-col justify-center">
                <p
                    className="text-2xl md:text-2xl text-left font-bold my-3 font-serif leading-snug"
                    style={{ color: 'var(--color-primary)' }}
                >
                    Interested in seeing your article in this space?
                </p>
                <p
                    className="mt-2 leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    Submit a draft of your article and we'll get back to you.
                </p>
                <Link to="/submitArticle" className="btn-academic mt-6 self-center max-w-max">
                    <img src={box} alt="" className="mr-2 inline h-4 w-4 mb-1" style={{ filter: 'brightness(0) invert(1)' }}/>
                    Submit Article
                </Link>
            </div>
        </div>
    )
}