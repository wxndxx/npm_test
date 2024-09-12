'use client'

import React, { useEffect, useState } from 'react'
//import s from './AppointmentCard.module.scss'
import useFormatDate from '@/hook/useFormatDate'
import Icon from '@/components/UI/Icon/Icon'
import Link from 'next/link'

type Props = {
    item: {
        car: ICar,
        comment:string,
        end_time: string,
        id: number,
        payModel: string,
        payModelStatus: boolean,
        scheduled_time: any,
        service: any,
        start_time: string,
        status: string
    }
}

function AppointmentCard({item}: Props) {
    const {service, start_time, payModel, id, payModelStatus, status } = item;

    useEffect(() => {
        if(service.length > 3) {
            console.log(service.slice(3))
            setServices(service.slice(3))
        }
    }, [])

    const [services, setServices] = useState<any>()

    function parseVal(text:string, num:number, obg:{first:string, second:string, third:string}) {
        function ender(number:number, {first, second, third}:{first:string, second:string, third:string}) {
            let a = String(number);
            let aEnd = a[a.length - 1];
            switch(aEnd) {
                case "1":
                    if(a[a.length - 2] === "1") {
                        return third
                        
                    } 
                    return first
                case "2":
                case "3":
                case "4":
                    if(a[a.length - 2] === "1") {
                        return third
                    } 
                    return second
                default:
                    return third;
            }
        }
        return `${text}${ender(num, obg)}`
    }
  return (
    <Link href={`/profile/appointments/${id}`} className={payModelStatus ? 'bg-gray1 hover:bg-prim1 border flex flex-col justify-between border-gray2 p-[20px] xs:p-[30px] rounded-[8px] cursor-pointer h-[225px] xs:h-[265px]' : 'flex flex-col justify-between h-[265px] cursor-pointer bg-white hover:bg-prim1 p-[30px] rounded-[8px]'}>
        <div className='flex flex-col gap-[2px]'>
            <div className='flex-col xs:flex-row flex items-center justify-between w-full'><h3 className='text-u-h3 font-bold'>Запись {useFormatDate(start_time)}</h3> <div className='xs:flex hidden'><Icon color='#51BEF9' type='uf'/></div></div>
            <div className={`mb-[15px] rounded-[28px] p-[9px_15px] text-white text-i-p3 font-medium flex justify-center items-center w-fit ${status === 'FREEZE' ? 'bg-green2' : 'bg-prim3'}`}>
                {status === 'FREEZE' ? 'Завершено' : 'В работе'}
            </div>
            <div className='pl-[7px]'>
            {service.length > 0 && <ul className='flex flex-col gap-[5px]'>
                {service.map((item:any, index:number) => {
                    if(service.length <= 3) {
                        return (
                            <li key={index} className='flex items-center gap-[7px]'>
                                <svg height="5px" width="5px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 31.955 31.955" xmlSpace="preserve" fill="#5B5B5F"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style={{fill:"#5B5B5F"}} d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3 c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z"></path> <path style={{fill:"#5B5B5F"}} d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416 C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375 C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672 C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137 C17.523,1.94,14.328,1.906,11.394,2.883z"></path> <circle style={{fill:"#5B5B5F"}} cx="15.979" cy="15.977" r="6.117"></circle> </g> </g></svg>
                                <span className='text-i-p2 text-gray5 font-medium'>{item.service.name}</span>
                            </li>
                        )
                    } else {
                        if(index <= 2) {
                            return (
                                <li key={index} className='flex items-center gap-[7px]'>
                                    <svg height="5px" width="5px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 31.955 31.955" xmlSpace="preserve" fill="#5B5B5F"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style={{fill:"#5B5B5F"}} d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3 c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z"></path> <path style={{fill:"#5B5B5F"}} d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416 C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375 C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672 C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137 C17.523,1.94,14.328,1.906,11.394,2.883z"></path> <circle style={{fill:"#5B5B5F"}} cx="15.979" cy="15.977" r="6.117"></circle> </g> </g></svg>
                                    <span className='text-i-p2 text-gray5 font-medium'>{item.service.name}</span>
                                </li>
                            )
                        }
                    }
                    return
                })}
                {services && services.length > 0 && <div className='flex items-center gap-[7px]'>
                <svg height="5px" width="5px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 31.955 31.955" xmlSpace="preserve" fill="#5B5B5F"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style={{fill:"#5B5B5F"}} d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3 c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z"></path> <path style={{fill:"#5B5B5F"}} d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416 C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375 C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672 C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137 C17.523,1.94,14.328,1.906,11.394,2.883z"></path> <circle style={{fill:"#5B5B5F"}} cx="15.979" cy="15.977" r="6.117"></circle> </g> </g></svg>
                    <span className='text-i-p2 text-prim3'>Еще {services.length} {parseVal("услуг", services.length, {first:'a', second:'и', third:''})}</span>
                </div>}
        </ul>}
        </div>
        </div>
        <div className='flex flex-col xxs:flex-row justify-between gap-[5px] xxs:items-center'>
            <h4 className='text-u-h4 font-bold '>Оплата:{payModel === 'OFFLINE' ? 'Наличными' : 'По карте'}</h4>
            <span className='text-i-p2 text-gray5 font-medium'>{payModelStatus ? 'Оплачено' : 'Не оплачено'}</span>
        </div>
    </Link>
  )
}

export default AppointmentCard