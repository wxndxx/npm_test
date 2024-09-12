'use client'

import Container from '@/components/UI/Container/Container'
import Icon from '@/components/UI/Icon/Icon'
import Select from '@/components/UI/Select/Select'
import { authService } from '@/services/auth.service'
import { onChangeBrand, onChangeCatalog, onChangeModel, pushCatalog } from '@/store/Slices/Catalogeslice'
import { useTypedDispatch } from '@/store/store'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import Card from './parts/Card'
import { onlineService } from '@/services/online.service'
import { ICatalog } from '@/shared/types/Cataloge'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react';
import { MyStorage } from '@/utils/MyStorage'

type Props = {}

interface ITitle {
  id: number,
  name: string,
  image?: string,
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

function Catalog({}: Props) {
  
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

  const brandId = null
  const modelId = null
  const brand = null

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
  // }   

  useEffect(() => {
      authService.getBrands()
      .then((res:any) => {
          setBrands(res)
      })
  }, [])

  const dispatch = useTypedDispatch()
  
  // function reset() {
  //   setMainPage(1)
  //   getMoreProducts(1)
  //   setCatalogList([])
  // }


  function setselectedBrands(brand:ITitle[]) {
    // debugger
    brand.length > 0 ? setBrandState(brand[0].id) : setBrandState(null)
    brand.length > 0 ? setBrandName(brand[0].name) : setBrandName(null)
    dispatchLocal({ type: 'set_selected_brands', payload: brand});
    dispatchLocal({ type: 'set_selected_models', payload: []});
    dispatch(onChangeBrand(state.selectedBrands))
    dispatch(onChangeModel([]))
    if(brand.length != 0){
      authService.getModels(brand[0].name)
      .then((res:any) => {
          setModels(res)
      })
    } else {
      // reset()
      dispatchLocal({ type: 'del_models'});
    }
  }

  function setSelectedModels(model:ITitle[]) {
    debugger
    if(model.length > 0) {
      setModelState(model[0].id)
      dispatchLocal({ type: 'set_selected_models', payload: model});
      dispatch(onChangeModel(state.selectedModels))
    } else {
      setModelState(null)
      dispatchLocal({ type: 'set_selected_models', payload: model});
      dispatch(onChangeModel(state.selectedModels))
    }
  }

  let [modelState, setModelState] = useState<any>(modelId);
  let [brandState, setBrandState] = useState<any>(brandId);
  let [brandName, setBrandName] = useState<any>(brand);
  let generationState = null;

  function roundAndCreateArray(num:any) {
    // Округляем число до ближайшего большего целого
    const roundedNum = Math.ceil(num / 20) * 20;

    // Создаем массив от 1 до округленного числа, деленного на 20
    const arr = [];
    for (let i = 1; i <= roundedNum / 20; i++) {
      arr.push(i);
    }

    return arr;
  }
  //fix
  const searchParams = useSearchParams();

  useEffect(() => {
    // debugger
    const brand = searchParams.get('brandId');
    const model = searchParams.get('model');
    brandState = brand;
    modelState = model;
    generationState = MyStorage.get('generation');
    if(brandState || modelState) {
      generationState && dispatchLocal({ type: 'set_selected_generation', payload: JSON.parse(JSON.stringify(generationState))});
      authService.getModels(brand)
      .then((res:any) => {
          setModels(res)
          // let a = res.find((item:any) => item.id === modelId)
          // let b = res[0]
          modelId && dispatchLocal({ type: 'set_selected_models', payload: [JSON.parse(JSON.stringify(res.find((item:any) => item.id === +modelId)))]})
      })
      authService.getBrands()
      .then((res:any) => {
        dispatchLocal({ type: 'set_selected_brands', payload: [JSON.parse(JSON.stringify(res.find((item:any) => item.name === brand)))]})
      })
      //modelState && dispatchLocal({ type: 'set_selected_models', payload: JSON.parse(JSON.stringify(modelState))});
      if(modelState) {
        onlineService.getProduct({id: modelState ?? '6', sum: sort ? 0 : 1, populate: sortPopular ? 0 : 1})
        .then((res:any) => {
          const pages = res.count
          setNext(res.next)
          setSeen(res.results.length)
          setCount(pages)
          setPages(roundAndCreateArray(pages));
          setList(roundAndCreateArray(pages));
          let arrayForSort = [...res.results]
        //   let sorted = arrayForSort.sort((a:ICatalog, b:ICatalog) => {
        //     return a.sum - b.sum;
        // })
          dispatch(onChangeCatalog(arrayForSort))
          setCatalogList(arrayForSort)
        })
        .catch((err:any) => {
          alert(err + 'first')
        })
      }
    } else {
      
      onlineService.getProduct({id:'6', sum: sort ? 0 : 1, populate: sortPopular ? 0 : 1})
      .then((res:any) => {
        let arrayForSort = [...res.results]
        const pages = res.count
        setNext(res.next)
        setCount(pages)
        setSeen(res.results.length)
        setList(roundAndCreateArray(pages));
        setPages(roundAndCreateArray(pages));
        
      //   let sorted = arrayForSort.sort((a:ICatalog, b:ICatalog) => {
      //     return a.sum - b.sum;
      // })
        dispatch(onChangeCatalog(arrayForSort))
        setCatalogList(arrayForSort)
      })
      .catch((err:any) => {
        alert(err + 'sec')
      })
    }
    // return(() => {
    //   //согласовать диспатчи
    //   // dispatch(onChangeBrand(null))
    //   // dispatch(onChangeGeneration(null))
    //   // dispatch(onChangeModel(null))
    //   onChangeModel(null)
    //   onChangeGeneration(null)
    //   onChangeBrand(null)
    // })
  }, [])


  const [catalogList, setCatalogList] = useState<ICatalog[] | null>()
  const [sort, setSort] = useState<boolean>(true)
  const [sortPopular, setSortPopular] = useState<boolean>(true)

  const [count, setCount] = useState<number>()
  const [seen, setSeen] = useState()

  function getProduct() {
    onlineService.getProduct({id: modelState ?? '6', sum: sort ? 0 : 1, populate: sortPopular ? 0 : 1})
    .then((res:any) => {
      const pages = res.count
      setNext(res.next)
      setCount(pages)
      setSeen(res.results.length)
      setPages(roundAndCreateArray(pages));
      setList(roundAndCreateArray(pages))
      let arrayForSort = [...res.results]

      dispatch(onChangeCatalog(arrayForSort))
      setCatalogList(arrayForSort)
    })
    .catch((err:any) => {
      alert(err)
    })
  }


  // function sortCatalog(order: boolean) {
  //   // 
  //   if(catalogList) {
  //     if (order) {
  //       setSort(true)
  //     } else {
  //       setSort(false)
  //     }
  //   } return
  // }

  const [next, setNext] = useState()
  const [pages, setPages] = useState<any>([
  ])
  const [mainPage, setMainPage] = useState<number>(1)
  const [prevLength, setPrevLength] = useState(0)

  function getMoreProducts(item:any) {
    // debugger
    onlineService.getProduct({id: modelState ?? '6', page: item, sum: sort ? 0 : 1, populate: sortPopular ? 0 : 1})
    .then((res:any) => {
      const resPages = res.count
      setNext(res.next)
      setCount(resPages)
      setPrevLength(res.results.length)
      let range = 0
      item > mainPage ? range = item - mainPage : mainPage - item
      //
      setSeen((prev:any) => {
        if(item > mainPage) {
          const newRange = range * 20
          const prevItem = newRange + prev
          const ost = prevItem - resPages
          return (item === pages[pages.length - 1] ? prevItem - ost : prevItem)
        } else if(item < mainPage) {
          const newRange = item * 20
          const plus = newRange - prev
          const prevItem = range * 20
          const ost = newRange - prevItem
          ost + plus
          return (item === pages[0] ? prevItem + ost : ost)
        }
        return (item > mainPage ? prev + res.results.length : !res.prev ? prev - prevLength : res.results.length)
      })
      // handleBtnClick(2,item)
      setPages(roundAndCreateArray(resPages));
      setList(roundAndCreateArray(resPages));
      let arrayForSort = [...res.results]
      dispatch(pushCatalog(arrayForSort))
      debugger
      setCatalogList((prev:any) => [...prev, ...arrayForSort])
    })
    .catch((err:any) => {
      alert(err)
    })
    setMainPage(item)
  }

  const ref = useRef<HTMLDivElement>(null);

  //когда больше 6 страниц
  // const initialRange = [1, 2, 3, 4];
  // const [buttons, setButtons] = useState(initialRange);
  // const min = 1;
  // const max = pages.length;

  // const handleClick = (index:any) => {
  //   if (index === buttons.length - 1 && buttons[buttons.length - 1] < max) {
  //     const newButtons = buttons.map((button) => button + 2);
  //     setButtons(newButtons);
  //   } else if (index === 0 && buttons[0] > min) {
  //     const newButtons = buttons.map((button) => button - 2);
  //     setButtons(newButtons);
  //   }
  //   setMainPage(index)
  // };

  const seeMore = () => {
    const res = btn.indexOf(mainPage + 1)
    handleBtnClick(res, mainPage + 1)
  }

  const [list, setList] = useState<number[]>([1,2,3,4,5,6,7,8,9,10]);
  const initialBtn = [1,2,3,4];
  const [btn, setBtn] = useState(initialBtn);

  const minBtn = 1;
  let maxBtn = list.length;

  useEffect(() => {
    maxBtn = list.length
  }, [list])
  
  function handleBtnClick(index:any, item:any) {
    //
    if (index === btn.length - 1 && btn[btn.length - 1] < maxBtn) {
      const newButtons = btn.map((button) => button + 1
        // {
        //   if(button + 1 < maxBtn) {
        //     return button + 1
        //   }
        // }
        
      );
      setBtn(newButtons);
    } else if (index === 0 && btn[0] > minBtn) {
      const newButtons = btn.map((button) => button - 1);
      setBtn(newButtons);
    }
    setMainPage(item)
  }

  const PaginationFunc = () => {

    const hasFirstNumber = btn.includes(list[0]);
    const hasLastNumber = btn.includes(list[list.length - 1]);

    function setLast() {
      //
      getMoreProducts(list[list.length - 1])
      setMainPage(list[list.length - 1])
      setBtn([list[list.length-4],list[list.length-3], list[list.length-2], list[list.length-1]])
    }

    function setFirst() {
      //
      getMoreProducts(list[0])
      setMainPage(list[0])
      setBtn([list[0],list[1], list[2], list[3]])
      
    }

    function findindex(item:any) {
      console.log(list);
      getMoreProducts(item)
      const res = btn.indexOf(item)
      return res
    }
    return (
      <div className='flex items-center justify-between gap-[10px]'>
        {!hasLastNumber?
        <div></div> 
         : <div className='flex gap-[10px]'><button onClick={() => setFirst()} className='btn__s p-[5.5px_15px] text-p3'>{list[0]}</button><div className='bg-white p-[7px_20px] rounded-[8px]'>...</div></div>}

        {!hasFirstNumber && !hasLastNumber && <div className='flex gap-[10px]'><button onClick={() => setFirst()} className='btn__s p-[5.5px_15px] text-p3'>{list[0]}</button><div className='bg-white p-[7px_20px] rounded-[8px]'>...</div></div>}

        {btn.map((item:any, index:number) => (
          <button key={index} onClick={() => handleBtnClick(findindex(item), item)} className={`${mainPage === item ? 'btn__p' : 'btn__s p-[5.5px_15px] text-p3' } p-[5.5px_15px] text-p3`}>{item}</button>
        ))}

        {!hasFirstNumber && !hasLastNumber && <div className='flex gap-[10px]'><div className='bg-white p-[7px_20px] rounded-[8px]'>...</div><button onClick={() => setLast()} className='btn__s p-[5.5px_15px] text-p3'>{list[list.length - 1]}</button></div>}

        {!hasFirstNumber?
        <div></div> 
         : <div className='flex gap-[10px]'><div className='bg-white p-[7px_20px] rounded-[8px]'>...</div><button onClick={() => setLast()} className='btn__s p-[5.5px_15px] text-p3'>{list[list.length - 1]}</button></div>}
      </div>
    )
  }
  const router = useRouter()
  return (
    <div ref={ref} className='p-[20px_0px_25px_0px] xs:p-[41px_0px_50px_0px]'>
      <Container>
        
          <div className='w-full'>
            <div className='flex flex-col gap-[20px]'>
              <h1 className='text-u-h1 font-bold uppercase'>Каталог</h1>
              <div className='grid-cols-1 m:grid-cols-4 w-full justify-between gap-[10px] grid'>
                  <div><Select setSelectedList={setselectedBrands} list={state.brands} selectedList={state.selectedBrands} title='Выберите марку' /></div>
                  <div><Select disabled={state.models.length === 0 && state.selectedModels.length === 0} setSelectedList={setSelectedModels} list={state.models} selectedList={state.selectedModels} title='Выберите модель' /></div>
                  {/* <div><Select disabled={state.selectedModels.length === 0} setSelectedList={setSelectedGeneration} list={state.generation} selectedList={state.selectedGeneration} title='Выберите поколение' /></div> */}
                  <button onClick={() => {
                    getProduct()
                    setSort(true)
                    setSortPopular(true)
                    router.push(`/catalog/?brandId=${brandState}&brandName=${brandName}&model=${modelState}`)
                    setMainPage(1)
                  }} disabled={state.selectedModels.length === 0 || state.selectedBrands.length === 0} className='btn__p py-4 w-full'>Применить фильтры<Icon type='success'></Icon></button>
              </div>
              <div className='items-start xxs:items-center flex flex-col xxs:flex-row gap-[10px]'>
                <p className='text-i-p2'>Сортировать по:</p>
                <div onClick={() => {
                  setSort(!sort)
                  // debugger
                  setTimeout(() => {
                    // debugger
                    onlineService.getProduct({id: modelState && modelState !== "" ? modelState : '6', page: '1', sum: !sort ? 0 : 1, populate: sortPopular ? 0 : 1})
                    .then((res:any) => {
                      // debugger
                      const pages = res.count
                      setNext(res.next)
                      setCount(pages)
                      setSeen(res.results.length)
                      setPages(roundAndCreateArray(pages));
                      setList(roundAndCreateArray(pages));
                      let arrayForSort = [...res.results]
                      dispatch(onChangeCatalog(arrayForSort))
                      setCatalogList(arrayForSort)
                    })
                    .catch((err:any) => {
                      alert(err)
                    })}, 100)
                    setMainPage(1)
                  }} className='text-prim4 items-center flex gap-[8px] cursor-pointer'><Icon type={sort ? 'd' : 'u'} color='rgb(0 125 191)'/>Цене</div>
                <div onClick={() => {
                  setSortPopular(!sortPopular)
                  onlineService.getProduct({id: modelState && modelState !== "" ? modelState : '6', page: '1', sum: sort ? 0 : 1,populate: !sortPopular ? 0 : 1})
                  .then((res:any) => {
                    const pages = res.count
                    setNext(res.next)
                    setCount(pages)
                    setSeen(res.results.length)
                    setPages(roundAndCreateArray(pages));
                    setList(roundAndCreateArray(pages));
                    let arrayForSort = [...res.results]
                    dispatch(onChangeCatalog(arrayForSort))
                    setCatalogList(arrayForSort)
                  })
                  .catch((err:any) => {
                    alert(err)
                  })
                  setMainPage(1)
                }} className='text-prim4 items-center flex gap-[8px] cursor-pointer'><Icon type={sortPopular ? 'd' : 'u'} color='rgb(0 125 191)'/>Популярности</div>
              </div>
            </div>
            <div className={'w-full pt-[25px] xs:pt-[40px] xxs:grid-cols-2 xs:grid-cols-3 m:grid-cols-4 justify-between gap-[10px] grid'}>
              {catalogList && catalogList.map((item, index) => (<Card item={item} link={`catalog/${item.id}`} key={index}name={item.name} main_image={item.main_url}></Card>))}
            </div>
            {catalogList && catalogList?.length > 0 && <div className='p-[15px_0px_25px_0px] xs:p-[30px_0px_50px_0px] border-b border-b-gray2'>
              {next && <button className='btn__p w-full flex justify-center py-[11px]' onClick={() => {
                getMoreProducts(mainPage + 1)
                
                seeMore()
              }}>Показать еще</button>}
            </div>}
            {catalogList && catalogList?.length > 0 && <div className='pt-[15px] flex items-center justify-center xs:justify-between'>
                <div className='font-medium hidden xs:flex'>Показано {seen} товаров из {count}</div>
                {count && count > 20 && <div className='flex items-center justify-between gap-[10px]'>
                  {pages.length < 4 ? pages.map((item:any, index:number) => (
                    <button key={index} className={`${mainPage === item ? 'btn__p' : 'btn__s' } p-[5.5px_15px] text-p3`} onClick={() => {
                      if(mainPage != item) {
                        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                        getMoreProducts(item)
                      }
                    }}>{item}</button>
                  )) : 
                  <PaginationFunc />
                  // <div>

                  // </div>
                  }
                </div>}
            </div>}
          </div>
      </Container>
    </div>
  )
}

const WrapperCatalog = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Catalog />
    </Suspense>
  )
}

export default WrapperCatalog