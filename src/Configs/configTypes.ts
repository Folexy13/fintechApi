import { Dialect,Op } from 'sequelize'
import * as dotenv from 'dotenv'
import { stringify } from 'querystring';
dotenv.config();

type Config = {
    PORT: number;
    DBPORT: number;
    DBNAME: string;
    DBHOST: string;
    DBUSERNAME: string;
    DBPASSWORD: string;
    DBDIALECT:Dialect,
    TWILLIO_ACCOUNT_SID: string;
	TWILLIO_AUTH_TOKEN: string;
    TWILLIO_MESSAGE_SERVICE_ID: string,
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
        TWILLIO_ACCOUNT_SID: String(process.env.TWILLIO_ACCOUNT_SID),
	    TWILLIO_AUTH_TOKEN: String(process.env.TWILLIO_AUTH_TOKEN),
        TWILLIO_MESSAGE_SERVICE_ID:String(process.env.TWILLIO_MESSAGE_SERVICE_ID),
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