'use client'

import Icon from '@/components/UI/Icon/Icon'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

function CashSuccess({}: Props) {

    const {push} = useRouter()

    return (
        <div className='flex flex-col gap-[40px] pt-[40px] pb-[160px]'>
            <div className='flex flex-col items-center'>
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="70" height="70" rx="35" fill="#48E34E"/>
                <path d="M18.332 36.2725L28.5884 46.4577L51.6654 23.541" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className='w-[70%] text-u-h2 uppercase text-gray4 font-bold m-[20px_0px_10px_0px] text-center'>
                Менеджер свяжется с вами в самое ближайшее время
                </h2>
                <p className='text-i-p2 text-gray5'>На вашу почту пришло письмо с информацией о заказе.</p>
            </div>
            <div className='flex flex-col items-center gap-[5px]'>
                <p className='text-u-h4 font-bold'>
                    Ваш номер: +7 986 657 03 05 / ваш email: dssd@mail.com
                </p>
                <p className='text-i-p2 text-gray5'>Режим работы ежедневно с 10:00 до 22:00</p>
            </div>
            <div className='flex gap-[10px] items-center justify-center'>
                <button className='btn__s_del flex gap-[10px] p-[17px] bg-gray1'>Отменить заявку <Icon type='close'></Icon></button>
                <button className='btn__p flex gap-[10px] p-[17px]' onClick={() => push('/')}>На главную <Icon type='uf'></Icon></button>
            </div>
        </div>
    )
}

export default CashSuccess