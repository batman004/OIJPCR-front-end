function PrintButton() {
    const printArticle = () => window.print();
    return (
        <div className="flex flex-row flex-wrap mt-2 mb-6 noprint">
            <button type="button"
                className="block w-full px-4 py-2 mx-2 my-2 font-semibold text-center text-white border-0 border-indigo-400 rounded md:max-w-md md:w-1/2 bg-oijpcr-blue focus:outline-none"
                onClick={printArticle}
            >
                Print
            </button>
        </div>
    )
}

export default PrintButton