function PrintButton() {
    const printArticle = () => window.print();
    return (
        <div className="flex flex-row mx-2 my-2 noprint">
            <button type="button"
                className="block w-32 h-10 px-4 mx-2 my-2 text-3xl font-semibold text-center text-white border-0 border-indigo-400 rounded sm:max-w-sm max-h-10 noprint bg-oijpcr-blue focus:outline-none"
                onClick={printArticle}
            >
                &#9113;
            </button>
        </div>
    )
}

export default PrintButton