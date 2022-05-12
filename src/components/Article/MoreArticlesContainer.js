const MoreArticlesContainer = props => {
    return (
        <div className="my-4 noprint">
            <h1 className="text-2xl mb-4 font-bold border-b-2 border-gray-900 primary-color">
                More from this volume
            </h1>
            {props.children}
        </div>
    )
}

export default MoreArticlesContainer;