import Podcast from '../components/Home/Podcast/Podcast'

const Contact = () => {
    return (
        <div className="flex-grow max-w-7xl">
            <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-16 mt-10 mb-8">
                <h1
                    className="text-3xl md:text-4xl font-serif font-bold pb-3"
                    style={{
                        color: 'var(--color-primary)',
                        borderBottom: '1px solid var(--color-border)',
                    }}
                >
                    Contact
                </h1>
            </div>

            <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-16 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                    <h2
                        className="text-xl font-serif font-bold uppercase tracking-wider pb-2 mb-3"
                        style={{ color: 'var(--color-primary)', letterSpacing: '0.05em', fontSize: '15px' }}
                    >
                        Mailing Address
                    </h2>
                    <p style={{ color: 'var(--color-text)' }} className="leading-relaxed">
                        Sector-37, Noida &mdash; 201301
                    </p>
                    <p style={{ color: 'var(--color-text)' }} className="leading-relaxed">
                        Uttar Pradesh, India
                    </p>
                    <p style={{ color: 'var(--color-text-muted)' }} className="mt-2 leading-relaxed">
                        Phone: +91 7042660900
                    </p>
                </div>

                <div>
                    <h2
                        className="text-xl font-serif font-bold uppercase tracking-wider pb-2 mb-3"
                        style={{ color: 'var(--color-primary)', letterSpacing: '0.05em', fontSize: '15px' }}
                    >
                        Principal Contact
                    </h2>
                    <p style={{ color: 'var(--color-text)' }} className="font-medium leading-relaxed">
                        Dr. Jyoti M. Pathania
                    </p>
                    <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }} className="leading-relaxed">
                        Founder and Chief Editor
                    </p>
                    <p className="mt-2 leading-relaxed">
                        <a
                            href="mailto:editor@oijpcr.org"
                            style={{ color: 'var(--color-primary)', textDecoration: 'none', borderBottom: '1px solid var(--color-primary)' }}
                        >
                            editor@oijpcr.org
                        </a>
                    </p>
                </div>
            </div>

            <Podcast/>
        </div>
    )
}

export default Contact
