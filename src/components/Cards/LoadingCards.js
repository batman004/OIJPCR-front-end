const LoadingCardFullWidth = (props) => {
    return (
        <div className="bg-white rounded-md shadow-lg my-4 lg:h-auto md:col-span-full md:mx-6">
            <div className="animate-pulse bg-gray-200 rounded-tr rounded-tl w-full h-64"></div>
            <div className="mx-2 md:mx-6 my-4 border-gray-light">
                <div className="font-bold rounded-md bg-gray-200 animate-pulse text-gray-400 text-2xl md:text-4xl mb-8 text-center">
                    Loading...
                </div>
                <p className="font-normal bg-gray-200 animate-pulse text-gray-400 text-lg mb-8 p-4 rounded-md">
                    Loading...
                </p>
            </div>
        </div>
    )
}

const LoadingCard = (props) => {
    return (
        <div className="bg-white rounded-md shadow-lg mx-6 my-4 border-gray-light">
            <div className="animate-pulse bg-gray-200 rounded-tr rounded-tl w-full h-64"></div>
            <div className="mx-2 md:mx-6 my-4 border-gray-light">
                <div className="font-bold rounded-md bg-gray-200 animate-pulse text-gray-400 text-2xl mb-4 text-center">
                    Loading...
                </div>
                <p className="font-normal bg-gray-200 animate-pulse text-gray-400 rounded-md text-lg md:text-sm mb-8 md:mb-0 px-2 md:pl-4">
                    Loading...
                </p>
            </div>
        </div>
    )
}

export {
    LoadingCard,
    LoadingCardFullWidth
}