const podcastDescription =
        'The Online Indian Journal of Peace & Conflict Resolution (OIJPCR) Podcast Series is\n' +
        'focused on peace and conflict resolution, with the aim of positively contributing\n' +
        'towards the creation of a peaceful society. A common feature in all podcasts will be\n' +
        'a five-point analysis and five recommendations.'

export default function Description () {
  return (
    <>
      <p
        className="text-xs uppercase tracking-widest mb-2"
        style={{ color: 'var(--color-text-muted)', letterSpacing: '0.12em' }}
      >Audio Series</p>
      <p
        className="text-2xl md:text-3xl xl:text-4xl font-serif font-bold leading-tight"
        style={{ color: 'var(--color-primary)' }}
      >OIJPCR &mdash; The Podcast</p>
      <div
        className="text-base md:text-lg pt-4 mb-4 leading-relaxed"
        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
      >
        {podcastDescription}
        <p
          className="mt-3 italic text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >Now streaming on all major podcast platforms.</p>
      </div>
    </>
  )
}
