function PrintButton() {
    const printArticle = () => window.print();
    return (
        <button
            type="button"
            className="btn-academic-ghost noprint focus:outline-none"
            onClick={printArticle}
        >
            Print
        </button>
    )
}


export default PrintButton
