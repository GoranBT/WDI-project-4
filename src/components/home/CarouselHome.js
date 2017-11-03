import React from 'react';
import { Carousel } from 'react-responsive-carousel';

class CarouselHome extends React.Component {
  render() {
    return (
      <Carousel className="carousel" showArrows={true} showThumbs={false} useKeyboardArrows={true}
        showStatus={false} showIndicators={false}
        stopOnHover={true} transitionTime={550} autoPlay={true}
        infiniteLoop={true} interval={7000}>
        <div>
          <img src='./assets/carosesl7.jpg' />

          <div className="carousel-content sold-product">
            <h1 className="brand white-text">Join eShoper for free <br />
            Register and start selling <br /> your staff Online</h1>
          </div>
        </div>
        <div>
          <img src='./assets/carousel8.jpg' />
          <div className="carousel-content white-text sold-product">
            <h1 className="brand">Shop for anything, <br />
              from creative people everywhere</h1>
          </div>
        </div>
        <div>
          <img src='./assets/Cover12.jpg' />
          <div className="carousel-content sold-product">
            <h1 className="brand white-text">Shop from your eShopper <br />
              From Electronics and Pets <br /> Your pretty party dress is here..</h1>
          </div>
        </div>
      </Carousel>
    );
  }
}

export default CarouselHome;
