import { memo, useContext } from 'react';
import { contextDemo } from '../context/context';
const A = (props) => {
    const {
        counter,
        setCounter,
        inputValue,
        setInputValue
    } = useContext(contextDemo);


    return (
        <div>
            <h1>A Component</h1>
            <div>
                <p>{counter}</p>
                <button onClick={() => setCounter(counter + 1)}>+</button>
                <button onClick={() => setCounter(counter - 1)}>-</button>
            </div>
            <div>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <p>{inputValue}</p>
            </div>
        </div>
    )
    // return (
    //     <contextDemo.Consumer>
    //         {
    //             function (context) {
    //                 return (
    //                     <div>
    //                         <h2>A Component</h2>
    //                         Counter {context.counter}
    //                     </div>
    //                 )
    //             }
    //         }
    //     </contextDemo.Consumer>
    // );
};

export default memo(A);