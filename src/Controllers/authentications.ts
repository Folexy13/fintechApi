//Imports
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//Destructured functions
import { RegisterDataType } from "../Helpers/types";
import { errorResponse } from "../Helpers/utility";


export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return errorResponse(res, 'Validation Error', errors.array());
    }
    const { firstName,lastName,phone, email, password,walletbalance= 0.00 } = req.body;
    //Hash user Password
    
        const salt: string = await bcrypt.genSalt(15);
        const hashedPwd:string = await bcrypt.hash(password,salt)
        
    let insertData: RegisterDataType = { firstName,lastName, phone, email,walletbalance, password: hashedPwd };

    return res.json(insertData)
}