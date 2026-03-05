import uploadModel from "../models/UploadModel"
import {Request, Response} from "express";

async function getAll(req:Request, res:Response): Promise<Response> {
    try{
        const result = await uploadModel.getAll()
        return res.json(result.rows);
    }
    catch(error){
       return res.json(error);
    }
}

async function create(req:Request, res:Response):Promise<Response> {
    try{
        const {customer_id, file_path} = req.params;
        const result = await uploadModel.create(customer_id, file_path)
        return res.json(result)
    }
    catch(error){
        return res.json(error);
    }
}


module.exports = {
    getAll,
    create
};

// Gerencia o tráfego de entre middleware e serviço
// Recebe o arquivo do middleware
// Chama o serviço de extração 
// Trata erros
