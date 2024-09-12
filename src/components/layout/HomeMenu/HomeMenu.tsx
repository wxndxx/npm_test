import React, { useEffect, useReducer, useState } from 'react'
import s from './HomeMenu.module.scss'
import Select from '@/components/UI/Select/Select'
import { useTypedDispatch } from '@/store/store'
import Icon from '@/components/UI/Icon/Icon'
import { onChangeBrand, onChangeGeneration, onChangeModel } from '@/store/Slices/Catalogeslice'
import { authService } from '@/services/auth.service'
import Slider, { Settings } from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { MyStorage } from '@/utils/MyStorage'
import { onlineService } from '@/services/online.service'

type Props = {}

interface ITitle {
    id: number,
    name: string,
    image?: string,
}

interface ICustomPrevArrowProps {
    onClick?: () => void;
}

interface State {
    brands: ITitle[],
    selectedBrands: ITitle[],
    models: ITitle[],
    selectedModels: ITitle[],
    generation: ITitle[],
    selectedGeneration: ITitle[],
}

function reducer(state:State, action:any) {
    switch (action.type) {
      case 'set_brands': {
        return {
            ...state,
            brands: action.payload,
        };
      }
      case 'set_selected_brands': {
        return {
            ...state,
            selectedBrands: action.payload,
        };
      }
      case 'set_models': {
        return {
            ...state,
            models: action.payload,
        };
      }
      case 'set_selected_models': {
        return {
            ...state,
            selectedModels: action.payload,
        };
      }
      case 'del_models': {
        return {
            ...state,
            selectedModels: [],
            models: [],
        };
      }
      case 'set_generation': {
        return {
            ...state,
            generation: action.payload,
        };
      }
      case 'set_selected_generation': {
        return {
            ...state,
            selectedGeneration: action.payload,
        };
      }
      default:
        return state;
    }
  }

