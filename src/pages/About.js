import {
  AboutText,
  HeadingText,
  JournalParticulars,
} from "../components/About";
import Podcast from "../components/Home/Podcast/Podcast";

const About = () => (
  <div className="flex-grow max-w-sm xs:max-w-lg sm:max-w-2xl md:max-w-5xl lg:max-w-7xl">
    <AboutContainer>
      <Heading>{HeadingText}</Heading>

      <Description>{<AboutText />}</Description>

      <h2 className="text-black text-center text-2xl my-4">
        Journal Particulars
      </h2>
      <JournalParticulars />
    </AboutContainer>

    <div className="sm:mx-4">
      <Podcast />
    </div>
  </div>
);

function AboutContainer(props) {
  return (
    <div className="mx-4 mt-8 mb-4 sm:mx-8 md:mx-8 md:mt-8 md:mb-6">
      {props.children}
    </div>
  );
}

function Heading(props) {
  return (
    <h1 className="text-3xl font-bold text-justify md:text-left md:text-6xl primary-color">
      {props.children}
    </h1>
  );
}

function Description(props) {
  return <p className="mt-8 text-justify lg:text-lg">{props.children}</p>;
}

export default About;
