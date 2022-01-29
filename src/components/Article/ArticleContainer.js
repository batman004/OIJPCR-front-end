const ArticleContainer = (props) => {
    return (
        <div className="relative h-full mx-4 md:mx-16">
            <div className="flex flex-col h-full py-2 my-4 md:w-full editor">
                {props.children}
            </div>
        </div>
    )
}


export default ArticleContainer