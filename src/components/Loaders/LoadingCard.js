/** Placeholder shaped like an ArticleCard row. */
const LoadingCard = () => (
    <div className="grid gap-5 py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-10 border-b" style={{borderColor: 'var(--hair)'}} aria-hidden="true">
        <div className="skeleton ratio-3-2"/>
        <div>
            <div className="skeleton h-3 w-40"/>
            <div className="skeleton h-7 mt-4 w-11/12"/>
            <div className="skeleton h-7 mt-2 w-2/3"/>
            <div className="skeleton h-4 mt-5 w-full"/>
            <div className="skeleton h-4 mt-2 w-5/6"/>
        </div>
    </div>
)

export default LoadingCard
