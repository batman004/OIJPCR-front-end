import printIcon from "../../assets/print_icon.svg"

function PrintButton() {
    const printArticle = () => window.print();
    return (
        <div className="flex flex-row mx-2 my-2 noprint">
            <button type="button"
                    className="block w-32 h-12 px-4 mx-2 my-2 font-semibold text-center text-white border-0 border-indigo-400 rounded sm:max-w-sm max-h-12 noprint bg-oijpcr-blue focus:outline-none"
                    onClick={printArticle}
            >
                <span className="text-xl">Print <img
                    className="inline w-6 h-6 ml-2"
                    src={printIcon}
                    alt="print icon"/></span>
            </button>
        </div>)
}


export default PrintButton