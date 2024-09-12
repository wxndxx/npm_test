'use client'

import Container from '@/components/UI/Container/Container'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/components/UI/Icon/Icon'
import s from './style.module.scss'
import { appointmentService } from '@/services/appointment.service'
import { useTypedDispatch } from '@/store/store'
import { setOrders } from '@/store/Slices/ProfileSlice'
import AppointmentCard from './parts/AppointmentCard'

type Props = {}

function Appointments({}: Props) {
  const {push} = useRouter()
  const [page, setPage] = useState<number>(1)

  const dispatch = useTypedDispatch()
  const [ordersData, setOrdersData] = useState<any>()

  useEffect(() => {
    appointmentService.getMyOrders()
    .then((res:any) => {
        dispatch(setOrders(res))
        setOrdersData(res)
    })
  }, [])
  return (
    <div className='p-[20px_0px_40px_0px] m:p-[30px_0px_60px_0px] xxl:p-[40px_0px_80px_0px]'>
      <Container>
        <div className='w-full pl-[20px] xs:pl-[116px] px-[20px]'>
          <div onClick={() => {
                push('/profile')
            }} className={'flex items-center gap-[20px] h-[32px] pl-[6px] cursor-pointer text-i-p3 max-w-[80px]' + ' ' + s.back}>
                <Icon type='vector_back' /><p className='font-medium'>Назад</p>
            </div>
           {ordersData && ordersData.length > 0 ? 
           <div className='h-[38px] border-b-gray2 border-b flex gap-[20px]'>
              <div className='flex flex-col cursor-pointer relative' onClick={() => setPage(1)}>
                <div className='flex items-center gap-[4px] h-full'>
                  <p className={`text-u-h4 font-bold ${page != 2 ? 'text-prim3' : ''}`}>Записи</p>
                  <div className={`text-[10px] rounded-[50%] flex items-center justify-center w-[16px] h-[16px] ${page === 2 ? 'bg-gray3' : 'bg-prim3'} text-white flex items-center justify-center text-i-p4 font-medium`}>
                  {ordersData && ordersData.length}
                  </div>
                </div>
                {page != 2 && <div className='h-[2px] rounded-[20px] bg-prim3 w-full absolute bottom-[-1px]'></div>}
              </div>
              <div className='flex flex-col cursor-pointer relative' onClick={() => setPage(2)}>
                <div className='flex items-center gap-[4px] h-full'>
                  <p className={`text-u-h4 font-bold ${page === 1 ? '' : 'text-prim3'}`}>Заказы</p>
                  <div className={`text-[10px] rounded-[50%] w-[16px] h-[16px] ${page === 1 ? 'bg-gray3' : 'bg-prim3'} text-white flex items-center justify-center text-i-p4 font-medium`}>
                  0
                  </div>
                </div>
                {page != 1 && <div className='h-[2px] rounded-[20px] bg-prim3 w-full absolute bottom-[-1px]'></div>}
              </div>
            </div> :
            <div className='h-[38px] border-b-gray2 border-b flex gap-[20px]'>
            <div className='flex flex-col cursor-pointer relative'>
              <div className='flex items-center gap-[4px] h-full'>
                <p className={`text-u-h4 font-bold ${page != 2 ? 'text-gray4' : 'text-gray3'}`}>Записи</p>
                
              </div>
              {page != 2 && <div className='h-[2px] rounded-[20px] bg-gray4 w-full absolute bottom-[-1px]'></div>}
            </div>
            <div className='flex flex-col cursor-pointer relative'>
              <div className='flex items-center gap-[4px] h-full'>
                <p className={`text-u-h4 font-bold ${page === 1 ? 'text-gray3' : 'text-gray4'}`}>Заказы</p>
                
              </div>
              {page != 1 && <div className='h-[2px] rounded-[20px] bg-gray4 w-full absolute bottom-[-1px]'></div>}
            </div>
          </div>
            }
            {ordersData && ordersData.length > 0 ? <div>
              {page === 1 ? <div className='pt-[30px] grid xs:grid-cols-2 w-full gap-[30px] pr-0 xs:pr-[116px]'>
                {ordersData && ordersData.map((item:any, idnex:number) => (
                  <AppointmentCard key={idnex} item={item}/>
                ))}
              </div> : 
              <div>
                {/* заказы */}
                {/* {ordersData && ordersData.map((item:any, idnex:number) => (
                  <AppointmentCard key={idnex} item={item}/>
                ))} */}
              </div>
              }
            </div> : 
            <div className='pt-[102px] flex w-full justify-center items-center'>
              <p className='text-i-p font-medium text-gray4'>У вас пока нет записей</p>
            </div>
            }
        </div>
      </Container>
    </div>
  )
}

export default Appointments