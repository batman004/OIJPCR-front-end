// Images from the submitted manuscript that could not be placed in the text
// automatically. The editor decides where, if anywhere, each one goes.
const PREVIEWABLE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const REPLACEMENT_ACCEPT = 'image/png,image/jpeg,image/gif,image/webp'

const escapeAttribute = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// Builds the markup for an inserted image. Shared by the editor and the preview
// so both show the same size.
export const imageMarkup = (image) =>
    `<p><img src="${escapeAttribute(image.url)}" alt="${escapeAttribute(image.name)}" style="max-width: 100%; height: auto;" /></p>`

const SourceImages = ({images = [], content = '', onInsert, onReplace}) => {
    if (!images.length) return null

    return (
        <section className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">Images from the manuscript</h3>
            <p className="mt-1 text-sm text-gray-600">
                These images came from the Word file but could not be placed in the text automatically.
                Insert any of them where they belong in the article.
            </p>

            <ul className="grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
                {images.map((image) => {
                    const previewable = PREVIEWABLE_TYPES.includes(image.contentType)
                    const inserted = Boolean(content) && content.includes(image.url)

                    return (
                        <li key={image.url} className="flex flex-col p-3 border border-gray-200 rounded-lg">
                            {previewable ? (
                                <img
                                    src={image.url}
                                    alt={image.name}
                                    className="object-contain w-full h-40 bg-gray-50 rounded"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center w-full h-40 px-3 text-center text-sm text-gray-500 bg-gray-50 rounded">
                                    <span>This format cannot be shown in a browser.</span>
                                    <span className="mt-1">Open the original, export it as PNG or JPEG, and add that version here.</span>
                                </div>
                            )}

                            <p className="mt-2 text-sm font-semibold text-gray-900">
                                {image.name}
                                {inserted && <span className="ml-2 text-green-700">· in the article</span>}
                            </p>
                            <p className="text-xs text-gray-500">{image.contentType}</p>

                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                {previewable && (
                                    <button
                                        type="button"
                                        onClick={() => onInsert(image)}
                                        className="px-3 py-1 text-sm font-semibold text-white bg-gray-800 rounded hover:bg-gray-700"
                                    >
                                        {inserted ? 'Insert again' : 'Insert into article'}
                                    </button>
                                )}
                                <a
                                    href={image.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm font-semibold text-oijpcr-blue hover:underline"
                                >
                                    Open original
                                </a>
                            </div>

                            {!previewable && onReplace && (
                                <label className="mt-3 text-sm font-semibold text-gray-800">
                                    Add a PNG or JPEG version
                                    <input
                                        type="file"
                                        accept={REPLACEMENT_ACCEPT}
                                        className="block mt-1 text-sm font-normal"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0]
                                            event.target.value = ''
                                            if (file) onReplace(image, file)
                                        }}
                                    />
                                </label>
                            )}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default SourceImages
