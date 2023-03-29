import React, {useEffect, useState} from 'react';
import github from './img/Github.jpg';
import linkedin from './img/linkedin.png'
import image from './img/Nanotechnology.png';
import {Carousel} from "./components/Carousel";
import Plx from "react-plx";
import {Passion} from "./components/Passion";
import './App.css';
import ReactGA from 'react-ga';

const tracking_id = "UA-262213607-2";
ReactGA.initialize(tracking_id);

function App() {
  const letters = ['C', 'L', 'I', 'C', 'K', ' ', 'M', 'E'];
  const letter_position: number[][] = [];
  const [Size, setSize] = useState(getSize());

  let board:string[][] = [];
  let columns = 15;
  let rows = 8;

  for (let i = 0; i < columns; i++) {
    let row = [];
    for (let j = 0; j < rows; j++) {
      // let tile = document.createElement("div");
      let tile = i.toString() + "-" + j.toString();
      row.push(tile);
    }
    board.push(row);
  }


  const timer = (ms:number) => new Promise(res => setTimeout(res, ms));
  async function clickTile(_letters:number[][]) {
    const _letters_Eric = ['H', 'I', '', 'I', 'M', '', 'E', 'R', 'I', 'C', '', 'F', 'E', 'N', 'G'];

    for (const element of board) {
      const index = board.indexOf(element);
      for (const elem of element) {
        const innerIndex = element.indexOf(elem);
        // console.log(elem)
        let a = document.getElementById(elem);
        // @ts-ignore
        let but = a.getElementsByClassName("value-inside")[0];

        if (_letters[index][1] === innerIndex) {
          // @ts-ignore
          a.className = "clicked-letter-block";
          // @ts-ignore
          but.textContent = _letters_Eric[index];
        } else {
          // @ts-ignore
          a.className = "clicked-blocks";
          // @ts-ignore
          but.textContent = '';
          }
        await timer(25);
      }
    }
    await moveTiles(_letters, _letters_Eric);
  }

  async function moveTiles(_letters:number[][], _letters_Eric:string[]) {
    for (const element of _letters) {
      const index = _letters.indexOf(element);
      let letters = element[0].toString() + "-" + element[1].toString();
      let a_old = document.getElementById(letters);

      // @ts-ignore
      let but_old = a_old.getElementsByClassName("value-inside")[0];
      // @ts-ignore
      a_old.className = "clicked-blocks";
      but_old.textContent = "";

      letters = element[0].toString() + "-3";
      let a = document.getElementById(letters);
      // @ts-ignore
      let but = a.getElementsByClassName("value-inside")[0];
      // @ts-ignore
      a.className = "clicked-letter-block";
      but.textContent = _letters_Eric[index];
      await timer(15);
      // console.log(letters)
    }

  }

  function getSize() {
    return window.innerWidth;
  }

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    const handle_resize = () => {
      setSize(getSize())
    }
    window.addEventListener('resize', handle_resize)
    return () => {
      window.removeEventListener('resize', handle_resize)
    }
  }, [])


  return (
    <div
      className="App"
      // style={{maxHeight: windowSize.current[1]}}
    >
      <div className="mine">
        {
          board.map((row, c_index) => {
            let rand = Math.floor(Math.random()*8);
            letter_position.push([c_index, rand]);
            return (
              <div className="flex-column">
                {row.map((item, r_index) => {
                  let val:string = '';
                  if (r_index === 0 && (c_index !== 5 && c_index !== 8)) {
                    val = letters[c_index];
                  }
                  return (
                    <button className="not-clicked-blocks" id={item} onClick={() => clickTile(letter_position)}>
                      <h1 className="value-inside">{val}</h1>
                    </button>
                  )
                })}
              </div>
            )
          })
        }
      </div>
      <div className="about">
        <h1 style={{fontWeight: "bolder", fontSize: "40px"}}>About Me</h1>
        <p style={{marginBottom: "50px"}}>
          Hi my name is Eric Feng and I am currently studying Nanotechnology Engineering at the University of Waterloo.
          While I am study engineering, the software side also interests me so I am not bounded by only hardware.
          My experience in the hardware world include robotics development and the application of Arduino/Raspberry Pi.
          For software, I am experienced in Full Stack development, Machine learning/AI algorithms, data science, and
          data analysis. My skill set includes but not limited to Azure Virtual Machines, AWS, CADing software, databases,
          and Linux. I am a curious person and I love to learn new things. I am confident in my work ethic, critical thinking
          and problem solving skills. Currently seeking a co-op position, so feel free to contact me on LinkedIn for opportunities.
        </p>
      </div>
      <div style={{paddingBottom: "50px", marginTop: "75px"}}>
        <h1 style={{textAlign: "center", paddingTop: "25px", fontSize: "40px"}}>Featured Projects</h1>
        <div className="projects">
          <Carousel />
        </div>
      </div>
      <div className="education">
        <h1 style={{fontSize: "40px"}}>Education</h1>
        <Plx parallaxData={[
          {
            start: 1750,
            duration: 250,
            properties: [
              {
                startValue: 1,
                endValue: 3,
                property: "scale",
              },
              {
                startValue: 1,
                endValue: 0,
                property: "opacity",
              }
            ],
          },
        ]}>
          <div className="university">
            <h1>University of Waterloo</h1>
          </div>
        </Plx>
        <h1 style={{fontSize: "40px"}}>Nanotechnology Engineering</h1>
        <Plx parallaxData={[
          {
            start: 1800,
            duration: 500,
            properties: [
              {
                startValue: 100,
                endValue: 0,
                property: "translateY",
              }
            ],
          },
        ]}>
          <div className="Eng">
            <p>
              Currently enrolled at the University of Waterloo studying Nanotechnology Engineering and at the moment
              undergoing my 1B term. Significant subjects I have taken are Linear Algebra, Linear Circuits, Chemistry
              and Calculus.
            </p>
            <img src={image} alt="" style={{borderRadius: 50, width: Size/1.75, marginLeft: 25}} />
          </div>
        </Plx>
      </div>
      <div className="passions">
        <h1 style={{fontSize: "40px"}}>My Passions</h1>
        <Passion />
      </div>
      <div style={{textAlign: "center"}}>
        <h1 style={{fontSize: "40px"}}>Want to see more?</h1>
        <div className="See">
          <div className="items">
            <img src={linkedin} style={{width: "250px"}} alt=""/>
            <a href="https://www.linkedin.com/in/eric-feng-57a862259" target="_blank" rel="noreferrer">
              <button className="visit">
                Visit LinkedIn Page
              </button>
            </a>
          </div>
          <div className="items">
            <img src={github} style={{width: "250px"}} alt=""/>
            <a href="https://github.com/centgan" target="_blank" rel="noreferrer">
              <button className="visit">
                Visit LinkedIn Page
              </button>
            </a>
          </div>
        </div>
      </div>

      <footer className="footer">
        <h4 style={{paddingTop: "20px", fontStyle: "italic"}}>Made by Eric Feng</h4>
        <p>Credits for images:</p>
        <ul>
          <li>https://leverageedu.com/blog/applications-of-nanotechnology/</li>
          <li>https://wallhere.com/ja/wallpaper/1834111</li>
          <li>https://wallpaperaccess.com/cool-gym</li>
          <li>https://www.linkedin.com</li>
          <li>https://www.github.com</li>
          <li>http://www.swimming.org/sport/competitive-swimming-pools/</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
