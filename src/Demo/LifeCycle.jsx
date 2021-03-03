import React from 'react';
import A from './A';

class LifeCycle extends React.PureComponent {
    constructor(props) {
        super(props);
        // console.log("Constructor");
        this.state = {
            count: 0,
            limit: 5,
            access: true
        }

    }
    componentDidMount() {
        // const $heading1 = document.querySelector("#heading1");
        // setTimeout(() => {
        //     $heading1.innerHTML = "Side Effect";
        // }, 2000);

        // setTimeout(()=>{
        //     this.setState({
        //         count:Math.random()
        //     });
        // },2000);
        // console.log("ComponentDidMount");
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log('ComponentDidUpdate');
        // console.log('prevState', prevState);
        // if ((this.state.count > this.state.limit) && this.state.access) {
        //     this.setState({
        //         access: false
        //     });
        // }
    }
    // static getDerivedStateFromProps(nextProps, nextState) {
    //     //componentWillMount , componentWillUpdate
    //     console.log("getDerivedStateFromProps");
    //     console.log("nextState", nextState);
    //     return null;
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('shouldComponentUpdate');
    //     console.log('nextState', nextState);
    //     if (nextState.count > this.state.limit)
    //         return false;
    //     else
    //         return true;
    // }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    render() {
        console.log("LifeCycle Render", this.state);
        return (
            <div>
                <h1 id="heading1">LifeCycle Component</h1>
                {this.state.access && <button onClick={this.handlePlusCount}>Plus</button>}
                <div>
                    <A p={'props'}/>
                </div>
            </div>
        );
    }
    handlePlusCount = () => {
        this.setState({
            count: this.state.count + 1
        });
    }

};

export default LifeCycle;