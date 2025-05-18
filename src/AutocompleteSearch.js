import "./styles.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "./utils.js";
let cache = {};

export default function AutocompleteSearch() {
  const [results, setResults] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const resultRefs = useRef([]);
  const handleKeydown = (e) => {
    if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => (prev < results.length ? prev + 1 : 0));
    } else if (e.key === "Enter") {
      setInputVal(results[highlightedIndex].name);
      setHighlightedIndex(-1);
    }
  };
  const fetchResults = useCallback(
    debounce((inputVal) => {
      const cacheKey = inputVal;
      if (!cache[cacheKey])
        fetch("https://dummyjson.com/recipes/search?q=" + inputVal)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setResults(data.recipes);
            cache[cacheKey] = data.recipes;
          });
      else {
        setResults(cache[cacheKey]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchResults(inputVal);
  }, [inputVal]);

  useEffect(() => {
    if (highlightedIndex !== -1 && resultRefs.current[highlightedIndex]) {
      resultRefs.current[highlightedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  return (
    <div className="App">
      <div>
        <input
          type="text"
          name="search"
          className="searchInput"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
          onKeyDown={handleKeydown}
        />
        {showResults && results.length > 0 && (
          <div className="resultsContainer">
            {results.map((singleResult, i) => {
              return (
                <span
                  className={`result ${
                    highlightedIndex !== i ? "" : "highlighted"
                  }`}
                  key={singleResult.id}
                  onClick={() => setInputVal(singleResult.name)}
                  ref={(el) => (resultRefs.current[i] = el)}
                >
                  {singleResult.name}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
