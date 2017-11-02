import React from 'react';
// import Axios from 'axios';
// import Auth from '../../lib/Auth';
import CarouselHome from './CarouselHome';

class Home extends React.Component {
  state = {
    conversations: []
  }

  render() {
    return (
      <div className="container-fluid">
        <CarouselHome />
      </div>
    );
  }
}
export default Home;
