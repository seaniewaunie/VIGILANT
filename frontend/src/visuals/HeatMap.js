import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { MapLayer } from 'react-leaflet';
import '../css/leaflet.css'

class HeatMapFS extends Component {
	
	constructor() {
    super();
    this.state = {
		/*default coordinates for baltimore MD */
        lat: 39.29,
		lng: -76.61,
		zoom: 13,
    };
	}
	 
	componentDidMount() {
		//to track and log the map’s zoom level
		const leafletMap = this.leafletMap.leafletElement;
		leafletMap.on('zoomend', () => {
			window.console.log('Current zoom level -> ', leafletMap.getZoom());
		});
	}
	
	handleZoomLevelChange(newZoomLevel) {
        this.setState({ currentZoomLevel: newZoomLevel });
    }

  render() {
	  
    const position = [this.state.lat, this.state.lng]
    return (
   
		<div className="HeatMapFS">
		  <Map ref={m => { this.leafletMap = m; }}
			center={position} 
			zoom={this.state.zoom}>
			
			/* Displays more cluttered version of map. retaining in case we surpass alloted usage of mapbox
			<TileLayer
			  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>*/
			
			<TileLayer
				url ='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
				attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
				id = 'mapbox.streets'
				accessToken ='pk.eyJ1Ijoic2FyYWhoZWluZXIiLCJhIjoiY2pnNDNyZnZtMmY1ZjMwbGxsaHg3d2p0OCJ9.nJxzpxViCZYD-wnsXV6tHw'
			/>
			
			<Marker position={position}>
			  <Popup>
				<span>
				  Example popup <br /> Displaying capability.
				</span>
			  </Popup>
			</Marker>
		  </Map>
	  </div>
    )
  }
}
export default HeatMapFS