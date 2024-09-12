'use client'

import React, { useState } from 'react'
import s from './Card.module.scss'
import Icon from '@/components/UI/Icon/Icon'
import { useTypedDispatch, useTypedSelector } from '@/store/store';
import { usePathname, useRouter } from 'next/navigation';
import { setModal, setModalLink } from '@/store/Slices/ProfileSlice';
import { basketService } from '@/services/busket.service';
import { onChangeBasket, onChangeProduct, onChangeProductVal, onChangeSum } from '@/store/Slices/BasketSlice';
import Image from 'next/image';
import { onlineService } from '@/services/online.service';
import notFound from '../../../../public/images/notFound.png'
import useOnclickOutside from 'react-cool-onclickoutside';

type Props = {
    main_image: string | null,
    name: string,
    link: string,
    item:any
}

function Card({main_image, name, link, item}: Props) {
    // debugger
  function insertSpaces(number:string) {

      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

  const {isAuth} = useTypedSelector((state) => state.profile)
  const dispatch = useTypedDispatch()
  const [hover, setHover] = useState<boolean>()
  const path = usePathname()

  const {basket, sum} = useTypedSelector((state) => state.basket)

  function addInBasket(type = 'plus') {
        // onlineService.unPinAll()
        const res = basket?.products.findIndex((obj:any) => obj.sklad.id === item.id);
        console.log(res)
        if(res === -1 || res === undefined) {
                // setProductInBusket({
                //     status: true,
                //     id: res
                // })
            console.log('1')
            basketService.postNewProduct({
                type_product: 'products',
                sklad_id: item.id,
                quantity: 1,
                order_true: true
            })
            .then((res:any) => {
                //setCount(res.quantity)
                dispatch(onChangeProduct(res))
                dispatch(onChangeSum(type === 'plus' ? sum + res.sklad.sum : sum - res.sklad.sum))
            })
            .then(() => {
                basketService.getBusket()
                .then((res:any) => {
                    dispatch(onChangeBasket(res))
                    dispatch(onChangeSum(res.appointments_sum + res.products_sum))
                })
            })
            .catch((err:any) => {
                console.log(err)
            })
        } else {
            console.log('2')
            basketService.patchNewProduct({
                type_product: 'products',
                sklad_id: item.id,
                order_true: true,
                quantity: type === 'plus' ? basket?.products[res].quantity + 1 : basket?.products[res].quantity - 1,
            }, basket?.products[res].id)
            .then((res:any) => {
                dispatch(onChangeProductVal({id: res.sklad.id, quantity: res.quantity}))
                // setCount(res.quantity)
                dispatch(onChangeSum(type === 'plus' ? sum + res.sklad.sum : sum - res.sklad.sum))
            })
            .catch((err:any) => {
                console.log(err)
            })
            // setProductInBusket({
            //     status: true,
            //     id: item.id
            // })
            // type === 'plus' ? defService.items += 1 : defService.items -= 1
            //setDefService(JSON.parse(JSON.stringify(defService)))
            // setMainItem(defService)
            // setCount(defService?.items)
        }
    }
        // if(item.quantity - 1 >= basket?.products[result]?.quantity) {
        //     basketService.patchNewProduct({
        //         type_product: 'products',
        //         sklad_id: item.id,
        //         quantity: type === 'plus' ? basket?.products[result]?.quantity + 1 : basket?.products[result]?.quantity - 1,
        //     }, basket?.products[result]?.id)
        //     .then((res:any) => {
        //         //
        //         dispatch(onChangeProductVal({id: res.sklad.id, quantity: res.quantity}))
        //         setCount(res.quantity)
        //         dispatch(onChangeSum(type === 'plus' ? sum + res.sklad.sum : sum - res.sklad.sum))
        //     })
        //     .catch((err:any) => {
        //         console.log(err)
        //     })
        // } else {
        //     alert('Выбранно максимальное ко-во товаров')
        // }
    const {push} = useRouter()
    // const aaaa = main_image ? `${main_image.indexOf("htt") === 0 ? main_image : `${'https://s3.timeweb.cloud/e6aea069-matalex'}${main_image}`}` : notFound.src
    // debugger
    const [state, setState] = useState<boolean>(false)
    const width = window.innerWidth
    const ref = useOnclickOutside((e: any) => {
        if(e.target.classList && e.target.classList.length > 0 && e.target.classList[0] === s.card) return
        setHover(false)
        setState(false)
    });
  return (
    <div ref={ref} onMouseEnter={() => width > 800 && setHover(true)} onClick={() => {
        if(width < 800) {
            setState(true)
            setHover(true)
        }
    }} onMouseLeave={() => width > 800 && setHover(false)} className={hover ? s.card : 'relative w-full card flex flex-col gap-[10px] cursor-pointer justify-between'}>
      <div className='w-full h-full flex xxs:flex-col flex-row gap-[10px] xxs:justify-between' onClick={() => {if(width < 800) {
        state && push(link)}
        else {
            push(link)
        }
        }}>
          <div className='xxs:w-full w-[100px] flex'>
              <div className='xxs:w-full w-[100px] rounded-[8px] relative overflow-hidden object-cover h-[70px] xxs:h-[140px] m:h-[210px]'>
                  <Image width={500} height={500} className='w-full absolute top-0 left-0 h-full object-cover' src={main_image ? `${main_image.indexOf("htt") === 0 ? main_image : `${'https://s3.timeweb.cloud/e6aea069-matalex'}${main_image}`}` : notFound.src} alt="img" />
              </div>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <p className='text-i-p2 font-medium'>{name}</p>
              <div className='bg-prim1 rounded-[8px] text-u-p uppercase font-medium text-prim3 p-[8.5px_10px] w-fit'>{insertSpaces(`${item.sum}`)} ₽</div>
          </div>
      </div>
        {hover && <div className={s.popup}>
            <button className='btn__p p-[11px_15px] w-full' onClick={() => {
              if(isAuth) {
                addInBasket()
              } else {
                dispatch(setModalLink(path))
                dispatch(setModal(true))
              }
            }}>Добавить в корзину<Icon type='bag'></Icon></button>
            <button className='btn__s p-[11px_15px] w-full' onClick={() => {
                if(isAuth) {
                    onlineService.unPinAll()
                    .then(() => {
                        addInBasket()
                        push('/payment')
                    })
                } else {
                dispatch(setModalLink(path))
                dispatch(setModal(true))
                }
            }}>Купить сейчас<Icon type='mark'></Icon></button>
        </div>}
    </div>
  )
}

export default Card