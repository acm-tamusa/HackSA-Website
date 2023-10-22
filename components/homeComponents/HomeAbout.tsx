import HomeFaq from './HomeFaq';

export default function HomeAbout(props: { answeredQuestions: AnsweredQuestion[] }) {
  return (
    <section className="md:p-12 p-6 text-complementary bg-gradient-to-br to-pink-600 from-purple-500">
      <div className="text md:text-4xl text-white text-2xl my-4">
        <h1 className="md:text-4xl text-2xl font-bold my-4 text-white">About HackSA</h1>{' '}
        <div
          className="md:text-base text-md text-left text-white bg-customPurple2 bg-opacity-50 
        rounded-md border-b-2 border-white-900 px-5 py-2"
        >
          <p className="">
            {' '}
            HackSA is Texas A&M University - San Antonio&apos;s ever hackathon. We have created this
            event centered around positive social impact. Whether that means addressing problems
            that affect the silent few or issues that are present worldwide, it is up to you and
            your team of 4 to decide how to approach our challenges with this theme in mind.
            <br />
            <br />
            We have made this event with students of all skill levels in mind. From first years to
            graduate level students, we offer challenges of various difficulties and many
            approachable options for participation. As well as a variety of workshops to help you
            get started. This event is open to everyone as we want to provide a space for students
            to learn, collaborate, and create something unique.
            <br />
            <br />
            The Team here at HackSA understands that the world is not perfect, but we believe that
            you can make it better. We hope to see you there!
            <br />
            <br />
          </p>
        </div>
      </div>
      <HomeFaq answeredQuestion={props.answeredQuestions} />
    </section>
  );
}
