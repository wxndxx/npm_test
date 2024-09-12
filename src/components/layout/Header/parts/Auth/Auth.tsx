'use client'

import React, { useEffect, useState } from 'react'
import s from './Auth.module.scss'
import Input from '@/components/UI/Input/Input';
import CodeInput from './CodeInput';
import { authService } from '@/services/auth.service';
import Icon from '@/components/UI/Icon/Icon';
import { MyStorage } from '@/utils/MyStorage';
import SearchSelect from '@/components/UI/SearchSelect/SearchSelect';
import { setAuth, setModal, setUser } from '@/store/Slices/ProfileSlice';
import { useTypedDispatch, useTypedSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
// import { basketService } from '@/services/busket.service';
import { onChangeBasket, onChangeStatus, onChangeSum } from '@/store/Slices/BasketSlice';
import { onChangeModal } from '@/store/Slices/HomeSlice';

interface IAutorisation {
    onClose: () => void;
}

interface IAuthBody {
    pageNum: number,
    // userType: 'master' | 'client',
    auth: {
        name: string;
        // last_name: string;
        email: string;
        phone: string;
        password: string;
        // password_repeat: string;
        confirmation: boolean;
        code: string;
        need_to_create_user: boolean;
    }
}

interface IAuthErrors {
    reg: {
        name: [boolean, string];
        // last_name: [boolean, string];
        email: [boolean, string];
        phone: [boolean, string];
        password: {
            length: [boolean, string];
            numbers: [boolean, string];
            chars: [boolean, string];
        };
        // password_repeat: [boolean, string];
        confirmation: [boolean, string];
        code: [boolean, string];
    },
    gosNum: [boolean, string],
    vinNum: [boolean, string]
}

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const Timer: React.FC = () => {
    const [timerValue, setTimerValue] = useState<number>(60); // Начальное значение таймера в секундах
    const [isRunning, setIsRunning] = useState<boolean>(false); // Состояние таймера

    useEffect(() => {
        let timerId: NodeJS.Timeout | null = null;

        if (isRunning && timerValue > 0) {
            timerId = setInterval(() => {
                setTimerValue((prevValue) => prevValue - 1);
            }, 1000);
        }

        // Очищаем таймер при размонтировании или когда таймер завершён
        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [isRunning, timerValue]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const displayTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Форматируем время
    };

    const sendPhone = () => {
        console.log('Отправка телефона...');
        // Здесь поместите вашу логику для отправки телефона
    };

    // Запускаем таймер при первом рендере
    useEffect(() => {
        sendPhone(); // Вызываем функцию sendPhone
        startTimer(); // Запускаем таймер
    }, []);

    return (
        <div>
            <p className={`text-gray2 underline cursor-pointer w-full text-center`}>{displayTime(timerValue)}</p>
            
        </div>
    );
};

function Auth({onClose}: IAutorisation) {
    const {push} = useRouter()
    const dispatch = useTypedDispatch();

    const {modalLink} = useTypedSelector((state) => state.profile)

    const [errors, setErrors] = useState<IAuthErrors>({
        reg: {
            name: [false, ''],
            email: [false, ''],
            phone: [false, ''],
            password: {
                length: [false, ''],
                numbers: [false, ''],
                chars: [false, ''],
            },
            confirmation: [false, ''],
            code: [false, '']
        },
        gosNum: [true, ''],
        vinNum: [true, ''],
    })

    const [autorization, setAuthorisation] = useState<IAuthBody>({
        pageNum: 1,
        // userType: 'master',
        auth: {
            name: '',
            // last_name: '',
            email: '',
            phone: '',
            password: '',
            // password_repeat: '',
            confirmation: false,
            need_to_create_user: true,
            code: ''
        },
        // car: {
        //     mark: '',
        //     model: '',
        //     gos_number: '',
        //     vin_number: '',
        // }
    });

    const Policy = () => {
        return (
            <div className='text-[#838383] text-i-p4 cursor-pointer mt-[10px]'>При первичной авторизации, вы соглашаетесь с <span className='text-[#48ADE3]'>политикой обработки персональных данных.</span></div>
        )
    }
    //функции изменения состояния
    function onChangePhone(e: React.ChangeEvent<HTMLInputElement>) {
        let phoneVal = e.target.value.replace(/\D/g, ""),
            formattedPhone = `+7 `
        if(autorization.auth.phone.length === 0) {
            formattedPhone = `+7 ${phoneVal}`
        }
        if(!phoneVal){
            setAuthorisation(prev => ({
                ...prev,
                auth: {
                    ...prev.auth,
                    phone: formattedPhone
                }
            }));
            errors.reg.phone = [false, '']
            setErrors(JSON.parse(JSON.stringify(errors)))
        }

        const phoneLen = 1
    
        if (phoneVal.length > phoneLen) {
          formattedPhone += '' + phoneVal.substring(phoneLen, phoneLen+3);
        }
    
        if (phoneVal.length >= phoneLen+4) {
          formattedPhone += ' ' + phoneVal.substring(phoneLen+3, phoneLen+6);
        }
    
        if (phoneVal.length >= phoneLen+7) {
          formattedPhone += ' ' + phoneVal.substring(phoneLen+6, phoneLen+8);
        }
    
        if (phoneVal.length >= phoneLen+9) {
          formattedPhone += ' ' + phoneVal.substring(phoneLen+8, phoneLen+10);
        }

        setAuthorisation(prev => ({
            ...prev,
            auth: {
                ...prev.auth,
                phone: formattedPhone
            }
        }));
        errors.reg.phone = [false, '']
        
        if(formattedPhone.length === phoneLen+15){

            setAuthorisation(prev => ({
                ...prev,
                auth: {
                    ...prev.auth,
                    code: ''
                }
            }));
        }
        errors.reg.phone = [false, '']
        setErrors(JSON.parse(JSON.stringify(errors)))
    }

    function onChangeCode(val:string) {
        setAuthorisation((prev) => ({
            ...prev,
            auth: {
                ...prev.auth,
                code: val
            }
        }))
        errors.reg.code = [false, '']
        setErrors(JSON.parse(JSON.stringify(errors)))
    }

    function onChangeName(e:React.ChangeEvent<HTMLInputElement>) {
        setAuthorisation((prev) => ({
            ...prev,
            auth: {
                ...prev.auth,
                name: e.target.value.replace(/\d/g, '')
            }
        }))
        errors.reg.name = [false, '']
        setErrors(JSON.parse(JSON.stringify(errors)))
    }

    function onChangeEmail(e:React.ChangeEvent<HTMLInputElement>) {
        setAuthorisation((prev) => ({
            ...prev,
            auth: {
                ...prev.auth,
                email: e.target.value
            }
        }))
        errors.reg.email = [false, '']
        setErrors(JSON.parse(JSON.stringify(errors)))
    }

    function setPage(page:number) {
        setAuthorisation((prev) => ({
            pageNum: page, 
            auth: {
                ...prev.auth,
            }
        }))
    }
    //функции отправки
    async function sendPhone() {
        authService.sendPhone(autorization.auth.phone, setLoaded)
        .then((res:any) => {
            setAuthorisation((prev) => ({
                pageNum: 2, 
                auth: {
                    ...prev.auth,
                    need_to_create_user:  res && res.need_to_create_user
                }
            }))
        })
        .catch((err) => {
            if(err){
                errors.reg.phone = [true, err.message]
            }
            setErrors(JSON.parse(JSON.stringify(errors)))
        })
       // setPage(2)
    }

    async function sendCode() {
        dispatch(onChangeModal(false))
        setLoaded(false)
        authService.sendCode(autorization.auth.code, autorization.auth.phone)
        .then((res:any) => {
            if(autorization.auth.need_to_create_user) {
                setPage(3)
                setLoaded(true)
            } else {
                MyStorage.set('refreshToken', `Bearer ${res.refresh_token}`)
                MyStorage.set('accessToken', `Bearer ${res.access_token}`)
                authService.getProfile()
                .then((res:any) => {
                    dispatch(onChangeStatus(true))
                    dispatch(onChangeBasket(res))
                    dispatch(onChangeSum(res.appointments_sum + res.products_sum))
                    dispatch(setModal(false))
                    onClose()
                    modalLink ? push(modalLink) : push("/profile")
                    // .catch((err:any) => {
                    //     console.log(err)
                    // })  
                    dispatch(setUser(res.data))
                    dispatch(setAuth(true))
                })
                .catch((err:any) => {
                    console.log(err)
                })
            }
        })
        .catch((err) => {
            if(err){
                setLoaded(true)
                errors.reg.code = [true, err.message]
            }
            setErrors(JSON.parse(JSON.stringify(errors)))
        })
        //setPage(3)
    }

    async function sendinfo() {
        authService.getBrands()
        .then((res:any) => {
            setBrands(res)
            setPage(4)
        })
    }

    // async function createUser() {
    //     authService.createUser(autorization.auth.name, autorization.auth.email, autorization.auth.phone)
    //     .then((res:any) => {
    //         console.log(res)
    //         // MyStorage.set('refreshToken', `Bearer ${res.data.refresh_token}`)
    //         // MyStorage.set('accessToken', `Bearer ${res.data.access_token}`)
    //         onClose()
    //         setLoaded(true)
    //     })
    //     .catch((err) => {
    //         if(err){
    //             setLoaded(true)
    //             errors.reg.code = [true, err.message]
    //         }
    //         setErrors(JSON.parse(JSON.stringify(errors)))
    //     })
    // }

    const [loaded, setLoaded] = useState(true);

    const [brands, setBrands] = useState<any>([])

    const [models, setModels] = useState<any>([])
    const [modelsId, setModelsId] = useState<any>()

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBrands, setFilteredBrands] = useState<any>(brands);
    const [select, setSelect] = useState<any>()

    // models
    const [searchModel, setSearchModel] = useState('');
    const [filteredModels, setFilteredModels] = useState<any>(models);
    const [selectModel, setSelectModel] = useState<any>()

    const handleSearch = (event:any) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
    
        // Фильтрация массива брендов по введенному термину
        const filtered= brands.filter((brand:any) => brand.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
        setFilteredBrands(filtered);
        if(brands.some((brand:any) => brand.name.toLowerCase() === searchTerm.toLowerCase())) {
            //setSearchTerm(searchTerm)
            setSelect(event.target.value)
        } else {
            setSelect(null)
        }
        if(select) {
            const brand = brands.find((brand:any) => brand.name.toLowerCase() === select.toLowerCase())?.name;
            authService.getModels(brand)
            .then((res) => {
                setModels(res)
            })
        }
        if(searchTerm.length === 0) {
            setSearchModel('')
            setSelectModel('')
        }
      };
      
      const setSelected = (val:any) => {
        setSearchTerm(val);
        setSelect(val)
        const brand = brands.find((brand:any) => brand.name.toLowerCase() === val.toLowerCase())?.name;
        authService.getModels(brand)
        .then((res) => {
            setModels(res)
        })
        // brand && authService.getModels(brand)
        // .then((res) => setModels(res))
        //console.log(select)
      }

      //model methods
      const handleSearchModel = (event:any) => {
        const searchModel = event.target.value;
        setSearchModel(searchModel);
    
        // Фильтрация массива брендов по введенному термину
        const filtered= models.filter((brand:any) => brand.name.toLowerCase().startsWith(searchModel.toLowerCase()));
        setFilteredModels(filtered);
        if(models.some((brand:any) => brand.name.toLowerCase() === searchModel.toLowerCase())) {
            //setSearchTerm(searchTerm)
            setSelectModel(event.target.value)
        } else {
            setSelectModel(null)
        }
        if(selectModel) {
            const model = models.find((brand:any) => brand.name.toLowerCase() === selectModel.toLowerCase());
            setModelsId(model)
        }
      };

      const setSelectedModel = (val:any) => {
        setSearchModel(val);
        setSelectModel(val)
        const model = models.find((brand:any) => brand.name.toLowerCase() === val.toLowerCase())?.id;
        setModelsId(model)
        // const brand = brands.find((brand:any) => brand.name.toLowerCase() === val.toLowerCase())?.name;
        // authService.getModels(brand)
        // .then((res) => {
        //     setModels(res)
        // })
        // brand && authService.getModels(brand)
        // .then((res) => setModels(res))
        //console.log(select)
      }


    const [gosNum, setGosValue] = useState('');

    const handleGosChange = (event: any) => {
        console.log(event.target.value.length)
        const input = event.target.value;
        setGosValue(input.toUpperCase());
        // if(event.target.value.length < 10) {
        //     setGosValue(input.toUpperCase());
        // }
      
        // // Проверить, содержит ли строка только цифры и буквы
        const regex = /^[A-Z][0-9]{3}[A-Z]{2}[0-9]{2,3}$/;
        if (!regex.test(input)) {
        // Удалить последний введенный символ, если он не соответствует формату
            errors.gosNum = [true, 'Введите номер формата B876KU777']
            setErrors(JSON.parse(JSON.stringify(errors)))
        } else {
            errors.gosNum = [false, '']
            setErrors(JSON.parse(JSON.stringify(errors)))
        }
      
      };

      const [vinNum, setVinValue] = useState('');
      const handleVinChange = (event: any) => {
        const inputValue = event.target.value;
      
        // Если введенное значение не соответствует, очистить поле ввода

        setVinValue(inputValue.replace(/[^a-zA-Z0-9]/g, "").toUpperCase());

        const regex = /^[A-Z]{8}[0-9][A-Z]{2}[0-9]{6}$/;
        if (!regex.test(inputValue)) {
        // Удалить последний введенный символ, если он не соответствует формату
            errors.vinNum = [true, 'Введите номер формата XXXXXXXXYXXYYYYYY (X - буква, Y-цифра)']
            setErrors(JSON.parse(JSON.stringify(errors)))
        } else {
            errors.vinNum = [false, '']
            setErrors(JSON.parse(JSON.stringify(errors)))
        }
      };

      const [timer, setTimer] = useState(false)
      

    const displayAuthorisationPages = () => {
        switch(autorization.pageNum) {
            case 1: 
                return (
                    <div className='flex flex-col xxs:gap-5 gap-[96px]'>
                        <h3 className='text-u-h3 w-[90%]'>Авторизация - Шаг 1</h3>
                        <div className={s.label}>
                            <p className='text-gray4'>Номер телефона</p>
                            <Input placeholder='Введите номер телефона' type='default' value={autorization.auth.phone} onChange={(e) => onChangePhone(e)}></Input>
                            {errors.reg.phone[0] && <p className='text-red2'>{errors.reg.phone[1]}</p>}
                        </div>
                        <div className='flex flex-col gap-5'>
                            <button disabled={autorization.auth.phone.length < 16 || errors.reg.phone[0]} className='btn__p flex justify-center' onClick={() => {
                                sendPhone()
                                //setTimer(false)
                                setTimeout(() => setTimer(true), 60000)
                            }}>{loaded ? 'Продолжить' : <div className={s.spin}><svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.5V4.5M10 16.5V19.5M4 10.5H1M19 10.5H16M3.63672 4.13672L5.75977 6.25977M14.2422 14.7422L16.3633 16.8633M16.3652 4.13477L14.2441 6.25586M5.75781 14.7422L3.63477 16.8652" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg></div>}</button>
                            <Policy />
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className='flex flex-col xxs:gap-5 gap-[96px]'>
                        <h3 className='text-u-h3 w-[90%]'>Авторизация - Шаг 2</h3>
                        <div className={s.label + ' ' + s.code}>
                            <p className='text-gray4 flex justify-center'>4-х значный код из сообщения</p>
                            <CodeInput func={(val) => {
                                onChangeCode(val)
                            }} />
                            {errors.reg.code[0] && <p className='text-red2 w-full text-center'>{errors.reg.code[1]}</p>}
                            {!timer && <Timer />}
                            <p className={`${timer ? 'text-prim3' : 'text-gray2'} underline cursor-pointer w-full text-center`} onClick={() => {
                                if(timer) {
                                    sendPhone()
                                    setTimer(false)
                                    setTimeout(() => setTimer(true), 60000)
                                }
                            }}>Отправить код еще раз</p>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <button disabled={autorization.auth.code.length < 4} className='btn__p flex justify-center w-full' onClick={() => {
                                sendCode()
                            }}>{loaded ? 'Продолжить' : <div className={s.spin}><svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.5V4.5M10 16.5V19.5M4 10.5H1M19 10.5H16M3.63672 4.13672L5.75977 6.25977M14.2422 14.7422L16.3633 16.8633M16.3652 4.13477L14.2441 6.25586M5.75781 14.7422L3.63477 16.8652" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg></div>}</button>
                            <Policy />
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className='flex flex-col gap-5'>
                        <h3 className='text-u-h3 w-[90%]'>Заполните данные о себе</h3>
                        <div className={s.label}>
                            <p className='text-gray4'>Имя или ФИО</p>
                            <Input placeholder='Введите ваше имя или ФИО' type='default' value={autorization.auth.name} onChange={(e) => onChangeName(e)}></Input>
                        </div>
                        <div className={s.label}>
                            <p className='text-gray4'>Email</p>
                            <Input placeholder='Введите ваш Email' type='default' value={autorization.auth.email} onChange={(e) => onChangeEmail(e)}></Input>
                            <span className='text-gray4 text-i-p4'>Для отправки писем с информацией о заказе или записи</span>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <button disabled={autorization.auth.name.length < 3 || !validEmailRegex.test(autorization.auth.email)} className='btn__p flex justify-center' onClick={() => {
                                sendinfo()
                            }}>{loaded ? 'Продолжить' : <div className={s.spin}><svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.5V4.5M10 16.5V19.5M4 10.5H1M19 10.5H16M3.63672 4.13672L5.75977 6.25977M14.2422 14.7422L16.3633 16.8633M16.3652 4.13477L14.2441 6.25586M5.75781 14.7422L3.63477 16.8652" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg></div>}</button>
                            <Policy />
                        </div>
                        </div>
                    )
            case 4:
                return (
                    <div className='flex flex-col gap-5'>
                        <h3 className='text-u-h3 w-[90%]'>Заполните данные о своем авто</h3>
                        <div onClick={() => {
                            setAuthorisation((prev) => ({
                                pageNum: 3,
                                auth: {
                                    ...prev.auth,
                                }
                            }))
                        }} className={'flex items-center gap-[20px] h-[32px] pl-[6px] cursor-pointer text-i-p3 max-w-[80px]' + ' ' + s.back}>
                            <Icon type='vector_back' /><p>Назад</p>
                        </div>
                        <div className={s.label}>
                            <p className='text-gray4'>Марка</p>
                            <SearchSelect unfilter={brands} setVal={(val) => setSelected(val)} value={searchTerm} onChange={(e) => handleSearch(e)} list={filteredBrands} title='Введите марку'/>
                        </div>
                        <div className={s.label}>
                            <p className='text-gray4'>Модель</p>
                            <SearchSelect disabled={!select} unfilter={models} setVal={(val) => setSelectedModel(val)} value={searchModel} onChange={(e) => handleSearchModel(e)} list={filteredModels} title='Введите модель'/>
                        </div>
                        <div className={s.label}>
                            <p className='text-gray4'>ГОС номер</p>
                            <Input placeholder='Введите ГОС номер' type='default' value={gosNum} onChange={(e) => {handleGosChange(e)
                            }}></Input>
                            {errors.gosNum[0] && <p className='text-red2'>{errors.gosNum[1]}</p>}
                        </div>
                        <div className={s.label}>
                            <p className='text-gray4'>VIN номер</p>
                            <Input placeholder='Введите VIN номер' type='default' value={vinNum} onChange={(e) => handleVinChange(e)}></Input>
                            {errors.vinNum[0] && <p className='text-red2'>{errors.vinNum[1]}</p>}
                        </div>
                            {loaded ? 
                            <div className='flex w-full gap-[10px] items-center justify-between'>
                                <button className='btn__s w-full flex items-center justify-center' onClick={() => {
                                    authService.createUser(autorization.auth.name, autorization.auth.email, autorization.auth.phone)
                                    .then(() => {
                                        authService.getProfile()
                                        .then((res:any) => {
                                            dispatch(onChangeStatus(true))
                                            dispatch(onChangeBasket(res))
                                            dispatch(onChangeSum(res.appointments_sum + res.products_sum))
                                            onClose()
                                            dispatch(onChangeModal(false))
                                            modalLink ? push(modalLink) : push("/profile")

                                            dispatch(setUser(res.data))
                                            dispatch(setAuth(true))
                                        })
                                        .catch((err:any) => {
                                            console.log(err)
                                        })
                                    })
                                    .catch((err:any) => {
                                        console.log(err)
                                    })
                                }}>Пропустить</button>
                                <button disabled={errors.gosNum[0] || errors.vinNum[0] || modelsId === 0 || !select} className='btn__p w-full flex items-center justify-center' onClick={() => {
                                    debugger
                                    try {
                                        authService.createUser(autorization.auth.name, autorization.auth.email, autorization.auth.phone)
                                            .then(() => {
                                                modalLink ? push(modalLink) : push("/profile")
                                                // authService.createCar(select, modelsId, gosNum, vinNum)
                                                // .then((res:any) => {
                                                //     setModels(res)
                                                //     authService.getProfile()
                                                //         .then((res:any) => {
                                                //             dispatch(onChangeStatus(true))
                                                //             dispatch(onChangeBasket(res))
                                                //             dispatch(onChangeSum(res.appointments_sum + res.products_sum))
                                                //             onClose()
                                                //             dispatch(onChangeModal(false))
                                                //             modalLink ? push(modalLink) : push("/profile")
                                                //             dispatch(setUser(res.data))
                                                //             dispatch(setAuth(true))
                                                //         })
                                                //         .catch((err:any) => {
                                                //             console.log(err)
                                                //     })
                                                // })
                                            })
                                            .catch((err:any) => {
                                                console.log(err)
                                            })
                                    } catch (err){
                                        debugger
                                        console.log(err)
                                    }
                                }}>Продолжить</button>
                            </div> :
                            <button disabled={autorization.auth.phone.length < 16} className='btn__p flex justify-center' onClick={() => {
                                sendPhone()
                            }}>{<div className={s.spin}><svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.5V4.5M10 16.5V19.5M4 10.5H1M19 10.5H16M3.63672 4.13672L5.75977 6.25977M14.2422 14.7422L16.3633 16.8633M16.3652 4.13477L14.2441 6.25586M5.75781 14.7422L3.63477 16.8652" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg></div>}</button>}
                        </div>
                )
            default:
                return(
                    <div></div>
                )
        }
    }

    return (
        <div className={s.auth}>
            {displayAuthorisationPages() }
        </div>
    )
}

export default Auth