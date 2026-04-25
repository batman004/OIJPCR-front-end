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

      <h2
        className="text-center md:text-left text-2xl md:text-3xl my-8 font-serif font-bold pb-3"
        style={{
          color: 'var(--color-primary)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
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
    <div className="mx-4 mt-10 mb-8 sm:mx-8 md:mx-12 md:mt-12 md:mb-10">
      {props.children}
    </div>
  );
}

function Heading(props) {
  return (
    <h1
      className="text-2xl md:text-4xl lg:text-5xl text-left font-serif font-bold leading-tight w-full"
      style={{ color: 'var(--color-primary)' }}
    >
      {props.children}
    </h1>
  );
}

function Description(props) {
  return (
    <div
      className="mt-8 text-justify w-full prose-academic-body"
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1.0625rem',
        lineHeight: 1.8,
        color: 'var(--color-text)',
      }}
    >
      {props.children}
    </div>
  );
}

export default About;
