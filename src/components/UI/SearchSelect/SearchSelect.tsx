'use client'

import React, { useState } from 'react'
import s from './SearchSelect.module.scss'
import useOnclickOutside from 'react-cool-onclickoutside';
import Image from 'next/image';
import notFound from '../../../../public/images/notFound.png'
import { API_BASE_URL_2 } from '@/api/api';

interface ITitle {
    id: number,
    name: string,
    image?: string,
}

interface IToggleProps {
    list: ITitle[],
    title: string,
    value: string,
    unfilter: ITitle[],
    disabled?: boolean,
    setVal:(item:any) => void,
    onChange: (item:any) => void,
}

const SearchSelect: React.FC<IToggleProps> = ({
    list,
    value,
    onChange,
    unfilter,
    setVal,
    disabled,
    title,}) => {

    const [isOpen, setIsOpen] = useState(true);
    const ref = useOnclickOutside((e: any) => {
        if(e.target.classList && e.target.classList.length > 0 && e.target.classList[0] === s.select) return
        setIsOpen(true)
    });
    
    // function selectedFunc(item: any) {
    //     if(!selectedList.some(el => item.id === el.id)) {
    //       selectedList.push((item))
    //       setSelectedList(JSON.parse(JSON.stringify(selectedList)))
    //     } else {
    //       const indexToDelete = selectedList.findIndex(el => el.id === item.id);
    //       selectedList.splice(indexToDelete, 1);
    //       setSelectedList(JSON.parse(JSON.stringify(selectedList)))
    //     }
    //   }
    // const setSelected = (val:any) => {
    //     setSearchTerm(val)
    //     setSelect(val)
    //   }
    return (
        <div className={!isOpen ? s.select_container : s.select_container + ' ' + s.close}>
            <div ref={ref} className={s.select}>
                <div onClick={() => {
                    !disabled && setIsOpen(false)
                    }} className={disabled ? s.disabled : isOpen || list.length > 0 ? s.select__title : s.select__title_active}>
                    <div> <input disabled={disabled} className='bg-inherit' value={value} onChange={(e) => {
                        onChange(e)
                        }} type="text" placeholder={title}/></div>
                </div>
                <div className={isOpen || list.length < 0 ? s.select__body : s.select__body_active}>
                    <div className={s.scroll} style={{overflowY : list.length > 4 || (list.length === 0 && value.length === 0 && unfilter.length > 4) ? 'scroll' : 'visible'}}>
                        {list.length === 0 && value.length === 0 ? 
                        unfilter.map((item, index) => (
                            <div
                            key={index}
                            // className={selectedList.some(el => item.id === el.id) ? s.selected : s.notselected} 
                            className={s.notselected} 
                            onClick={() => {
                                    setVal(item.name)
                                    setIsOpen(true)
                                }}>
                                
                                <div className={s.svg}>
                                {item.image && <div className='w-[24px] h-[24px]'><Image width={500} height={500} className='w-full h-full object-cover' src={item.image ? API_BASE_URL_2 + item.image : notFound.src} alt="" /></div>}
                                    {item.name}
                                </div>
                                {/* {selectedList.some(el => item.id === el.id) && <Icon type='success'/>} */}
                            </div>
                        ))
                        :list.map((item, index) => (
                            <div
                            key={index}
                            // className={selectedList.some(el => item.id === el.id) ? s.selected : s.notselected} 
                            className={s.notselected} 
                            onClick={() => {
                                    setVal(item.name)
                                    setIsOpen(true)
                                }}>
                                
                                <div className={s.svg}>
                                {item.image && <div className='w-[24px] h-[24px]'><Image width={500} height={500} className='w-full h-full object-cover' src={item.image ? API_BASE_URL_2 + item.image : notFound.src} alt="" /></div>}
                                    {item.name}
                                </div>
                                {/* {selectedList.some(el => item.id === el.id) && <Icon type='success'/>} */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSelect