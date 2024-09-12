import { useState } from "react";

export default function useTypedValue() {
    const [value, setValue] = useState<string>('')
    return {
        value,
        setValue
    }
}