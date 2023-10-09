export default function HomeAbout() {
  return (
    <section
      className="md:p-12 p-6 text-complementary"
      style={{
        // backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/hacksa-62c97.appspot.com/o/background_images%2Fburgundy.jpg?alt=media&token=8cf817bc-0d29-4b69-8fa8-07eac0bcf34d&_gl=1*1xh9ndu*_ga*MTA5NjM2NjQ3My4xNjk2MDU0MDg2*_ga_CW55HF8NVT*MTY5Njc5MjM5My4xOC4xLjE2OTY3OTI4NDEuMjMuMC4w')",
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        backgroundColor: '#612C96', // !change I have no idead what color to make this stuff so I just made it look good
        backgroundImage: "url('')",
        backgroundPosition: 'center',
        opacity: '0.99',
      }}
    >
      <h1 className="md:text-4xl text-2xl font-bold my-4 text-white">About HackSA</h1>{' '}
      {/* !change */}
      <div className="md:text-base text-sm text-white">
        HackSA is the first 24-hour hackathon hosted by ACM TAMUSA.
        <br />
        <br />
        FILL THIS IN LATER - BLEEH BLAHH BLEEH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH
        BLAH BLAH BLAH BLAH BLAH BLAH FILL THIS IN LATER
        <br />
        <br />
        <h4 className="lg:text-8xl md:text-7xl sm:text-6xl text-5xl text-center excelsior-script">
          Frequently Asked Questions
        </h4>
      </div>
    </section>
  );
}
