import cookie from 'cookie'
import {IncomingMessage} from 'http'



export default function parse(req: IncomingMessage){

    return cookie.parse(req ? req.headers.cookie || '' : '')
}
