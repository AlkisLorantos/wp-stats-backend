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

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

// Hash password securely using bcrypt
const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compare hashed passwords securely
const verifyPassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(inputPassword, hashedPassword);
};

// Generate JWT token
const generateToken = (userId: number, role: string): string => {
    return jwt.sign(
        { userId, role }, 
        process.env.JWT_SECRET as string, 
        {
            expiresIn: process.env.JWT_EXPIRES_IN && !isNaN(Number(process.env.JWT_EXPIRES_IN)) 
                ? Number(process.env.JWT_EXPIRES_IN) 
                : "7d",
        }
    );
    
 
};

// Create a new user
export const createUser = async (username: string, password: string, role: string) => {
    const hashedPassword = await hashPassword(password);

    return await prisma.user.create({
        data: {
            username,
            password: hashedPassword, // Store bcrypt hashed password
            role,
        },
    });
};

// Authenticate user
export const authenticateUser = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user || !user.password) {
        throw new Error("Invalid username or password");
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid username or password");
    }

    const token = generateToken(user.id, user.role);
    return { token, user };
};
