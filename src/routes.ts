//Imports
import { Router } from 'express'
import validate from './validate';
import { register } from './Controllers/authentications';


const router = Router();


// *******  API CALLS  ********
//Index to show our api is working
router.get('/', (req, res) => res.json({ message: 'Api is working' }))

//Endpoints
router.post('/register', validate('/register'),register)


export default router;