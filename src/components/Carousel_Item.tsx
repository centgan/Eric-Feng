import React, {FC} from "react";

interface carousel_inter {
  item:  {title: string, image:string, description: string, skills?: string[], index: number};
  width: string
}

export const Carousel_Item:FC<carousel_inter> = ({item, width}) => {
  let classN:string;
  let classI: string;
  let classP = "";
  let classD = "";
  if (item.index === 0) {
    classN = "carousel-item first";
    classI = "imageW";
    classD = "hide";
  } else if (item.index === 3) {
    classI = "imageW";
    classN = "carousel-item";
    classD = "hide";
  } else if (item.index === 1){
    classI = "imageHV";
    classN = "carousel-item";
    classP = "hide";
  } else {
    classI = "imageH";
    classN = "carousel-item";
    classP = "hide";
  }

  return (
    <div className={classN}>
      <h1>{item.title}</h1>
      <div style={{display: "flex"}}>
        <div style={{marginRight: "25px", marginLeft: "50px"}}>
          <h3>Skills used: </h3>
          <ul>
            {item.skills?.map((skill) => {
              return (
                <li>{skill}</li>
              )
            })}
          </ul>
        </div>
        <img className={classI} src={item.image} alt="" />
        <div id="flexD" className={classD}>
          <p style={{marginTop: "25px", marginLeft: "50px", marginRight: "50px"}}>{item.description}</p>
        </div>
      </div>
      <div id="flexP" className={classP}>
        <p style={{marginTop: "25px", marginLeft: "50px", marginRight: "50px"}}>{item.description}</p>
      </div>
      {/*<div className="carousel-text">*/}
      {/*  {item.description}*/}
      {/*</div>*/}
    </div>
  )
}
