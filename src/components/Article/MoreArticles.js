import { ArticleCardSmall } from "../Cards";
import { CircularLoader } from "../Loaders";

const MoreArticles = ({
    articles,
    path,
    handleClick
}) => {
    if (articles?.length < 1)
        return <CircularLoader height="h-16" width="w-16" />

    return (
        <div className="my-4 noprint">
            <h1 className="text-2xl font-bold border-b-2 border-gray-900 primary-color">
                More from this volume
            </h1>
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
                            }) :
                        <CircularLoader height="h-16" width="w-16" />
                }
            </div>
        </div>
    )

}


export default MoreArticles;