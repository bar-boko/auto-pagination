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
  transform: translateX(-${({ transformWidth }: PaginationStyleProps) => transformWidth}px);
  
  ${({ transitionDuration, transitionTimingFunction}: PaginationStyleProps) => {
    if (!transitionDuration || !transitionTimingFunction) {
      return '';
    }

    return `
      transition-duration: ${transitionDuration};
      transition-property: transform;
      transition-timing-function: ${transitionTimingFunction};
    `;
  }}
`;

const ContainerStyle = styled.div`
  overflow-x: hidden;
`;

interface PaginationProps {
    children: ReactNode | ReactNode[];
    onPagesChange: Dispatch<number>;
    page?: number;
    transitionDuration?: TransitionDuration | TransitionDuration[];
    transitionTimingFunction?: TransitionTimingFunction | TransitionTimingFunction[];
}

const INVALID_BOX_WIDTH = 0;
const DEFAULT_PAGES = 1;
const DEFAULT_PAGE = 0;

const Pagination = ((props: PaginationProps) => {
    const { children, onPagesChange, page, transitionDuration, transitionTimingFunction } = props;

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
              transformWidth={currentPageWidth}
              transitionDuration={transitionDuration}
              transitionTimingFunction={transitionTimingFunction}
            >
                { children }
            </PaginationStyle>
        </ContainerStyle>
    );
});

export default Pagination;
