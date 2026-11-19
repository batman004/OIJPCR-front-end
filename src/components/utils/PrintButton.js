function PrintButton() {
    return (
        <button type="button" className="btn btn-ghost noprint" onClick={() => window.print()}>
            Print
        </button>
    )
}

export default PrintButton
