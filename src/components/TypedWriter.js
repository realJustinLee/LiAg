import React, {useEffect} from "react";
import Typed from "typed.js";

export default function (props) {
    let element;

    useEffect(() => {
        const {options} = props;
        const typed = new Typed(element, options);

        return () => {
            typed.destroy();
        };
    }, [props]);

    return (
        <span
            className="my-typed"
            ref={(el) => {
                element = el;
            }}
        />
    );
}