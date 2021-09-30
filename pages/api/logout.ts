import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie'

export default function logout(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET'){
        res.setHeader('Set-Cookie', cookie.serialize('auth', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development' ,
            expires: new Date(0),
            sameSite: 'strict',
            path: '/'
    
        })) 
        
        res.status(200).json({message: 'Success'})
      }else{
        res.setHeader('Allow', ['GET']);
        res.status(405).json({errors: [{msg: `Methond ${req.method} not allowed!`}]})
      }
}