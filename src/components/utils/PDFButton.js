function PDFButton({ pdfLink }) {
    return (
        <a
            className="btn-academic noprint focus:outline-none"
            href={pdfLink}
            target="_blank"
            rel="noreferrer"
        >
            Download PDF
        </a>
    )
}

function PDFButtonSmall({ pdfLink }) {
    return (
        <a
            className="btn-academic noprint focus:outline-none"
            href={pdfLink}
            target="_blank"
            rel="noreferrer"
        >
            PDF
        </a>
    )
}


export { PDFButton, PDFButtonSmall }
