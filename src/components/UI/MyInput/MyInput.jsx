import React from "react";
import style from "./MyInput.module.css";

const MyInput = (props) => {

    

    return(
        <input className={style.my_input} {...props} />
    )
}

export default MyInput;