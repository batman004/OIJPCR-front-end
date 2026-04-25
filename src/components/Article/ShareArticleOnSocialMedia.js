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
        <div className="inline-flex items-center gap-3 noprint">
            {
                SocialMediaLinks.map((link, index) => (
                    <a href={link.url} className="inline-block" key={index}>
                        <img src={link.img} className="w-6 h-6" alt={link.alt} />
                    </a>
                ))
            }

            <button
                className="inline-block"
                onClick={() => copyURLToClipBoard(shareLink.path)}
            >
                <img src={shareLink.img} className="w-6 h-6" alt={shareLink.alt} />
            </button>
        </div>
    )
}


export default withRouter(ShareArticleOnSocialMedia);