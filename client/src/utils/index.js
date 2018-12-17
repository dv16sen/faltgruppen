import React from "react";
import {bindActionCreators} from "redux";

export const childrenWithProps = ({children, ...props}) => {
    return React.Children.map(children, (child) => React.cloneElement(child, props), null);
};

export const bindDispatchToActionCreators = (getActionCreators) => {
    return (dispatch, props) => bindActionCreators(getActionCreators(props), dispatch);
};

export const removeDuplicates = (list) => {
    return list.filter((value, key) => list.indexOf(value) === key);
};