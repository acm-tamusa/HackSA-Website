import { firestore } from 'firebase-admin';
import { auth } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();

const USERS_COLLECTION = '/registrations';

interface UserScanReportData {
  id: string;
  scans?: string[];
  university?: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface ScanReportData {
  id: string;
  scan: string;
  firstName: string;
  lastName: string;
  university: string;
}

/**
 *
 * Contains all scan data for all users which have scan data.
 *
 */
export interface ScanReport {
  all: ScanReportData[];
  byUserId: {
    id: string;
    data: ScanReportData[];
  }[];
  byScanName: {
    scan: string;
    data: ScanReportData[];
  }[];
}

/**
 *
 * API endpoint to fetch all users with scan data, and their scan data.
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function getScanReport(req: NextApiRequest, res: NextApiResponse) {
  const { headers } = req;

  //const userToken = headers['authorization'] ?? '';
  //const isAuthorized = await userIsAuthorized(userToken);

  //if (!isAuthorized) {
  //  return res.status(403).json({
  //    msg: 'Request is not authorized to perform admin functionality.',
  //  });
  //}
  const users = await db.collection(USERS_COLLECTION).get();
  const usersData: UserScanReportData[] = [];
  users.forEach((user) => {
    const userData = user.data();
    if (!userData || !userData.scans) {
      return;
    }
    usersData.push({
      id: user.id,
      scans: userData.scans,
      university: userData.university,
      user: {
        firstName: userData.user.firstName,
        lastName: userData.user.lastName,
      },
    });
  });
  const scanData: ScanReportData[] = [];
  for (const user of usersData) {
    for (const scan of user.scans) {
      scanData.push({
        id: user.id,
        scan,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        university: user.university,
      });
    }
  }
  let byUserId: Map<string, ScanReportData[]> = new Map();
  let byScanName: Map<string, ScanReportData[]> = new Map();
  for (const scan of scanData) {
    if (byUserId.has(scan.id)) {
      byUserId.get(scan.id).push(scan);
    } else {
      byUserId.set(scan.id, [scan]);
    }
    if (byScanName.has(scan.scan)) {
      byScanName.get(scan.scan).push(scan);
    } else {
      byScanName.set(scan.scan, [scan]);
    }
  }
  const byUserIdArray: { id: string; data: ScanReportData[] }[] = [];
  const byScanNameArray: { scan: string; data: ScanReportData[] }[] = [];
  byUserId.forEach((value, key) => {
    byUserIdArray.push({ id: key, data: value });
  });
  byScanName.forEach((value, key) => {
    byScanNameArray.push({ scan: key, data: value });
  });
  return res.json({
    all: scanData,
    byUserId: byUserIdArray,
    byScanName: byScanNameArray,
  });
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getScanReport(req, res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      return handleGetRequest(req, res);
    }
    default: {
      return res.status(404).json({
        msg: 'Route not found',
      });
    }
  }
}
