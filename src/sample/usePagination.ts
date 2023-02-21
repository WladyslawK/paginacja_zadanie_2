import {useMemo} from "react";

type usePaginationType = {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
}

export const usePagination: (data: usePaginationType) => void = ({
                                                                   totalCount, pageSize, siblingCount= 1, currentPage

                                                                 }) => {


  const paginationRange = useMemo(() => {
  }, [])

  





}