import React, { useState, useRef, useEffect } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("crimson").all(10));
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setError(false);
      setList(colors);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <section className="container">
        <h3>Color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#dc143c"
            className={`${error ? "error" : null}`}
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return <SingleColor key={index} index={index} {...color} />;
        })}
      </section>
    </>
  );
}

export default App;
