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
        <div className="row">
          <h1 className="text-center">Categories</h1>
          <div className="col-md-4" id="1"></div>
          <div className="col-md-4" id="2"></div>
          <div className="col-md-4" id="3"></div>
          <div className="col-md-4" id="4"></div>
          <div className="col-md-4" id="5"></div>
          <div className="col-md-4" id="6"></div>
        </div>
      </div>
    );
  }
}
export default Home;
