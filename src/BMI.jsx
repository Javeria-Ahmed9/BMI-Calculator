import { useEffect, useRef, useState } from "react";

export function BmiCalculator() {
  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState("");
  let [val, setVal] = useState("");
  const myVal = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", handlefun);
    function handlefun(event) {
      if (event.key == "Enter") {
        if (height.trim() !== "" && weight.trim() !== "") {
          height = height * 0.3048;
          let u = (weight / (height * height)).toFixed(3);
          setVal(u);
          setWeight("");
          setHeight("");
        } else {
          alert("enter height and weight first");
        }
      }
    }
    return () => document.removeEventListener("keydown", handlefun);
  });

  let Hfun = (event) => {
    //Meters = Feet * 0.3048
    setHeight(event.target.value);
  };
  let Wfun = (event) => {
    setWeight(event.target.value);
  };
  let CalBMI = () => {
    //BMI = Weight (kg) / Height (m)²
    if (height.trim() !== "" && weight.trim() !== "") {
      height = height * 0.3048;
      let u = (weight / (height * height)).toFixed(3);
      setVal(u);
      setWeight("");
      setHeight("");
    } else {
      alert("enter height and weight first");
      myVal.current.innerText = " ";
    }
  };
  return (
    <>
      <h1 id="head">BMI Calculator</h1>
      <div id="maindiv">
        <div id="joj">
          <label>
            <h1 id="labelid"> Height:</h1>

            <input
              type="number"
              value={height}
              placeholder="Enter height in 'feet'"
              onChange={Hfun}
            />
          </label>
          <label>
            <h1 id="labelid">Weight:</h1>
            <input
              type="number"
              value={weight}
              placeholder="Enter weight in 'kg'"
              onChange={Wfun}
            />
          </label>
          <button id="r" onClick={CalBMI}>
            Calculate
          </button>
        </div>
        <div id="po">
          <header>Result:</header>
          <main ref={myVal} value={val}>
            {val} kg/m<sup>2</sup>
          </main>
        </div>
      </div>
    </>
  );
}
