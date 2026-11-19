const particulars = [
  ["Title", "Online Indian Journal of Peace and Conflict Resolution (OIJPCR)"],
  ["Frequency", "Annual"],
  ["Publisher", "Dr. Jyoti M. Pathania"],
  ["Chief Editor", "Dr. Jyoti M. Pathania"],
  ["Copyright", "Online Indian Journal of Peace and Conflict Resolution, Sector 37, Noida, UP"],
  ["Starting year", "2016"],
  ["Subjects", "Social sciences"],
  ["Language", "English"],
  ["Publication format", "Online"],
  ["Phone", "+91 7042660900"],
  ["Email", <a className="link-draw" href="mailto:contact.us@oijpcr.org">contact.us@oijpcr.org</a>],
  ["Website", <a className="link-draw" href="https://oijpcr.org">oijpcr.org</a>],
  ["Address", "Sector-37, Noida, UP, India - 201303"],
];

const JournalParticulars = () => (
  <dl className="facts">
    {particulars.map(([field, value]) => (
      <div key={field}>
        <dt>{field}</dt>
        <dd>{value}</dd>
      </div>
    ))}
  </dl>
);

export default JournalParticulars;
