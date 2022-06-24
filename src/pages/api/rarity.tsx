import type { NextApiRequest, NextApiResponse } from 'next'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (req: NextApiRequest, res: NextApiResponse) => {

    // Query params
    const { contract_address } = req.query;

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed', data : [] });
        return;
    }
    // Gateway UID must be a string
    if (typeof req.query.gatewayID !== 'string') {
        res.status(400).json({ message: 'Invalid gateway ID' });
        return;
    }

}