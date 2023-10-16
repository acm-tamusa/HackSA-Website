import HomeFaq from './HomeFaq';

export default function HomeAbout(props: { answeredQuestions: AnsweredQuestion[] }) {
  return (
    <section className="md:p-12 p-6 text-complementary bg-gradient-to-b from-customPurple3 to-customPurple5">
      <h1 className="md:text-4xl text-2xl font-bold my-4 text-white">About HackSA</h1>
      <div className="md:text-base text-sm text-white">
        <p>
          HackSA is the first 24-hour hackathon hosted by ACM TAMUSA. We are excited to bring this
          event to our campus!
        </p>
        <br />
        <p>
          HackSA is a place for students to learn, build, and share their creations in a friendly
          and collaborative environment.
        </p>
        <br />
        <h4 className="lg:text-5xl md:text-7xl sm:text-6xl text-5xl text-center excelsior-script">
          Frequently Asked Questions
        </h4>
        <HomeFaq answeredQuestion={props.answeredQuestions} />
      </div>
    </section>
  );
}
