// import { Prisma, PrismaClient, User } from "@prisma/client";
// import jwt from 'jsonwebtoken';
// import crypto from 'crypto';

// const prisma = new PrismaClient();

// type Response = User | { error: string };

// export const createUser = async (data: Prisma.UserCreateInput): Promise<Response> => {

//     const public_key = crypto.randomBytes(127).toString('base64');
//     const secret_key = await jwt.sign(data.username, process.env.TOKEN_SECRET);

//     try {

//         const user = await prisma.user.create({
//             data: {
//                 authId: 1234657890,
//                 joinedAt: new Date(),
//                 scopes: ['player', 'league', 'game'],
//                 apiToken: public_key,
//                 apiSecret: secret_key,
//                 usage: 1,
//                 ...data,
//             }
//         });
    
//         return user;

//     } catch (err) {

//         if (!(err instanceof Prisma.PrismaClientKnownRequestError)) throw err;
    
//         let errorMessage: string;

//         switch (err.code) {

//             case "P2002":

//                 errorMessage = `Duplicate field value: ${err.meta.target}`;
          
//         };

//         return {
//             error: errorMessage
//         };

//     };

// };

// export const deleteUser = async (id: number) => {

//     const user = await prisma.user.delete({
//         where: {
//             id
//         },
//     });

//     return user;

// };

// case 'P2014':
//             // handling invalid id errors
//             return new CustomError(`Invalid ID: ${err.meta.target}`, 400);
//         case 'P2003':
//             // handling invalid data errors
//             return new CustomError(`Invalid input data: ${err.meta.target}`, 400);
//         default:
//             // handling all other errors
//             return new CustomError(`Something went wrong: ${err.message}`, 500);
//     }