import React from 'react'
import Toggle from '../Toggle/Toggle';
import { CLOUD } from '@/api/api';
import Image from 'next/image';
import Link from 'next/link';
import notFound from '../../../../public/images/notFound.png'

type Props = {
  total_amount: any,
  service: any,
  type?: 'default' | 'basket',
  toggleFunc?: () => void,
  isChecked?: boolean,
  quantity?: number,
  minusFunc?: () => void,
  plusFunc?: () => void,
}

function OrderCard({total_amount, service, type='default', toggleFunc, isChecked, quantity, minusFunc, plusFunc}: Props) {

  function insertSpaces(number:string) {
    
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  // debugger
  switch(type) {
    case 'default':
      return (
        <div className='border border-gray1 bg-white rounded-[8px] p-[10px] min-h-[110px] xs:min-h-[134px]'>
          <div className='flex'>
            <div className='w-[100px] h-[70px] rounded-[8px] overflow-hidden relative mr-[10px]' onClick={() => console.log(service)}>
            {service && service?.product?.length > 0 ? <Image width={500} height={500} src={service?.product[0].sklad?.main_image ? service?.product[0].sklad?.main_url : notFound.src} alt="img" className='absolute top-0 left-0 w-full h-full object-cover' /> :
                            <Image width={500} height={500} src={service.main_image ? CLOUD + service.main_image : notFound.src} alt="img" className='absolute top-0 left-0 w-full h-full object-cover' />}
            </div>
            <div className='w-[60%] xxs:w-[77%]'>
              <p className='text-i-p2'>{service.name}</p>
              <div className='rounded-[8px] w-fit bg-prim1 text-u-h4 text-prim3 p-[7px_10px] flex justify-center items-center'>{insertSpaces(`${total_amount} ₽`)}</div>
            </div>
          </div>
          <div>
          {service.product && service.product.length > 0 && 
          <div className='flex flex-col gap-[10px] pt-[10px]'>
          <p className='text-i-p4 text-gray4'>Включает:</p>
            {service?.product.map((item:any, index:number) => {
              // debugger
              return(
                <Link href={item.sklad.id ? `/catalog/${item.sklad.id}` : ''} key={index} className='w-full flex justify-between text-i-p3'><p className='text-prim3 underline'>{item.sklad.name}{item.quantity > 1 ? ` x${item.quantity}` : ''}</p><p className='text-gray5 whitespace-nowrap'>{insertSpaces(`${item.sklad.sum}₽`)}</p></Link>
            )})}
          </div>}
          </div>
        </div>
      )
    case 'basket':
      return (
        <div className='border border-gray1 bg-white rounded-[8px] p-[10px]'>
          <div className='flex items-center w-full'>
            <div className='mr-[5px] xxs:mr-[15px]'>
              <Toggle type='checkbox' onClick={toggleFunc ? toggleFunc : () => {}} isChecked={isChecked ? isChecked : false}/>
            </div>
            <div className='w-[100px] h-[70px] rounded-[8px] overflow-hidden relative mr-[10px]'>
            <Link href={service.product ? `/catalog/${service.product[0].sklad.id}` : `${service.id}`}>
            {service.product ? <Image width={500} height={500} src={service?.product[0].sklad?.main_image ? service?.product[0].sklad?.main_url : notFound.src} alt="img" className='absolute top-0 left-0 w-full h-full object-cover' /> :
              <Image width={500} height={500} src={service.main_image ? CLOUD + service.main_image : notFound.src} alt="img" className='absolute top-0 left-0 w-full h-full object-cover' />}</Link>
            </div>
            <div className='w-[60%] xxs:w-[77%]'>
              <p className='text-i-p2'>{service.name}</p>
              <div className='flex-col xxs:flex-row flex xxs:gap-0 gap-[10px] xxs:items-center justify-between w-full'>
                <div className='rounded-[8px] w-fit bg-prim1 text-u-h4 text-prim3 p-[7px_10px] xxs:w-auto flex justify-center items-center'>{insertSpaces(`${total_amount} ₽`)}</div>
                <button className='btn__d relative flex p-[7px_15px] gap-[21px] w-fit xxs:w-auto'>
                  <div>-</div>{quantity} <div>+</div> 
                  <div className='absolute w-full h-full flex top-0 left-0'>
                    <div className='h-full w-[50%]' onClick={minusFunc}></div>
                    <div className='h-full w-[50%]' onClick={plusFunc}></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          {service.product && service.product.length > 0 && 
          <div className='flex flex-col gap-[10px] pt-[10px]'>
          <p className='text-i-p4 text-gray4'>Включает:</p>
            {service?.product.map((item:any, index:number) => {
              // debugger
              return(
                <Link href={`/catalog/${item.sklad.id}`} key={index} className='w-full flex justify-between text-i-p3'><p className='text-prim3 underline'>{item.sklad.name}</p><p className='text-gray5 whitespace-nowrap'>{insertSpaces(`${item.sklad.sum}₽`)}</p></Link>
            )})}
          </div>}
        </div>
      )
  }
}

export default OrderCard