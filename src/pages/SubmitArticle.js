const guidelinesList = [
  {guidelines: 'The topics for submission should be related to peace and conflict resolution, peacebuilding activities at the economic, political, civil society and the social-cultural levels, with specific reference to India.', key: 1},
  {guidelines: 'The articles are published quarterly online, however open to print as well.', key: 2},
  {guidelines: 'OIJPCR welcomes concise, pointed, articles with few recommendations.', key: 3},
  {guidelines: 'All articles to be between 1000 -1500 words Helvetica Neue (bold), 16 size font with 1.5 Line spacing.', key: 4},
  {guidelines: 'A bibliography is not compulsory if it is a commentary or opinionated piece. But in case of a research article then Chicago style manual style is to be followed.', key: 5},
  {guidelines: 'All references if used should be mentioned within the article itself.', key: 6},
  {guidelines: 'Articles for submission should be exclusively for OIJPCR.', key: 7},
  {guidelines: 'The contributor will be responsible for factual accuracy and research integrity.', key: 8},
  {guidelines: 'Article email and short brief not exceeding 30 words, should be included along with the article.', key: 9},
  {guidelines: 'All articles to be emailed to Editor at editor@oijpcr.org', key: 10},
  {guidelines: 'All contributions will be reviewed and edited and the decision of the Editorial team would be final.', key: 11},
  {guidelines: 'We also welcome Book reviews of 1000-1500 words with a photo of the book as well, but the books to be reviewed should be related to Peace & Conflict resolution Studies only.', key: 12},
  {guidelines: 'Disclaimer: Opinions in the articles may not necessarily coincide with those of the Editorial Team.', key: 13},
];

const SubmitArticle = () => (
  <div className="flex-grow">
    <div className="flex items-center justify-center my-6 md:my-4">
      <h1 className="text-4xl">Guidelines for submissions</h1>
    </div>
    <div className="indent-8">
      <ol>
        {guidelinesList.map(guidelines =>
          <li key={guidelines.key}>{guidelines.guidelines}</li>
        )}
      </ol>
    </div>
    <div className="flex items-center justify-center mt-6">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdXrEyabD4y9YcYriSA9V80UT1zYdQ2pyHJbPW8P9B7ekwCrA/viewform?embedded=true"
        title="Submit Article"
        width={640}
        height={968}
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
      >
        Loading…
      </iframe>
    </div>
  </div>
)


export default SubmitArticle