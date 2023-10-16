import HomeFaq from './HomeFaq';

export default function HomeAbout(props: { answeredQuestions: AnsweredQuestion[] }) {
  return (
    <section className="md:p-12 p-6 text-complementary bg-gradient-to-br to-pink-600 from-purple-500">
      <HomeFaq answeredQuestion={props.answeredQuestions} />
    </section>
  );
}
