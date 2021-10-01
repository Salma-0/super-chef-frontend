import axios from 'axios'
import {NextApiRequest, NextApiResponse} from 'next'
import cookie from 'cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default async function signup(req: NextApiRequest, res: NextApiResponse){
    try {
        const response = await axios.post(`${API_URL}/users`, req.body, {
            headers: {'Content-Type': 'application/json'}
        })

        const userRes = await axios.get(`${API_URL}/users`, {headers: {'x-auth-token': response.data}})

        res.setHeader('Set-Cookie', cookie.serialize('auth', JSON.stringify({token: response.data, user: userRes.data}), {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 3,
            sameSite: 'strict',
            path: '/'
        }))

        return res.status(200).json(response.data)
       
    } catch (err) {
        res.status(err.response.status).json(err.response.data)
    }
}