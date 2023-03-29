import React, {useState} from "react";
import finance from '../img/Finance.png';
import car from '../img/car.jpg';
import gym from '../img/gym.jpg';
import swim from '../img/Swimming.png';

export const Passion = () => {
  const items = [
    {
      title: "Cars",
      image: car,
      description: "I have a great deal of love and respect for cars. I am more interested in JDM cars with my " +
        "favourite being the Nissan S15. I am more interested in the engineering that " +
        "goes into each and every car. Some of my favourite technologies include Koenigsegg FreeValve and active aerodynamics."
    },
    {
      title: "Finance",
      image: finance,
      description: "Finance is probably the biggest thing in the world, as the saying goes 'Money makes the world go round'. " +
        "I was more drawn towards the investing component of finance and it is what sparked a passion in wanting to know how the " +
        "markets move and why they move."
    },
    {
      title: "Gym",
      image: gym,
      description: "I have been going to the gym ever since middle school and it has now been ingrained into my routine. " +
        "It wasn't until recently that I realized that the gym has been a huge help especially during times of extreme stress, " +
        "such as exam season. When I go to the gym it helps clear my mind and makes me feel refreshed."
    },
    {
      title: "Swimming",
      image: swim,
      description: "Like the gym swimming has been a part of my entire life. I started swimming at a very young age and " +
        "continued with it into competitive swimming. I competed in competitions nationwide and was practicing 7 days a week " +
        "with at times morning and afternoon practices."
    }
  ]
  return (
    <div className="passion">
      {items.map(item => {
        return (
          <div className="passion-item" style={{width: window.innerWidth/4.5}}>
            <img className="imaging" style={{width: (window.innerWidth/4.5)-25, height: (window.innerWidth/7)}} src={item.image} alt=""/>
            <h2>{item.title}</h2>
            <p style={{marginLeft: "20px", marginRight: "20px"}}>{item.description}</p>
          </div>
        )
      })}
    </div>
  )
}

//https://wallhere.com/ja/wallpaper/1834111
//https://wallpaperaccess.com/cool-gym
