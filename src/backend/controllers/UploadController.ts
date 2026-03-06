import uploadModel from "../models/UploadModel"
import {Request, Response} from "express";

export async function getAll(req:Request, res:Response): Promise<Response> {
    try{
        const result = await uploadModel.getAll()
        return res.json(result);
    }catch(error){
       return res.json(error);
    }
}

export async function create(req:Request, res:Response):Promise<Response> {
    try{
        const {customer_id, file_path} = req.params;
        const result = await uploadModel.create(Number(customer_id), String(file_path))
        return res.json(result)
    }catch(error){
        return res.json(error);
    }
}


module.exports = {
    getAll,
    create
}
