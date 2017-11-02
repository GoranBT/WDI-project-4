import React from 'react';
import { Carousel } from 'react-responsive-carousel';

class CarouselHome extends React.Component {
  render() {
    return (
      <Carousel className="carousel" showArrows={true} showThumbs={false} useKeyboardArrows={true}
        showStatus={false} showIndicators={false}
        stopOnHover={true} transitionTime={400} autoPlay={true} infiniteLoop={true}>
        <div>
          <img src='./assets/carosesl7.jpg' />

          <div className="carousel-content">
            <h2>Amazing products</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
          </div>
        </div>
        <div>
          <img src='./assets/carousel8.jpg' />
          <p className="legend">easy way to sell your unused items</p>
        </div>
        <div>
          <img src='./assets/Cover12.jpg' />
          <p className="legend">easy way to sell your unused items</p>
        </div>
      </Carousel>
    );
  }
}

export default CarouselHome;
