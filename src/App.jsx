import { useState } from "react"

function App() {
  
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("0");
  const et = expression.trim();
  const isOperator = (symbol) => /[*/+-]/.test(symbol);

  function buttonPress(symbol)
  {
      if(symbol === "clear")
      {
        setAnswer("");
        setExpression("0");
      }else if(symbol === "=")
      {
        calculate();
      }else if(isOperator(symbol))
      { 
        if(/[*/]/.test(expression.slice(-2)) && symbol ==="-")
        {  
          setExpression(et+" "+symbol+" ");
          return;
        }
        else if(isOperator(expression.slice(-2)) )
        {      
          const replaceSym = expression.slice(0,-2)+symbol+" ";
          setExpression(replaceSym);
          return;
        }
        setExpression(et+" "+symbol+" ");

      }else if(symbol===".")
      {
        const lastNumber = expression.split(/[*/+-]/).pop();
        if(!lastNumber) return; // not clear
        else if(lastNumber.includes(".")) return;
        setExpression(expression+symbol);
      }else 
      {
          expression[0] === "0" ? setExpression(expression.slice(1) + symbol) : setExpression(expression + symbol);
      }
  };

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et[et.length - 1])) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];
    // go through parts backwards
    for (let i = 0; i <parts.length -1; i++) 
    {
      if(!/[*/+]/.test(parts[i]) || !/[*/+]/.test(parts[i+1]))
      {
        newParts.push(parts[i]);
      }
    }
    newParts.push(parts[parts.length-1]);
    const newExpression = newParts.join(" ");
    if(isOperator(newExpression[0])) 
    {
      setAnswer(Math.round(eval(answer + newExpression)*100)/100);  //The eval() function evaluates JavaScript code represented as a string and returns its completion value
    } else 
    {
      setAnswer(Math.round(eval(newExpression)*10000)/10000);
    }
    setExpression("");
  };

  return (
    <>
     <div className="container">         
        <div id="display">
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
        </div>   
        <div id="bts-section">  
          <button type="button" className="calculator-btns" id="clear" onClick={() => buttonPress("clear")}>AC</button>         
          <button type="button" className="calculator-btns" id="multiply" onClick={() => buttonPress("*")}>*</button>  
          <button type="button" className="calculator-btns" id="divide" onClick={() => buttonPress("/")}>/</button>  
          <button type="button" className="calculator-btns" id="seven" onClick={() => buttonPress("7")}>7</button>
          <button type="button" className="calculator-btns" id="eight" onClick={() => buttonPress("8")}>8</button>
          <button type="button" className="calculator-btns" id="nine" onClick={() => buttonPress("9")}>9</button>          
          <button type="button" className="calculator-btns" id="subtract" onClick={() => buttonPress("-")}>-</button> 
          <button type="button" className="calculator-btns" id="four" onClick={() => buttonPress("4")}>4</button>
          <button type="button" className="calculator-btns" id="five" onClick={() => buttonPress("5")}>5</button>
          <button type="button" className="calculator-btns" id="six" onClick={() => buttonPress("6")}>6</button>          
          <button type="button" className="calculator-btns" id="add" onClick={() => buttonPress("+")}>+</button>  
          <button type="button" className="calculator-btns" id="one" onClick={() => buttonPress("1")}>1</button>
          <button type="button" className="calculator-btns" id="two" onClick={() => buttonPress("2")}>2</button>
          <button type="button" className="calculator-btns" id="three" onClick={() => buttonPress("3")}>3</button>
          <button type="button" className="calculator-btns" id="equals" onClick={() => buttonPress("=")}>=</button>
          <button type="button" className="calculator-btns" id="zero" onClick={() => buttonPress("0")}>0</button>       
          <button type="button" className="calculator-btns" id="decimal" onClick={() => buttonPress(".")}>.</button>          
        </div>
     </div>
    </>
  )
}

export default App
