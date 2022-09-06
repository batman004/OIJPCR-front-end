import Podcast from '../components/Home/Podcast/Podcast'
import {
  HeadingText,
  AboutText
} from "../components/About";

const About = () => (
  <div className="flex-grow max-w-7xl">
    <AboutContainer>
      <Heading>
        {HeadingText}
      </Heading>

      <Description>
        {<AboutText />}
      </Description>

      <EditorialBoardMembers />

      <div className="sm:mx-4">
        <Podcast />
      </div>
    </AboutContainer>
  </div>
)


function AboutContainer(props) {
  return (
    <div className="mx-4 mt-8 mb-4 sm:mx-8 md:mx-8 md:mt-8 md:mb-6">
      {props.children}
    </div>
  )
}

function Heading(props) {
  return (
    <h1 className="text-3xl font-bold text-justify md:text-left md:text-6xl primary-color">
      {props.children}
    </h1>
  )
}

function Description(props) {
  return (
    <p className="mt-8 text-justify lg:text-lg">
      {props.children}
    </p>
  )
}


const boardMembers = [
  {
    name: "Prof Deepsheekha Kotwal",
    university: "Central University of Jammu",
    email: "kotwaldeepsheekha@gmail.com"
  },
  {
    name: "Dr.Sudha Khokate",
    university: "Associate Professor, Dept of Sociology, Bangalore University",
    email: "drsudhakhokate@gmail.com"
  },
  {
    name: "Shomaila Tahzib",
    university: "Social activist, research scholar and gold Medalist from St.Xavier’s College, Ranchi",
    email: "managing.editor@oijpcr.org"
  },
  {
    name: "Dr.Shruti Singh",
    university: "Associate Professor, Amity Institute of Social Sciences(AISS)",
    email: "ssingh31@amity.edu"
  },
  {
    name: "Prof Sangeeta Thapliyal",
    university: "Centre for Inner Asian Studies, Jawaharlal Nehru University",
    email: "sangeetathapliyal@gmail.com"
  },
  {
    name: "Dr Mallika Joseph",
    university: "Senior Fellow, Women in Security, Conflict Management and Peace(WISCOMP), India Habitat Centre",
    email: "mallikajoseph@gmail.com"
  },
]

function EditorialBoardMembers() {
  return (
    <div className='mt-6 mb-8 lg:mt-12 lg:mb-16'>
      <div className='mb-4 lg:mb-8'>
        <h2 className='text-xl font-bold text-black md:text-2xl lg:text-3xl'>
          Editorial Board Members
        </h2>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 grid-flow-auto md:grid-flow-row'>
        {
          boardMembers.map((member, index) => {
            return (
              <BoardMemberCard
                key={index}
                name={member.name}
                university={member.university}
                email={member.email}
              />
            )
          })
        }
      </div>
    </div>
  )
}


function BoardMemberCard({
  name,
  university,
  email
}) {
  return (
    <div className='grid grid-cols-1 gap-2 p-4 rounded-md shadow-lg lg:gap-4'>
      <h3 className='text-xl font-medium text-black md:text-2xl'>{name}</h3>
      <p className='font-normal text-gray-900 text-md md:text-lg'>{university}</p>
      <p className='text-sm font-light text-gray-800 md:text-md'>
        <a href={`mailto:${email}`} className='hover:text-blue-800 hover:underline'>{email}</a>
      </p>
    </div>
  )
}

export default About