import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../css/App.css";

const RightSide = (props) => {
    const containerClass = `right-side ${props.isLogginActive ? 'left' : 'right'}`;
    const text = props.isLogginActive ? 'Register' : 'Login';
    return (
        <div
            className={containerClass}
            ref={props.containerRef}
            onClick={props.onClick}
        >
            <div className="inner-container">
                <div className="text">{text}</div>
            </div>
        </div>
    );
};
export default RightSide;