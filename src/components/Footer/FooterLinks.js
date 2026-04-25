import { LinkItems } from '../utils/LinkItems'

export default function FooterLinks ({ links, heading, newTab }) {
  return (
    <>
      <div className="footer-col flex-1 md:px-4 py-2">
        <h4>{heading}</h4>
        <ul className="mt-2 space-y-1.5 list-none p-0">
          <LinkItems links={links} newTab={newTab}/>
        </ul>
      </div>
    </>
  )
}
