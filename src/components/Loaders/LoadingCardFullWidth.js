const LoadingCardFullWidth = () => (
    <div className="card-surface my-4 lg:h-auto md:col-span-full md:mx-6 overflow-hidden">
        <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
        <div className="mx-2 my-4 md:mx-6">
            <div className="mb-6 h-8 md:h-10 bg-gray-200 rounded-sm animate-pulse"></div>
            <div className="p-3 mb-3 h-4 bg-gray-200 rounded-sm animate-pulse"></div>
            <div className="p-3 mb-3 h-4 bg-gray-200 rounded-sm animate-pulse w-5/6"></div>
            <div className="p-3 mb-2 h-4 bg-gray-200 rounded-sm animate-pulse w-2/3"></div>
        </div>
    </div>
)


export default LoadingCardFullWidth;
