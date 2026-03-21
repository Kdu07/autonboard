import { Request, Response } from "express";
import { request } from "http";

export async function ExtractionExcell(req: Request, res: Response): Promise<void> {
    try {
       const file = req.file 

       if(!file){
        res.status(400).json({ error: 'Nenhum arquivo enviado ou o campo não é "file".' });
        return;
       }

    } catch (err) {
        console.error
        res.status(500).json({err: "This is a error."})
    }
}


class ExcelFile 