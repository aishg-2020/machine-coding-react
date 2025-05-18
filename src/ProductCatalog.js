import "./styles.css";
import { useState, useEffect } from "react";
let cache = {};
export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const fetchProducts = (limit, skip) => {
    const cacheKey = `limit=${limit},skip=${skip}`;
    if (cache[cacheKey]) {
      setProducts(cache[cacheKey].products);
      return;
    }
    fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,thumbnail`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let totalNumPages = Math.floor(data.total / productsPerPage);
        console.log(totalNumPages);

        const array = [];
        for (let i = 1; i <= totalNumPages; i++) {
          array.push(i);
        }
        setTotalPages(array);
        setProducts(data.products);
        cache[cacheKey] = data;
      });
  };

  useEffect(() => {
    fetchProducts(productsPerPage, currentPage * productsPerPage);
  }, [currentPage]);

  return (
    <div className="ProductCatalog">
      <div className="layout">
        <div className="pagination">
          <div
            onClick={() => {
              setCurrentPage((prev) => {
                if (prev - 1 > 0) {
                  return prev - 1;
                } else return prev;
              });
            }}
            className="page"
          >{`<`}</div>
          {totalPages.length &&
            totalPages?.map((single) => (
              <div
                className={`page ${single === currentPage ? "active" : ""}`}
                key={single}
                onClick={() => setCurrentPage(single)}
              >
                {single}
              </div>
            ))}
          <div
            onClick={() => {
              setCurrentPage((prev) => {
                if (prev + 1 <= totalPages?.length) {
                  return prev + 1;
                } else return prev;
              });
            }}
            className="page"
          >{`>`}</div>
        </div>

        <div className="products">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <div key={product.id} className="product">
                  <div>{product.title}</div>
                  <img src={product.thumbnail} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
