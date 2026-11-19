/** Placeholder shaped like an article header: title, byline, cover. */
const LoadingCardFullWidth = () => (
    <div aria-hidden="true">
        <div className="skeleton h-3 w-48"/>
        <div className="skeleton h-10 md:h-14 mt-5 w-full max-w-3xl"/>
        <div className="skeleton h-10 md:h-14 mt-3 w-2/3 max-w-2xl"/>
        <div className="skeleton h-5 mt-8 w-full max-w-2xl"/>
        <div className="skeleton ratio-16-9 mt-10 w-full"/>
    </div>
)

export default LoadingCardFullWidth
