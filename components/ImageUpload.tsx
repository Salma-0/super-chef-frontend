import {useState, useRef, ChangeEvent, FormEvent} from 'react'
import styles from '@styles/Modal.module.css'
import {FaUpload} from 'react-icons/fa'
import Image from 'next/image'

interface Props {
   callback: (file: File) => void 
}

 const ImageUpload = ({callback}: Props) => {
    const [image, setImage] = useState<any>(null)
    const ref = useRef<HTMLInputElement>(null)
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
        let file: File = (e.target.files as FileList)[0]
        setImage(file)
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) : void => {
        e.preventDefault()

        if(!image) return ;

        callback(image)
    }

    const onClick = () : void => ref.current?.click()
    return (
        <form className={styles.imageUpload} onSubmit={onSubmit}>
            {/* {image &&
            <div className={styles.preview}>
                <img src={URL.createObjectURL(image)} alt='' width='150' height='130'/>
            </div> */
            }
            
           
            <input ref={ref} type="file" onChange={handleChange}/>
            <div className={styles.customInput} onClick={onClick}>
                <FaUpload />
                <span>{image ? image.name : 'choose image'}</span>
            </div>
            <button type='submit'>upload</button>
        </form>
    )
}

export default ImageUpload;
