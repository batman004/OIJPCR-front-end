function PrintButton() {
    const printArticle = () => window.print();
    return (
        <button type="button"
            className="w-2/12 py-2 font-bold text-center text-white border-0 border-indigo-400 rounded bg-oijpcr-blue focus:outline-none"
            onClick={printArticle}
        >
            Print
        </button>
    )
}

export default PrintButton