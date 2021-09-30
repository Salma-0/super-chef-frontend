import React, { ReactChild, ReactElement } from 'react'


interface Props {
    classes?: string ,
    children: ReactChild[]
}

function Container({classes, children}: Props): ReactElement {
    !classes && (classes = 'container')
    return (
        <div className={classes}>
            {children}
        </div>
    )
}



export default Container
