const particulars = [
  { Title: "Online Indian Journal of Peace and Conflict Resolution(OIJPCR)" },
  { Frequency: "Annual" },
  { Publisher: "Dr.Jyoti M. Pathania" },
  { "Chief Editor": "Dr.Jyoti M. Pathania" },
  {
    Copyright:
      "Online Indian Journal of Peace and Conflict Resolution, Sector 37, Noida, UP",
  },
  { "Starting Year": 2016 },
  { Subjects: "Social sciences" },
  { Language: "English" },
  { "Publication Format": "Online" },
  { "Phone No": "+91 7042660900" },
  { "Email Id": "contact.us@oijpcr.org" },
  { Website: "https://oijpcr.org" },
  { Address: "Sector-37, Noida, UP, India - 201303" },
];

const JournalParticularsContainer = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ fieldName, value }) => {
  return (
    <tr>
      <td
        className="text-sm font-medium px-4 md:px-6 py-3 whitespace-nowrap uppercase tracking-wider"
        style={{ color: 'var(--color-text-muted)', fontSize: '13px', letterSpacing: '0.04em' }}
      >
        {fieldName}
      </td>
      <td
        className="text-sm px-4 md:px-6 py-3"
        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
      >
        {value}
      </td>
    </tr>
  );
};

const JournalParticulars = () => (
  <JournalParticularsContainer>
    <table className="table-academic min-w-full">
      <tbody>
        {particulars.map((particular, index) => {
          const fieldName = Object.keys(particular);
          const value = particular[fieldName];

          return <TableRow key={index} fieldName={fieldName} value={value} />;
        })}
      </tbody>
    </table>
  </JournalParticularsContainer>
);

export default JournalParticulars;
