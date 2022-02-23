import { RefObject, useEffect } from 'react';
import { ResizeObserver as JuggleResizeObserver } from '@juggle/resize-observer';
import { isElement } from '@juggle/resize-observer/lib/utils/element';
import { useMountRef, useSafeState } from './MountHooks';

interface ElementSize {
    scrollWidth: number;
    boxWidth: number;
}

const DEFAULT_SIZE = 0;

export const useWidthResizeObserver = (element: RefObject<HTMLElement>): ElementSize => {
    const mountRef = useMountRef();
    const [boxWidth, setBoxWidth] = useSafeState(DEFAULT_SIZE, mountRef);
    const [scrollWidth, setScrollWidth] = useSafeState(DEFAULT_SIZE, mountRef);

    const callback: ResizeObserverCallback = entries => {
        if (entries.some(({ target }) => element.current === target)) {
            setBoxWidth(element.current.clientWidth);
            setScrollWidth(element.current.scrollWidth);
        }
    };

    const observer = new JuggleResizeObserver(callback);

    useEffect(() => {
        const currentElement = element.current;
        const isCurrentElementValid = isElement(currentElement);

        isCurrentElementValid && observer.observe(currentElement!);

        return () => {
            isCurrentElementValid && observer.unobserve(currentElement!);
        }
    }, [element]);

    return ({ boxWidth, scrollWidth });
};