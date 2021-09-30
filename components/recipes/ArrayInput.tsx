import  { ReactElement, useState, MouseEvent, ChangeEvent } from 'react'
import {FaMinus, FaPlus} from 'react-icons/fa'
import {v4} from 'uuid'


interface Item {
    item: string,
    item_id: string,
    _id?: string
}

interface Props {
    name: string,
    values: Array<Item>,
    callback: (data: any)=> void,
    otherProps: any
}

function ArrayInput({name, callback, otherProps, values}: Props): ReactElement {
    

    const onAdd = () => {
        callback({...otherProps, [name]: [...values, {item: '', item_id: v4()}]})
    }

    const onRemove = (ev: MouseEvent<HTMLButtonElement>, index: number) : void=> {
       let tmp = values;
       tmp.splice(index, 1)
       callback({...otherProps, [name]: [...tmp]})
    }

    const onChange = (ev: ChangeEvent<HTMLTextAreaElement>, index: number) : void => {
       let newItm = values[index] = {...values[index], item: ev.target.value} 
       let tmp = [...values]
       tmp[index] = newItm;
       callback({...otherProps, [name]: [...tmp]})
    }
    
    return (
        <div className='array-input-wrapper'>
            <button onClick={onAdd} type='button' className='add'><FaPlus /></button> <span>{name}</span>
            {
                values.map((itm, i) => (
                    <div key={itm.item_id} className="item">
                        
                        <button id={itm.item_id} onClick={(e) => onRemove(e, i)} type='button'><FaMinus /></button>
                        <textarea name={itm.item_id} value={itm.item} onChange={e => onChange(e, i)} rows={5}></textarea>
                    </div>
                ))
            }
            
        </div>
    )
}

export default ArrayInput
