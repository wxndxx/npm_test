import { useState } from "react";

export default function useClose() {
    const [close, setClose] = useState<boolean>(false)
    return {
        close,
        setClose
    }
}