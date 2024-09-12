'use client'

import React, { useEffect, useState } from 'react'
import s from './style.module.scss'
import Container from '@/components/UI/Container/Container'
import Icon from '@/components/UI/Icon/Icon'
import { useRouter } from 'next/navigation'
import { appointmentService } from '@/services/appointment.service'

type Props = {}

function Notifications({}: Props) {
  const {push} = useRouter()
  const [notifications, setNotifications] = useState<any>()

  useEffect(() => {
    appointmentService.readAllNotifications()
    .then(() => {
    appointmentService.getAllNotifications()
    .then((res:any) => {
      if(res) {
        setNotifications(res)
      }
    })
    .catch((err:any) => {
      console.log(err)
    })
  })
  .catch((err:any) => {
    console.log(err)
  })
  }, [])
  return (
    <div className='p-[49px_0px_20px_0px]'>
      <Container>
        <div className='w-full flex flex-col gap-[15px] xxs:gap-[30px] l:px-0 px-[10px]'>
          <div className='w-full flex flex-col gap-[15px] xxs:gap-[20px]'>
            <h2 className='text-u-h2 font-bold uppercase'>Уведомления</h2>
            <div onClick={() => {
                push('/profile')
            }} className={'flex items-center gap-[20px] h-[32px] pl-[6px] cursor-pointer text-i-p3 max-w-[80px]' + ' ' + s.back}>
                <Icon type='vector_back' /><p>Назад</p>
            </div>
          </div>
          <div className='flex flex-col gap-[20px]'>
            {notifications && notifications.map((item:any, index:number) => (
              <div key={index} className={`cursor-pointer p-[30px] w-full flex flex-col gap-[15px] hover:bg-prim1 ${index === 0 ? 'border-prim3' : 'border-gray2'}  border rounded-[8px]`}>
                <div className='flex justify-between w-full items-center'><h3 className={index === 0 ? 'text-u-h3 font-bold text-prim3' : 'text-u-h3 font-bold '}>{item.title}</h3><Icon color='rgb(81 190 249)' type='uf'></Icon></div>
                <p className='text-i-p2'>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Notifications