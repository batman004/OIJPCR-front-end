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

      <EditorialBoardMembers />

      <Description>
        {AboutText}
      </Description>

      <div className="mx-4">
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
    <h1 className="text-3xl font-bold md:text-6xl primary-color">
      {props.children}
    </h1>
  )
}

function Description(props) {
  return (
    <p className="mt-8 text-justify">
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
    <>
      <div className='mt-6 mb-4'>
        <h2 className='text-xl font-bold text-black md:text-2xl'>
          Editorial Board Members
        </h2>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {
          boardMembers.map((member, index) => {
            return (
              <div className='px-2 py-4 mx-4 my-6 rounded-md shadow-lg lg:h-48'>
                <h3 className='my-2 text-xl font-medium text-gray-900 md:text-2xl'>{member.name}</h3>
                <p className='my-2 font-normal text-gray-800 text-md md:text-lg'>{member.university}</p>
                <p className='text-sm font-light text-gray-700 md:text-md'>Email: {member.email}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}


export default About