function PDFButton({pdfLink}) {
    return (
        <div className="flex flex-row mx-2 my-2 noprint">
            <a className="block w-32 h-16 px-4 py-2 cursor-pointer text-xl mx-2 my-2 font-semibold text-center text-white border-0 border-indigo-400 rounded sm:max-w-sm max-h-12 noprint bg-oijpcr-blue focus:outline-none"
               href={pdfLink} target="_blank"
               rel="noreferrer"
            >
                PDF
            </a>
        </div>)
}


export default PDFButton
