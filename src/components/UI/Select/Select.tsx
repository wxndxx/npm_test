'use client'

import React, { useState } from 'react'
import s from './Select.module.scss'
import useOnclickOutside from 'react-cool-onclickoutside';
import Icon from '../Icon/Icon';
import Image from 'next/image';
import notFound from '../../../../public/images/notFound.png'
import { API_BASE_URL_2 } from '@/api/api';

interface ITitle {
    id: number,
    name: string,
    image?: string,
}

interface IToggleProps {
    className?: string;
    list: ITitle[],
    disabled?: boolean,
    title: string,
    setSelectedList: (item:any) => void,
    selectedList: ITitle[],
    func?: (item:any) => void,
}

const Select: React.FC<IToggleProps> = ({
    list,
    setSelectedList,
    selectedList,
    disabled,
    title,}) => {

    const [isOpen, setIsOpen] = useState(true);
    const ref = useOnclickOutside((e: any) => {
        if(e.target.classList && e.target.classList.length > 0 && e.target.classList[0] === s.select) return
        setIsOpen(true)
    });

    function selectedFunc(item: any) {
        if(!selectedList.some(el => item.id === el.id)) {
            //
            if(selectedList.length < 1) {
                selectedList.push((item))
                setSelectedList(JSON.parse(JSON.stringify(selectedList)))
                //убрать else if если в тз будет множественная выборка
            } else if(selectedList.length === 1) {
                const indexToDelete = selectedList.findIndex(el => el.id === item.id);
                selectedList && selectedList.splice(indexToDelete, 1);
                selectedList.push((item))
                setSelectedList(JSON.parse(JSON.stringify(selectedList)))
            }
        } else {
          const indexToDelete = selectedList.findIndex(el => el.id === item.id);
          selectedList && selectedList.splice(indexToDelete, 1);
          setSelectedList(JSON.parse(JSON.stringify(selectedList)))
        }
      }

    return (
        <div className={!isOpen || disabled ? s.select_container : s.select_container + ' ' + s.close}>
            <div ref={ref} className={s.select}>
                <div onClick={() => !disabled && setIsOpen(!disabled ? !isOpen : true)} className={disabled ? s.disabled : isOpen ? s.select__title : s.select__title_active}>
                    <div className='flex items-center overflow-hidden'>{selectedList.length > 0 ? selectedList.map((item, index) => (<span className=' whitespace-nowrap' key={index}>{index > 2 ? index === 3 ? '...' : ''  : item.name}{index != selectedList.length - 1 && index < 2 && ', '}</span>)) : `${title}`}</div>
                    <div className={s.svg}>
                        <Icon type={isOpen || disabled  ? 'vector_down' : 'vector_up'}/>
                    </div>
                </div>
                <div className={isOpen || disabled ? s.select__body : s.select__body_active}>
                    <div className={s.scroll} style={{overflowY: list.length > 4 ? 'scroll' : 'visible'}}>
                        {list.map((item, index) => {
                            // debugger
                            return(
                            <div
                            key={index}
                            className={selectedList.some(el => item.id === el.id) ? s.selected : s.notselected} 
                            onClick={() => {
                                selectedFunc(item)
                                setIsOpen(true)
                                }}>
                                
                                <div className={s.svg}>
                                {item.image && <div className='w-[30px]'><Image width={500} height={500} className='w-full h-full object-cover' src={API_BASE_URL_2 + item.image ?? notFound.src} alt="" /></div>}
                                    {item.name}
                                </div>
                                {selectedList.some(el => item.id === el.id) && <Icon type='success'/>}
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Select