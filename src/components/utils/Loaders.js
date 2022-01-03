const CircularLoader = ({height="h-16", width="w-16"}) => {
    return (
        <div className= {`flex justify-center items-center`}>
            <div className={`animate-spin rounded-full ${height} ${width} border-b-2 border-oijpcr-blue`}></div>
        </div>
    )
}


export {CircularLoader}