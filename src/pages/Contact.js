import Podcast from '../components/Home/Podcast/Podcast'

const Contact = () => {
    return (
        <div className="flex-grow max-w-7xl">
            <div className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 py-4 md:px-4">
                <h1 className="text-3xl py-2">Mailing Address</h1>
                <p className="text-md font-mono"> Sector-37, Noida - 201301, Uttar-Pradesh, India</p>
                <p className="text-md font-mono">Phone - 7042660900</p>
            </div>
            <div className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 md:py-4 md:px-4">
                <h1 className="text-3xl py-2">Principal Contact</h1>
                <p className="text-md font-mono">Dr. Jyoti M. Pathania</p>
                <p className="text-md font-mono">Founder and Chief Editor</p>
                <p className="text-md font-mono">Email: editor@oijpcr.org</p>
            </div>
            <Podcast/>
        </div>
    )
}

export default Contact