import { useEffect, useState } from 'react';
import SponsorCard from './SponsorCard';

export default function HomeSponsors(props: { sponsorCard: Sponsor[] }) {
  const [sponsor, setSponsor] = useState<Sponsor[]>([]);

  useEffect(() => {
    setSponsor(props.sponsorCard);
  });

  return (
    sponsor.length != 0 && (
      <section
        className="md:p-12 p-6"
        style={{
          backgroundImage: `url('/assets/sponsorBG.png')`,
          backgroundSize: 'cover',
          overflowX: 'auto',
          overflowY: 'auto',
        }}
      >
        <div className="flex flex-col flex-grow bg-customPurple2 bg-opacity-40 rounded-md">
          <h4 className="text-complementary font-bold text-white md:text-4xl text-2xl my-4 px-4">
            Sponsors/Partners
          </h4>
          {/* Sponsor Card */}
          {/* <section className="flex justify-center p-4 rounded-md bg-gradient-to-tr from-purple-500 to-pink-600" */}
          <section
            className="flex justify-center p-4 rounded-md bg-gradient-to-tr from-purple-500 to-pink-600"
            style={{
              backgroundImage: `url('/assets/BG.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex flex-wrap rounded-md" style={{ flexDirection: 'row' }}>
              {sponsor.map(({ link, reference }, idx) => (
                <SponsorCard key={idx} link={link} reference={reference} />
              ))}
            </div>
          </section>
        </div>
      </section>
    )
  );
}
