import Image from './Image'

export interface Social {
    facebook: string,
    instagram: string,
    twitter: string
}

export default interface User {
    _id: string,
    name: string,
    email: string,
    avatar: Image | string | null,
    description: string,
    bio: string,
    social: Social
}


