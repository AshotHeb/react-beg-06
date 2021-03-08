import React from 'react';

const withScreenSizes = (Component) => {
    return class extends React.Component {
        state = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        handleResize = () => {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        componentDidMount() {
            window.addEventListener("resize", this.handleResize);
        }
        componentWillUnmount() {
            window.removeEventListener("resize", this.handleResize);
        }
        render() {
            const { width, height } = this.state;
            return <Component
                {...this.props}
                width={width}
                height={height}
            />;
        }
    }
}
export default withScreenSizes;