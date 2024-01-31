import React from "react";
import finance from '../img/Finance.png';
import car from '../img/car.jpg';
import gym from '../img/gym.jpg';
import swim from '../img/Swimming.png';

const Passion = () => {
  const items = [
    {
      title: "Cars",
      image: car,
      description: "I have a great deal of love and respect for cars. I am more interested in JDM cars with my " +
        "favourite being the Nissan S15. I am more interested in the engineering that " +
        "goes into each and every car. Some of my favourite technologies include Koenigsegg's FreeValve technology " +
        "and active aerodynamics. I'm currently striving for sustainable fuel sources as I don't want the ICE invention " +
        "and the fun it brings to go extinct."
    },
    {
      title: "Finance",
      image: finance,
      description: "Finance is probably the biggest thing in the world, as the saying goes 'Money makes the world go round'. " +
        "I was more drawn towards the investing component of finance. While when I was first introduced to the capital markets " +
        "greed was the first emotion however as I delved deeper in this world it sparked a passion in wanting to know how the " +
        "markets move and why they move."
    },
    {
      title: "Gym",
      image: gym,
      description: "I have been going to the gym ever since middle school and it has now been ingrained into my routine. " +
        "It wasn't until recently that I realized that the gym has been a huge help especially during times of extreme stress, " +
        "such as exam season. The gym is just a hobby however I find that it helps to stay consistent with setting goals and " +
        "I am currently looking to enter in powerlifting competitions."
    },
    {
      title: "Swimming",
      image: swim,
      description: "Like the gym, swimming has been a part of my entire life. I started swimming at a very young age and " +
        "continued with it into competitive swimming. I competed in competitions nationwide and was practicing 7 days a week " +
        "with at times morning and afternoon practices which developed a strong sense of time management. While I stopped competitive " +
        "I miss it ar times and still swim from time to time."
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

export default Passion;
//https://wallhere.com/ja/wallpaper/1834111
//https://wallpaperaccess.com/cool-gym
