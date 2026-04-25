import female_avatar from '../../assets/teamMembers/female_avatar.svg'

const ArticleHeader = ({
    article,
    author,
    publishedDate
}) => (
    <>
        <h1
            className="mb-6 text-center font-serif font-bold leading-tight"
            style={{ color: 'var(--color-primary)' }}
        >
            <span className="text-3xl md:text-4xl lg:text-5xl">
                {article?.title || 'title'}
            </span>
        </h1>

        <div
            className="flex flex-row justify-center items-center py-3 mb-2"
            style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
        >
            <img src={article?.authorPhoto || female_avatar}
                className="inline object-cover w-12 h-12 rounded-full"
                alt="Author"
            />
            <h2 className="inline py-1 ml-4 text-sm font-medium text-center">
                <span
                    className="block leading-snug"
                    style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
                >
                    By {author ?? 'author'}
                </span>
                {publishedDate}
            </h2>
        </div>

        <div className="flex flex-row justify-center my-6">
            <img src={article.cover}
                className="article-cover-image"
                alt="Article Cover"
            />
        </div>
    </>
)


export default ArticleHeader;
