
'use client'
//import Icon from '@/components/UI/Icon/Icon'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

function CashError({}: Props) {

    const {push} = useRouter()

    return (
        <div className='flex flex-col gap-[40px] pt-[40px] pb-[160px]'>
            <div className='flex flex-col items-center'>
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="70" height="70" rx="35" fill="#E34848"/>
                <path d="M18.334 18.3333L51.6673 51.6666M51.6673 18.3333L18.334 51.6666" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className='w-[75%] text-u-h2 uppercase text-gray4 font-bold m-[20px_0px_0px_0px] text-center'>
                    Ошибка 207
                </h2>
                <h2 className='w-full text-u-h2 uppercase text-gray4 font-bold m-[0px_0px_10px_0px] text-center'>Мы уже разбираемся с проблемой</h2>
            </div>
            {/* <div className='flex flex-col items-center gap-[5px]'>
                <p className='text-u-h4 font-bold'>
                    Ваш номер: +7 986 657 03 05 / ваш email: dssd@mail.com
                </p>
                <p className='text-i-p2 text-gray5'>Режим работы ежедневно с 10:00 до 22:00</p>
            </div> */}
            <div className='flex gap-[10px] items-center justify-center'>
            {/* <Icon type='uf'></Icon> */}
                <button className='btn__d flex gap-[10px] p-[17px]' onClick={() => push('/')}>На главную</button>
                <button className='btn__p flex gap-[10px] p-[17px]'>Повторить</button>
            </div>
        </div>
    )
}

export default CashError