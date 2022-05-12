import { ArticleCardSmall } from "../Cards";
import { CircularLoader } from "../Loaders";

const MoreArticles = ({
    articles,
    path,
    handleClick,
    isLoading,
    loaderMsg
}) => {
    if (isLoading)
        return <CircularLoader height="h-16" width="w-16" />

    if (articles?.length < 1)
        return <span>{loaderMsg}</span>

    return (
        <div className="flex flex-col my-4 md:flex-row justify-evenly">
            {
                articles && articles.length > 1 ?
                    articles.map(
                        article => {
                            const ArticleProps = {
                                id: article._id,
                                coverPhoto: article.cover,
                                cname: {
                                    container: '',
                                    button: 'mt-10 flex flex-wrap',
                                },
                                ...article,
                            }

                            return (
                                <ArticleCardSmall
                                    {...ArticleProps}
                                    handleClick={handleClick}
                                    key={article._id}
                                    path={path}
                                />
                            )
                        }) : <span>{loaderMsg}</span>
            }
        </div>

    )
}


export default MoreArticles;