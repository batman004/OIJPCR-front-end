import { PageHeader } from "../components/utils";
import Podcast from "../components/Home/Podcast/Podcast";

const boardMembers = [
  {
    name: "Dr. Jyoti M. Pathania",
    designation: "Founder and Chief Editor",
    university:
      "Online Indian Journal of Peace and Conflict Resolution, Sector 37, Noida, U.P-201301",
    email: "editor@oijpcr.org",
    website: "https://oijpcr.org",
  },
  {
    name: "Dr. Mallika Joseph",
    designation: "Adjunct Professor",
    university:
      "National Institute of Advanced Studies, Indian Institute of Science Campus, Bengaluru-560012",
    email: "mallikajoseph@nias.res.in",
    website:
      "https://www.nias.res.in/People/facility-member-info/People/Mallika%20Joseph%20A",
  },
  {
    name: "Dr. Sudha Khokate",
    designation: "Assistant Professor",
    university:
      "Department of Sociology, Manasa Bhavana, Jnanabharathi Campus, Bangalore University, Bangalore-560056",
    email: "drsudhakhokate@bub.ernet.in",
    website: "https://bangaloreuniversity.irins.org/profile/208251",
  },
  {
    name: "Priti Singh",
    designation: "Professor",
    university:
      "Centre for the Study of the Americas, School of International Studies, Jawaharlal Nehru University, New Delhi-110067",
    email: "pritisingh@mail.jnu.ac.in",
    website: "https://www.jnu.ac.in/content/pritisingh",
  },
  {
    name: "Dr. Reshmi Kazi",
    designation: "Professor",
    university:
      "Department of Political Science, Jamia Millia Islamia, New Delhi-110025",
    email: "rkazi@jmi.ac.in",
    website: "https://jmi.ac.in/Nelson-Mandela-Centre-For-Peace-And-Conflict-Resolution/Faculty-Members/3606/Reshmi_Kazi",
  },
  {
    name: "Prof Sangeeta Thapliyal",
    designation: "Professor & Head, Center for Inner Asian Studies",
    university:
      "School of International Studies, Room No-101, Jawaharlal Nehru University, New Delhi-110067",
    email: "sthapliyal@mail.jnu.ac.in",
    website: "https://jnu.ac.in/Faculty/sthapliyal",
  },
];

const [chief, ...members] = boardMembers;

const EditorialBoard = () => (
  <>
    <PageHeader
      title="Editorial board"
      lede="Scholars of peace, conflict and international studies from institutions across India review and edit every contribution."
    />

    <div className="wrap pb-16 md:pb-24">
      <section className="grid gap-6 py-10 border-t-2 md:grid-cols-12 md:gap-12" style={{ borderColor: "var(--ink)" }} aria-label="Chief editor">
        <p className="meta md:col-span-3">{chief.designation}</p>
        <div className="md:col-span-9">
          <h2 className="page-title" style={{ fontSize: "clamp(1.9rem, 1.5rem + 1.6vw, 2.75rem)" }}>{chief.name}</h2>
          <p className="summary mt-3 max-w-[60ch]">{chief.university}</p>
          <MemberLinks {...chief} />
        </div>
      </section>

      <ul className="grid border-t md:grid-cols-2 md:gap-x-12" style={{ borderColor: "var(--hair)" }}>
        {members.map((member) => (
          <li key={member.name} className="py-8 border-b" style={{ borderColor: "var(--hair)" }}>
            <h2 className="entry-title text-2xl">{member.name}</h2>
            <p className="mt-1 font-semibold text-[0.9375rem]" style={{ color: "var(--accent-deep)" }}>{member.designation}</p>
            <p className="summary text-base mt-3">{member.university}</p>
            <MemberLinks {...member} />
          </li>
        ))}
      </ul>
    </div>

    <div className="band-alt">
      <Podcast />
    </div>
  </>
);

function MemberLinks({ email, website, name }) {
  return (
    <p className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-[0.9375rem]">
      <a className="link-draw break-all" href={`mailto:${email}`}>{email}</a>
      <a className="text-link" href={website} target="_blank" rel="noreferrer" aria-label={`Profile of ${name}`}>
        Profile <span className="arrow" aria-hidden="true">&rarr;</span>
      </a>
    </p>
  );
}

export default EditorialBoard;
