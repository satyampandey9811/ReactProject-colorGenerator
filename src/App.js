import React, { useState, useRef, useEffect } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("crimson").all(10));
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    try {
      let colors = new Values(color).all(10);
      setError(false);
      setList(colors);
    } catch (error) {
      setError(false);
    }
  }, [color]);

  const style = {
    backgroundColor: color,
  };

  return (
    <>
      <section className="container">
        <h3>Color generator</h3>
        <input
          ref={inputRef}
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="#dc143c or crimson"
          className={`${error ? "error" : null} type`}
        />
        or
        <input
          type="color"
          className="color-picker"
          onChange={(e) => setColor(e.target.value)}
          style={style}
        />
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
