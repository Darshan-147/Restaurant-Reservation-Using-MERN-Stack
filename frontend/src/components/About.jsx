import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">ABOUT US</h1>
              <p>The only thing we're serious about is food.</p>
            </div>
            <p className="mid">
              At our online restaurant, we are passionate about delivering an
              exceptional culinary experience right to your doorstep. With a
              team of skilled chefs and a commitment to using only the freshest,
              locally-sourced ingredients, we craft each dish with meticulous
              attention to detail and unwavering dedication to flavor. Join us
              on a gastronomic journey that celebrates the art of cooking and
              the joy of great food.
            </p>
            <button onClick={()=>document.querySelector('.menu').scrollIntoView({behavior:"smooth"})}>
              Explore Menu
              <span>
                <HiOutlineArrowRight />
              </span>
            </button>
          </div>
          <div className="banner">
            <img src="about.png" alt="about" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
