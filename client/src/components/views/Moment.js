import React from "react";
import moment from "moment";

export const Moment = ({time, format = "DD-MM-YYYY HH:mm:ss", ...props}) => {
    return <span {...props}>{moment(time).format(format)}</span>;
};