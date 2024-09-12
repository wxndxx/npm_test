'use client'

import React, { useEffect, useRef, useState } from 'react'
import s from './Reviews.module.scss'
import Slider, { Settings } from 'react-slick'
import ReviewsCard from './parts/ReviewsCard'
import Container from '@/components/UI/Container/Container'
import Link from 'next/link'
// import Icon from '@/components/UI/Icon/Icon'

type Props = {list: {results:IList[]}}

interface IList {
    name: string,
    description: string,
    link: string
  }

function Reviews({list}: Props) {
    const sliderRef1 = React.useRef<Slider | null>(null);
    const sliderRef2 = React.useRef<Slider | null>(null);
    const [_currentSlide, setCurrentSlide] = useState<number>(1)

    const [sliderIndex, setSliderIndex] = useState<number>(0)
    useEffect(() => {
        if (sliderRef1.current) {
            sliderRef1.current.slickGoTo(sliderIndex);
        }
      }, [sliderIndex]);

    let sliderRef = React.useRef<Slider | null>(null);

    const settings1: Settings = {
        infinite: false,
        slidesToShow: 4,
        focusOnSelect: true,
        //slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,
        touchMove: true,
        prevArrow: <></>,
        nextArrow: <></>,
        beforeChange: (_oldIndex, newIndex) => {
            setSliderIndex(newIndex);
            setCurrentSlide(newIndex);
            if(sliderRef.current){
                sliderRef.current.slickGoTo(newIndex);
            }
        },
        responsive: [
            {
              breakpoint: 1120,
              settings: {
                infinite: false,
                slidesToShow: 3,
                swipeToSlide: true,
                autoplay: true,
                autoplaySpeed: 4000,
                touchMove: true,
                prevArrow: <></>,
                nextArrow: <></>,
              }
            },
            {
                breakpoint: 760,
                settings: {
                  infinite: false,
                  slidesToShow: 2,
                  swipeToSlide: true,
                  autoplay: true,
                  autoplaySpeed: 4000,
                  touchMove: true,
                  prevArrow: <></>,
                  nextArrow: <></>,
                }
              },
              {
                breakpoint: 500,
                settings: {
                  infinite: false,
                  slidesToShow: 1,
                  swipeToSlide: true,
                  autoplay: true,
                  autoplaySpeed: 4000,
                  touchMove: true,
                  prevArrow: <></>,
                  nextArrow: <></>,
                }
              },
        ]
    };

    useEffect(() => {
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
        // onChangeModel(null)
        // onChangeGeneration(null)
        // onChangeBrand(null)
    }, []);

    // const list:IList[] = [
    //     {
    //         name: 'Олег Степанов',
    //         description: 'Отличная компания.Очень приятные молодые люди, Владимир, Орхан и вообще весь коллектив. Очень доволен проделанной работой - заменил задний бампер.Сделали просто супер. Ребята действительно профи своего дела.Кто желает обновить свои авто, то советую обратиться к этим ребятам. Останетесь довольны. Спасибо. MATALEX store-вы крутые!',
    //         link: '/',
    //     },
    //     {
    //         name: 'Олег Степанов',
    //         description: 'Отличная компания.Очень приятные молодые люди, Владимир, Орхан и вообще весь коллектив. Очень доволен проделанной работой - заменил задний бампер.Сделали просто супер. Ребята действительно профи своего дела.Кто желает обновить свои авто, то советую обратиться к этим ребятам. Останетесь довольны. Спасибо. MATALEX store-вы крутые!',
    //         link: '/',
    //     },
    //     {
    //         name: 'Олег Степанов',
    //         description: 'Отличная компания.Очень приятные молодые люди, Владимир, Орхан и вообще весь коллектив. Очень доволен проделанной работой - заменил задний бампер.Сделали просто супер. Ребята действительно профи своего дела.Кто желает обновить свои авто, то советую обратиться к этим ребятам. Останетесь довольны. Спасибо. MATALEX store-вы крутые!',
    //         link: '/',
    //     },
    //     {
    //         name: 'Олег Степанов',
    //         description: 'Отличная компания.Очень приятные молодые люди, Владимир, Орхан и вообще весь коллектив. Очень доволен проделанной работой - заменил задний бампер.Сделали просто супер. Ребята действительно профи своего дела.Кто желает обновить свои авто, то советую обратиться к этим ребятам. Останетесь довольны. Спасибо. MATALEX store-вы крутые!',
    //         link: '/',
    //     },
    //     {
    //         name: 'Олег Степанов',
    //         description: 'Отличная компания.Очень приятные молодые люди, Владимир, Орхан и вообще весь коллектив. Очень доволен проделанной работой - заменил задний бампер.Сделали просто супер. Ребята действительно профи своего дела.Кто желает обновить свои авто, то советую обратиться к этим ребятам. Останетесь довольны. Спасибо. MATALEX store-вы крутые!',
    //         link: '/',
    //     },
    //     {
    //         name: 'Олег Степанов',
    //         description: 'Отличная компания.Очень приятные молодые люди, Владимир, Орхан и вообще весь коллектив. Очень доволен проделанной работой - заменил задний бампер.Сделали просто супер. Ребята действительно профи своего дела.Кто желает обновить свои авто, то советую обратиться к этим ребятам. Останетесь довольны. Спасибо. MATALEX store-вы крутые!',
    //         link: '/',
    //     },
    //     {
    //         name: 'Олег Степанов',
    //         description: 'Отличная компания.Очень приятные молодые люди, Владимир, Орхан и вообще весь коллектив. Очень доволен проделанной работой - заменил задний бампер.Сделали просто супер. Ребята действительно профи своего дела.Кто желает обновить свои авто, то советую обратиться к этим ребятам. Останетесь довольны. Спасибо. MATALEX store-вы крутые!',
    //         link: '/',
    //     },
    //     {
    //         name: 'Олег Степанов',
    //         description: 'Отличная компания.Очень приятные молодые люди, Владимир, Орхан и вообще весь коллектив. Очень доволен проделанной работой - заменил задний бампер.Сделали просто супер. Ребята действительно профи своего дела.Кто желает обновить свои авто, то советую обратиться к этим ребятам. Останетесь довольны. Спасибо. MATALEX store-вы крутые!',
    //         link: '/',
    //     },
    //     {
    //         name: 'Олег Степанов',
    //         description: 'Отличная компания.Очень приятные молодые люди, Владимир, Орхан и вообще весь коллектив. Очень доволен проделанной работой - заменил задний бампер.Сделали просто супер. Ребята действительно профи своего дела.Кто желает обновить свои авто, то советую обратиться к этим ребятам. Останетесь довольны. Спасибо. MATALEX store-вы крутые!',
    //         link: '/',
    //     },
    //     {
    //         name: 'Олег Степанов',
    //         description: 'Отличная компания.Очень приятные молодые люди, Владимир, Орхан и вообще весь коллектив. Очень доволен проделанной работой - заменил задний бампер.Сделали просто супер. Ребята действительно профи своего дела.Кто желает обновить свои авто, то советую обратиться к этим ребятам. Останетесь довольны. Спасибо. MATALEX store-вы крутые!',
    //         link: '/',
    //     },
    //     {
    //         name: 'Олег Степанов',
    //         description: 'Отличная компания.Очень приятные молодые люди, Владимир, Орхан и вообще весь коллектив. Очень доволен проделанной работой - заменил задний бампер.Сделали просто супер. Ребята действительно профи своего дела.Кто желает обновить свои авто, то советую обратиться к этим ребятам. Останетесь довольны. Спасибо. MATALEX store-вы крутые!',
    //         link: '/',
    //     },
    //     {
    //         name: 'Олег Степанов',
    //         description: 'Отличная компания.Очень приятные молодые люди, Владимир, Орхан и вообще весь коллектив. Очень доволен проделанной работой - заменил задний бампер.Сделали просто супер. Ребята действительно профи своего дела.Кто желает обновить свои авто, то советую обратиться к этим ребятам. Останетесь довольны. Спасибо. MATALEX store-вы крутые!',
    //         link: '/',
    //     },
    // ]

    const targetRef = useRef<HTMLDivElement | null>(null); // Ссылка на нужный блок, к которому будет скролл
    const [isVisibleContent, setIsVisibleContent] = useState(false); // Состояние видимости блока

    useEffect(() => {
        const handleScroll = () => {
            // Проверяем, находится ли целевой элемент в области видимости
            if (targetRef.current) {
                const rect = targetRef.current.getBoundingClientRect();
                const isVisibleNow = rect.top >= 0 && rect.bottom <= window.innerHeight;

                // Если элемент стал видимым, выводим сообщение в консоль
                if (isVisibleNow && !isVisibleContent) {
                    console.log('a')
                    setIsVisibleContent(true); // Обновляем состояние, чтобы избежать повторного вывода
                } else if (!isVisibleContent && isVisibleContent) {
                    setIsVisibleContent(false); // Сбрасываем состояние, если элемент больше не виден
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        // Очистка эффекта
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isVisibleContent]);

  return (
    <Container>
        <div ref={targetRef} className='w-full flex flex-col gap-[20px]'>
            <div className='flex items-center justify-between'>
                <h2 className='text-u-h2 font-bold uppercase mb-[20px]'>Отзывы о работе</h2>
                <Link href={'https://mataleks.clients.site/?ysclid=lzgnq55u1q18111861#rating'} className={'p-[11px_15px] gap-[15px] xxs:flex hidden items-center' + ' ' + s.btn__s}>Смотреть все на 
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10C0 4.477 4.476 0 10 0C15.522 0 20 4.477 20 10C20 15.523 15.522 20 10 20C4.476 20 0 15.523 0 10Z" fill="#FC3F1D"/>
                    <path d="M11.2792 5.66655H10.3552C8.66122 5.66655 7.77022 6.52455 7.77022 7.78955C7.77022 9.21955 8.38622 9.88955 9.65122 10.7485L10.6962 11.4525L7.69322 15.9395H5.44922L8.14422 11.9255C6.59422 10.8145 5.72422 9.73555 5.72422 7.91055C5.72422 5.62255 7.31922 4.06055 10.3442 4.06055H13.3472V15.9285H11.2792V5.66655Z" fill="white"/>
                    </svg>
                </Link>
            </div>
            <div>
            <div className={s.slider + 'w-full'}>
                <Slider ref={isVisibleContent ? sliderRef1 : null} {...settings1}>
                    {list && list.results.slice(0, 5).map((item:IList, index:number) => {
                        // debugger
                        return(
                        <div key={index} className='px-[10px]'><ReviewsCard item={item} /></div>
                    )})}
                </Slider></div>
            </div>
            <div className='flex justify-center'>
                <div className={s.dots + ' ' + 'n:hidden flex'}>
                    <div className='flex w-full gap-1 justify-center items-center'>
                    {list && list.results.slice(0, 5).map((_item:any, index) => (
                            <div key={index} onClick={() => setSliderIndex(index)}><div className={sliderIndex === index ? 'w-[8px] h-[8px] rounded-[50%] bg-white cursor-pointer' :'cursor-pointer w-[6px] h-[6px] rounded-[50%] bg-gray4 hover:bg-gray3'}></div></div>
                        ))}
                        
                    </div>
                </div>
            </div>
            <Link href={'https://mataleks.clients.site/?ysclid=lzgnq55u1q18111861#rating'} className={'flex p-[11px_15px] gap-[15px] justify-center xxs:hidden items-center rounded-lg font-medium select-none text-prim3 bg-prim1'}><div className='flex items-center gap-[10px]'><p>Смотреть все на </p>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10C0 4.477 4.476 0 10 0C15.522 0 20 4.477 20 10C20 15.523 15.522 20 10 20C4.476 20 0 15.523 0 10Z" fill="#FC3F1D"/>
                    <path d="M11.2792 5.66655H10.3552C8.66122 5.66655 7.77022 6.52455 7.77022 7.78955C7.77022 9.21955 8.38622 9.88955 9.65122 10.7485L10.6962 11.4525L7.69322 15.9395H5.44922L8.14422 11.9255C6.59422 10.8145 5.72422 9.73555 5.72422 7.91055C5.72422 5.62255 7.31922 4.06055 10.3442 4.06055H13.3472V15.9285H11.2792V5.66655Z" fill="white"/>
                    </svg></div>
                </Link>
        </div>
    </Container>
  )
}

export default Reviews