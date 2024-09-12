'use client'

import React, { useEffect, useRef, useState } from 'react'
import OurWorksCard from './parts/OurWorksCard'
import Slider, { Settings } from 'react-slick'
import Icon from '@/components/UI/Icon/Icon'
import Container from '@/components/UI/Container/Container'
import s from './OurWorks.module.scss'
import { onlineService } from '@/services/online.service'
import { useRouter } from 'next/navigation'

type Props = {
    title?: string
}

export interface IList {
    name:string,
    service_name: string,
    description: string,
    images: {image:string}[]
}

function OurWorks({title}: Props) {
  
    const [list, setList] = useState<IList[]>()
    useEffect(() => {
        onlineService.getReviews()
        .then((res:any) => {
            setList(res.results)
        })
    }, [])
    
    const sliderRef1 = React.useRef<Slider | null>(null);
    const sliderRef2 = React.useRef<Slider | null>(null);
    const [_currentSlide, setCurrentSlide] = useState<number>(1)

    const [sliderIndex, setSliderIndex] = useState<number>(0)
    useEffect(() => {
        if (sliderRef1.current) {
            sliderRef1.current.slickGoTo(sliderIndex);
        }
      }, [sliderIndex]);

    //let sliderRef = React.useRef<Slider | null>(null);
    // const play = () => {
    //     (sliderRef.current as Slider).slickPlay();
    // };
    // const pause = () => {
    //     (sliderRef.current as Slider).slickPause();
    // };

    const settings1: Settings = {
        infinite: false,
        slidesToShow: 4,
        //focusOnSelect: true,
        //slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,
        touchMove: true,
        prevArrow: <></>,
        nextArrow: <></>,
        beforeChange: (_oldIndex, newIndex) => {
            setSliderIndex(newIndex)
          setCurrentSlide(newIndex);
          if(sliderRef2.current){
            sliderRef2.current.slickGoTo(newIndex);
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

    const {push} = useRouter()
    
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
        <div className={'w-full flex flex-col max-w-[1360px] overflow-hidden gap-[20px]'}>
            <div className='flex justify-between items-center w-full mb-[5px] xs:mb-[20px]'>
                <h2 className='text-u-h2 font-bold uppercase'>{title ? title : 'работы Matalex performance'}</h2>
                <button className='btn__s p-[11px_15px] xxs:flex gap-[15px] hidden ' onClick={() => push('/our_works')}>Смотреть все <Icon type='uf'></Icon></button>
            </div>
            <div className={s.slider}>
            {list && <Slider ref={sliderRef1} {...settings1}>
                    {list.slice(0, 5).map((item:IList, index:number) => {
                      return(
                        <div key={index} className={s.card}><OurWorksCard item={item} /></div>
                    )})}
                </Slider>}
            </div>
            <div className='flex justify-center'>
                <div className={s.dots + ' ' + 'n:hidden flex'}>
                    <div className='flex w-full gap-1 justify-center items-center'>
                    {list && list.slice(0, 5).map((_item:any, index) => (
                            <div key={index} onClick={() => setSliderIndex(index)}><div className={sliderIndex === index ? 'w-[8px] h-[8px] rounded-[50%] bg-white cursor-pointer' :'cursor-pointer w-[6px] h-[6px] rounded-[50%] bg-gray4 hover:bg-gray3'}></div></div>
                        ))}
                        
                    </div>
                </div>
            </div>
            <button className='btn__p p-[11px_15px] xxs:hidden gap-[15px] flex' onClick={() => push('/our_works')}>Смотреть все <Icon type='uf'></Icon></button>
        </div>
    </Container>
  )
}

export default OurWorks