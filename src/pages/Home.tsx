import React, {useEffect, useState} from "react";
import ReactGA from "react-ga";
import Carousel from "../components/Carousel";
import Plx from "react-plx";
import image from "../img/Nanotechnology.png";
import Passion from "../components/Passion";
import linkedin from "../img/linkedin.png";
import github from "../img/Github.jpg";

const tracking_id = "UA-262213607-2";
ReactGA.initialize(tracking_id);

const Home = () => {
  // for the beginning click animation
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

  // to figure out what term to display, so I don't have to come in and update every term
  let day:Date = new Date();
  let year:number = day.getFullYear();
  let month:number = day.getMonth();
  let term:String;
  const sequence = new Map<number, string[]>();
  sequence.set(2023, ['1B', '2A', '2A']);
  sequence.set(2024, ['2B', '2B', '3A']);
  sequence.set(2025, ['3A', '3A', '3B']);
  sequence.set(2026, ['4A', '4A', '4A']);
  sequence.set(2027, ['4B']);

  if (sequence.has(year)) {
    let seq = sequence.get(year);
    if (year === 2027) {
      if (month <= 3) {
        term = '4B'
      } else {
        term = ''
      }
    } else {
      if (month <= 3) {
        // @ts-ignore
        term = seq[0];
      } else if (month <= 7) {
        // @ts-ignore
        term = seq[1];
      } else {
        // @ts-ignore
        term = seq[-1];
      }
    }
  } else {
    term = '5'
  }


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
          While I am study engineering, the software side also interests me so I am not bounded by only hardware. If I had to
          summarize the type of person I am I would say that I am a jack of all trades having knowledge in many fields.
          My goal in life is to create an algorithm that hardware utilizes to improve the quality of life. Consequently each project
          I work on is to develop skills or knowledge that will be utilized for this goal. Feel free to reach out to me
          for any reason. I'm always interested in working on new projects and learning new things!
        </p>
      </div>

      <div className="about">
        <h1 style={{fontWeight: "bolder", fontSize: "40px", marginBottom: "-10px"}}>About Me In Depth</h1>
        <p style={{fontSize: "12px", fontStyle: "italic"}}>
          Since I have found that most people who come across my page whether that be employers or any one else, are not
          interested in reading a lengthy paragraph about me so above is the shortened version and if you are still
          interested in learning more about me that's what this section is for.
        </p>
        <p style={{marginBottom: "50px"}}>
          Like already mentioned I am currently studying Nanotechnology Engineering at the University of Waterloo and
          while this was not my initial first choice to study I have grown to really enjoy the content being learning and
          the applications of it in the real world. Whether that be from constructing semiconductors or creating materials
          that would not be possible without nano properties. I am a person who really enjoys being involved in everything,
          as such I actively try to learn any topics that I come across that are interesting. Therefore I can call myself
          experienced in <strong>Full Stack development</strong>, while my front end skills are not great as seen with this portfolio website
          but I consider this as a lack of art skills. I would also say that I am more experienced in <strong>Data Science </strong>
          / <strong>Data
          Analysis</strong>, <strong>algorithmic creation</strong> and <strong>Machine Learning </strong>/ <strong>Artificial Intelligence </strong>
          as I am more interested in this
          field specifically algorithms. Being heavily involved in robotics since a young age stemmed into development
          using Arduino, Raspberry Pi and IC chips. All these fields of interests lead to skills being developed namely
          CADing software, Linux, Database architecture and management. On the completely other side I am experienced in
          the capital markets and since it is not my policy to disclose financials this is up to your imagination as to
          how much knowledge I have in this field. I pride myself on my work ethic, critical thinking and discipline which
          are always being developed with every new project I think of.
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
              undergoing my {term} term. Learning all kinds of things .
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
      <div>
        {/*create a contact me part*/}
      </div>

      <footer className="footer">
        <h4 style={{paddingTop: "20px", fontStyle: "italic", fontSize: '20px'}}>Made by Eric Feng</h4>
        <p style={{fontSize: '10px'}}>Credits for images:</p>
        <ul style={{fontSize: '10px'}}>
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

export default Home;
