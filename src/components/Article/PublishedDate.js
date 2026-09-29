import UTCToFormalDate from '../../utils/DateTime'

const PublishedDate = ({ date: utcDate }) => {
    const date = UTCToFormalDate(utcDate)
    return (<span
        className="text-sm leading-3 text-gray-700">
        Published {`${date?.month || ""} ${date?.day || ""}`}
        <sup>{date?.superScript} </sup>
        {date?.year}
    </span>)
}


export default PublishedDate;
