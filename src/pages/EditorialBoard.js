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
    name: "Dr. Sudha Khokate",
    designation: "Assistant Professor",
    university:
      "Department of Sociology, Manasa Bhavana, Jnanabharathi Campus, Bangalore University, Bangalore-560056",
    email: "drsudhakhokate@bub.ernet.in",
    website: "http://eng.bangaloreuniversity.ac.in",
  },
  {
    name: "Dr. Shruti Singh",
    designation: "Professor",
    university:
      "Amity Institute of Social Sciences (AISS), K-3 Block ,Amity University, Sector-125 Campus-Noida, Uttar Pradesh-201313",
    email: "ssingh@amity.edu",
    website: "https://www.amity.edu/faculty-detail.aspx?facultyID=3246",
  },
  {
    name: "Prof Sangeeta Thapliyal",
    designation: "Professor & Head Center for Inner Asian Studies",
    university:
      "School of International Studies,Room No-101, Jawaharlal Nehru University, New Delhi-110067",
    email: "sthapliyal@mail.jnu.ac.in",
    website: "https://jnu.ac.in/Faculty/sthapliyal",
  },
  {
    name: "Dr. Nagalaxmi M Raman",
    designation: "Professor & Director",
    university: "Amity University, Sector 125 Campus Noida-201313",
    email: "niraman@amity.edu",
    website: "https://www.amity.edu/faculty-detail.aspx?facultyID=1530",
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
    name: "Rashmi Thakur",
    designation: "PGT Political Science",
    university:
      "Mayo College Girls School, Mayo Link Road, Ajmer-305001, Rajasthan",
    email: "rthakur@mcgs.ac.in",
    website: "https://www.mcgs.ac.in/our_team/rashmi-thakur-2/",
  },
  {
    name: "Shomaila Tahzib",
    designation: "Managing editor",
    university:
      "Online indian Journal of Peace and Conflict Resolution, Sector 37, Noida, U.P-201301",
    email: "s.tahzib@oijpcr.org",
    website: "https://oijpcr.org",
  },
];

function EditorialBoardMembers() {
  return (
    <div className="mt-6 mb-8 lg:mt-12 lg:mb-16">
      <div className="mb-4 lg:mb-8">
        <h2 className="text-center sm:text-left text-xl font-bold text-black md:text-2xl lg:text-3xl">
          Editorial Board Members
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 grid-flow-auto md:grid-flow-row">
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
    <div className="grid grid-cols-1 gap-2 p-4 rounded-md shadow-lg lg:gap-4">
      <h3 className="text-xl font-medium text-black md:text-2xl">{name}</h3>
      <p className="font-normal text-gray-900 text-md md:text-lg">
        {designation}
      </p>
      <p className="font-normal text-gray-900 text-md md:text-lg">
        {university}
      </p>
      <p className="text-sm font-light text-gray-800 md:text-md">
        <a
          href={`mailto:${email}`}
          className="hover:text-blue-800 hover:underline"
        >
          {email}
        </a>
      </p>
      <p className="text-sm font-light text-gray-800 md:text-md">
        <a href={`${website}`} className="hover:text-blue-800 hover:underline">
          website
        </a>
      </p>
    </div>
  );
}

export default EditorialBoard;
