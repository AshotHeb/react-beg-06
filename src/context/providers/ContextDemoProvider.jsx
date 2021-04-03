import { useState } from 'react';
import { contextDemo } from '../context';

const ContextDemoProvider = (props) => {
    const [counter, setCounter] = useState(0);
    const [inputValue ,setInputValue] = useState("");
    return (
        <contextDemo.Provider
            value={{
                counter,
                setCounter,
                inputValue,
                setInputValue
            }}
        >
            {props.children}
        </contextDemo.Provider>
    )
}

export default ContextDemoProvider;