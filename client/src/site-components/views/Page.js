import React from "react";

export const Page = ({children, ...props}) => (
    <section className="wrapper-4" {...props}>
        {children}
    </section>
);