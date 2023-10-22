import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import AdminHeader from '../../../components/adminComponents/AdminHeader';
import EventDetailLink from '../../../components/adminComponents/eventComponents/EventDetailLink';
import { RequestHelper } from '../../../lib/request-helper';
import { useAuthContext } from '../../../lib/user/AuthContext';
import { QADocument } from '../../api/questions';
import { ScanReport } from '../../api/scan/report';

export function isAuthorized(user: any): boolean {
  if (!user || !user.permissions) return false;
  return (
    (user.permissions as string[]).includes('admin') ||
    (user.permissions as string[]).includes('organizer') ||
    (user.permissions as string[]).includes('super_admin')
  );
}

/**
 * The Scan Report Page
 *
 * Route: /admin/report
 */
export default function ScanReportPage({ reportData }: { reportData: ScanReport }) {
  const { user, isSignedIn } = useAuthContext();
  const [showRawData, setShowRawData] = useState(false);

  if (!isSignedIn || !isAuthorized(user))
    return <div className="text-2xl font-black text-center">Unauthorized</div>;

  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Admin</title>
        <meta name="description" content="HackPortal's Admin Page" />
      </Head>
      <AdminHeader />
      <div className="md:hidden">
        Screen too small, please use a larger screen to view the table.
      </div>
      <div className="hidden md:block p-6">
        <h1 className="font-bold text-xl">Scan Report:</h1>
        <div className="p-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Scan Name</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">University</th>
              </tr>
            </thead>
            <tbody>
              {reportData.all.map((scan, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{scan.scan}</td>
                  <td className="border px-4 py-2">{scan.id}</td>
                  <td className="border px-4 py-2">{scan.firstName}</td>
                  <td className="border px-4 py-2">{scan.lastName}</td>
                  <td className="border px-4 py-2">{scan.university}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-6">
        <h1 className="font-bold text-xl">Raw Data:</h1>
        <button
          className="bg-customPurple hover:bg-customPurple2 text-white transition-colors font-bold py-2 px-4 rounded"
          onClick={() => setShowRawData(!showRawData)}
        >
          {showRawData ? 'Hide' : 'Show'} Raw Data
        </button>
        <div className={`p-4 ${showRawData ? '' : 'hidden'}`}>
          <code>
            <pre>{JSON.stringify(reportData, null, 2)}</pre>
          </code>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data: rData } = await RequestHelper.get<QADocument[]>(
    `${protocol}://${context.req.headers.host}/api/scan/report`,
    {},
  );
  return {
    props: {
      reportData: rData,
    },
  };
};
