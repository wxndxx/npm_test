'use client'

import Container from '@/components/UI/Container/Container'
import Icon from '@/components/UI/Icon/Icon'
import React, { useEffect, useState } from 'react'
import s from './Product.module.scss'
import Link from 'next/link'
import Slider, { Settings } from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Toggle from '@/components/UI/Toggle/Toggle'
import { usePathname, useRouter } from 'next/navigation'
import { onChangeBrand, onChangeModel } from '@/store/Slices/Catalogeslice'
import { useTypedDispatch, useTypedSelector } from '@/store/store'
import { setModal, setModalLink } from '@/store/Slices/ProfileSlice'
import { basketService } from '@/services/busket.service'
import { onChangeBasket, onChangeProduct, onChangeProductVal, onChangeService, onChangeSum } from '@/store/Slices/BasketSlice'
import Card from '../../parts/Card'
import Image from 'next/image'
import { onlineService } from '@/services/online.service'
import notFound from '../../../../../public/images/notFound.png'

type Props = {
    product: any
}

interface ICustomPrevArrowProps {
    onClick?: () => void;
    current?: any;
    max?: any
}

// interface IErrors {
//     appointment: [boolean, string]
// }

// interface Iservice {
//     id: number,
//     name: string,
//     product: any,
//     sum_work: number,
//     total_amount: number
// }

// interface IServices {
//     services: Iservice[] | []
// }

const CustomPrevArrow: React.FC<ICustomPrevArrowProps> = ({ onClick, current }) => (
    <div className={s.prev}>
        <button disabled={current === 0} className='btn__s p-[9px_19px] xxs:p-[14px_24px]' onClick={onClick}>
            <Icon type='vector_back'></Icon>
        </button>
    </div>
);

const CustomNextArrow: React.FC<ICustomPrevArrowProps> = ({ onClick, current, max }) => (
    <div className={s.next}>
        <button disabled={current === max} className='btn__s p-[9px_19px] xxs:p-[14px_24px]' onClick={onClick}>
            <Icon type='vector_forvard'></Icon>
        </button>
    </div>
);

