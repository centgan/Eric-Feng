import React, {FC, useState} from "react";
import {project_list} from "../components/projects-list";

const Projects:FC<{}> = () => {
  const [search, setSearch] = useState("");

  function searchHandle(field:string) {
    console.log(field)
    setSearch(field);
    for (let column of project_list) {
      const index = project_list.indexOf(column).toString();
      for (let element of column) {
        const innerIndex = column.indexOf(element).toString();
        let title_pos = element.title.search(field);
        let description_pos = element.title.search(field);
        let skill_pos:number = -1;
        for (let skill of element.skills) {
          if (skill_pos === -1) {
            skill_pos = skill.search(field);
          }
        }
        // console.log(skill_pos, 'skill_pos');

        let _id = index+"-"+innerIndex;
        let a = document.getElementById(_id);

        // console.log(search.length-1<=0)
        // console.log(search)

        if (title_pos === -1 && description_pos === -1 && skill_pos === -1 && (search.length-1 < 0 || search.length-1 >= 1)) {
          // @ts-ignore
          a.className = "hide";
        } else {
          // @ts-ignore
          a.className = "individual";
        }
      }
    }
  }


  return (
    <div className="App">
      <div className="top">
        <h1>Here is a list of all my projects</h1>
        <input className="input" type="text" placeholder="Search for project or skill" value={search} onChange={(e) => searchHandle(e.target.value.toString())} />
      </div>

      <div className="rows">
        {project_list.map((item_list) => {
          let i = project_list.indexOf(item_list).toString();

          return (
            <div className="columns">
              {item_list.map((item) => {
                let j = item_list.indexOf(item).toString();
                let _id = i+"-"+j;

                return (
                  <div className="individual" id={_id} style={{width: window.innerWidth/4+50}}>
                    <h1>{item.title}</h1>
                    <div style={{display: "flex"}}>
                      <ul>
                        {item.skills.map((skill) => {
                          return (
                            <li>{skill}</li>
                          )
                        })}
                      </ul>
                      <p style={{paddingRight: "25px", paddingLeft: "25px"}}>{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
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
  )
}

export default Projects;
