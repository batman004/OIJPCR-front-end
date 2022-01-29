import twitter from '../../assets/shareIcons/twitter.svg'
import linkedin from '../../assets/shareIcons/linkedin.svg'
import shareIcon from '../../assets/shareIcons/shareLink.svg'

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
    },
    {
        url: window.location.href,
        img: shareIcon,
        alt: 'shareable link',
    },
]

const ShareArticleOnSocialMedia = () => (
    <div className="fixed right-0 z-50 p-1 bg-white rounded-sm shadow-xl top-1/2 print:hidden">
        <div className="flex flex-col">
            {SocialMediaLinks.map((link, index) => {
                return (
                    <a href={link.url} className="block mx-2 my-2" key={index}
                        onClick={navigator.clipboard.writeText(link.url)}
                    >
                        <img src={link.img} className="w-6 h-6" alt={link.alt} />
                    </a>
                )
            })}
        </div>
    </div>
)


export default ShareArticleOnSocialMedia;