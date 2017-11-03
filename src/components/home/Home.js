import React from 'react';
import CarouselHome from './CarouselHome';

class Home extends React.Component {
  state = {
    conversations: []
  }

  render() {
    return (
      <div className="container-fluid">
        <CarouselHome />
        <div className="container">
          <h1 className="text-center brand home-padding">Browse All of Our Categories</h1>
          <div className="row home-padding">
            <div className="overlay col-lg-4 col-md-6 col-sm-12 overlay-wrapper" id="1">
              <img className="imageHolder" src="./assets/bike.jpg"/>
              <div className="middle">
                <p className="home-text home-overlay">Bikes</p>
              </div>
            </div>
            <div className="overlay col-lg-4 col-md-6 col-sm-12 overlay-wrapper" id="2">
              <img className="imageHolder" src="./assets/fashion.jpg"/>
              <div className="middle">
                <p className="home-text home-overlay">Fashion</p>
              </div>
            </div>
            <div className="overlay col-lg-4 col-md-6 col-sm-12 overlay-wrapper" id="3">
              <img className="imageHolder" src="./assets/pets3.jpg"/>
              <div className="middle">
                <p className="home-text home-overlay">Pets</p>
              </div>
            </div>
          </div>
          <div className="row home-padding">
            <div className="overlay col-lg-4 col-md-6 col-sm-12 overlay-wrapper" id="4">
              <img className="imageHolder" src="./assets/home1.jpg"/>
              <div className="middle">
                <p className="home-text home-overlay">Home</p>
              </div>
            </div>
            <div className="overlay col-lg-4 col-md-6 col-sm-12 overlay-wrapper" id="5">
              <img className="imageHolder" src="./assets/technology.png"/>
              <div className="middle">
                <p className="home-text home-overlay">Technology</p>
              </div>
            </div>

            <div className="overlay col-lg-4 col-md-6 col-sm-12 overlay-wrapper" id="6">
              <img className="imageHolder" src="./assets/toys1.jpg"/>
              <div className="middle">
                <p className="home-text home-overlay">Toys</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
