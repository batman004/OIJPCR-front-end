const LoadingCardFullWidth = () => (
    <div className="my-4 bg-white rounded-md shadow-lg lg:h-auto md:col-span-full md:mx-6">
        <div className="w-full h-64 bg-gray-200 rounded-tl rounded-tr animate-pulse"></div>
        <div className="mx-2 my-4 md:mx-6 border-gray-light">
            <div className="mb-8 text-xl font-bold text-center text-gray-100 bg-gray-200 rounded-md animate-pulse md:text-4xl">
                Loading...
            </div>
            <p className="p-4 mb-8 text-lg font-normal text-gray-400 bg-gray-200 rounded-md animate-pulse">
                Loading...
            </p>
        </div>
    </div>
)


export default LoadingCardFullWidth;