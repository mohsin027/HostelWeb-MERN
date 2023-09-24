
import React, {useState} from "react"; 
import Carousel from 'react-bootstrap/Carousel';

const data = [
  {
   image: require('../../images/1.jpeg'), 
   caption:"Hostel 1",
   description:"Description "
  },
  {
    image:require('./../../images/2.jpg'), 
    caption:"Hostel 2",
    description:"Description Here"
   },
   {
    image:require('../../images/3.jpg'), 
    caption:"Hostel 3",
    description:"Description Here"
   } 
]

function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
       {data.map((slide, i) => {
        return (
          <Carousel.Item key={i}>        
        <img
          className="d-block w-100"
          src={slide.image}
          alt="slider image"
          style={{height:"600px"}}
         
        />
        <Carousel.Caption>
          <h3>{slide.caption}</h3>
          <p>{slide.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
        )
      })}
      
    </Carousel>
  );
}
export default HomeCarousel;