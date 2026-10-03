import {CircularLoader} from '../Loaders'

const UploadScreen = ({message}) => (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900 bg-opacity-50"
        role="alertdialog"
        aria-busy="true"
        aria-live="polite"
        aria-label={message}
    >
        <div className="flex flex-col items-center w-full max-w-md px-8 py-10 bg-white shadow-xl rounded-2xl">
            <CircularLoader/>
            <p className="mt-6 text-xl font-semibold text-center text-gray-900">
                {message}
            </p>
            <p className="mt-3 text-sm text-center text-gray-600">
                The server is still uploading. This can take a while, so keep this page open.
            </p>
        </div>
    </div>
)

export default UploadScreen
