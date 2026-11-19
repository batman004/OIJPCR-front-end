function PDFButton({ pdfLink }) {
    if (!pdfLink) return null
    return (
        <a className="btn noprint" href={pdfLink} target="_blank" rel="noreferrer">
            Download PDF
        </a>
    )
}

export { PDFButton }
