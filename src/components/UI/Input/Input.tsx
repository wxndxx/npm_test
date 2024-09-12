'use client'

import React, { useState } from 'react'
import Icon from '../Icon/Icon';
import s from './Input.module.scss'


interface IProps {
    onClick?: () => void;
    onChange: (e: React.ChangeEvent<any>) => void;
    value: string;
    type?: 'search' | 'default' | 'deletion' | 'textarea';
    size?: string;
    disabled?: boolean;
    del?: () => void;
    ref?: any;
    error?: string;
    placeholder?: string;
    isPassword?: boolean;
    searchFunc?:() => void;
    customClass?:string
}

const Input: React.FC<IProps> = ({disabled = false, searchFunc, customClass, placeholder, onClick, type='default', value, del, onChange, isPassword}) => {

    // const [valueInput, onChangeVal] = useState('')
    // const [currentId, setCurrentId] = useState(0)

    // function leaveInput() {
    //     window.clearTimeout(currentId)
    //     func(valueInput)
    // }

    // function changeInput(e: React.ChangeEvent<any>) {
    //     onChangeVal(e.target.value)
    //     window.clearTimeout(currentId)
    //     const id = window.setTimeout(() => {
    //         func(valueInput)
    //     }, 2000)
    //     setCurrentId(id)
    // }

    const [focus, setFocus] = useState(false)

    switch(type){
        case 'search':
            return (
                <div onClick={onClick} className={!disabled ? focus ? s.input_focus : s.input : s.disabled}>
                    <Icon color='#9A9AA5' type='search' />
                    <input onKeyDown={(e) => {
                            if(e.key === "Enter") {
                                searchFunc && searchFunc()
                            }
                        }} disabled={disabled} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)} onChange={(e) => onChange(e)} value={value} placeholder={placeholder} type="text" />
                </div> 
            )
        case 'deletion':
            return (
                <div id={customClass} className={!disabled ? focus ? s.input_focus : s.input : s.disabled}>
                    <Icon color='#9A9AA5' type='search' />
                    <input onKeyDown={(e) => {
                        // debugger
                            if(e.key === "Enter") {
                                searchFunc && searchFunc()
                            }
                        }} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)} onChange={(e) => onChange(e)} value={value} placeholder={placeholder} type={isPassword ? "password" : "text"} />
                    <div onClick={() => del && del()}><Icon type='close' color='#E35656'/></div>
                </div> 
            )
        // <div className={s.input}>
        //             <input 
        //             onBlur={() => {
        //                 leaveInput()
        //             }} 
        //             onChange={(e) => {
        //                 changeInput(e)
        //             }} value={valueInput} onKeyDown={(e) => {
        //                     if(e.key === "Enter") {
        //                         func(valueInput)
        //                     }
        //                 }} placeholder={placeholder} type={isPassword ? "password" : "text"} />
        //         </div>
        case 'default':
            return (
                <div className={!disabled ? focus ? s.input_focus : s.input : s.disabled}>
                    <input disabled={disabled} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)} onChange={(e) => onChange(e)} value={value} placeholder={placeholder} type={isPassword ? "password" : "text"} />
                </div>
            )
        case 'textarea':
            return (
                <div className={!disabled ? focus ? s.input_focus : s.input : s.disabled}>
                    <textarea onBlur={() => setFocus(false)} onFocus={() => setFocus(true)} disabled={disabled} style={{resize: 'none', outline: 'none'}}></textarea>
                </div>
            )
        default:
            return
    }
}

export default Input