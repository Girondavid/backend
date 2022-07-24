import { Response } from "express";
import { Request } from "express";
import { DataSources } from "../database";
import { CartShop} from "../DataBases/CartShop";

export const getProductes = async(req:Request, res:Response)=>{
    try {
        const result = await DataSources.getRepository(CartShop).createQueryBuilder("Cart_shop").getMany();
        res.json(result);
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).send({
                message: error.message
            })
        }
    }
}
export const createProducts = async(req:Request, res:Response)=>{
    const { title, price, description, category, image, count} = req.body;
    try {
    if((title||price||description||category||image||count)===undefined||null){
    throw new Error;
    }else{
       await DataSources.createQueryBuilder()
       .insert().into(CartShop).values({
           title: title, price: price, description: description, category:category, image:image,
           count:count
       }).execute();
       res.status(200).json({
           product: 'product created'
       })
    }  
   } catch (error) {
       if(error instanceof Error){
        res.status(500).send({
            error: error.message
        })
       }
   }
}