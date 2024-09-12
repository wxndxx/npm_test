import { useEffect, useRef, useState } from "react";
import s from './Auth.module.scss'

interface IProps {
    func: (val:string) => void;
}

const CodeInput = ({func}:IProps) => {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [digitsPrev, setDigitsPrev] = useState(["", "", "", ""]);
  const [focus, setFocus] = useState([false, false, false, false])
  const input = useRef<HTMLInputElement>(null)
  // const windowInnerWidth = window !== undefined && window.innerWidth;
  useEffect(() => {
    input.current?.focus();
  }, [])

  return (
    <div className="flex items-center justify-center gap-[10px]">
        <input
        // readOnly={windowInnerWidth && windowInnerWidth > 1120 ? true : false}
        ref={input}
        onBlur={() => {
          focus[0] = false
          setFocus(JSON.parse(JSON.stringify(focus)))
        }} onFocus={() => {
          focus[0] = true
          setFocus(JSON.parse(JSON.stringify(focus)))
        }}
        className={focus[0] ? s.input_focus : s.input}
        value={digits[0]}
          type="text"
          onKeyDown={(e:any) => {
            if(e.key === "Backspace") {
                digitsPrev[0] = '';
                digits[0] = '';
                setDigits(JSON.parse(JSON.stringify(digits)))
                setDigitsPrev(JSON.parse(JSON.stringify(digitsPrev)))
                func(digits.join(""))
            } else if(e.key >= "0" && e.key <= "9" ){
              digits[0] = e.key
              setDigits(JSON.parse(JSON.stringify(digits)))
              if(e.key > digitsPrev[0].length) {
                  digitsPrev[0] = e.key;
                  (e.target?.nextElementSibling as HTMLElement)?.focus();
                  setDigitsPrev(JSON.parse(JSON.stringify(digitsPrev)))
                  func(digits.join(""))
              }
              else{digitsPrev[0] = e.key};
            }
        }}
          maxLength={1}
        />
        <input
        // readOnly={windowInnerWidth && windowInnerWidth > 1120 ? true : false}
          onBlur={() => {
            focus[1] = false
            setFocus(JSON.parse(JSON.stringify(focus)))
          }} onFocus={() => {
            focus[1] = true
            setFocus(JSON.parse(JSON.stringify(focus)))
          }}
          className={focus[1] ? s.input_focus : s.input}
        value={digits[1]}
          type="text"
          maxLength={1}
          onKeyDown={(e:any) => {
            if(e.key === "Backspace") {
                digitsPrev[1] = '';
                digits[1] = '';
                e.target.previousElementSibling?.focus();
                setDigitsPrev(JSON.parse(JSON.stringify(digitsPrev)))
                func(digits.join(""))
            } else if(e.key >= "0" && e.key <= "9" ){
              digits[1] = e.key
              setDigits(JSON.parse(JSON.stringify(digits)))
              if(e.key >= digitsPrev[1].length) {
                  digitsPrev[1] = e.key;
                  (e.target?.nextElementSibling as HTMLElement)?.focus();
                  // e.target.nextElementSibling.focus();
                  setDigitsPrev(JSON.parse(JSON.stringify(digitsPrev)))
                  func(digits.join(""))
              }else{
                  digitsPrev[1] = e.key;
                  //(e.target?.previousElementSibling as HTMLElement)?.focus();
              };
            }
        }}
        />
        <input
        // readOnly={windowInnerWidth && windowInnerWidth > 1120 ? true : false}
        onBlur={() => {
          focus[2] = false
          setFocus(JSON.parse(JSON.stringify(focus)))
        }} onFocus={() => {
          focus[2] = true
          setFocus(JSON.parse(JSON.stringify(focus)))
        }}
        className={focus[2] ? s.input_focus : s.input}
        value={digits[2]}
          type="text"
          maxLength={1}
          onKeyDown={(e:any) => {
            if(e.key === "Backspace") {
                digitsPrev[2] = '';
                digits[2] = '';
                e.target.previousElementSibling?.focus();
                setDigitsPrev(JSON.parse(JSON.stringify(digitsPrev)))
                func(digits.join(""))
            } else if(e.key >= "0" && e.key <= "9" ) {
              digits[2] = e.key
              setDigits(JSON.parse(JSON.stringify(digits)))
              if(e.key >= digitsPrev[2].length) {
                  digitsPrev[2] = e.key;
                  // e.target.nextElementSibling.focus();
                  (e.target?.nextElementSibling as HTMLElement)?.focus();
                  setDigitsPrev(JSON.parse(JSON.stringify(digitsPrev)))
                  func(digits.join(""))
              }else{
                  digitsPrev[2] = e.key;
                  //(e.target?.previousElementSibling as HTMLElement)?.focus();
              };
            }
        }}
        />
        <input
        // readOnly={windowInnerWidth && windowInnerWidth > 1120 ? true : false}
        onKeyDown={(e:any) => {
            if(e.key === "Backspace") {
                digitsPrev[3] = '';
                digits[3] = '';
                e.target.previousElementSibling?.focus();
                setDigitsPrev(JSON.parse(JSON.stringify(digitsPrev)))
                func(digits.join(""))
            } else if(e.key >= "0" && e.key <= "9" ) {
              digits[3] = e.key
              setDigits(JSON.parse(JSON.stringify(digits)))
              if(e.key >= digitsPrev[3].length) {
                  digitsPrev[3] = e.key;
                  // e.target.nextElementSibling.focus();
                  
                  setDigitsPrev(JSON.parse(JSON.stringify(digitsPrev)))
                  func(digits.join(""))
              }else{
                  digitsPrev[3] = e.key;
                  //(e.target?.previousElementSibling as HTMLElement)?.focus();
              };
            }
        }}
        onBlur={() => {
          focus[3] = false
          setFocus(JSON.parse(JSON.stringify(focus)))
        }} onFocus={() => {
          focus[3] = true
          setFocus(JSON.parse(JSON.stringify(focus)))
        }}
        className={focus[3] ? s.input_focus : s.input}
          type="text"
          value={digits[3]}
          maxLength={1}
          // onChange={(e) => {
          //       digits[3] = e.target.value
          //       setDigits(JSON.parse(JSON.stringify(digits)))
          //       if(e.target.value.length >= digitsPrev[3].length) {
          //           digitsPrev[3] = e.target.value;
          //           // e.target.nextElementSibling.focus();
          //           setDigitsPrev(JSON.parse(JSON.stringify(digitsPrev)))
          //           // func('1231')
          //       }else{
          //           digitsPrev[0] = e.target.value;
          //           (e.target?.previousElementSibling as HTMLElement)?.focus();
          //       };
          // }}
        />
    </div>
  );
  };

  export default CodeInput