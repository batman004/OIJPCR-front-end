import Podcast from "../components/Home/Podcast/Podcast";

const EditorialBoard = () => (
  <div className="flex-grow max-w-7xl">
    <div className="mx-2 sm:mx-4">
      <EditorialBoardMembers />
    </div>

    <div className="sm:mx-4">
      <Podcast />
    </div>
  </div>
);

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
      "National Institute of Advanced Studies, Indian Institute of science Campus, Bengaluru-560012",
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
    designation: "Professor & Head Center for Inner Asian Studies",
    university:
      "School of International Studies,Room No-101, Jawaharlal Nehru University, New Delhi-110067",
    email: "sthapliyal@mail.jnu.ac.in",
    website: "https://jnu.ac.in/Faculty/sthapliyal",
  },
];

function EditorialBoardMembers() {
  return (
    <div className="mt-8 mb-8 lg:mt-12 lg:mb-16">
      <div className="mb-6 lg:mb-10">
        <h2
          className="text-center sm:text-left text-2xl md:text-3xl lg:text-4xl font-serif font-bold pb-3"
          style={{
            color: 'var(--color-primary)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          Editorial Board
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {boardMembers.map((member, index) => {
          return (
            <BoardMemberCard
              key={index}
              name={member.name}
              designation={member.designation}
              university={member.university}
              email={member.email}
              website={member.website}
            />
          );
        })}
      </div>
    </div>
  );
}

function BoardMemberCard({ name, designation, university, email, website }) {
  return (
    <div className="board-card grid grid-cols-1 gap-2 p-6">
      <h3 className="board-name text-xl md:text-2xl font-bold leading-snug">{name}</h3>
      <p className="board-role text-base md:text-lg">
        {designation}
      </p>
      <p className="board-institution text-sm md:text-base leading-relaxed">
        {university}
      </p>
      <div className="mt-2 text-sm flex flex-col gap-1">
        <a href={`mailto:${email}`}>{email}</a>
        <a href={`${website}`} target="_blank" rel="noreferrer">Profile &rarr;</a>
      </div>
    </div>
  );
}

export default EditorialBoard;
