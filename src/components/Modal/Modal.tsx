import React, { JSX } from 'react'
import './Modal.css'
import '../../assets/global.css';

interface ModalProps{
    children: JSX.Element;
}
export const Modal: React.FC<ModalProps> = ({children}) => {
    return (
        <div className='modal-overlay'>
            <div className='modal-container bg-color'>
                {children}
            </div>
        </div>
    )
}
