import cookie from 'cookie'


export default function parse(req){
    return cookie.parse(req ? req.headers.cookie || '' : '')
}
