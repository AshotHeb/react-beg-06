import { useState, useEffect, useLayoutEffect } from 'react';

const Hooks = () => {
    //state
    const [counter, setCounter] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [personInfo, setPersonInfo] = useState({
        name: "",
        surname: ""
    });
    //effect
    useEffect(() => {
        console.log("Mount");
        document.title = "Hooks Component";
    }, []);
    useEffect(() => {
        console.log("Update");
    });


    // useLayoutEffect(()=>{
    //     console.log("LayoutEffect");
    // },[])
    const x = counter === 5; //false //true
    useEffect(() => {
        // if (counter === 5) {
        setCounter(0);
        console.log("counter Effect");
        // console.log("inputValue", inputValue);
    }, [x]);



    //handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonInfo({
            ...personInfo,
            [name]: value
        });
    }
    return (
        <div>
            <h1>Hooks Component</h1>
            <div style={{ border: "1px solid black", padding: "50px" }}>
                <p>Count : {counter}</p>
                <div>
                    <button onClick={() => setCounter(counter + 1)}>+</button>
                    <button onClick={() => setCounter(counter - 1)}>-</button>
                </div>
            </div>
            <div style={{ border: "1px solid black", padding: "50px" }}>
                <input
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                />
                <p>
                    inputValue : {inputValue}
                </p>
                <p>
                    <button onClick={() => setInputValue("")}>Reset Input</button>
                </p>
            </div>

            <div style={{ border: "1px solid black", padding: "50px" }}>
                <p>
                    {JSON.stringify(personInfo, null, 0)}
                </p>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Surname"
                        name="surname"
                        onChange={handleChange}

                    />
                </div>
                <button onClick={() => setPersonInfo({
                    name: "",
                    surname: ""
                })}>Reset Info</button>
            </div>
        </div>
    );
}

export default Hooks;