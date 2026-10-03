import {useEffect, useState} from 'react'

const CONFIRM_WORD = 'DELETE'

const ConfirmDelete = ({
    title,
    warning,
    confirmLabel = 'Delete permanently',
    onCancel,
    onConfirm,
}) => {
    const [typed, setTyped] = useState('')
    const canDelete = typed.trim().toUpperCase() === CONFIRM_WORD

    useEffect(() => {
        const onKey = evt => evt.key === 'Escape' && onCancel()
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onCancel])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900 bg-opacity-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
        >
            <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-2xl">
                <h2 id="confirm-delete-title" className="text-2xl font-bold text-gray-900">
                    {title}
                </h2>
                <p className="mt-3 text-base text-gray-700">
                    {warning}
                </p>
                <p className="mt-4 text-sm font-semibold text-red-700">
                    This cannot be undone.
                </p>
                <label className="block mt-6 text-sm font-medium text-gray-800" htmlFor="confirm-delete-input">
                    Type {CONFIRM_WORD} to confirm
                </label>
                <input
                    id="confirm-delete-input"
                    type="text"
                    value={typed}
                    autoFocus
                    autoComplete="off"
                    onChange={evt => setTyped(evt.target.value)}
                    onKeyDown={evt => {
                        if (evt.key === 'Enter') {
                            evt.preventDefault()
                            if (canDelete) onConfirm()
                        }
                    }}
                    className="w-full h-12 px-4 mt-2 border-2 border-gray-300 rounded-lg"
                />
                <div className="flex flex-row flex-wrap justify-end mt-6 space-x-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2 mt-2 font-semibold text-gray-800 bg-white border-2 border-gray-400 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={!canDelete}
                        className={`px-5 py-2 mt-2 font-semibold text-white rounded-lg ${canDelete ? 'bg-red-600' : 'bg-red-300 cursor-not-allowed'}`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete
