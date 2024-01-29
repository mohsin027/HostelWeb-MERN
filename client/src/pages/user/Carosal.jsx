
import React, {useState} from "react"; 
import Carousel from 'react-bootstrap/Carousel';

const data = [
  {
   image: require('../../images/1.jpeg'), 
   caption:"Rudwika PG",
   description:"Second home for you "
  },
  {
    image:require('./../../images/2.jpg'), 
    caption:"Inayat Stay",
    description:"Affordable ldies stay"
   },
   {
    image:require('../../images/3.jpg'), 
    caption:"Hostel World",
    description:"Luxury hostel"
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