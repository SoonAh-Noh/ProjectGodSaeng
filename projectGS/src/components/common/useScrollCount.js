import { useRef, useCallback, useEffect } from 'react';
const useScrollCount = (end, start = 0, duration = 3000) => {
  const dom = useRef();
  const stepTime = Math.abs(Math.floor(duration / (end - start))); // 1

  const handleScroll = useCallback(([entry]) => {
    const { current } = dom;

    if (entry.isIntersecting) {
      let currentNumber = start;
      const counter = setInterval(() => {
        currentNumber += 1;

        if (currentNumber === end) {
          clearInterval(counter);
        }
      }, stepTime);
    }
  }, []);

  useEffect(() => {
    let observer;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return {
    ref: dom,
  };
};

export default useScrollCount;
