import React, {useEffect, useState} from "react";
import {Carousel_Item} from "./Carousel_Item";
import fantasy from "../img/Fantasy.png";
import vex from "../img/Vex.png";
import meal from "../img/MealPrep.png";
import trade from "../img/TradeBot.png";


export const Carousel = () => {
  const items = [
    {
      title: 'Fantasy Swimming',
      image: fantasy,
      description: 'Built a full stack website using the MERN stack to bring swimming into the fantasy world. Follows ' +
        'closely the ISL (International Swimming League) uses a self built drafting algorithm. The points and ranking systems ' +
        'are also self built algorithms and utilizes websockets to ensure a real-time update as each competition goes on. All data' +
        ' is transferred through JSON format and uses a APIs to access backend information.',
      skills: [
        "Node.JS",
        "ReactJS",
        "Express.JS",
        "MongoDB",
        "Websockets",
        "REST APIs",
        "JSON",
        "Algorithm",
        "Proxies"
      ],
      index: 0
    },
    {
      title: 'Vex Robotics',
      image: vex,
      description: 'I led a Vex Robotics team to the international stage in Dallas, Texas. The robot was built with ' +
        'provided materials in Fusion 360. This allowed us to work together as a team virtually to completely designing of the robot.' +
        'It also saved time and money by CADing the robot first as mistakes and simulations can be run virtually. The robot was ' +
        'programmed in C++ with the use of the Vex library. Concepts such as Pure Pursuit, Dubin\'s Path PID were programmed ' +
        'to ensure accurate and consistent autonomous paths',
      skills: [
        "C++",
        "Multi-threading",
        "Pure Pursuit Algorithm",
        "Dubin's Path Algorithm",
        "Fusion 360",
        "PID control",
        "Leadership",
      ],
      index: 1
    },
    {
      title: 'MealPrep',
      image: meal,
      description: 'Using @TheMealPrepManual recipes coded a mobile application better help with the meal prepping. As lives' +
        'get busier the less we think about the food that goes into our bodies. So instead an hour of our time can be spent ' +
        'each week to prep the food to ensure the proper food goes into our bodies every day. This app was built in React Native ' +
        'and includes a self built meal prep algorithm based on the users age, height and weight. The recipes were web scraped ' +
        'using puppeteer and cookies, while the recipes and monthly plans were stored in localstorage.',
      skills: [
        "React Native",
        "Local Storage",
        "Cookies",
        "Web Scraping",
        "Puppeteer"
      ],
      index: 2
    },
    {
      title: 'TradeBot',
      image: trade,
      description: 'With my passion in finance and in the capital markets coupled with my passion for programming. I developed ' +
        'trading algorithm in python that would perform even when I am not watching the markets. The trading algorithm took ' +
        'tons of data analysis and data science to find the optimal trading stately. Data was taken from the OANDA API and ' +
        'orders stored in a MySQL database and were placed autonomously',
      skills: [
        "Python",
        "Pandas",
        "Numpy",
        "Data Science",
        "Data Analysis",
        "JSON",
        "API",
        "Algorithm",
        "Automation",
        "MySQL"
      ],
      index: 3
    }
  ]
  const [Active, setActive] = useState(0);


  const update = (newIndex:number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    setActive(newIndex);
  }

  useEffect(() => {
    const ele = document.getElementById("radio-1") as HTMLInputElement;
    ele.checked = true;

  }, [])

  return (
    <div className="slide">
      <div className="slides">
        <input type="radio" name="radio-button" id="radio-1" />
        <input type="radio" name="radio-button" id="radio-2" />
        <input type="radio" name="radio-button" id="radio-3" />
        <input type="radio" name="radio-button" id="radio-4" />

        {items.map((item) => {
          return (
            <Carousel_Item item={item} width={"100%"} />
          )
        })}

        <div className="auto-nav">
          <div className="auto1"></div>
          <div className="auto2"></div>
          <div className="auto3"></div>
          <div className="auto4"></div>
        </div>

        <div className="man-nav">
          <label htmlFor="radio-1" className="man-button"></label>
          <label htmlFor="radio-2" className="man-button"></label>
          <label htmlFor="radio-3" className="man-button"></label>
          <label htmlFor="radio-4" className="man-button"></label>
        </div>
      </div>
    </div>
  )
}
