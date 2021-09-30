import cookie from 'cookie'
import {NextApiRequest, NextApiResponse} from 'next'
import axios from 'axios'



const API_URL = process.env.API_URL + '/auth';

export default async function login(req: NextApiRequest, res: NextApiResponse){

    try {
        const response = await axios.post(API_URL, req.body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })


        const userRes = await axios.get(process.env.API_URL+'/users', {
            headers: {
                'x-auth-token': response.data
            }
        })

        res.setHeader('Set-Cookie', cookie.serialize('auth', JSON.stringify({user: userRes.data, token: response.data}), {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 3,
            sameSite: 'strict',
            path: '/'
        }))
        

        return res.status(200).json(response.data)
        
    } catch (err) {
        console.error(err.response.data)
        return res.status(err.response.status).json(err.response.data)
    }

}