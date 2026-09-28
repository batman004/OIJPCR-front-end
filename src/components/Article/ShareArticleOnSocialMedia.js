import twitter from '../../assets/shareIcons/twitter.svg'
import linkedin from '../../assets/shareIcons/linkedin.svg'
import facebook from '../../assets/shareIcons/facebook.svg'
import instagram from '../../assets/shareIcons/instagram.svg'
import { SocialMediaLinks } from '../Home/Socials/Links'

const iconClass = 'block h-6 w-6 max-h-6 max-w-6 flex-shrink-0 object-contain'

const ShareArticleOnSocialMedia = () => {
  const encoded = encodeURIComponent(window.location.href)
  const links = [
    {
      url: `https://twitter.com/intent/tweet?url=${encoded}`,
      img: twitter,
      alt: 'Share on Twitter',
    },
    {
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      img: linkedin,
      alt: 'Share on LinkedIn',
    },
    {
      url: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      img: facebook,
      alt: 'Share on Facebook',
    },
    {
      url: SocialMediaLinks.Instagram,
      img: instagram,
      alt: 'OIJPCR on Instagram',
    },
  ]

  return (
    <div className="inline-flex items-center gap-3 noprint">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          rel="noopener noreferrer"
          target="_blank"
          className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center leading-none"
        >
          <img src={link.img} className={iconClass} alt={link.alt} />
        </a>
      ))}
    </div>
  )
}

export default ShareArticleOnSocialMedia
