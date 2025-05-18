import React, { useState, useEffect, useRef, useCallback } from "react";

const InfiniteScroll = ({ children, fetchMore, loadingComponent }) => {
  const [isFetching, setIsfetching] = useState(false);
  const observer = useRef(null);
  const scrollEnd = useRef(null);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isFetching) {
          setIsfetching(true);
          fetchMore().then(() => {
            setIsfetching(false);
          });
        }
      });
    }, options);

    if (observer.current) {
      observer.current.observe(scrollEnd.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [fetchMore, isFetching]);

  return (
    <div>
      {children}
      <div ref={scrollEnd} />
      {isFetching && loadingComponent}
    </div>
  );
};
const itemsLimit = 100000;
const InfiniteScrollContainer = () => {
  const [items, setItems] = useState([]);

  const fetchMore = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let tempArray = Array.from(
          { length: itemsLimit },
          (_, index) => index + items.length + 1
        );
        setItems((prev) => [...prev, ...tempArray]);
        resolve();
      }, 1000);
    });
  };

  const loadingComponent = <div className="loading">Loading......</div>;

  return (
    <div className="infiniteScrollContainer">
      <InfiniteScroll fetchMore={fetchMore} loadingComponent={loadingComponent}>
        {items.map((single) => {
          return <div className="listItem">Item {single}</div>;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollContainer;