function HomeMenu({}: Props) {

    const [state, dispatchLocal] = useReducer(reducer, { 
        brands: [], 
        selectedBrands: [],
        models: [],
        selectedModels: [],
        generation: [
           { id: 1, name: '2006'},
           { id: 2, name: '2007'},
           { id: 3, name: '2008'},
           { id: 4, name: '2009'},
           { id: 5, name: '2010'},
           { id: 6, name: '2011'},
           { id: 7, name: '2012'},
           { id: 8, name: '2013'},
           { id: 9, name: '2014'},
           { id: 10, name: '2015'},
           { id: 11, name: '2016'},
           { id: 12, name: '2017'},
           { id: 13, name: '2018'},
           { id: 14, name: '2019'},
           { id: 15, name: '2020'},
           { id: 16, name: '2021'},
           { id: 17, name: '2022'},
           { id: 18, name: '2023'},
           { id: 19, name: '2024'},
        ],
        selectedGeneration: [],
        
    });

    function setBrands(brands:ITitle[]) {
        dispatchLocal({ type: 'set_brands', payload: brands});
    }

    function setModels(models:ITitle[]) {
        dispatchLocal({ type: 'set_models', payload: models});
    }

    // function setGeneration(generation:ITitle[]) {
    //     dispatchLocal({ type: 'set_brands', payload: generation});
    // }

    // function setSelectedGeneration(generation:ITitle[]) {
    //     dispatchLocal({ type: 'set_selected_generation', payload: generation});
    //     dispatch(onChangeGeneration(state.selectedGeneration))
    //     MyStorage.set('generation', state.selectedGeneration)
    // }   

    useEffect(() => {
        authService.getBrands()
        .then((res:any) => {
            setBrands(res)
        })
    }, [])

    const dispatch = useTypedDispatch()

    function setselectedBrands(brand:ITitle[]) {
        // debugger
        dispatchLocal({ type: 'set_selected_brands', payload: brand});
        dispatchLocal({ type: 'set_selected_models', payload: []});
        dispatch(onChangeModel([]))
        dispatch(onChangeBrand(state.selectedBrands))
        MyStorage.set('brand', state.selectedBrands)
        if(brand.length != 0){
                authService.getModels(brand[0].name)
                .then((res:any) => {
                    setModels(res)
                })
        } else {
                dispatchLocal({ type: 'del_models'});
            }
    }

    function setSelectedModels(model:ITitle[]) {
        dispatchLocal({ type: 'set_selected_models', payload: model});
        dispatch(onChangeModel(state.selectedModels))
        MyStorage.set('model', state.selectedModels)
    }

    // const modelState = useTypedSelector((state) => state.cataloge.model) 
    // const brandState = useTypedSelector((state) => state.cataloge.brand) 
    // const generationState = useTypedSelector((state) => state.cataloge.generation)


    //right bar
    const sliderRef1 = React.useRef<Slider | null>(null);
    const sliderRef2 = React.useRef<Slider | null>(null);
    const [_currentSlide, setCurrentSlide] = useState<number>(1)

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
        onChangeModel(null)
        onChangeGeneration(null)
        onChangeBrand(null)
    }, []);

    const CustomPrevArrow: React.FC<ICustomPrevArrowProps> = ({ onClick }) => (
        <div className={s.prev} onClick={onClick}>
            
        </div>
    );
    
    const CustomNextArrow: React.FC<ICustomPrevArrowProps> = ({ onClick }) => (
        <div className={s.next} onClick={onClick}>
            
        </div>
    );

    const settings1: Settings = {
        infinite: true,
        slidesToShow: 1,
        // slidesToScroll: 1,
        className: s.slider,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        beforeChange: (_oldIndex, newIndex) => {
            setSliderIndex(newIndex)
          setCurrentSlide(newIndex);
          if(sliderRef2.current){
            sliderRef2.current.slickGoTo(newIndex);
          }
        },
    };

    const [sliderIndex, setSliderIndex] = useState<number>(0)
    useEffect(() => {
        if (sliderRef1.current) {
            sliderRef1.current.slickGoTo(sliderIndex);
        }
      }, [sliderIndex]);
    // const [slides, _setSlides] = useState([
    //     {img:'', id:1},
    //     {img:'', id:2},
    //     {img:'', id:3},
    //     {img:'', id:4},
    //     {img:'', id:5},
    // ])
    useEffect(() => {
        onlineService.getMainImages()
        .then((res:any) => {
            setSlides(res)
        })
        
    }, [])
    const [slides, setSlides] = useState([])

    useEffect(() => {
        onlineService.getMainImages()
        .then((res:any) => {
            res.data && res.data.length > 0 && setSlides(res.data)
        })
    }, [])


    const {push} = useRouter()
    const catalogeDirect = () => {
        let brandId =  state.selectedBrands[0] ?  `brandId=${state.selectedBrands[0]?.id}` : ''
        let brandName =  state.selectedBrands[0] ? `&brandName=${state.selectedBrands[0]?.name}` : ''
        let modelId =  state.selectedModels[0] ? `&model=${state.selectedModels[0]?.id}` : ''
        debugger
        if(state.selectedBrands[0] || state.selectedBrands[0] || state.selectedModels[0]) {
            push(`/catalog/?${brandId}&${brandName}${modelId}`)
        } else {
            push('/catalog')
        }
    }

    
  return (
    <div className={s.conent}>
        <div className={s.left}>
            <h1 className='text-u-h2 max-w-[870px] uppercase font-bold text-gray6'>Индивидуаль<br className='flex xxs:hidden'/>ный тюнинг для вашего автомобиля</h1>
            <div className='flex flex-col gap-[10px]'>
                <div className='flex w-full flex-col xs:flex-row justify-between gap-[10px]'>
                    <Select setSelectedList={setselectedBrands} list={state.brands} selectedList={state.selectedBrands} title='Выберите марку' />
                    <Select disabled={state.models.length === 0} setSelectedList={setSelectedModels} list={state.models} selectedList={state.selectedModels} title='Выберите модель' />
                    {/* <Select disabled={state.selectedModels.length === 0} setSelectedList={setSelectedGeneration} list={state.generation} selectedList={state.selectedGeneration} title='Выберите поколение' /> */}
                </div>
                <button onClick={() => {
                    // push('/catalog')
                    catalogeDirect()
                }} className='btn__p w-full'>Перейти в каталог <Icon type='uf'/></button>
            </div>
        </div>
        {slides && slides.length > 0 && <div className={s.right }>
            <div className='h-full relative'>
                {slides && slides.length > 0 && <Slider ref={sliderRef1} {...settings1}>
                    {slides.slice(0, 5).map((image:any, index:number) => {
                        return(
                        <div key={index} className='h-[400px] special:h-[600px] special:w-full relative'><Image priority fill className='rounded-[8px] absolute w-full h-full object-cover' src={image} alt="img" /></div>
                    )})}
                    {/* <div className=' h-[610px] w-full bg-red-500'>text1</div>
                    <div className='w-full h-[610px] bg-blue-500'>text2</div>
                    <div className=' h-[610px] w-full bg-green-500'>text1</div>
                    <div className='w-full h-[610px] bg-yellow-500'>text2</div>
                    <div className=' h-[610px] w-full bg-orange-500'>text1</div> */}
                </Slider> }
            </div>
            <div className={s.dots}>
                <div className='flex w-full gap-1 justify-center items-center'>
                {slides && slides.length > 0 && slides.slice(0, 5).map((_item:any, index) => (
                        <div key={index} onClick={() => setSliderIndex(index)}><div className={sliderIndex === index ? 'w-[8px] h-[8px] rounded-[50%] bg-white cursor-pointer' :'cursor-pointer w-[6px] h-[6px] rounded-[50%] bg-gray4 hover:bg-gray3'}></div></div>
                    ))}
                    
                </div>
            </div>
        </div>}
    </div>
  )
}

export default HomeMenu