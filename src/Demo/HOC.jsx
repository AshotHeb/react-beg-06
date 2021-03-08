import React from 'react';

// const HOCContainer = (props) => {
//     // console.log("props", props);
//     return <div style={{ width: "300px;", height: "300px;", backgroundColor: "rgba(0,210,54,.3)",marginTop:"25px" }} className="container">
//         {props.children}
//     </div>

//     // return (
//     //     <div className="container">
//     //             {props.children}
//     //     </div>
//     // );


// }

class HOCContainer extends React.Component {
    render() {
        const {fluid} = this.props;
        return (
            <div className={`container${fluid?"_fluid":""}`}>
                {this.props.children}
            </div>
        );
    }
}


export default HOCContainer;