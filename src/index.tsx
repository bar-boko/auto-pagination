import { ReactNode, Dispatch, useRef, useMemo, useEffect } from 'react';
import styled from '@emotion/styled';
import { Property } from 'csstype';
import { useWidthResizeObserver } from './hooks/ResizeHooks';

export type TransitionDuration = Property.TransitionDuration<string & {}>;
export type TransitionTimingFunction = Property.TransitionTimingFunction;

interface PaginationStyleProps {
  transformWidth: number;
  transitionDuration?: TransitionDuration | TransitionDuration[];
  transitionTimingFunction?: TransitionTimingFunction | TransitionTimingFunction[];
}

const PaginationStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  transform: translateX(${({ transformWidth }: PaginationStyleProps) => transformWidth}px);
  transition-property: transform;
  transition-duration: ${({ transitionDuration }: PaginationStyleProps) => transitionDuration};
  transition-timing-function: ${({ transitionTimingFunction }: PaginationStyleProps) => transitionTimingFunction ?? 'ease-in-out'};

  & > * {
    width: 100%;
  }
`;

const ContainerStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow-x: hidden;
`;

interface PaginationProps {
    children: ReactNode | ReactNode[];
    onPagesChange: Dispatch<number>;
    page?: number;
    transitionDuration?: TransitionDuration | TransitionDuration[];
    transitionTimingFunction?: TransitionTimingFunction | TransitionTimingFunction[];
    rtl?: boolean; 
}

const INVALID_BOX_WIDTH = 0;
const DEFAULT_PAGES = 1;
const DEFAULT_PAGE = 0;

const Pagination = ((props: PaginationProps) => {
    const { children, onPagesChange, page, transitionDuration, transitionTimingFunction, rtl } = props;

    const ref = useRef<HTMLDivElement>({} as HTMLDivElement);
    const { boxWidth, scrollWidth } = useWidthResizeObserver(ref);

    const pages: number = useMemo(() => (
      boxWidth <= INVALID_BOX_WIDTH
        ? DEFAULT_PAGES
        : Math.round(scrollWidth / boxWidth)
    ), [boxWidth, scrollWidth]);

    const currentPage: number = useMemo(() => (page < 0 || page >= pages ? DEFAULT_PAGE : page)
    , [page, pages]);

    const currentPageWidth = useMemo(() => currentPage * boxWidth, [currentPage, boxWidth]);

    useEffect(() => {
      onPagesChange(pages);
    }, [onPagesChange, pages]);

    return (
        <ContainerStyle>
            <PaginationStyle 
              ref={ref}
              transformWidth={rtl ? currentPageWidth : -1 * currentPageWidth}
              transitionDuration={transitionDuration}
              transitionTimingFunction={transitionTimingFunction}
            >
                { children }
            </PaginationStyle>
        </ContainerStyle>
    );
});

export default Pagination;
