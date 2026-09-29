import {Link} from 'react-router-dom'

function ArticleTags({tags}) {
    return (<div
        className="flex flex-row flex-wrap mt-2 mb-6 noprint">
        {tags?.split(', ').map((tag, index) => {
            const itemLink = {
                value: tag, url: `/tags/${tag}`,
            }
            return <TagBlock
                index={index}
                key={index}
                {...itemLink}
            />
        })}
    </div>)
}

function TagBlock(props) {
    const cname = "mx-2 my-2 px-4 py-2 block font-semibold text-center text-white border-0 border-indigo-400 rounded bg-oijpcr-blue focus:outline-none"
    const {url, value, index, newTab} = props

    return (<li className={cname} key={index}>
        {newTab ? <a href={url} target="_blank"
                     rel="noreferrer">
            {value}
        </a> : <Link to={url}>
            {value}
        </Link>}
    </li>)
}


export default ArticleTags;
