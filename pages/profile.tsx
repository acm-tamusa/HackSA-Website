import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../lib/user/AuthContext';
import LoadIcon from '../components/LoadIcon';
import { getFileExtension } from '../lib/util';
import QRCode from '../components/dashboardComponents/QRCode';
import GoogleWalletButton from '../components/profileComponents/GoogleWalletButton';

/**
 * A page that allows a user to modify app or profile settings and see their data.
 *
 * Route: /profile
 */
export default function ProfilePage() {
  const router = useRouter();
  const { isSignedIn, hasProfile, user, profile } = useAuthContext();
  const [uploading, setUploading] = useState<boolean>(false);
  const resumeRef = useRef(null);

  const handleResumeUpload = (profile) => {
    if (resumeRef.current.files.length !== 1) return alert('Must submit one file');

    const fileExtension = getFileExtension(resumeRef.current.files[0].name);
    const acceptedFileExtensions = [
      '.pdf',
      '.doc',
      '.docx',
      '.png',
      '.jpg',
      '.jpeg',
      '.txt',
      '.tex',
      '.rtf',
    ];

    if (!acceptedFileExtensions.includes(fileExtension))
      return alert(`Accepted file types: ${acceptedFileExtensions.join(' ')}`);

    const resumeFile = resumeRef.current.files[0];

    setUploading(true);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('fileName', `${user.id}${fileExtension}`);
    formData.append('studyLevel', profile.studyLevel);
    formData.append('major', profile.major);

    fetch('/api/resume/upload', {
      method: 'post',
      body: formData,
    }).then((res) => {
      if (res.status !== 200) alert('Resume upload failed...');
      else {
        setUploading(false);
        alert('Resume updated...');
      }
    });
  };

  if (!isSignedIn) {
    return <div className="p-4 flex-grow text-center">Sign in to see your profile!</div>;
  }

  if (!hasProfile) {
    router.push('/register');
    return <div></div>;
  }

  return (
    <div className="p-8 w-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <section className="w-full py-5">
          <div className="flex flex-col md:flex-row gap-x-10">
            <div
              className="bg-gray-300 w-full md:w-2/3 rounded-xl p-4 flex flex-col justify-around"
              style={{ minHeight: '500px' }}
            >
              <h1 className="font-bold text-xl text-center">HackPortal</h1> {/* !change */}
              <div className="mx-auto">
                <QRCode data={'hack:' + user.id} loading={false} width={200} height={200} />
                <GoogleWalletButton user={user} profile={profile} />
              </div>
              <div>
                <h1 className="text-center font-bold text-xl">{`${profile.user.firstName} ${profile.user.lastName}`}</h1>
                <p className="text-center">{profile.user.permissions[0]}</p>
              </div>
            </div>
            <div className="w-full my-5">
              <div className="profile-view">
                <div className="profile-view-name flex flex-col gap-y-2">
                  <div className="font-bold text-xl">Name</div>
                  <h1 className="font-bold">{`${profile.user.firstName} ${profile.user.lastName}`}</h1>
                </div>
                <div className="profile-view-role flex flex-col gap-y-2">
                  <div className="font-bold text-xl">Role</div>
                  <h1 className="font-bold">{profile.user.permissions[0]}</h1>
                </div>
                <div className="profile-view-univ flex flex-col gap-y-2">
                  <div className="font-bold text-xl">University</div>
                  <h1 className="font-bold">{profile.university}</h1>
                </div>
                <div className="profile-view-major flex flex-col gap-y-2">
                  <div className="font-bold text-xl">Major</div>
                  <h1 className="font-bold">{profile.major}</h1>
                </div>
                <div className="profile-view-stlvl flex flex-col gap-y-2">
                  <div className="font-bold text-xl">Level of Study</div>
                  <h1 className="font-bold">{profile.studyLevel}</h1>
                </div>
                <div>
                  {!uploading ? (
                    <>
                      <input
                        id="resume"
                        style={{ display: 'none' }}
                        type="file"
                        ref={resumeRef}
                        onChange={() => handleResumeUpload(profile)}
                        accept=".pdf, .doc, .docx, image/png, image/jpeg, .txt, .tex, .rtf"
                      />
                      <label
                        id="resume_label"
                        className="transition rounded p-3 text-center whitespace-nowrap text-white w-min bg-gray-500 cursor-pointer font-black gap-y-2 hover:brightness-110"
                        htmlFor="resume"
                      >
                        Update Resume
                      </label>
                    </>
                  ) : (
                    <LoadIcon width={16} height={16} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
