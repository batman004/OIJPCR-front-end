import female_avatar from '../../assets/teamMembers/female_avatar.svg'

const JournalHeader = (props) => {
    const { article, author, publishedDate } = props;
    return (
        <>
            <h1 className="mb-4 font-black text-center">
                <span className="text-3xl md:text-5xl">
                    {article?.title || 'title'}
                </span>
            </h1>

            <div className="flex flex-row justify-center py-1">
                <img src={article?.authorPhoto || female_avatar}
                    className="inline object-cover w-16 h-16 rounded-full"
                    alt="Author"
                />
                <h2 className="inline py-4 ml-4 text-base font-semibold text-center">
                    <span className="block text-base leading-3">
                        by {author ?? 'author'}
                    </span>
                    {publishedDate}
                </h2>
            </div>

            <div className="flex flex-row justify-center my-4">
                <img src={article.cover}
                    className="w-full rounded-lg md:w-3/4 h-98"
                    alt="Article Cover"
                />
            </div>
        </>
    )
}

export default JournalHeader;