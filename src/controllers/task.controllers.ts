import { response } from "express";
import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database";

export const getData = (req: Request, res: Response) => {
    pool.query(`SELECT * from usercart`, (error, results: QueryResult) => {
        if (error) {
            res.status(400).json({
                mesage: "404 not found"
            })
        }
        res.status(200).json(results.rows);
    });
}
export const dataPost = async (req: Request, res: Response) => {
    const { name, apellido, email, password } = req.body;
    if (!name && !apellido && !email && !password) {
        res.json({
            mensaje: "Agregue los parametros: name, apellido, email, password"
        });
    } else {
        await pool.query(`INSERT INTO usercart(name_user, apellido,email,password_user)values($1, $2, $3, $4)`,
            [name, apellido, email, password], (error, results: QueryResult) => {
                if (error) {
                    res.status(400).json({
                        message: error.message
                    })
                } else {
                    res.status(200).json({
                        message: 'User Added successfully',
                        body: {
                            user: { name, apellido, email, password },
                        }
                    });
                }
            })
    }

}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.json({
                message: "User not found"
            });
        }
        const result: QueryResult = await pool.query(`SELECT * FROM usercart WHERE id_ = $1`, [id]);
        if (result.rows.length === 0) return res.status(404).json({
            message: "User not found"
        });
        res.json(result.rows);
    } catch (error) {
        res.json({
            message: { error }
        })
    }
}

export const getLoginUser = async (req: Request, res: Response) => {
    try {
        const { email, password_user } = req.body;
        const result: QueryResult = await pool.query(`SELECT name_user FROM usercart WHERE email = $1 
        AND password_user = $2 LIMIT 1`, [email, password_user]);
        if (result.rows.length === 0) return res.status(400).json({
            message: "User not found"
        })
        res.status(200).json(result.rows);
    } catch (error) {
        res.json({
            message: { error }
        })
    }
}