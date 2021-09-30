import Image from './Image'
import User from './User'
import Category from './Category'


interface Ingredient {
    item: string,
    _id: string,
    item_id: string
}

interface Instruction {
    item: string,
    _id: string,
    item_id: string
}

export default interface Recipe {
    _id: string,
    slug: string
    name: string,
    category: Category,
    author: User, 
    tags: string[] | string,
    image: Image,
    quantity: string,
    time: string,
    description: string
    ingredients: Array<Ingredient>,
    instructions: Array<Instruction>,
    createdAt: string,
    updatedAt: string,
    __v: number
}