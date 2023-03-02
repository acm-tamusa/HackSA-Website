import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LoadIcon from '../components/LoadIcon';
import { useUser } from '../lib/profile/user-data';
import { RequestHelper } from '../lib/request-helper';
import { useAuthContext } from '../lib/user/AuthContext';
import firebase from 'firebase/app';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import schools from '../public/schools.json';
import majors from '../public/majors.json';
import { hackPortalConfig, formInitialValues } from '../hackportal.config';
import DisplayQuestion from '../components/registerComponents/DisplayQuestion';
import { getFileExtension } from '../lib/util';
import Link from 'next/link';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

/**
 * The registration page.
 *
 * Registration: /
 */

export default function Register() {
  const router = useRouter();

  const {
    registrationFields: {
      generalQuestions,
      schoolQuestions,
      hackathonExperienceQuestions,
      eventInfoQuestions,
      sponsorInfoQuestions,
    },
  } = hackPortalConfig;

  const { user, hasProfile, updateProfile } = useAuthContext();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [formValid, setFormValid] = useState(true);
  const [registrationSection, setRegistrationSection] = useState(0);
  const checkRedirect = async () => {
    if (hasProfile) router.push('/profile');
    else setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      //load json data into dropdown list for universities and majors
      if (document.getElementById('schools') !== null) {
        for (let school of schools) {
          let option = document.createElement('option');
          option.text = school['university'];
          option.value = school['university'];
          let select = document.getElementById('schools');
          select.appendChild(option);
        }
      }

      if (document.getElementById('majors') !== null) {
        for (let major of majors) {
          let option = document.createElement('option');
          option.text = major['major'];
          option.value = major['major'];
          let select = document.getElementById('majors');
          select.appendChild(option);
        }
      }
    }, 0);
    //setting user specific initial values
    formInitialValues['id'] = user?.id || '';
    formInitialValues['preferredEmail'] = user?.preferredEmail || '';
    formInitialValues['firstName'] = user?.firstName || '';
    formInitialValues['lastName'] = user?.lastName || '';
    formInitialValues['permissions'] = user?.permissions || ['hacker'];
  }, []);

  useEffect(() => {
    checkRedirect();
  }, [user]);

  const handleSubmit = async (registrationData) => {
    try {
      if (resumeFile) {
        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('fileName', `${user.id}${getFileExtension(resumeFile.name)}`);
        formData.append('studyLevel', registrationData['studyLevel']);
        formData.append('major', registrationData['major']);

        await fetch('/api/resume/upload', {
          method: 'post',
          body: formData,
        });
      }
      await RequestHelper.post<Registration, any>('/api/applications', {}, registrationData);
      alert('Registered successfully');
      updateProfile(registrationData);
      router.push('/profile');
    } catch (error) {
      console.error(error);
      console.log('Request creation error');
    }
  };

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length !== 1) return alert('Must submit one file');

    const file = e.target.files[0];

    const fileExtension = getFileExtension(file.name);

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

    setResumeFile(file);
  };

  if (!user) {
    router.push('/');
  }

  if (loading) {
    return <LoadIcon width={200} height={200} />;
  }

  //disables submitting form on enter key press
  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  const setErrors = (obj, values, errors) => {
    if (obj.textInputQuestions)
      for (let inputObj of obj.textInputQuestions) {
        if (inputObj.required) {
          if (!values[inputObj.name]) errors[inputObj.name] = 'Required';
        }
      }
    if (obj.numberInputQuestions)
      for (let inputObj of obj.numberInputQuestions) {
        if (inputObj.required) {
          if (!values[inputObj.name] && values[inputObj.name] !== 0)
            errors[inputObj.name] = 'Required';
        }
      }
    if (obj.dropdownQuestions)
      for (let inputObj of obj.dropdownQuestions) {
        if (inputObj.required) {
          if (!values[inputObj.name]) errors[inputObj.name] = 'Required';
        }
      }
    if (obj.checkboxQuestions)
      for (let inputObj of obj.checkboxQuestions) {
        if (inputObj.required) {
          if (!values[inputObj.name]) errors[inputObj.name] = 'Required';
        }
      }
    if (obj.datalistQuestions)
      for (let inputObj of obj.datalistQuestions) {
        if (inputObj.required) {
          if (!values[inputObj.name]) errors[inputObj.name] = 'Required';
        }
      }
    if (obj.textAreaQuestions)
      for (let inputObj of obj.textAreaQuestions) {
        if (inputObj.required) {
          if (!values[inputObj.name]) errors[inputObj.name] = 'Required';
        }
      }

    return errors;
  };

  return (
    <div className="flex flex-col flex-grow bg-secondary">
      <Head>
        <title>Hacker Registration</title>
        <meta name="description" content="Register for [HACKATHON NAME]" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="pt-4 pl-4">
        <Link href="/" passHref>
          <div className="cursor-pointer items-center inline-flex text-primaryDark font-semibold text-lg">
            <ChevronLeftIcon />
            return to event site
          </div>
        </Link>
      </section>
      <section id="jumbotron" className="text-primaryDark text-4xl font-bold text-center mb-6">
        HackPortal Hacker Registration
      </section>

      <section className="relative">
        <Formik
          initialValues={formInitialValues}
          //validation
          //Get condition in which values.[value] is invalid and set error message in errors.[value]. Value is a value from the form(look at initialValues)
          validate={(values) => {
            var errors: any = {};
            for (let obj of generalQuestions) {
              errors = setErrors(obj, values, errors);
            }
            for (let obj of schoolQuestions) {
              errors = setErrors(obj, values, errors);
            }
            for (let obj of hackathonExperienceQuestions) {
              errors = setErrors(obj, values, errors);
            }
            for (let obj of eventInfoQuestions) {
              errors = setErrors(obj, values, errors);
            }
            for (let obj of sponsorInfoQuestions) {
              errors = setErrors(obj, values, errors);
            }

            //additional custom error validation
            if (
              values.preferredEmail &&
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.preferredEmail)
            ) {
              //regex matches characters before @, characters after @, and 2 or more characters after . (domain)
              errors.preferredEmail = 'Invalid email address';
            }
            if ((values.age && values.age < 1) || values.age > 100) {
              errors.age = 'Not a valid age';
            }
            if (
              (values.hackathonExperience && values.hackathonExperience < 0) ||
              values.hackathonExperience > 100
            ) {
              errors.hackathonExperience = 'Not a valid number';
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise((r) => setTimeout(r, 500));
            let finalValues: any = values;
            //add user object
            const userValues: any = {
              id: values.id,
              firstName: values.firstName,
              lastName: values.lastName,
              preferredEmail: values.preferredEmail,
              permissions: values.permissions,
            };
            finalValues['user'] = userValues;
            //delete unnecessary values
            delete finalValues.firstName;
            delete finalValues.lastName;
            delete finalValues.permissions;
            delete finalValues.preferredEmail;

            //submitting
            handleSubmit(values);
            setSubmitting(false);
            // alert(JSON.stringify(values, null, 2)); //Displays form results on submit for testing purposes
          }}
        >
          {({ values, handleChange, isValid, dirty }) => (
            // Field component automatically hooks input to form values. Use name attribute to match corresponding value
            // ErrorMessage component automatically displays error based on validation above. Use name attribute to match corresponding value
            <Form
              onKeyDown={onKeyDown}
              noValidate
              className="registrationForm flex flex-col px-6 w-full text-lg"
            >
              {/* General Questions */}
              {registrationSection == 0 && (
                <section className="bg-white lg:w-3/5 md:w-3/4 min-h-[35rem] mx-auto rounded-2xl py-10 px-8 mb-8 text-[#4C4950] text-base">
                  Please fill out the following fields. The application should take approximately 5
                  minutes.
                  <h2 className="text-2xl font-semibold mt-5 mb-3">General</h2>
                  <div className="flex flex-col">
                    {generalQuestions.map((obj, idx) => (
                      <DisplayQuestion
                        key={idx}
                        obj={obj}
                        values={values}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* School Questions */}
              {registrationSection == 1 && (
                <section className="bg-white w-3/5 min-h-[35rem] mx-auto rounded-2xl py-10 px-8 mb-8 text-[#4C4950] text-base">
                  Please fill out the following fields. The application should take approximately 5
                  minutes.
                  <h2 className="text-2xl font-semibold mt-5 mb-3">School Info</h2>
                  <div className="flex flex-col">
                    {schoolQuestions.map((obj, idx) => (
                      <DisplayQuestion
                        key={idx}
                        obj={obj}
                        values={values}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Hackathon Questions */}
              {registrationSection == 2 && (
                <section className="bg-white w-3/5 min-h-[35rem] mx-auto rounded-2xl py-10 px-8 mb-8 text-[#4C4950] text-base">
                  Please fill out the following fields. The application should take approximately 5
                  minutes.
                  <h2 className="text-2xl font-semibold mt-5 mb-3">Hackathon Experience</h2>
                  <div className="flex flex-col">
                    {hackathonExperienceQuestions.map((obj, idx) => (
                      <DisplayQuestion
                        key={idx}
                        obj={obj}
                        values={values}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Event Questions */}
              {registrationSection == 3 && (
                <section className="bg-white w-3/5 min-h-[35rem] mx-auto rounded-2xl py-10 px-8 mb-8 text-[#4C4950] text-base">
                  Please fill out the following fields. The application should take approximately 5
                  minutes.
                  <h2 className="text-2xl font-semibold mt-5 mb-3">Event Info</h2>
                  <div className="flex flex-col">
                    {eventInfoQuestions.map((obj, idx) => (
                      <DisplayQuestion
                        key={idx}
                        obj={obj}
                        values={values}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Sponsor Questions */}
              {registrationSection == 4 && (
                <section className="bg-white w-3/5 min-h-[35rem] mx-auto rounded-2xl py-10 px-8 mb-8 text-[#4C4950] text-base">
                  Please fill out the following fields. The application should take approximately 5
                  minutes.
                  <h2 className="text-2xl font-semibold mt-5 mb-3">Sponsor Info</h2>
                  <div className="flex flex-col">
                    {sponsorInfoQuestions.map((obj, idx) => (
                      <DisplayQuestion
                        key={idx}
                        obj={obj}
                        values={values}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                  {/* Resume Upload */}
                  <div className=" mt-8">
                    Upload your resume:
                    <br />
                    <input
                      onChange={(e) => handleResumeFileChange(e)}
                      name="resume"
                      type="file"
                      formEncType="multipart/form-data"
                      accept=".pdf, .doc, .docx, image/png, image/jpeg, .txt, .tex, .rtf"
                    />
                    <br />
                  </div>
                  {/* Submit */}
                  <div className="mt-8 text-white">
                    <button
                      type="submit"
                      className="mr-auto cursor-pointer px-4 py-2 rounded-lg bg-primaryDark hover:brightness-90"
                      onClick={() => setFormValid(!(!isValid || !dirty))}
                    >
                      Submit
                    </button>
                    {!isValid && !formValid && (
                      <div className="text-red-600">Error: The form has invalid fields</div>
                    )}
                  </div>
                </section>
              )}
            </Form>
          )}
        </Formik>

        <section
          className={`lg:block flex ${
            registrationSection == 0
              ? 'justify-end'
              : registrationSection >= 4
              ? 'justify-start'
              : 'justify-between'
          } lg:pb-0 pb-5 lg:px-0 px-5`}
        >
          {registrationSection > 0 && (
            <div
              className="lg:fixed 2xl:bottom-8 2xl:left-8 bottom-6 left-6 inline text-primaryDark font-semibold cursor-pointer select-none"
              onClick={() => {
                setRegistrationSection(registrationSection - 1);
              }}
            >
              <ChevronLeftIcon />
              previous page
            </div>
          )}

          {registrationSection < 4 && (
            <div
              className="lg:fixed 2xl:bottom-8 2xl:left-8 bottom-6 right-6 inline text-primaryDark font-semibold cursor-pointer select-none"
              onClick={() => {
                setRegistrationSection(registrationSection + 1);
              }}
            >
              next page
              <ChevronRightIcon />
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
