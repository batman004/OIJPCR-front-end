import Podcast from '../components/Home/Podcast/Podcast'
import {
  HeadingText,
  AboutText
} from "../components/About";

const About = () => (
  <div className="flex-grow">
    <AboutContainer>
      <Heading>
        {HeadingText}
      </Heading>

      <Description>
        {AboutText}
      </Description>

      <Podcast />
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
    <h1 className="text-3xl font-bold text-left md:text-6xl primary-color">
      {props.children}
    </h1>
  )
}

function Description(props) {
  return (
    <p className="mt-8">
      {props.children}
    </p>
  )
}

export default About