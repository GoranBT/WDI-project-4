/* global google */
import React from 'react';

class GoogleMap extends React.Component {

  componentDidMount() {

    console.log(this.mapCanvas);
    this.map =  new google.maps.Map(this.mapCanvas, {
      center: this.props.center || {lat: 51.51, lng: -0.08},
      zoom: 14

    });

    // circle

    const circleIcon = {
      path: 'M 0, 0 m -10, 0 a 10, 10 0 1, 0 20, 0 a 10, 10 0 1, 0 -20, 0',
      fillColor: '#00ff00',
      fillOpacity: 0.0,
      scale: 10,
      strokeColor: '#00ff00',
      strokeWeight: 2,
      strokeOpacity: 0.8
    };

    this.marker = new google.maps.Marker({
      position: this.props.center || {lat: 51.51, lng: -0.08},
      map: this.map,
      icon: circleIcon
    });
  }
  componentWillUnmount() {
    this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }

  render() {
    return (
      <div className="google-map" ref={element => this.mapCanvas = element}></div>
    );
  }
}

export default GoogleMap;
