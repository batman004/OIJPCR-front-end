const SubmitArticle = () => (
  <div className="flex-grow">
    <div className="flex items-center justify-center my-6 md:my-4">
      <h1 className="text-4xl">Submit Article</h1>
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