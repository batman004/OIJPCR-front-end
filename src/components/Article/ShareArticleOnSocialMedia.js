import { withRouter } from 'react-router-dom'
import twitter from '../../assets/shareIcons/twitter.svg'
import linkedin from '../../assets/shareIcons/linkedin.svg'
import shareIcon from '../../assets/shareIcons/shareLink.svg'
import config from '../../config/config'

const SocialMediaLinks = [
    {
        url: 'https://www.twitter.com/intent/tweet?url=' + window.location.href,
        img: twitter,
        alt: 'Twitter',
    },
    {
        url: 'https://www.linkedin.com/sharing/share-offsite/?url=' + window.location.href,
        img: linkedin,
        alt: 'LinkedIn',
    }
]


const ShareArticleOnSocialMedia = (props) => {
    const copyURLToClipBoard = url => navigator.clipboard.writeText(url)

    const shareLink = {
        path: config.protocol + '://' + config.domain + props.location.pathname,
        img: shareIcon,
        alt: 'shareable link',
    }

    return (
        <div className="flex items-center p-1 mt-2 mb-2 rounded-sm noprint">
            {
                SocialMediaLinks.map((link, index) => (
                    <a href={link.url} className="inline-block mx-2" key={index}>
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