import axios from 'axios'
import cookie from 'cookie'
import {NextApiRequest, NextApiResponse} from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/users'

export default async function getUser(req: NextApiRequest, res: NextApiResponse){
    
    try {
        if(!req.headers.cookie){
            return res.status(403).json({errors: [{msg: 'Not Authorized'}]})
        }

        const {auth} = cookie.parse(req.headers.cookie)
        const authObj = JSON.parse(auth)
       // console.log(authObj)
        

        const response = await axios.get(API_URL, {headers: {'x-auth-token': authObj.token}, withCredentials: true})

        res.setHeader('Set-Cookie', cookie.serialize('auth', JSON.stringify({user: response.data, token: authObj.token}), {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 3,
            sameSite: 'strict',
            path: '/'
        }))

        return res.status(200).json(response.data)
    } catch (err) {
     //   console.log('ERROR:', err)
        return res.status(err.response.status).json(err.response.data)
    }
}