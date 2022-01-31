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


const LoadingCard = () => (
    <div className="mx-6 my-4 bg-white rounded-md shadow-lg border-gray-light">
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


export {
    LoadingCard,
    LoadingCardFullWidth
}