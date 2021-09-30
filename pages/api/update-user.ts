import cookie from 'cookie'
import {NextApiRequest, NextApiResponse} from 'next'
import User from 'types/User'
import axios from 'axios'

const API_URL = process.env.API_URL + '/users'

export default async function updateUser(req: NextApiRequest, res: NextApiResponse<User>){
    try {
        if(!req.headers.cookie){
            return res.status(403).json({errors: [{msg: 'Not Authorized'}]})
        }

        const {auth} = cookie.parse(req.headers.cookie)
        const authObj = JSON.parse(auth)


        const response = await axios.put(API_URL, req.body, {
            headers: {
                'x-auth-token': authObj.token
            }
        })

        console.log('updatedUser', response.data)

        res.setHeader('Set-Cookie', cookie.serialize('auth', JSON.stringify({user: response.data, token: authObj.token}), {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 3,
            sameSite: 'strict',
            path: '/'
        }))

        return res.status(200).json(response.data)
    } catch (err) {
       // console.log(err.response.data)
        return res.status(err.response.status).json(err.response.data)
    }

}