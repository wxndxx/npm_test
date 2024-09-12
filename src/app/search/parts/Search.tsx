'use client'

import Card from '@/app/catalog/parts/Card'
import Container from '@/components/UI/Container/Container'
// import Icon from '@/components/UI/Icon/Icon'
import Input from '@/components/UI/Input/Input'
import { onlineService } from '@/services/online.service'
import { ICatalog } from '@/shared/types/Cataloge'
import { onChangeCatalog, pushCatalog } from '@/store/Slices/Catalogeslice'
import { useTypedDispatch } from '@/store/store'
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

function Search({}: Props) {

    const [searchVal, setSearchVal] = useState<string>('')
    const [zeroCount, setZeroCount] = useState(false)

    function searchFunc(val:string) {
        if(val.length > 0) {
            onlineService.searchProduct({val: val})
            .then((res:any) => {
                if(res.count > 0) {
                    const pages = res.count
                    setNext(res.next)
                    setSeen(res.results.length)
                    setCount(pages)
                    setPages(roundAndCreateArray(pages));
                    setList(roundAndCreateArray(pages));
                    let arrayForSort = [...res.results]
                    dispatch(onChangeCatalog(arrayForSort))
                    setCatalogList(arrayForSort)
                    setZeroCount(false)
                } else {
                    setZeroCount(true)
                }
            })
            .catch((err:any) => {
                console.log(err);
            })
        }
    }

    const [initialVal, _setInitialVal] = useState('BMW')

    useEffect(() => {
        onlineService.searchProduct({val: searchVal ? searchVal : initialVal})
        .then((res:any) => {
            if(res.count > 0) {
                const pages = res.count
                setNext(res.next)
                setSeen(res.results.length)
                setCount(pages)
                setPages(roundAndCreateArray(pages));
                setList(roundAndCreateArray(pages));
                let arrayForSort = [...res.results]
                dispatch(onChangeCatalog(arrayForSort))
                setCatalogList(arrayForSort)
                setZeroCount(false)
            } else {
                setZeroCount(true)
            }
        })
        .catch((err:any) => {
            console.log(err);
        })
    }, [])

    // const modelState = useTypedSelector((state) => state.cataloge.model) 
    // const brandState = useTypedSelector((state) => state.cataloge.brand) 
    // const generationState = useTypedSelector((state) => state.cataloge.generation)

    const [catalogList, setCatalogList] = useState<ICatalog[] | null>()
    // const [sort, _setSort] = useState<boolean>(true)
    // const [sortPopular, _setSortPopular] = useState<boolean>(true)
  
    const [count, setCount] = useState<number>()
    const [seen, setSeen] = useState<any>()

    const [next, setNext] = useState<any>()
    const [pages, setPages] = useState<any>([
    ])
    const [mainPage, setMainPage] = useState<number>(1)
    const [prevLength, setPrevLength] = useState<any>(0)

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

      const dispatch = useTypedDispatch()

    function getMoreProducts(item:any) {
        onlineService.searchProduct({val: searchVal ? searchVal : initialVal, page: item})
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
          setPages(roundAndCreateArray(resPages));
          setList(roundAndCreateArray(resPages));
          let arrayForSort = [...res.results]
          dispatch(pushCatalog(arrayForSort))
          setCatalogList(arrayForSort)
        })
        .catch((err:any) => {
          alert(err)
        })
        setMainPage(item)
      }


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

      const ref = useRef<HTMLDivElement>(null);

      const [list, setList] = useState<number[]>([1,2,3,4,5,6,7,8,9]);
      const initialBtn = [1,2,3,4];
      const [btn, setBtn] = useState(initialBtn);

      const seeMore = () => {
        const res = btn.indexOf(mainPage + 1)
        handleBtnClick(res, mainPage + 1)
      }

      const minBtn = 1;
      const maxBtn = list.length;

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

    return (
        <div ref={ref} className='pt-[40px]'>
            <Container>
                <div className='w-full flex flex-col gap-[20px]'>
                    <h1 className='text-u-h1 font-bold uppercase'>Поиск по запчастям</h1>
                    <Input customClass='search' searchFunc={() => {searchFunc(searchVal)}} del={() => {
                        setSearchVal('')
                        setNext(null)
                        setSeen(null)
                        setCount(1)
                        setPages(roundAndCreateArray(null));
                        setList(roundAndCreateArray(null));
                      //   let sorted = arrayForSort.sort((a:ICatalog, b:ICatalog) => {
                      //     return a.sum - b.sum;
                      // })
                        dispatch(onChangeCatalog([]))
                        setCatalogList([])
                    }} value={searchVal} onChange={(e) => setSearchVal(e.target.value)} type='deletion'></Input>
                    {/* <div className='items-center flex gap-[10px]'>
                    <p className='text-i-p2'>Сортировать по:</p>
                    <div onClick={() => {
                      setSort(!sort)
                      
                      setTimeout(() => {
                        onlineService.searchProduct({val: searchVal ? searchVal : 'BMW', page: '1', sum: !sort ? 0 : 1, populate: sortPopular ? 0 : 1})
                        .then((res:any) => {
                          const pages = res.count
                          setNext(res.next)
                          setCount(pages)
                          setSeen(res.results.length)
                          setPages(roundAndCreateArray(pages));
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
                      onlineService.searchProduct({val: searchVal ? searchVal : 'BMW', page: '1', sum: sort ? 0 : 1,populate: !sortPopular ? 0 : 1})
                      .then((res:any) => {
                        const pages = res.count
                        setNext(res.next)
                        setCount(pages)
                        setSeen(res.results.length)
                        setPages(roundAndCreateArray(pages));
                        let arrayForSort = [...res.results]
                        dispatch(onChangeCatalog(arrayForSort))
                        setCatalogList(arrayForSort)
                      })
                      .catch((err:any) => {
                        alert(err)
                      })
                      setMainPage(1)
                    }} className='text-prim4 items-center flex gap-[8px] cursor-pointer'><Icon type={sortPopular ? 'd' : 'u'} color='rgb(0 125 191)'/>Популярности</div>
                    </div> */}
                    {zeroCount ? <div className='w-full min-h-[450px] flex justify-center items-center pb-[20px] text-gray5 text-i-p1 font-medium'>
                        <p>По вашему запросу ничего не найдено.</p>
                    </div> :<div className='pb-[20px]'>
                    <div className={'w-full pt-[20px] xs:pt-[40px] xxs:grid-cols-2 xs:grid-cols-3 m:grid-cols-4 justify-between gap-[10px] grid'}>
                    {catalogList && catalogList.map((item, index) => (<Card item={item} link={`catalog/${item.id}`} key={index} name={item.name} main_image={item.main_url}></Card>))}
                        </div>
                        {catalogList && catalogList?.length > 0 && <div className='p-[15px_0px_25px_0px] xs:p-[30px_0px_50px_0px] border-b border-b-gray2'>
                            {next && <button className='btn__p w-full flex justify-center py-[11px]' onClick={() => {
                            console.log(catalogList?.length)
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
                                }
                            </div>}
                        </div>}
                    </div>}
                </div>
            </Container>
        </div>
    )
}

export default Search