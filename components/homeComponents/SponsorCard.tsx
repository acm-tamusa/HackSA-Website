import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import LoadIcon from '../LoadIcon';
import Image from 'next/image';

interface SponsorCardProps {
  link: string;
  name: string;
  reference: string;
}

/**
 * Keynote Speaker card for landing page.
 */
export default function SponsorCard(props: SponsorCardProps) {
  const [imgSrc, setImgSrc] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.reference !== undefined) {
      const storageRef = firebase.storage().ref();
      storageRef
        .child(`sponsor_images/${props.reference}`)
        .getDownloadURL()
        .then((url) => {
          setImgSrc(url);
          setLoading(false);
        })
        .catch((_) => {
          setLoading(false);
          console.error('Could not find matching image file');
        });
    }
  }, [props.reference]);

  if (loading) return <LoadIcon width={100} height={100} />;

  return (
    <>
      {imgSrc !== undefined && (
        <div className="flex justify-center">
          <a href={props.link} target="_blank" className="" rel="noreferrer">
            <Image src={imgSrc} width={250} height={150} layout="fixed" objectFit="contain" />
            <p className="text-center font-bold">{props.name}</p>
          </a>
          <br></br>
        </div>
      )}
    </>
  );
}
