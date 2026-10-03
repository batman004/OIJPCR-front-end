// "A Decade in Pursuit of Peace" - the 10th anniversary story, one entry per
// image in src/assets/anniversary (720px for the page) and
// src/assets/anniversary/full (1440px originals for the enlarged view).
//
// The slides carry their text inside the picture, so `alt` repeats that text for
// screen readers. `headline` doubles as the line shown in the home page ticker.
const thumbs = require.context('../../../assets/anniversary', false, /^\.\/\d+\.jpg$/)
const fulls = require.context('../../../assets/anniversary/full', false, /^\.\/\d+\.jpg$/)

const content = [
  {
    headline: 'A Decade in Pursuit of Peace',
    alt: 'A Decade in Pursuit of Peace. As OIJPCR turns 10 this year, we revisit our focus towards peace and conflict resolution in the Indian neighbourhood, on the occasion of Gandhi Jayanti and International Day of Non-Violence.',
  },
  {
    year: 2016,
    headline: 'Where it began',
    alt: '2016, where it began. We revisit one of our earliest papers on Mahatma Gandhi, "International Day of Non-Violence: A Tribute to Mahatma Gandhi", written by our Founding Editor, Dr. Jyoti M. Pathania. Image: a sculpture of a revolver with a knotted barrel.',
  },
  {
    year: 2017,
    headline: 'Closer to home',
    alt: '2017, closer to home. "Family Conflicts and Their Resolution" by Naina Katoch made the case that conflict resolution doesn\'t just happen between nations, it also happens over dinner. Her takeaway: conflict is intrinsic to human social existence. Image: a black and white photograph of Mahatma Gandhi walking.',
  },
  {
    year: 2018,
    headline: 'Peace redefined',
    alt: '2018, peace redefined. What exactly defines peace? We turned back to Gandhi\'s philosophy of ahimsa, and a piece on Indian conflict resolution, philosophy and ethos, by Dr. Jyoti M. Pathania. Image: a person meditating at sunset.',
  },
  {
    year: 2019,
    headline: 'Power reconsidered',
    alt: '2019, power reconsidered. Uncle Ben could never. From our 2019 piece on Birsa Munda (Priyadarshini Topno): "Great power should be handled with great responsibility and humility." Said in a political science paper, years before Marvel made it mainstream. Munda and Gandhi never met, but both understood that restraint is its own kind of force. Images: a statue and a spinning wheel.',
  },
  {
    year: 2020,
    headline: 'The arithmetic of violence',
    alt: '2020, the arithmetic of violence. The ACLED Conflict Index, analysed in India\'s context by D Sakshi, reduced the global state of conflict to a few hard numbers: one in six people today live somewhere ranked across the Index\'s top fifty countries, with a 27% rise in political violence incidents tracked. Gandhi never had a dataset like this. He didn\'t need one: he measured the cost of violence one village at a time, and arrived at the same conclusion anyway. Image: a map of global conflicts.',
  },
  {
    year: 2021,
    headline: 'Diplomacy\'s better reputation',
    alt: '2021, diplomacy\'s better reputation. Rashmi Thakur\'s paper on the "Role of Diplomacy in Conflict Resolution" said diplomacy is "an instrument for resolution of conflicts, of hope and peace," not merely statecraft dressed up in formal dinners. Gandhi ran the same play at the Round Table Conference in 1931, decades before anyone thought to call it track-two diplomacy. Image: two diplomats shaking hands in front of national flags.',
  },
  {
    year: 2022,
    headline: 'Celebrating Gandhi\'s legacy',
    alt: '2022, celebrating Gandhi\'s legacy. Our podcast titled "Mahatma Gandhi\'s Conflict Resolution and Its Relevance in Today\'s World" remains India\'s top 10 rated podcasts on Peace Studies. The episode was a tribute to the visionary\'s 150th birth anniversary and discussed his enduring legacy of peace, and its application towards modern conflict resolution. Image: a sketch of Gandhi with a dove.',
  },
  {
    year: 2023,
    headline: 'The phone as a peace process',
    alt: '2023, the phone as a peace process. Shubhranshu Choudhary, in conversation with Tejasvi Shukla, discussed the peace process taking shape in Central India through CGNet Swara, his network letting Naxal-affected villages report their own news by phone. Image: The OIJPCR Podcast episode artwork.',
  },
  {
    year: 2024,
    headline: 'Peace as an ecosystem',
    alt: '2024, peace as an ecosystem. Our founding editor, Dr. Jyoti M. Pathania, spoke with climate researcher Dr. Wesam Al Madhoun on sustainability, social justice and peace, making the case that none of the three hold up long without the other two. Image: The OIJPCR Podcast episode artwork.',
  },
  {
    year: 2025,
    headline: 'Diplomacy by other means',
    alt: '2025, diplomacy by other means. Arshia Kaushal\'s paper on the Indo-Maldives Hydrography Pact argued that water, often seen as a contested resource, can be transformed into a cooperative diplomatic currency. Image: fish and crabs on ice.',
  },
  {
    year: 2026,
    headline: 'Ten years of difficult conversations',
    alt: '2026, ten years of difficult conversations. Through our biannual Peace Conclaves, we bring together voices from the military, peacekeeping, journalism and academia to exchange perspectives and envision a more peaceful neighbourhood. Because peace is not only a destination, it is a shared responsibility. Image: a video call with three speakers.',
  },
  {
    headline: 'Status: Ongoing',
    alt: 'Status: Ongoing. Ten years. Hundreds of student interns. Several thousand footnotes. And an old line worth returning to on the day: "Non-violence is the greatest force at the disposal of mankind. It is mightier than the mightiest weapon of destruction devised by the ingenuity of man." Mahatma Gandhi, still the most quoted man in every OIJPCR editorial meeting. More details about our work can be found on our website, oijpcr.org. Let us celebrate Gandhi Jayanti and the International Day of Non-Violence by renewing our commitment to building resilient, peaceful, and less conflict-driven communities.',
  },
]

const slides = content.map((slide, i) => {
  const file = `./${String(i + 1).padStart(2, '0')}.jpg`
  return {
    ...slide,
    id: i + 1,
    src: thumbs(file).default || thumbs(file),
    fullSrc: fulls(file).default || fulls(file),
  }
})

export const tickerText = (slide) =>
  slide.year ? `${slide.year} · ${slide.headline}` : slide.headline

export default slides
