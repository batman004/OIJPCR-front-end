/** Title block shared by the static and listing pages. */
export default function PageHeader({ title, lede, meta, children }) {
  return (
    <header className="wrap pt-12 md:pt-16 pb-10 md:pb-12">
      {meta && <p className="meta mb-4 rise">{meta}</p>}
      <h1 className="page-title max-w-[20ch] rise">{title}</h1>
      {lede && <p className="standfirst mt-5 max-w-[60ch] rise rise-2">{lede}</p>}
      {children}
    </header>
  )
}