function Product({product}: Props) {

    // const [errors, setErrors] = useState<IErrors>({
    //     appointment: [false, '']
    // })

    const {images, products, services} = product

    const sliderRef1 = React.useRef<Slider | null>(null);
    const sliderRef2 = React.useRef<Slider | null>(null);
    const [_currentSlide, setCurrentSlide] = useState<number>(1)

    React.useEffect(() => {
        const slider1 = sliderRef1.current;
        const slider2 = sliderRef2.current;

        if (slider1) {
            slider1.slickGoTo(0);
            slider1.slickPlay();
        }

        if (slider2) {
            slider2.slickGoTo(0);
            slider2.slickPlay();
        }
    }, []);

    const settings1: Settings = {
        infinite: true,
        slidesToShow: 1,
        // slidesToScroll: 1,
        className: s.slider,
        touchMove: images && images.length <= 6 ? false : true,
        autoplay: false,
        prevArrow: <CustomPrevArrow current={_currentSlide}/>,
        nextArrow: <CustomNextArrow current={_currentSlide} max={images?.length - 1}/>,
        beforeChange: (_oldIndex, newIndex) => {
          setCurrentSlide(newIndex);
          if(sliderRef2.current){
            sliderRef2.current.slickGoTo(newIndex);
            setTimeout(() => {
                const elem2 = document.querySelectorAll('.slick-current')
                elem2.forEach((el) => {
                    if(el.parentElement?.classList[1] === s.slickTrack1){
                        el.classList.add(`${s.slickCurrent}`)
                    }
                })
            }, 100)
          }
        },
    };

    const settings2: Settings = {
        infinite: false,
        slidesToShow: images ? (images.length > 6 ? 6 : images.length) : 2,
        className: s.slider1,
        autoplay: false,
        arrows: false,
        touchMove: images && images.length <= 6 ? false : true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1120,
                settings: {
                    slidesToShow: images ? (images.length > 5 ? 5 : images.length) : 2,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: images ? (images.length > 4 ? 4 : images.length) : 2,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: images ? (images.length > 3 ? 3 : images.length) : 2,
                }
            }
        ]
    };

    useEffect(() => {
        const elem = document.querySelectorAll('.slick-track')
        if(elem){
            elem.forEach((el) => {
                if(el.parentElement?.parentElement?.classList[1] === s.slider){
                    el.classList.add(`${s.slickTrack}`)
                }
                if(el.parentElement?.parentElement?.classList[1] === s.slider1){
                    el.classList.add(`${s.slickTrack1}`)
                }
            })
        }
        const elem1 = document.querySelectorAll('.slick-list')
        if(elem1){
            elem1.forEach((el) => {
                if(el.parentElement?.classList[1] === s.slider || el.parentElement?.classList[1] === s.slider1){
                    el.classList.add(`${s.slickList}`)
                }
            })
        }
    }, [])

    const [sliderIndex, setSliderIndex] = useState<number>(0)

    useEffect(() => {
        if (sliderRef1.current) {
            sliderRef1.current.slickGoTo(sliderIndex);
            setTimeout(() => {
                const elem2 = document.querySelectorAll('.slick-current')
                elem2.forEach((el) => {
                    if(el.parentElement?.classList[1] === s.slickTrack1){
                        el.classList.add(`${s.slickCurrent}`)
                    }
                })
            }, 100)
        }
      }, [sliderIndex]);

    function insertSpaces(number:string) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    // function widthSwitch(){
    //     switch(images.length) {
    //         case 1:
    //             return 'hidden'
    //         case 2:
    //             return 'w-[200px]'
    //         case 3:
    //             return 'w-[300px]'
    //         case 4:
    //             return 'w-[400px]'
    //         case 5:
    //             return 'w-[500px]'
    //         default:
    //             return
    //     }
    // }

    const [servicesData, _setServicesData] = useState<any>(services?.map((item:any) => ({
        ...item,
        items: 0,
    })))

    //item
    const dispatch = useTypedDispatch()
    const {push} = useRouter()
    const path = usePathname()

    const [defService, setDefService] = useState<any>({
        items: 0,
    })

    const basket = useTypedSelector((state) => state.basket.basket)
    const sum = useTypedSelector((state) => state.basket.sum)

    const [mainItem, setMainItem] = useState<any>(defService)

    const {isAuth} = useTypedSelector((state) => state.profile)
    const [count, setCount] = useState<number>(defService.items)
    const [productInBusket, setProductInBusket] = useState<any>({
        id: null,
        status: null
    })

    const [serviceInBusket, setServiceInBusket] = useState<any>({
        id: null,
        status: null
    })

    function addDefService(type = 'plus') {
        //
        if(!productInBusket.status) {
            const res = basket?.products.findIndex((obj:any) => obj.sklad.id === product.products.id);
            if(res === -1 || res === undefined) {
                console.log(res, '1')
                setProductInBusket({
                    status: true,
                    id: product.products.id
                })
                //type === 'plus' ? defService.items += 1 : defService.items -= 1
                // 
                let newDefService = type === 'plus' ? {items: defService.items = 1} : {items: defService.items - 1}
                setDefService(newDefService)
                setMainItem(newDefService)
                setCount(defService?.items)
                basketService.postNewProduct({
                    type_product: 'products',
                    sklad_id: product.products.id,
                    quantity: 1,
                    order_true: true
                })
                .then((res:any) => {
                    setCount(res.quantity)
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
                // 
                console.log(res, '2')
                if(product.products.quantity - 1 >= basket?.products[res]?.quantity) {
                    setProductInBusket({
                        status: true,
                        id: res
                    })
                    let newDefService = type === 'plus' ? {items: basket?.products[res]?.quantity + 1} : {items: basket?.products[res]?.quantity - 1}
                    setDefService(newDefService)
                    setMainItem(newDefService)
                    basketService.patchNewProduct({
                        type_product: 'products',
                        sklad_id: product.products.id,
                        quantity: type === 'plus' ? basket?.products[res].quantity + 1 : basket?.products[res].quantity - 1,
                        order_true: true
                    }, basket?.products[res].id)
                    .then((res:any) => {
                        dispatch(onChangeProductVal({id: res.sklad.id, quantity: res.quantity}))
                        setCount(res.quantity)
                        dispatch(onChangeSum(type === 'plus' ? sum + res.sklad.sum : sum - res.sklad.sum))
                    })
                    .catch((err:any) => {
                        console.log(err)
                    })
                } else {
                    alert('Выбранно максимальное ко-во товаров')
                }
            }
        } else {
            console.log(basket, '3')
            const result = basket?.products.findIndex((obj:any) => obj.sklad.id === product.products.id);
            let newDefService = type === 'plus' ? {items: basket?.products[result]?.quantity + 1} : {items: basket?.products[result]?.quantity - 1}
            setDefService(newDefService)
            setMainItem(newDefService)
            basketService.patchNewProduct({
                type_product: 'products',
                sklad_id: product.products.id,
                quantity: type === 'plus' ? basket?.products[result]?.quantity + 1 : basket?.products[result]?.quantity - 1,
                order_true: true
            }, basket?.products[result]?.id)
            .then((res:any) => {
                //
                dispatch(onChangeProductVal({id: res.sklad.id, quantity: res.quantity}))
                setCount(res.quantity)
                dispatch(onChangeSum(type === 'plus' ? sum + res.sklad.sum : sum - res.sklad.sum))
            })
            .catch((err:any) => {
                console.log(err)
                alert('Выбранно максимальное ко-во товаров')
            })
            // if(product.products.quantity - 1 >= basket?.products[result]?.quantity) {
            //     basketService.patchNewProduct({
            //         type_product: 'products',
            //         sklad_id: product.products.id,
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
        }
    }

    function addAppService(type = 'plus') {
        //
        
        let index = servicesData.findIndex((obj:any) => obj.id === mainItem.id)
        setMainItem(servicesData[index])
        //console.log(product)
        // basketService.postNewProduct({
        //     type_product: 'appointments',
        //     service_id: product.services[index].id,
        //     quantity: 1,
        // })
        //
        if(product.services[index].id != serviceInBusket.id) {
            const res = basket?.appointments.findIndex((obj:any) => obj.service.id === product.services[index].id);
            if(res === -1 || !res) {
                setServiceInBusket({
                    status: true,
                    id: product.services[index].id
                })
                //type === 'plus' ? defService.items += 1 : defService.items -= 1
                basketService.postNewProduct({
                    type_product: 'appointments',
                    service_id: product.services[index].id,
                    quantity: 1,
                    order_true: true
                })
                .then((res:any) => {
                    console.log(res, basket)
                    dispatch(onChangeService(res))
                    dispatch(onChangeSum(type === 'plus' ? sum + res.service.sum_work : sum - res.service.sum_work))
                    setCount(res.quantity)
                })
                .then(() => {
                    basketService.getBusket()
                    .then((res:any) => {
                        dispatch(onChangeBasket(res))
                        dispatch(onChangeSum(res.appointments_sum + res.products_sum))
                    })
                })
                .catch(() => {
                    // setErrors((prev:any) => ({
                    //     ...prev,
                    //     appointment: [true, 'такая услуга уже выбрана']
                    // }))
                    // alert('такая услуга уже выбрана')
                })
            } else {
                alert('такая услуга уже выбрана')
            }
        } else {
            alert('такая услуга уже выбрана')
            setCount(0)
            // const res = basket?.appointments.findIndex((obj:any) => obj.id === product.services[index].id);
            // if(basket && res) {
            //     if(!errors.appointment[0]) {
            //         basketService.patchNewProduct({
            //             type_product: 'appointments',
            //             service_id: product.services[index].id,
            //             quantity: type === 'plus' ? basket.appointments[res]?.quantity + 1 : basket?.appointments[res]?.quantity - 1,
            //         }, basket?.appointments[res].id)
            //         .then((res:any) => {
            //             dispatch(onChangeServiceVal({id: res.sklad.id, quantity: res.quantity}))
            //             setCount(res.quantity)
            //             dispatch(onChangeSum(type === 'plus' ? sum + res.sklad.sum : sum - res.sklad.sum))
            //         })
            //         .catch((err:any) => {
            //             console.log(err)
            //         }) 
            //     } else {
            //         alert(errors.appointment[1])
            //     }
            // }
        }
    }

    return (
        <div className='xs:p-[20px_0px_40px_0px] p-[30px_0px_60px_0px] m:p-[40px_0px_80px_0px]'>
            <Container>
                <div className='flex w-full flex-col gap-[40px]'>
                    <div className='bg-white rounded-[8px] p-[20px] xs:p-[30px_40px] m:p-[40px_100px] l:p-[50px_116px]'>
                        <div className='flex items-center gap-[16px] xs:gap-[24px]'>
                            <Link href={'/'} className={s.navigate_sec}>Главная <Icon type='vector_forvard'/></Link>
                            <Link href={'/catalog'} className={s.navigate}>Каталог <Icon type='vector_forvard'/></Link>
                            {products?.brand_name && <div onClick={() => {
                                dispatch(onChangeBrand([{name: products?.brand_name, id: products?.brand_id}]))
                                dispatch(onChangeModel(null))
                                push('/catalog')
                            }} className={s.navigate}>{products?.brand_name} <Icon type='vector_forvard'/></div>}
                            {products?.model_name && <div onClick={() => {
                                dispatch(onChangeBrand([{name: products?.brand_name, id: products?.brand_id}]))
                                dispatch(onChangeModel([{name: products?.model_name, id: products?.model_id}]))
                                push('/catalog')
                            }} className={s.navigate_sec}>{products?.model_name} <Icon type='vector_forvard'/></div>}
                            <div className={'whitespace-nowrap gap-[24px] cursor-pointer text-gray6 w-[300px] overflow-hidden text-ellipsis'}>{products?.name}</div>
                        </div>
                        <div className='w-full gap-[15px] xs:gap-[30px] special:grid special:grid-cols-2 pt-[20px] xs:pt-[30px]'>
                            <div className='flex flex-col gap-[10px] xs:gap-[20px]'>
                                {images?.length > 0 && images[0] ?
                                <div className='relative border-[2px] border-gray1 rounded-[8px] overflow-hidden h-[370px]'>
                                    <Slider ref={sliderRef1} {...settings1}>
                                        {images?.map((slide:any, index:number) => {
                                            // debugger
                                            return (
                                            <div key={index} className='h-[370px] relative'>
                                                <Image width={500} height={500} src={slide ? `${slide}` : notFound.src} alt="img" className='object-cover absolute w-full h-full top-0 left-0' />
                                            </div>
                                        )})}
                                    </Slider>
                                </div> : <div className='h-[370px] relative'>
                                                <Image width={500} height={500} src={notFound.src} alt="img" className='object-cover absolute w-full h-full top-0 left-0' />
                                            </div>}
                                {images?.length > 5 && <div className={''}><Slider ref={sliderRef2} {...settings2}>
                                    {images?.map((slide:any, index:number) => (
                                        <div key={index}>
                                            <div className={`cursor-pointer relative rounded-[8px] border-[2px] ${_currentSlide === index ? 'border-prim2' : 'border-gray1'} overflow-hidden` + ' ' + s.slider2} key={index} onClick={() => setSliderIndex(index)}>
                                                <Image width={500} height={500} className='absolute w-full h-full object-cover' src={slide ? `${slide}` : notFound.src} alt="img" />
                                            </div>
                                        </div>
                                    ))}
                                
                                </Slider></div>}
                                {/*  className={widthSwitch()} */}
                                {images?.length <= 5 && <div><Slider ref={sliderRef2} {...settings2}>
                                    {images?.map((slide:any, index:number) => (
                                        <div key={index}>
                                            <div className={`cursor-pointer relative rounded-[8px] border-[2px] ${_currentSlide === index ? 'border-prim2' : 'border-gray1'} overflow-hidden` + ' ' + s.slider2} key={index} onClick={() => setSliderIndex(index)}>
                                                <Image width={500} height={500} className='absolute w-full h-full object-cover' src={slide ? `${slide}` : notFound.src} alt="img" />
                                            </div>
                                        </div>
                                    ))}
                                
                                </Slider></div>}
                            </div>
                            <div className='flex flex-col gap-[10px] xs:gap-[20px]'>
                                <h2 className='text-u-h2 uppercase font-bold'>{products?.name}</h2>
                                <div className={products?.quantity === 0 ? 'bg-gray1 rounded-[8px] text-u-h3 uppercase font-medium text-gray4 p-[5px_10px] w-[max-content]' : 'bg-prim1 rounded-[8px] text-u-h3 uppercase font-medium text-prim3 p-[5px_10px] w-[max-content]'}>{insertSpaces(`${products?.sum}`)} ₽</div>
                                <div className='flex flex-col gap-[15px] xs:gap-[30px] pt-[10px]'>
                                    <div>
                                        <div className='flex flex-col gap-[15px] mb-[15px]'>
                                            <div className={'pb-[10px] xs:pb-[15px] border-b border-b-gray2'}>
                                                <div className='flex items-center justify-between cursor-pointer' onClick={() => {
                                                        setMainItem(defService)
                                                        //
                                                        setCount(defService.items)
                                                    }}>
                                                    <div className='flex gap-[5px] xxs:gap-[10px] items-center'><Toggle isChecked={mainItem === defService} onClick={() => {
                                                        
                                                    }} type='rounded'/>
                                                    <p className='text-i-p2 text-gray4 n:w-auto w-[85%]'>
                                                        {products?.name.split(' ')[0]}, без установки
                                                    </p></div>
                                                    <div>
                                                        <p>
                                                            +0₽
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        {services?.length > 0 && 
                                            <div className='flex flex-col gap-[10px] xs:gap-[15px]'>
                                                {servicesData?.map((item:any, index:number) => {
                                                    return (
                                                        <div key={index} className={servicesData?.length - 1 === index ? '' : 'pb-[15px] border-b border-b-gray2'}>
                                                            <div className='flex items-center justify-between cursor-pointer' onClick={() => {

                                                                    setMainItem(servicesData[index])
                                                                    setCount(servicesData[index].items)
                                                                }}>
                                                                <div className='flex gap-[5px] xxs:gap-[10px] items-center'><Toggle isChecked={mainItem === servicesData[index]} onClick={() => {
                                                                    
                                                                }} type='rounded'/>
                                                                <p className='text-i-p2 text-gray4 n:w-auto w-[85%] whitespace-wrap'>
                                                                    {item.name}
                                                                </p></div>
                                                                <div>
                                                                    {mainItem != servicesData[index] && <p className='text-i-p2 text-gray5 whitespace-nowrap'>
                                                                        +{insertSpaces(`${item.sum_work - item?.product[index]?.sklad.sum}`)}₽
                                                                    </p>}
                                                                </div>
                                                            </div>
                                                            {mainItem === servicesData[index] && 
                                                                <div className='pt-[15px] flex flex-col gap-[12px]'>
                                                                    <p className='text-i-p3 text-gray4'>Включает:</p>
                                                                    <div className='flex flex-col gap-[12px]'>
                                                                        {item?.product.map(({sklad, quantity}:any, index:number) => {
                                                                            return (
                                                                                <Link href={`${sklad.id}`} className='text-i-p3 flex justify-between' key={index}>
                                                                                    <div className='flex items-center'>
                                                                                        <span className='text-i-p3 text-prim3 underline xs:break-all'>{sklad.name}</span> {quantity > 1 && `x${quantity}`}
                                                                                    </div>
                                                                                    <p className='text-i-p2 text-gray5 whitespace-nowrap'>
                                                                                        +{insertSpaces(`${index === 0 ? sklad.sum * quantity - sklad.sum : sklad.sum}`)}₽
                                                                                    </p>
                                                                                </Link>
                                                                            )
                                                                        })}
                                                                        <div className='flex items-center justify-between'>
                                                                            <div className='text-i-p3 text-[#0E0F1F]'>{item.name}</div>
                                                                            <div className='text-i-p2 text-gray5 whitespace-nowrap'>
                                                                                +{insertSpaces(`${item.total_amount}`)}₽
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex items-center justify-between font-bold'>
                                                                            <div className='text-u-h4 text-[14px] text-[#0E0F1F]'>Итого:</div>
                                                                            <div className='text-u-h4 text-[#0E0F1F] uppercase whitespace-nowrap'>
                                                                                +{insertSpaces(`${item.sum_work}`)}₽
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                        
                                    </div>
                                    <div className='grid gap-[5px_0px] xs:gap-[10px] grid-cols-1 xs:grid-cols-5'>
                                        <button onClick={() => {
                                            console.log(product)
                                            if(!isAuth) {
                                                dispatch(setModalLink(path))
                                                dispatch(setModal(true))
                                            } else {
                                                onlineService.unPinAll()
                                                .then(() => {
                                                    if(mainItem != defService) {
                                                        addAppService()
                                                    } else {
                                                        addDefService()
                                                    }
                                                    push('/payment')
                                                })
                                            }
                                        }} disabled={products?.quantity === 0} className='btn__s flex justify-between col-span-1 xs:col-span-2'>{products?.quantity != 0 ? 'Купить сейчас' : 'Нет в наличии'} <Icon type='mark' /></button>
                                        {!count ? <button disabled={products?.quantity === 0} className='btn__p flex col-span-1 justify-between xs:col-span-3' onClick={() => {
                                            
                                            if(!isAuth) {
                                                dispatch(setModalLink(path))
                                                dispatch(setModal(true))
                                            } else {
                                                if(mainItem != defService) {
                                                    //
                                                    addAppService()
                                                } else {
                                                    addDefService()
                                                }
                                            }
                                        }}>{products?.quantity != 0 ? 'Добавить в корзину' : 'Нет в наличии'} <Icon type='bag' /></button> : 
                                        <div className='btn__p flex justify-between col-span-3 relative'><Icon type='minus' /> В корзине {count} <Icon type='add' />
                                        <div className='absolute w-full h-full top-0 left-0 grid grid-cols-2'>
                                            <div className='cursor-pointer' onClick={() => {
                                                //
                                                if(mainItem != defService) {
                                                    //
                                                    addAppService('minus')
                                                } else {
                                                    addDefService('minus')
                                                }
                                            }}></div>
                                            <div className='cursor-pointer' onClick={() => {
                                                //
                                                if(mainItem != defService) {
                                                    addAppService()
                                                } else {
                                                    addDefService()
                                                }
                                            }}></div>
                                        </div>
                                        </div>
                                        }
                                    </div>
                                    <div className='text-i-p2 text-gray6'>
                                        {products?.about}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {product?.similar_products?.length > 0 && <div className='flex flex-col gap-[20px]'>
                        <h3 className='text-u-h3 font-bold'>Похожие товары</h3>
                        <div className='grid gap-[10px] xxs:grid-cols-2 xs:grid-cols-3 m:grid-cols-4'>
                            {product.similar_products.map(({main_product}:any, index:any) => (<Card item={main_product} link={`catalog/${main_product.id}`} key={index}name={main_product.name} main_image={main_product.main_image}></Card>))}
                        </div>
                    </div>}
                </div>
            </Container>
        </div>
    )
}

export default Product