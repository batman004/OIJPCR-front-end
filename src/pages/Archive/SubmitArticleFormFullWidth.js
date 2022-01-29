import box from '../../assets/submitArticleBtn.svg'
import {Link} from "react-router-dom";

function SubmitArticleFormFullWidth() {
    return (
        <div className="p-2 pb-6 mx-1 mt-4 mb-6 border rounded-lg shadow-xl md:mt-10 print:hidden">
            <div className="flex flex-col justify-center ml-4">
                <p className="px-2 my-4 text-5xl font-bold text-left text-gray-900 sm:text-4xl primary-color">
                    Interested in seeing your article in this space?
                </p>
                <p className="px-2">
                    Submit a draft of your article and we'll get back to you!
                </p>
                <button className="px-6 py-2 mt-16 ml-4 text-white rounded-md sm:mt-8 max-w-max primary-color-bg">
                    <img src={box} alt="submit button icon" className="inline w-4 h-4 mb-1 mr-2"/>
                    <Link
                        to="/submitArticle"
                    >
                        Submit Article
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default SubmitArticleFormFullWidth