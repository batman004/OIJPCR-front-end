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

const ShareArticleOnSocialMedia = () => {
    const copyURLToClipBoard = url => navigator.clipboard.writeText(url)

    return (
        <div className="flex p-1 my-4 rounded-sm noprint">
            {SocialMediaLinks.map((link, index) => {
                return (
                    <a href={link.url} className="block mx-2 my-2" key={index}
                        onClick={() => copyURLToClipBoard(link.url)}
                    >
                        <img src={link.img} className="w-6 h-6" alt={link.alt} />
                    </a>
                )
            })}
        </div>
    )
}


export default ShareArticleOnSocialMedia;