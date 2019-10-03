import React from 'react';
import './App.css';
import axios from 'axios';
let styles = {
  listStyle: 'none'
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      Latitude: '',
      Longitude: '',
      map: '',
      readyToRender: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let userData = this.state
    axios.post('http://www.mapquestapi.com/geocoding/v1/address?key=7lOkL4uZoyNEeYOhPhl03PNPrhM5O714',
      { location: userData.address })
      .then((response) => {
        console.log(response)
        let readyToDisplayLat = response.data.results[0].locations[0].latLng.lat;
        let readyToDisplayLng = response.data.results[0].locations[0].latLng.lng;
        let mapDisplay = response.data.results[0].locations[0].mapUrl
        this.setState({
          Latitude: readyToDisplayLat,
          Longitude: readyToDisplayLng,
          map: mapDisplay,
          readyToRender: true
        })
      });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name={"address"}
            value={this.state.address}
            placeholder={"Enter address"}
            onChange={this.onChange}
          />{" "}
          <input type="submit" value="Submit" />
        </form>
        {this.state.readyToRender &&
          <ul style={styles}>
            <li>{this.state.Latitude}</li>
            <li>{this.state.Longitude}</li>
            <img src={this.state.map} alt="mapquest" />
          </ul>}
      </div>
    );
  }
}

