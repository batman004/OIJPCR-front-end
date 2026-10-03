import { withRouter } from 'react-router-dom'
import twitter from '../../assets/shareIcons/twitter.svg'
import linkedin from '../../assets/shareIcons/linkedin.svg'
import shareIcon from '../../assets/shareIcons/shareLink.svg'
import config from '../../config/config'
import {trackShare} from '../../utils/trackEvent'

const SocialMediaLinks = [
    {
        url: 'https://www.twitter.com/intent/tweet?url=' + window.location.href,
        img: twitter,
        alt: 'Twitter',
        channel: 'twitter',
    },
    {
        url: 'https://www.linkedin.com/sharing/share-offsite/?url=' + window.location.href,
        img: linkedin,
        alt: 'LinkedIn',
        channel: 'linkedin',
    }
]


const ShareArticleOnSocialMedia = (props) => {
    const copyURLToClipBoard = url => {
        trackShare(props.articleId, 'link')
        return navigator.clipboard.writeText(url)
    }

    const shareLink = {
        path: config.protocol + '://' + config.domain + props.location.pathname,
        img: shareIcon,
        alt: 'shareable link',
    }

    return (
        <div className="flex items-center p-1 mt-2 mb-2 rounded-sm noprint">
            {
                SocialMediaLinks.map((link, index) => (
                    <a href={link.url} className="inline-block mx-2" key={index}
                       onClick={() => trackShare(props.articleId, link.channel)}>
                        <img src={link.img} className="w-6 h-6" alt={link.alt} />
                    </a>
                ))
            }

            <button
                className="block mx-2"
                onClick={() => copyURLToClipBoard(shareLink.path)}
            >
                <img src={shareLink.img} className="w-6 h-6" alt={shareLink.alt} />
            </button>
        </div>
    )
}


export default withRouter(ShareArticleOnSocialMedia);