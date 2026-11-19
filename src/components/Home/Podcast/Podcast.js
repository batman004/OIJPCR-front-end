import * as icons from './PodcastIcons'
import { PodcastLinks } from './Links'

const platforms = [
  { key: 'spotify', label: 'Spotify' },
  { key: 'apple', label: 'Apple Podcasts' },
  { key: 'pocketCast', label: 'Pocket Casts' },
  { key: 'overcast', label: 'Overcast' },
  { key: 'radioPublic', label: 'RadioPublic' },
  { key: 'google', label: 'Google Podcasts' },
]

/** The journal's audio series: cover, what it is, where to listen. */
export default function Podcast() {
  return (
    <section className="wrap section noprint" aria-labelledby="podcast-heading">
      <div className="section-head">
        <h2 id="podcast-heading" className="section-title">The OIJPCR podcast</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <div className="frame ratio-1-1">
            <img src={icons.cover} alt="Cover art of the OIJPCR podcast" loading="lazy" />
          </div>
        </div>
        <div className="md:col-span-8 flex flex-col">
          <p className="standfirst max-w-[52ch]">
            A podcast series on peace and conflict resolution. Every episode closes with a
            five-point analysis and five recommendations.
          </p>
          <p className="meta mt-8 mb-3">Listen on</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 border-t" style={{ borderColor: 'var(--hair)' }}>
            {platforms.map(({ key, label }) => (
              <li key={key} className="border-b" style={{ borderColor: 'var(--hair)' }}>
                <a
                  href={PodcastLinks[key]}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 py-3 pr-4 font-semibold transition-colors duration-150 hover:text-[color:var(--accent)]"
                >
                  <img src={icons[key]} alt="" className="w-7 h-7" />
                  {label}
                  <span className="ml-auto transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
