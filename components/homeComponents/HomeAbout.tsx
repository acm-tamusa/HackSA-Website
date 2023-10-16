import HomeFaq from './HomeFaq';

export default function HomeAbout(props: { answeredQuestions: AnsweredQuestion[] }) {
  return (
    <section
      className="md:p-12 p-6 text-complementary"
      style={{
        background:
          'rgb(27,87,35) linear-gradient(21deg, rgba(27,87,35,1) 0%, rgba(55,175,204,1) 50%, rgba(53,55,185,1) 71%, rgba(52,8,177,1) 100%)',
        backgroundSize: 'cover',
        backgroundImage: "url('public/assets/schedulebg2.png')",
        backgroundBlendMode: 'multiply',
        opacity: '0.99',
      }}
    >
      <h1 className="md:text-4xl text-2xl font-bold my-4 text-white">About HackSA</h1>
      <div className="md:text-base text-sm text-white">
        HackSA is the first 24-hour hackathon hosted by ACM TAMUSA. We are excited to bring this
        event
        <br />
        <br />
        HackSA is a place for students to learn, build, and share their creations in a friendly and
        <br />
        <br />
        <h4 className="lg:text-5xl md:text-7xl sm:text-6xl text-5xl text-center excelsior-script">
          Frequently Asked Questions
        </h4>
        <HomeFaq answeredQuestion={props.answeredQuestions} />
      </div>
    </section>
  );
}
