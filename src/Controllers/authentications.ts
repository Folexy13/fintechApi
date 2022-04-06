//Imports
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//Import Db and configs
import config from '../Configs/configTypes';

//Destructured functions
import { RegisterDataType } from "../Helpers/types";
import { handleResponse,errorResponse } from "../Helpers/utility";

const DB = require('../Models')
const User =  DB.users

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

    try {
        const isExist: any = await User.findOne({ where: { email }, attributes: { exclude: ['createdAt', 'updatedAt'] } });

        if (isExist) return handleResponse(res, 400,false, `User with email ${email} already exists`);
        const user: any = await User.create(insertData);
        console.log(user)
        return res.json(user)
    } catch (error) {
        return handleResponse(res, 401, false, `An error occured - ${error}`);
    }
}