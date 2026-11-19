import { LinkItems } from '../utils/LinkItems'

export default function FooterLinks({ links, heading, newTab }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-sans)', letterSpacing: 0 }}>
        {heading}
      </h2>
      <ul className="link-list mt-4 space-y-2.5 text-[0.9375rem]" style={{ color: 'var(--deep-ink)' }}>
        <LinkItems links={links} newTab={newTab} />
      </ul>
    </div>
  )
}
