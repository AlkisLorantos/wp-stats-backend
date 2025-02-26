
// import { Request, Response } from "express";
// import { createUser } from "../../services/client/user";
// import crypto from 'crypto';

// export const create = async (req: Request, res: Response) => {

//     const user = await createUser({ ...req.body });

//     // const public_key = await crypto.randomBytes(127).toString('hex');

//     if ('error' in user) {

//         return res.status(400).json({
//             error: user.error
//         });

//     };

//     return res.status(200).json({
//         message: 'User created',
//         data: user
//     });

// };