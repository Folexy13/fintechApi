import { Dialect,OperatorsAliases,Op } from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config();

type Config = {
    PORT: number,
    DBPORT: number,
    DBNAME: string,
    DBHOST: string,
    DBUSERNAME: string,
    DBPASSWORD: string,
    DBDIALECT:Dialect,
    OPERATORALIASES: Boolean;
    POOL: {
        max: number
        min:number
        acquire: number,
        idle:number
    }
    
};


const getConfig= (): Config => {
    return{
        PORT: Number(process.env.PORT),
        DBPORT: Number(process.env.DBPORT),
        DBNAME: String(process.env.DBNAME),
        DBHOST: String(process.env.DBHOST),
        DBUSERNAME: String(process.env.DBUSERNAME),
        DBPASSWORD: String(process.env.DBPASSWORD),
        DBDIALECT: 'mysql',
        OPERATORALIASES: false,
         POOL: {
        max: 5,
        min:0,
        acquire: 30000,
        idle:100000,
    }
    }
}

const getSanitizedConfig = (config: Config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`);
        }
    }
    return config as Config
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;