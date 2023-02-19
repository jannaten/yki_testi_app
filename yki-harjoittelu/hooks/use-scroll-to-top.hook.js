import { useEffect } from 'react';

function useScrollToTop(pageNumber) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumber]);
}

export default useScrollToTop;