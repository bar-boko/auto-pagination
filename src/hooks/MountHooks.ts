import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";

export const useMountRef = (): RefObject<boolean> => {
    const ref = useRef<boolean>(true);

    useEffect(() => {
        ref.current = true;
        
        return () => {
            ref.current = false;
        };
    }, []);

    return ref;
};

export const useSafeState = <T>(initialValue: T, ref?: RefObject<boolean>)
: [T, Dispatch<SetStateAction<T>>] => {
    const [state, setState] = useState<T>(initialValue);
    const mountRef = ref ?? useMountRef();

    const setSafeState = (newValue: SetStateAction<T>) => {
        mountRef.current && setState(newValue);
    };

    return [state, setSafeState];
}