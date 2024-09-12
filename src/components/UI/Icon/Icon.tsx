'use client'

type Props = {
    type: 'search' | 'vector_back' | 'vector_forvard' | 'user' |  'car1' | 'car2' | 'motor' | 'eye1' | 'eye2' | 'info' | 'question' | 'off' | 'bag2' |  'mark' |  'success' |  'book' |  'minus' |  'trash' |  'watch' | 'close' | 'home' | 'all' | 'popular' | 'vector_up'| 'vector_down'| 'add' | 'vector_l' | 'vector_r' | 'dots' | 'card' | 'money' | 'ring' | 'buscet' | 'buscet2' | 'bag' | 'key' | 'speed1' | 'speed2' | 'calendar' | 'b' | 'f' | 'u' | 'd' | 'ub' | 'db' | 'uf' | 'df' | 'burger'| 'accept' | 'up' | 'pen' | 'cube'| 'calendar' | 'share' | 'send' | 'message1' | 'message2' | 'dialoge1' | 'dialoge2' | 'file' | 'pen2'  ;
    color?: string; 
    hover?: string;
}

function Icon({type, color = 'black'}: Props) {
    switch(type) {
        case 'close': 
            return (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M13 1L1 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        case 'success':
            return (
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7.61111L5.92308 12.5L17 1.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        case 'vector_up': 
            return (
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7L7 1L13 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        case 'vector_down':
            return (
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L7 7L13 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'vector_back': 
            return (
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 7L7 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            )
        case 'vector_forvard':
            return (
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L7 7L1 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'b': 
            return (
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 7H15M1 7L7 1M1 7L7 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'f':
            return (
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 7H15M15 7L9 1M15 7L9 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'u':
            return (
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1V15M7 1L1 7M7 1L13 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'd':
            return (
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1V15M7 15L1 9M7 15L13 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'ub': 
            return (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 11L1 1M1 1V10M1 1H10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'db':
            return (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1L1 11M1 11H11M1 11V1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'uf': 
            return (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 11L11 1M11 1H2M11 1V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'df':
            return (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L11 11M11 11V1M11 11H1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'burger': 
            return (
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1H17M1 7H17M1 13H17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'search':
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.9536 12.9458L19 19M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'calendar': 
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 8H19M5 1V3M15 1V3M4.2 19H15.8C16.9201 19 17.4802 19 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C19 17.4802 19 16.9201 19 15.8V6.2C19 5.07989 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H4.2C3.0799 3 2.51984 3 2.09202 3.21799C1.71569 3.40973 1.40973 3.71569 1.21799 4.09202C1 4.51984 1 5.07989 1 6.2V15.8C1 16.9201 1 17.4802 1.21799 17.908C1.40973 18.2843 1.71569 18.5903 2.09202 18.782C2.51984 19 3.07989 19 4.2 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'share':
            return (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 2H5.8C4.11984 2 3.27976 2 2.63803 2.32698C2.07354 2.6146 1.6146 3.07354 1.32698 3.63803C1 4.27976 1 5.11984 1 6.8V12.2C1 13.8802 1 14.7202 1.32698 15.362C1.6146 15.9265 2.07354 16.3854 2.63803 16.673C3.27976 17 4.11984 17 5.8 17H11.2C12.8802 17 13.7202 17 14.362 16.673C14.9265 16.3854 15.3854 15.9265 15.673 15.362C16 14.7202 16 13.8802 16 12.2V9.5M17 1L9 9M17 1V5.5M17 1H12.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'send': 
            return (
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.49981 9H3.41823M3.24585 9.79721L2.24109 12.7985C1.69079 14.4424 1.41564 15.2643 1.6131 15.7704C1.78458 16.21 2.15287 16.5432 2.60731 16.67C3.13062 16.8161 3.92102 16.4604 5.50182 15.749L15.6362 11.1886C17.1792 10.4942 17.9507 10.1471 18.1891 9.66477C18.3963 9.24577 18.3963 8.75414 18.1891 8.33514C17.9507 7.85285 17.1792 7.50568 15.6362 6.81134L5.48434 2.24302C3.90831 1.53381 3.12029 1.17921 2.5975 1.32467C2.14348 1.451 1.77523 1.78336 1.60316 2.22209C1.40503 2.72727 1.67724 3.5474 2.22166 5.18767L3.2478 8.27929C3.34131 8.56101 3.38806 8.70187 3.40651 8.84593C3.42289 8.97377 3.42273 9.10318 3.40602 9.23097C3.38719 9.37499 3.34008 9.51573 3.24585 9.79721Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'message1':
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 10H6.01M10 10H10.01M14 10H14.01M19.0039 10C19.0039 14.9706 14.9745 19 10.0039 19C7.9675 19 1.00463 19 1.00463 19C1.00463 19 2.56382 15.2561 1.93982 14.0008C1.34076 12.7956 1.00391 11.4372 1.00391 10C1.00391 5.02944 5.03334 1 10.0039 1C14.9745 1 19.0039 5.02944 19.0039 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'message2': 
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 10.2222L8.84615 12L13 8M19.0039 10C19.0039 14.9706 14.9745 19 10.0039 19C7.9675 19 1.00463 19 1.00463 19C1.00463 19 2.56382 15.2561 1.93982 14.0008C1.34076 12.7956 1.00391 11.4372 1.00391 10C1.00391 5.02944 5.03334 1 10.0039 1C14.9745 1 19.0039 5.02944 19.0039 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'dialoge1':
            return (
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H14.2C15.8802 1 16.7202 1 17.362 1.32698C17.9265 1.6146 18.3854 2.07354 18.673 2.63803C19 3.27976 19 4.11984 19 5.8V13.4444V17L15.6757 15.3378C15.4237 15.2118 15.2977 15.1488 15.1656 15.1044C15.0484 15.065 14.9277 15.0365 14.8052 15.0193C14.6672 15 14.5263 15 14.2446 15H5.8C4.11984 15 3.27976 15 2.63803 14.673C2.07354 14.3854 1.6146 13.9265 1.32698 13.362C1 12.7202 1 11.8802 1 10.2V5.8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'dialoge2': 
            return (
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 8H6.01M10 8H10.01M14 8H14.01M19 17L15.6757 15.3378C15.4237 15.2118 15.2977 15.1488 15.1656 15.1044C15.0484 15.065 14.9277 15.0365 14.8052 15.0193C14.6672 15 14.5263 15 14.2446 15H5.8C4.11984 15 3.27976 15 2.63803 14.673C2.07354 14.3854 1.6146 13.9265 1.32698 13.362C1 12.7202 1 11.8802 1 10.2V5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H14.2C15.8802 1 16.7202 1 17.362 1.32698C17.9265 1.6146 18.3854 2.07354 18.673 2.63803C19 3.27976 19 4.11984 19 5.8V17Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'file':
            return (
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19H10.2C11.8802 19 12.7202 19 13.362 18.673C13.9265 18.3854 14.3854 17.9265 14.673 17.362C15 16.7202 15 15.8802 15 14.2V7M9 1L15 7M9 1V3.8C9 4.9201 9 5.48016 9.21799 5.90798C9.40973 6.28431 9.71569 6.59027 10.092 6.78201C10.5198 7 11.0799 7 12.2 7H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'pen': 
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9998 4L15.9998 8M2.17654 18.7647L4.0997 18.38C4.80597 18.2388 5.15911 18.1681 5.4884 18.039C5.78068 17.9243 6.05845 17.7757 6.31597 17.5961C6.6061 17.3937 6.86075 17.1391 7.37005 16.6298L17.8685 6.13137C18.2645 5.73536 18.4625 5.53735 18.5367 5.30902C18.6019 5.10817 18.6019 4.89183 18.5367 4.69098C18.4625 4.46266 18.2645 4.26465 17.8685 3.86863L16.1312 2.13137C15.7352 1.73536 15.5372 1.53735 15.3089 1.46316C15.108 1.3979 14.8917 1.3979 14.6908 1.46316C14.4625 1.53735 14.2645 1.73536 13.8685 2.13137L3.37005 12.6298C2.86075 13.1391 2.6061 13.3937 2.40376 13.6839C2.22416 13.9414 2.0755 14.2192 1.96085 14.5114C1.83169 14.8407 1.76107 15.1939 1.61981 15.9001L1.23518 17.8233C1.15649 18.2167 1.11715 18.4135 1.1752 18.5538C1.22595 18.6764 1.3234 18.7739 1.44607 18.8246C1.58638 18.8827 1.7831 18.8433 2.17654 18.7647Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'pen2':
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.9998 19H10.9998M11.9998 4L15.9998 8M2.17654 18.7647L4.0997 18.38C4.80597 18.2388 5.15911 18.1681 5.4884 18.039C5.78068 17.9243 6.05845 17.7757 6.31597 17.5961C6.6061 17.3937 6.86075 17.1391 7.37005 16.6298L17.8685 6.13137C18.2645 5.73536 18.4625 5.53735 18.5367 5.30902C18.6019 5.10817 18.6019 4.89183 18.5367 4.69098C18.4625 4.46266 18.2645 4.26465 17.8685 3.86863L16.1312 2.13137C15.7352 1.73536 15.5372 1.53735 15.3089 1.46316C15.108 1.3979 14.8917 1.3979 14.6908 1.46316C14.4625 1.53735 14.2645 1.73536 13.8685 2.13137L3.37005 12.6298C2.86075 13.1391 2.6061 13.3937 2.40376 13.6839C2.22416 13.9414 2.0755 14.2192 1.96085 14.5114C1.83169 14.8407 1.76107 15.1939 1.61981 15.9001L1.23518 17.8233C1.15649 18.2167 1.11715 18.4135 1.1752 18.5538C1.22595 18.6764 1.3234 18.7739 1.44607 18.8246C1.58638 18.8827 1.7831 18.8433 2.17654 18.7647Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'cube':
            return (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 1H5.44444L1 5M17 1V12.5556L13 17M17 1L13 5M1 5H13M1 5V17H13M13 17V5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'add': 
            return (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 7H13M7 1V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'dots':
            return (
                <svg width="20" height="6" viewBox="0 0 20 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3C12 4.10457 11.1046 5 10 5C8.89543 5 8 4.10457 8 3C8 1.89543 8.89543 1 10 1C11.1046 1 12 1.89543 12 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19 3C19 4.10457 18.1046 5 17 5C15.8954 5 15 4.10457 15 3C15 1.89543 15.8954 1 17 1C18.1046 1 19 1.89543 19 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5 3C5 4.10457 4.10457 5 3 5C1.89543 5 1 4.10457 1 3C1 1.89543 1.89543 1 3 1C4.10457 1 5 1.89543 5 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'card': 
            return (
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 5H19M5 12H7M4.2 15H15.8C16.9201 15 17.4802 15 17.908 14.782C18.2843 14.5903 18.5903 14.2843 18.782 13.908C19 13.4802 19 12.9201 19 11.8V4.2C19 3.0799 19 2.51984 18.782 2.09202C18.5903 1.71569 18.2843 1.40973 17.908 1.21799C17.4802 1 16.9201 1 15.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V11.8C1 12.9201 1 13.4802 1.21799 13.908C1.40973 14.2843 1.71569 14.5903 2.09202 14.782C2.51984 15 3.07989 15 4.2 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'money':
            return (
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 17H19M16.1771 1C15.7619 1.36647 15.5 1.90265 15.5 2.5C15.5 3.60457 16.3954 4.5 17.5 4.5C17.6726 4.5 17.8402 4.47812 18 4.43699M4 13C4.78105 12.219 4.78105 10.781 4 10C3.21895 9.21895 1.78105 9.21895 1 10M4 1C4.78105 1.78105 4.78105 3.21895 4 4C3.21895 4.78105 1.78105 4.78105 1 4M16 13C15.219 12.219 15.219 10.781 16 10C16.781 9.21895 18.219 9.21895 19 10M4.2 13H15.8C16.9201 13 17.4802 13 17.908 12.782C18.2843 12.5903 18.5903 12.2843 18.782 11.908C19 11.4802 19 10.9201 19 9.8V4.2C19 3.0799 19 2.51984 18.782 2.09202C18.5903 1.71569 18.2843 1.40973 17.908 1.21799C17.4802 1 16.9201 1 15.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V9.8C1 10.9201 1 11.4802 1.21799 11.908C1.40973 12.2843 1.71569 12.5903 2.09202 12.782C2.51984 13 3.07989 13 4.2 13ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'ring': 
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.9998 16C12.9998 17.6569 11.6567 19 9.99982 19C8.34296 19 6.99982 17.6569 6.99982 16M15.9998 6.6C15.9998 5.11479 15.3677 3.69041 14.2425 2.6402C13.1172 1.59 11.5911 1 9.99982 1C8.40852 1 6.88239 1.59 5.75718 2.6402C4.63196 3.69041 3.99982 5.11479 3.99982 6.6C3.99982 9.28622 3.32362 11.1835 2.52727 12.4866C1.75598 13.7486 1.37033 14.3797 1.38466 14.5436C1.40077 14.7277 1.43711 14.7925 1.58585 14.9023C1.71823 15 2.34744 15 3.60587 15H16.3938C17.6522 15 18.2814 15 18.4138 14.9023C18.5625 14.7925 18.5989 14.7277 18.615 14.5436C18.6293 14.3797 18.2437 13.7486 17.4724 12.4866C16.676 11.1835 15.9998 9.28622 15.9998 6.6Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'buscet':
            return (
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 7L16.5145 14.4276C16.3312 15.3439 16.2396 15.8021 16.0004 16.1448C15.7894 16.447 15.499 16.685 15.1613 16.8326C14.7783 17 14.3111 17 13.3766 17H6.62337C5.6889 17 5.22166 17 4.83869 16.8326C4.50097 16.685 4.2106 16.447 3.99964 16.1448C3.76041 15.8021 3.66878 15.3439 3.48551 14.4276L2 7M18 7H16M18 7H19M2 7H1M2 7H4M4 7H16M4 7L7 1M16 7L13 1M7 10V13M10 10V13M13 10V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'buscet2': 
            return (
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 7L16.5145 14.4276C16.3312 15.3439 16.2396 15.8021 16.0004 16.1448C15.7894 16.447 15.499 16.685 15.1613 16.8326C14.7783 17 14.3111 17 13.3766 17H6.62337C5.6889 17 5.22166 17 4.83869 16.8326C4.50097 16.685 4.2106 16.447 3.99964 16.1448C3.76041 15.8021 3.66878 15.3439 3.48551 14.4276L2 7M1 7H19M6 10V10.01M14 10V10.01M4 7L7 1M16 7L13 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'bag':
            return (
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9V4C6 2.34315 7.34315 1 9 1C10.6569 1 12 2.34315 12 4V8.96727M7.4 19H10.6C12.8402 19 13.9603 19 14.816 18.564C15.5686 18.1805 16.1805 17.5686 16.564 16.816C17 15.9603 17 14.8402 17 12.6V10.2C17 9.07989 17 8.51984 16.782 8.09202C16.5903 7.71569 16.2843 7.40973 15.908 7.21799C15.4802 7 14.9201 7 13.8 7H4.2C3.0799 7 2.51984 7 2.09202 7.21799C1.71569 7.40973 1.40973 7.71569 1.21799 8.09202C1 8.51984 1 9.07989 1 10.2V12.6C1 14.8402 1 15.9603 1.43597 16.816C1.81947 17.5686 2.43139 18.1805 3.18404 18.564C4.03968 19 5.15979 19 7.4 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'bag2': 
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 4C14 2.34315 12.6569 1 11 1H9C7.34315 1 6 2.34315 6 4M19 8L15.3148 10.9482C14.8275 11.338 14.5838 11.5329 14.3125 11.6715C14.0718 11.7945 13.8156 11.8844 13.5508 11.9387C13.2523 12 12.9403 12 12.3163 12H7.68375C7.0597 12 6.74767 12 6.44921 11.9387C6.18443 11.8844 5.9282 11.7945 5.68749 11.6715C5.41617 11.5329 5.17251 11.338 4.68521 10.9482L1 8M5.8 19H14.2C15.8802 19 16.7202 19 17.362 18.673C17.9265 18.3854 18.3854 17.9265 18.673 17.362C19 16.7202 19 15.8802 19 14.2V9.8C19 8.11984 19 7.27976 18.673 6.63803C18.3854 6.07354 17.9265 5.6146 17.362 5.32698C16.7202 5 15.8802 5 14.2 5H5.8C4.11984 5 3.27976 5 2.63803 5.32698C2.07354 5.6146 1.6146 6.07354 1.32698 6.63803C1 7.27976 1 8.11984 1 9.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'key':
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7H13.01M13 13C16.3137 13 19 10.3137 19 7C19 3.68629 16.3137 1 13 1C9.68629 1 7 3.68629 7 7C7 7.27368 7.01832 7.54308 7.05381 7.80704C7.11218 8.24118 7.14136 8.45825 7.12172 8.59559C7.10125 8.73865 7.0752 8.81575 7.00469 8.9419C6.937 9.063 6.81771 9.18229 6.57913 9.42087L1.46863 14.5314C1.29568 14.7043 1.2092 14.7908 1.14736 14.8917C1.09253 14.9812 1.05213 15.0787 1.02763 15.1808C1 15.2959 1 15.4182 1 15.6627V17.4C1 17.9601 1 18.2401 1.10899 18.454C1.20487 18.6422 1.35785 18.7951 1.54601 18.891C1.75992 19 2.03995 19 2.6 19H4.33726C4.58185 19 4.70414 19 4.81923 18.9724C4.92127 18.9479 5.01881 18.9075 5.10828 18.8526C5.2092 18.7908 5.29568 18.7043 5.46863 18.5314L10.5791 13.4209C10.8177 13.1823 10.937 13.063 11.0581 12.9953C11.1843 12.9248 11.2613 12.8987 11.4044 12.8783C11.5417 12.8586 11.7588 12.8878 12.193 12.9462C12.4569 12.9817 12.7263 13 13 13Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'speed1': 
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 11L6 6M14 6H14.01M10 4H10.01M16 10H16.01M4 10H4.01M12 13C12 14.1046 11.1046 15 10 15C8.89543 15 8 14.1046 8 13C8 11.8954 8.89543 11 10 11C11.1046 11 12 11.8954 12 13ZM19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'speed2':
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 12L16 10M14 6H14.01M10 4H10.01M6 6H6.01M4 10H4.01M12 13C12 14.1046 11.1046 15 10 15C8.89543 15 8 14.1046 8 13C8 11.8954 8.89543 11 10 11C11.1046 11 12 11.8954 12 13ZM19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'car1': 
            return (
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.00011 5L4.00011 7.5H16.0001L19.0001 5M5.5 11H5.51M14.5 11H14.51M1 10.1996V14.9C1 15.4601 1 15.7401 1.10899 15.954C1.20487 16.1422 1.35785 16.2951 1.54601 16.391C1.75992 16.5 2.03995 16.5 2.6 16.5H3.4C3.96005 16.5 4.24008 16.5 4.45399 16.391C4.64215 16.2951 4.79513 16.1422 4.89101 15.954C5 15.7401 5 15.4601 5 14.9V14.5H15V14.9C15 15.4601 15 15.7401 15.109 15.954C15.2049 16.1422 15.3578 16.2951 15.546 16.391C15.7599 16.5 16.0399 16.5 16.6 16.5H17.4C17.9601 16.5 18.2401 16.5 18.454 16.391C18.6422 16.2951 18.7951 16.1422 18.891 15.954C19 15.7401 19 15.4601 19 14.9V10.1996C19 9.56663 19 9.25014 18.9516 8.9418C18.9086 8.66803 18.8373 8.39946 18.7388 8.14043C18.6278 7.8487 18.4708 7.57389 18.1568 7.02432L15.9213 3.11236C15.5858 2.52512 15.418 2.2315 15.1822 2.01789C14.9737 1.82889 14.7275 1.68605 14.4599 1.59871C14.1575 1.5 13.8193 1.5 13.143 1.5H6.85703C6.18068 1.5 5.84251 1.5 5.54007 1.59871C5.27249 1.68605 5.02635 1.82889 4.81776 2.01789C4.582 2.2315 4.41422 2.52512 4.07865 3.11236L1.84324 7.02432C1.5292 7.57391 1.37217 7.8487 1.26123 8.14043C1.16272 8.39946 1.0914 8.66803 1.04841 8.9418C1 9.25014 1 9.56663 1 10.1996ZM6 11C6 11.2761 5.77614 11.5 5.5 11.5C5.22386 11.5 5 11.2761 5 11C5 10.7239 5.22386 10.5 5.5 10.5C5.77614 10.5 6 10.7239 6 11ZM15 11C15 11.2761 14.7761 11.5 14.5 11.5C14.2239 11.5 14 11.2761 14 11C14 10.7239 14.2239 10.5 14.5 10.5C14.7761 10.5 15 10.7239 15 11Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'car2':
            return (
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 13H15M7 13C7 14.1046 6.10457 15 5 15C3.89543 15 3 14.1046 3 13M7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13M15 13C15 14.1046 15.8954 15 17 15C18.1046 15 19 14.1046 19 13M15 13C15 11.8954 15.8954 11 17 11C18.1046 11 19 11.8954 19 13M9 1V7M3 7L3.33152 5.01088C3.56901 3.58593 3.68776 2.87345 4.0433 2.3388C4.35671 1.8675 4.79705 1.49447 5.31346 1.26281C5.8993 1 6.6216 1 8.06621 1H11.4311C12.3703 1 12.8399 1 13.2662 1.12945C13.6436 1.24406 13.9946 1.43194 14.2993 1.68236C14.6435 1.96523 14.904 2.35597 15.425 3.13744L18 7M3 13H2.6C2.03995 13 1.75992 13 1.54601 12.891C1.35785 12.7951 1.20487 12.6422 1.10899 12.454C1 12.2401 1 11.9601 1 11.4V10.2C1 9.07989 1 8.51984 1.21799 8.09202C1.40973 7.71569 1.71569 7.40973 2.09202 7.21799C2.51984 7 3.0799 7 4.2 7H16.2C16.9432 7 17.3148 7 17.6257 7.04925C19.3373 7.32033 20.6797 8.66269 20.9508 10.3743C21 10.6852 21 11.0568 21 11.8C21 11.9858 21 12.0787 20.9877 12.1564C20.9199 12.5843 20.5843 12.9199 20.1564 12.9877C20.0787 13 19.9858 13 19.8 13H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'motor': 
            return (
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 8H7.01M10 8H10.01M13 8H13.01M12 4V1M9 1H15M4 8H1M1 5V11M19 7V15M4 4V12H6L8.28571 15H16V6.0625L13.2308 4H4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'eye1':
            return (
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.9998 8C13.9998 9.65685 12.6566 11 10.9998 11C9.3429 11 7.99976 9.65685 7.99976 8C7.99976 6.34315 9.3429 5 10.9998 5C12.6566 5 13.9998 6.34315 13.9998 8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.0002 1C6.52257 1 2.73228 3.94288 1.45801 7.99997C2.73226 12.0571 6.52256 15 11.0002 15C15.4778 15 19.2681 12.0571 20.5424 8.00004C19.2681 3.94291 15.4778 1 11.0002 1Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'eye2': 
            return (
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 1L20 19M8.84428 7.91364C8.32164 8.45355 8 9.18921 8 10C8 11.6569 9.34315 13 11 13C11.8225 13 12.5677 12.669 13.1096 12.133M5.5 4.64715C3.60069 5.90034 2.15403 7.78394 1.45801 9.99997C2.73226 14.0571 6.52256 17 11.0002 17C12.9891 17 14.8424 16.4194 16.3998 15.4184M10 3.04939C10.329 3.01673 10.6626 3 11.0002 3C15.4778 3 19.2681 5.94291 20.5424 10C20.2616 10.894 19.8587 11.7338 19.3532 12.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'user':
            return (
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8 12C4.13401 12 1 15.134 1 19H15C15 15.134 11.866 12 8 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'info':
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 6H10.01M10 9V14M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'question': 
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.8125 7.50224C7.9887 7.00136 8.33647 6.579 8.79423 6.30998C9.25199 6.04095 9.7902 5.9426 10.3135 6.03237C10.8368 6.12213 11.3115 6.39421 11.6534 6.80041C11.9954 7.20661 12.1825 7.72072 12.1817 8.25168C12.1817 9.75056 9.93342 10.5 9.93342 10.5M9.96094 13.5H9.97094M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'off':
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 1V10M16.3611 3.64001C17.6195 4.8988 18.4764 6.50246 18.8234 8.2482C19.1704 9.99395 18.992 11.8034 18.3107 13.4478C17.6295 15.0921 16.4759 16.4976 14.9959 17.4864C13.5159 18.4752 11.776 19.0029 9.9961 19.0029C8.21619 19.0029 6.47625 18.4752 4.99627 17.4864C3.51629 16.4976 2.36274 15.0921 1.68146 13.4478C1.00019 11.8034 0.821787 9.99395 1.16882 8.2482C1.51584 6.50246 2.37272 4.8988 3.6311 3.64001" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'home': 
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 19V13H8V19M17 8V14.2C17 15.8802 17 16.7202 16.673 17.362C16.3854 17.9265 15.9265 18.3854 15.362 18.673C14.7202 19 13.8802 19 12.2 19H7.8C6.11984 19 5.27976 19 4.63803 18.673C4.07354 18.3854 3.6146 17.9265 3.32698 17.362C3 16.7202 3 15.8802 3 14.2V8M19 10L13.5668 3.96397C12.3311 2.59121 11.7133 1.90483 10.9856 1.65143C10.3466 1.42886 9.65099 1.42892 9.01193 1.65157C8.28435 1.90508 7.66661 2.59155 6.43114 3.9645L1 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'mark':
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.0498 5.0498H5.0598M8.51177 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V8.51177C1 9.24555 1 9.61243 1.08289 9.9577C1.15638 10.2638 1.27759 10.5564 1.44208 10.8249C1.6276 11.1276 1.88703 11.387 2.40589 11.9059L7.10589 16.6059C8.29393 17.7939 8.88797 18.388 9.57295 18.6105C10.1755 18.8063 10.8245 18.8063 11.4271 18.6105C12.112 18.388 12.7061 17.7939 13.8941 16.6059L16.6059 13.8941C17.7939 12.7061 18.388 12.112 18.6105 11.4271C18.8063 10.8245 18.8063 10.1755 18.6105 9.57295C18.388 8.88797 17.7939 8.29393 16.6059 7.10589L11.9059 2.40589C11.387 1.88703 11.1276 1.6276 10.8249 1.44208C10.5564 1.27759 10.2638 1.15638 9.9577 1.08289C9.61243 1 9.24555 1 8.51177 1ZM5.5498 5.0498C5.5498 5.32595 5.32595 5.5498 5.0498 5.5498C4.77366 5.5498 4.5498 5.32595 4.5498 5.0498C4.5498 4.77366 4.77366 4.5498 5.0498 4.5498C5.32595 4.5498 5.5498 4.77366 5.5498 5.0498Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'accept': 
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 10.3333L8.46154 13L14 7M5.80039 2.63683C6.52384 2.57909 7.21064 2.29461 7.76302 1.82388C9.05205 0.725374 10.9479 0.725374 12.237 1.82388C12.7894 2.29461 13.4762 2.57909 14.1996 2.63683C15.8878 2.77155 17.2285 4.11215 17.3632 5.80039C17.4209 6.52384 17.7054 7.21064 18.1761 7.76302C19.2746 9.05205 19.2746 10.9479 18.1761 12.237C17.7054 12.7894 17.4209 13.4762 17.3632 14.1996C17.2285 15.8878 15.8878 17.2285 14.1996 17.3632C13.4762 17.4209 12.7894 17.7054 12.237 18.1761C10.9479 19.2746 9.05205 19.2746 7.76302 18.1761C7.21064 17.7054 6.52384 17.4209 5.80039 17.3632C4.11215 17.2285 2.77155 15.8878 2.63683 14.1996C2.57909 13.4762 2.29461 12.7894 1.82388 12.237C0.725374 10.9479 0.725374 9.05205 1.82388 7.76302C2.29461 7.21064 2.57909 6.52384 2.63683 5.80039C2.77155 4.11215 4.11215 2.77155 5.80039 2.63683Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'book':
            return (
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 17V4.2C1 3.0799 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.0799 1 4.2 1H13.8C14.9201 1 15.4802 1 15.908 1.21799C16.2843 1.40973 16.5903 1.71569 16.782 2.09202C17 2.51984 17 3.0799 17 4.2V15H3C1.89543 15 1 15.8954 1 17ZM1 17C1 18.1046 1.89543 19 3 19H17M6 5H12M6 9H12M16 15V19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'minus': 
            return (
                <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L13 1" stroke="#131A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            )
        case 'trash':
            return (
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 4L14.1991 16.0129C14.129 17.065 14.0939 17.5911 13.8667 17.99C13.6666 18.3412 13.3648 18.6235 13.0011 18.7998C12.588 19 12.0607 19 11.0062 19H6.99377C5.93927 19 5.41202 19 4.99889 18.7998C4.63517 18.6235 4.33339 18.3412 4.13332 17.99C3.90607 17.5911 3.871 17.065 3.80086 16.0129L3 4M1 4H17M13 4L12.7294 3.18807C12.4671 2.40125 12.3359 2.00784 12.0927 1.71698C11.8779 1.46013 11.6021 1.26132 11.2905 1.13878C10.9376 1 10.523 1 9.69357 1H8.30643C7.47705 1 7.06236 1 6.70951 1.13878C6.39792 1.26132 6.12208 1.46013 5.90729 1.71698C5.66405 2.00784 5.53292 2.40125 5.27064 3.18807L5 4M11 8V15M7 8V15" stroke="#131A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        case 'watch':
            return (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 5V9L11.5 10.5M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#131A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            )
        default: 
            return (
                <div></div>
            )
    }
}

export default Icon