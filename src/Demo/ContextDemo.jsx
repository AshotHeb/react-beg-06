import { contextDemo } from '../context/context';
const C = function (context) {
    return (
        <div>
            <h2>Context Demo</h2>
            <div>counter {context.counter}</div>
            <div>Test :{context.test}</div>
            <p>
                {context.bitSchool}
            </p>
        </div>
    );
}

const ContextDemo = (props) => {

    return (
        <contextDemo.Consumer>
            {
                C 
            }
        </contextDemo.Consumer>
    );
};

export default ContextDemo;