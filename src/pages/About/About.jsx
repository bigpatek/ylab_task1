import React from "react";
import style from './About.module.css'
import Loader from "../../components/UI/Loader/Loader";

const About = () => {
    return(
        <div className={style.about}>   
            <p>Вы авторизованы</p>
            <div className={style.about_content}>
                <p>Cтраница в разработке....</p>
                <Loader/>
            </div>
            
        </div>
    )
}

export default About;