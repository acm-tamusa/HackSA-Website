import { firestore } from 'firebase-admin';
import { auth } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();

const USERS_COLLECTION = '/registrations';

/**
 *
 * Represent how data of a User is stored in the backend
 *
 */
export interface UserData {
  id: string;
  scans?: string[];
  user: {
    firstName: string;
    lastName: string;
    permissions: string[];
  };
}

/**
 *
 * API endpoint to fetch all users from the database
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function getAllUsers(req: NextApiRequest, res: NextApiResponse) {
  const { headers } = req;

  const userToken = headers['authorization'];
  const isAuthorized = await userIsAuthorized(userToken);

  if (!isAuthorized) {
    return res.status(403).json({
      msg: 'Request is not authorized to perform admin functionality.',
    });
  }

  const snapshot = await db.collection(USERS_COLLECTION).get();
  let data = [];

  snapshot.forEach((doc) => {
    if (doc.data().user) {
      if (doc.data().user.permissions) data.push(doc.data());
      else
        data.push({
          ...doc.data(),
          user: {
            ...doc.data().user,
            permissions: ['hacker'],
          },
        });
    }
  });

  res.json(data);
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getAllUsers(req, res);
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