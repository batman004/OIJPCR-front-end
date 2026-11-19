import { useEffect, useState } from 'react'
import twitter from '../../assets/shareIcons/twitter.svg'
import linkedin from '../../assets/shareIcons/linkedin.svg'
import facebook from '../../assets/shareIcons/facebook.svg'
import instagram from '../../assets/shareIcons/instagram.svg'
import { SocialMediaLinks } from '../Home/Socials/Links'

const ShareArticleOnSocialMedia = () => {
  const [copied, setCopied] = useState(false)
  const href = window.location.href
  const encoded = encodeURIComponent(href)

  useEffect(() => {
    if (!copied) return undefined
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const links = [
    { url: `https://twitter.com/intent/tweet?url=${encoded}`, img: twitter, label: 'Share on X (Twitter)' },
    { url: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`, img: linkedin, label: 'Share on LinkedIn' },
    { url: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, img: facebook, label: 'Share on Facebook' },
    { url: SocialMediaLinks.Instagram, img: instagram, label: 'OIJPCR on Instagram' },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href)
      setCopied(true)
    } catch {
      window.prompt('Copy this link', href)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 noprint">
      <span className="meta mr-2">Share</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          rel="noopener noreferrer"
          target="_blank"
          title={link.label}
          className="inline-flex items-center justify-center w-11 h-11 border transition-colors duration-150 hover:border-[color:var(--ink)]"
          style={{ borderColor: 'var(--hair)' }}
        >
          <img src={link.img} className="w-5 h-5" alt={link.label} />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center h-11 px-4 text-sm font-semibold border transition-colors duration-150 hover:border-[color:var(--ink)]"
        style={{ borderColor: 'var(--hair)' }}
        aria-live="polite"
      >
        {copied ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  )
}

export default ShareArticleOnSocialMedia
