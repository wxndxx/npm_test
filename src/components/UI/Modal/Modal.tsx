import React, { useEffect } from 'react'
import s from './Modal.module.scss'
import Icon from '../Icon/Icon'
import useOnclickOutside from 'react-cool-onclickoutside';

type Props = {
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
    type?: 'default' | 'slider'
}

function Modal({children, isOpen, onClose, type='default'}: Props) {
    const ref = useOnclickOutside((e: any) => {
        if(e.target.classList && e.target.classList.length > 0 && e.target.classList[0] === s.select) return
        onClose()
    });
    useEffect(() => {
        document.body.classList.add("modal-open")

        return () => {
            if(window.innerWidth > 1120) {
                document.body.classList.remove("modal-open")
            }
        }
    }, [])
    switch(type) {
        case 'default':
            return (
                <div className={isOpen ? s.modal  + ' ' + 'flex-col' : s.modal__close}>
                    <div className={s.modal__container  + ' ' + 'p-[10px_10px_10px_10px] w-full flex flex-col overflow-x-hidden items-center xxs:p-[10px]'}>
                        <div className={s.modal__content + ' ' + 'w-[90%] xxs:w-[600px]'} ref={ref}>
                            <div className='absolute top-[24px] right-[16px] xxs:top-[32px] xxs:right-[32px] cursor-pointer' onClick={onClose}><Icon type='close'/></div>
                            <div className=''>{children}</div>
                        </div>
                    </div>
                </div>
            )
        case 'slider':
            return (
                <div className={isOpen ? s.slider : s.slider__close}>
                    <div className='bg-gray1 z-20 absolute top-[15px] right-[15px] cursor-pointer flex xxs:hidden items-center justify-center p-[10px_21px] rounded-[8px]' onClick={onClose}><Icon type='close'/></div>
                    <div className={'w-full h-[262px] xxs:h-[450px] xxs:w-[80%] max-w-[1100px] m:w-[76%] m:h-[770px] rounded-[16px] bg-white relative'} ref={ref}>
                        <div className='w-full h-full rounded-[8px] overflow-hidden'><div className='bg-gray1 z-20 absolute top-[15px] right-[15px] cursor-pointer hidden xxs:flex items-center justify-center p-[10px_21px] rounded-[8px]' onClick={onClose}><Icon type='close'/></div>
                        {children}
                        </div>
                    </div>
                </div>
            )
    }
}

export default Modal