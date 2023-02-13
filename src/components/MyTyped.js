import React, {Component} from "react";
import Typed from "typed.js";

class MyTyped extends Component {

    componentDidMount() {
        const {options} = this.props;
        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        return (
            <span
                className="my-typed"
                ref={(el) => {
                    this.el = el;
                }}
            />
        );
    }
}

export default MyTyped;