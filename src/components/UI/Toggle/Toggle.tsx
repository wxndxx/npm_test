'use client'

import React from 'react'
import s from './Toggle.module.scss'
import Icon from '../Icon/Icon';


interface IProps {
    onClick: () => void;
    isChecked: boolean;
    type: 'checkbox' | 'toggle' | 'rounded';
    
}

const Toggle: React.FC<IProps> = ({onClick, type='default', isChecked}) => {

    switch(type){
        case 'checkbox':
            return (
                <div onClick={onClick} className={isChecked ? s.checkbox_active : s.checkbox}>
                    <Icon type='success' color='rgba(0, 125, 191, 1)'/>
                </div> 
            )
        case 'rounded':
            return (
                <div onClick={onClick} className={!isChecked ? 'flex justify-center items-center w-[17px] h-[17px] xs:w-[24px] xs:h-[24px] rounded-[20px] border-[2px] border-gray4 hover:border-gray5 cursor-pointer' : 'cursor-pointer flex justify-center items-center w-[17px] h-[17px] xs:w-[24px] xs:h-[24px] rounded-[20px] border-[2px] border-prim3'}>
                    <div className={isChecked ? 'xs:w-[14px] w-[11px] h-[11px] xs:h-[14px] rounded-[50%] bg-prim3' : 'hidden'}>

                    </div>
                </div>
            )
        case 'toggle':
            return (
                <div onClick={onClick} className={s.toggle}>
                    <div className={!isChecked ? s.background : s.background__active}></div>
                    <div className={!isChecked ? s.forvard : s.forvard__active}>
        
                    </div>
                </div>
            )
        default:
            return
    }
}

export default Toggle