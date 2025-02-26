import { Request, Response } from "express";
import { deleteUser } from '../../../services/client/user';

export const remove = async (req: Request, res: Response) => {

    const user = await deleteUser(req.body.id);

    return res.status(200).json({
        message: "User removed",
        data: user
    });

};