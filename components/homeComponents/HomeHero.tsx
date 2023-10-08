import { useRouter } from 'next/router';
import { buttonDatas } from '../../lib/data';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomeHero() {
  const router = useRouter();

  return (
    <section
      className="min-h-screen p-4 bg-gradient-to-t from-purple-900 to-purple-5"
      style={{
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/hacksa-62c97.appspot.com/o/background_images%2Ftransparent_purpleBG.png?alt=media&token=d5ae999d-54aa-462c-a3f1-bf586de7800a&_gl=1*9e1u44*_ga*MTA5NjM2NjQ3My4xNjk2MDU0MDg2*_ga_CW55HF8NVT*MTY5Njc5MjM5My4xOC4xLjE2OTY3OTQ3NjMuNDkuMC4w')",
      }}
    >
      <div
        style={{ minHeight: 480 }}
        className="max-w-4xl mx-auto flex flex-col justify-center items-center gap-4"
      >
        {/* TAMUSA OUTLINE IMAGE */}
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/hacksa-62c97.appspot.com/o/background_images%2Fpurple_Tamusa_outline.png?alt=media&token=9349c32f-34a5-41c7-9e91-057183239992&_gl=1*patkrz*_ga*MTA5NjM2NjQ3My4xNjk2MDU0MDg2*_ga_CW55HF8NVT*MTY5Njc0NjAwNi4xNS4xLjE2OTY3NDYwMTQuNTIuMC4w"
          alt="Tamusa Outline"
          width={1000}
          height={775}
        />
        <h1 className="text-center md:text-8xl text-6xl font-bold text-white">HackSA</h1>{' '}
        <TimeToEvent />
        <p className="text-center font-semibold md:text-xl text-md text-white opacity-100">
          October 23rd - 24th
        </p>
        <Link href="#" passHref>
          {/* TODO: Fix link */}
          <a className="px-8 py-2 bg-purple-600 hover:bg-purple-700 font-bold md:text-xl text-md text-white rounded-full transition-colors">
            REGISTER
          </a>
        </Link>
        <p className="text-center md:text-xl text-md text-white opacity-100">
          JOIN US TO MAKE THE MOST INCLUSIVE HACKATHON IN TEXAS
        </p>
      </div>
      {/* TODO: Programmatically show these based on configured times/organizer preference */}
      <div className="flex flex-col items-center md:flex-row md:justify-around mt-6 px-44 md:space-y-0 space-y-3 > *">
        {buttonDatas.map((button) => (
          <button
            key={button.text}
            onClick={() => router.push(button.path)}
            className="max-w-[14rem] w-[14rem] md:max-w-full bg-white py-4 rounded-xl h-10 flex items-center justify-center font-semibold text-xl text-primaryDark border-2 border-gray-300"
          >
            {button.text}
          </button>
        ))}
      </div>
    </section>
  );
}

function TimeToEvent() {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const eventStart = new Date('23 October 2023 10:00').getTime();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getTimeDifference = (): string => {
    const diff = eventStart - currentTime;
    const days = Math.floor(diff / 8.64e7)
      .toString()
      .padStart(2, '0');
    const hours = Math.floor((diff % 8.64e7) / 3.6e6)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((diff % 3.6e6) / 6e4)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((diff % 6e4) / 1e3)
      .toString()
      .padStart(2, '0');
    return `${days} : ${hours} : ${minutes} : ${seconds}`;
  };

  return currentTime < eventStart ? (
    <p className="text-white text-md">
      <strong>TIME UNTIL HACKSA</strong>: <span>{getTimeDifference()}</span>
    </p>
  ) : (
    <p>HAPPENING NOW</p>
  );
}
