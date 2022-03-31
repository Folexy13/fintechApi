import { Dialect } from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config();

type Config = {
    PORT: number,
    DBPORT: number,
    DBNAME: string,
    DBHOST: string,
    DBUSERNAME: string,
    DBPASSWORD: string,
    DBDIALECT:Dialect
    
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