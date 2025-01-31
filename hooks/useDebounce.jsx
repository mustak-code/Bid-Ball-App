import { useEffect, useState } from "react";

export const useDebounce = (deValue, delay = 500) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setValue(deValue);
        }, delay);
        return () => clearTimeout(timer);
    }, [deValue, delay]);

    return value;
};
