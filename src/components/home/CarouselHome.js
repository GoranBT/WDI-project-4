import React from 'react';
import { Carousel } from 'react-responsive-carousel';

class CarouselHome extends React.Component {
  render() {
    return (
      <Carousel className="carousel" showArrows={true} showThumbs={false} useKeyboardArrows={true}
        showStatus={false} showIndicators={false}
        stopOnHover={true}>
        <div>
          <img src='./assets/carousel2.png' />
          {/* <p className="legend"></p> */}
        </div>
        <div>
          <img src='./assets/carousel1.png' />
          {/* <p className="legend"></p> */}
        </div>
        <div>
          <img src='./assets/carousel.jpg' />
          {/* <p className="legend"></p> */}
        </div>
        <div>
          <img src='./assets/glasses.jpg' />
          {/* <p className="legend"></p> */}
        </div>
      </Carousel>
    );
  }
}

export default CarouselHome;
