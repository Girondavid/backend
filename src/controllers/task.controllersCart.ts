import { pool } from "../database";
import { Request, Response } from "express";
import { QueryResult } from "pg";
export const getItemsCart = (req: Request, res: Response) => {
    pool.query('select * from cartitem', (error, results: QueryResult) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}
export const postCarItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, price, description, category, image, count } = req.body;
        await pool.query(`INSERT INTO cartitem(title, price, description, category, image, count)
        VALUES($1, $2, $3, $4, $5, $6)`,
        [title, price, description, category, image, count]);
        console.log(title, price, description, category, image, count);
        res.json({
            message: 'Product added successfully',
            body: {
                user: { category, description, price, title, count, image }
            }
        })
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}
export const getItemId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.json({
                message: "User not found"
            });
        }
        const result: QueryResult = await pool.query(`SELECT * FROM cartitem WHERE id_ = $1`, [id]);
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
