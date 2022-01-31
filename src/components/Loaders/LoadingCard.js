const LoadingCard = () => (
    <div className="my-4 bg-white rounded-md shadow-lg md:max-w-md md:mx-4 border-gray-light">
        <div className="w-full h-64 bg-gray-200 rounded-tl rounded-tr animate-pulse"></div>
        <div className="mx-2 my-4 md:mx-6 border-gray-light">
            <div className="mb-4 text-xl font-bold text-center text-gray-100 bg-gray-200 rounded-md animate-pulse">
                Loading...
            </div>
            <p className="px-2 mb-8 text-lg font-normal text-gray-400 bg-gray-200 rounded-md animate-pulse md:text-sm md:mb-0 md:pl-4">
                Loading...
            </p>
        </div>
    </div>
)


export default LoadingCard;