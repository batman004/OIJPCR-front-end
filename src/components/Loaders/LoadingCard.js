const LoadingCard = () => (
    <div className="card-surface my-4 md:max-w-md md:mx-4 overflow-hidden">
        <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
        <div className="mx-2 my-4 md:mx-6">
            <div className="mb-4 h-6 bg-gray-200 rounded-sm animate-pulse"></div>
            <div className="px-2 mb-3 h-4 bg-gray-200 rounded-sm animate-pulse"></div>
            <div className="px-2 mb-3 h-4 bg-gray-200 rounded-sm animate-pulse w-3/4"></div>
            <div className="px-2 mb-2 h-4 bg-gray-200 rounded-sm animate-pulse w-1/2"></div>
        </div>
    </div>
)


export default LoadingCard;
