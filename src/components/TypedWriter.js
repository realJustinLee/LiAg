import React, {useEffect} from "react";
import Typed from "typed.js";

export default function TypedWriter({options}) {
    let element;

    useEffect(() => {
        const typed = new Typed(element, options);
        return () => {
            typed.destroy();
        };
    }, [options, element]);

    return (
        <span
            className="my-typed"
            ref={(el) => {
                element = el;
            }}
        />
    );
}