export interface InnerImage {
    width: number,
    height: number,
    format: string,
    url: string,
    _id: string
}


export default interface Image {
    public_id: string,
    images: Array<InnerImage>,
    _id: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}


