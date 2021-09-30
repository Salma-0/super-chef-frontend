import Image from './Image'

interface Social {
    facebook: string,
    instagram: string,
    twitter: string
}

export default interface User {
    _id?: string,
    name: string,
    email?: string,
    avatar?: Image,
    description?: string,
    bio?: string,
    social?: Social
}