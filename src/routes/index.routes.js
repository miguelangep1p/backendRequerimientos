import{Router} from 'express'
import {pool} from '../database'
const router = Router()

router.get('/ping', async (req, res) => {
    const[result]=await pool.query('SELECT "Pong" AS result')
    res.json(result[0])});


    module.exports = router;
