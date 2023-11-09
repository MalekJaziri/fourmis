import React from "react";
import {Navigate} from "react-router-dom";

export const AuthMiddleware = (props) => {

    if (!localStorage.getItem("jwt")) {
        return (
            <Navigate to={"/Connexion"}/>
        );
    }
    return (
        <>
            {props.children}
        </>);
};