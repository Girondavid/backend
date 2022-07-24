import { NextFunction, Request, Response } from "express";
import { DataSources } from "../database";
import * as yup from 'yup';
import { User } from "../DataBases/User";
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, apellido, email, password } = req.body;
        const schema = yup.object().shape({
            name: yup.string().min(2).matches(/^[a-z]+$/).required(),
            apellido: yup.string().min(2).matches(/^[a-z]+$/).required(),
            email: yup.string().matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/).required(),
            password: yup.string().min(6).matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/).required(),
        });
        if(!schema.isValidSync({name, apellido, email, password})){
            throw new Error('Necesitas poner adecuadamente los campos');
        }
        await DataSources.createQueryBuilder()
            .insert().into(User).values({
                name_user: name, apellido: apellido, email: email, password: password
            }).execute();
        res.status(200).json({
            User: "User created"
        })
        next();
    } catch (error) {
        if (error instanceof Error) {
            next(error)
            res.status(500).send({
                error: error.message
            })
        }
    }
}
export const getUSers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.find();
        next();
        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({
                message: error.message
            })
        }
    }
}
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findOneBy({ id_: parseInt(id) });
        if (!user) return res.status(404).json({ message: "User not found" });
        await User.update({ id_: parseInt(req.params.id) }, req.body);
        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await User.delete({ id_: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({
                message: 'user not found'
            })
        }
        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                Error: error.message
            })
        }
    }
}
export const postUserLoginName = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        if ((email || password) == undefined || null) {
            throw new Error;
        } else {
            const user = await DataSources
                .createQueryBuilder()
                .select(`user.name_user`)
                .from(User, `user`)
                .where(`user.email = :email`, { email: email })
                .andWhere(`user.password = :password`, { password: password })
                .getOneOrFail();
            next();
            return res.json(user);
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: "User not found"
            })
        }
    }
}