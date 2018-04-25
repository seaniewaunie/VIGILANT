import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import '../css/leaflet.css'
import HeatmapLayer from 'react-leaflet-heatmap-layer'
//import { MapLayer } from 'react-leaflet';

class HeatMapFS extends Component {
	
	constructor() {
    super();
    this.state = {
		/*default coordinates for baltimore MD */
        lat: 39.29,
		lng: -76.61,
		zoom: 13,
		cfg: null,
		mapHidden: false,
		layerHidden: false,
		radius: 100,
		blur: 15,
		max: 9, 
    };
	}
	 
	componentDidMount() {
		//to track and log the map’s zoom level
		const leafletMap = this.leafletMap.leafletElement;
		leafletMap.on('zoomend', () => {
			window.console.log('Current zoom level -> ', leafletMap.getZoom());
		});
		
		this.setData();
	} 
	
	handleZoomLevelChange(newZoomLevel) {
        this.setState({ currentZoomLevel: newZoomLevel });
    }
	
	
	
	setData(){
		let data = []

		/* sample points to test functionality */
		data.push([39.29, -76.61, 4]);
		data.push([39.28, -76.61, 8]);
		data.push([39.28, -76.60, 2]);
		data.push([39.29, -76.60, 3]);
		data.push([39.285, -76.61, 6]);
		data.push([39.28, -76.61, 8]);
		data.push([39.28, -76.612, 1]);
		data.push([39.281, -76.61, 8]);
		data.push([39.2815, -76.66, 1]);
		data.push([39.25, -76.615, 2]);
		data.push([39.286, -76.62, 3]);

		this.setState({data : data});
	}
	
	
  render() {
	  
	const position = [this.state.lat, this.state.lng]
	
	/*Gradient may need to be customized, to show smaller datasets
	retaining for now
	const gradient = {
      0.1: '#FF69B4', 0.2: '#FF96CA', 0.4: '#FFC3E1',
      0.6: '#FFD2E8', 0.8: '#FFF0F7', '1.0': '#FFFFFF'
    };*/
	
	console.log(this.state.data);
	
    return (
   
		<div className="HeatMapFS">
		  <Map ref={m => { this.leafletMap = m; }}
			center={position} 
			zoom={this.state.zoom}>
	
			<HeatmapLayer
				//this option allows the map to zoom to center the focal points of the heatmap 
				fitBoundsOnLoad
				fitBoundsOnUpdate
				points= {this.state.data}
				longitudeExtractor={m => m[1]}
				latitudeExtractor={m => m[0]}
				intensityExtractor={m => m[2]}
				//gradient = {gradient} 
				radius = {Number(this.state.radius)}
				blur = {Number(this.state.blur)}
				max = {Number.parseFloat(this.state.max)}
			/>
			
			{/* Displays more cluttered version of map. retaining in case we surpass alloted usage of mapbox
			<TileLayer
			  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>*/}
			
			<TileLayer
				url ='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
				attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
				id = 'mapbox.streets'
				accessToken ='pk.eyJ1Ijoic2FyYWhoZWluZXIiLCJhIjoiY2pnNDNyZnZtMmY1ZjMwbGxsaHg3d2p0OCJ9.nJxzpxViCZYD-wnsXV6tHw'
			/>
			
			<div>
			  Radius
			  <input
				type="range"
				min={1}
				max={40}
				value={this.state.radius}
				onChange={(e) => this.setState({ radius: e.currentTarget.value })}
			  /> {this.state.radius}
			</div>
			
			<div>
			  Blur
			  <input
				type="range"
				min={1}
				max={20}
				value={this.state.blur}
				onChange={(e) => this.setState({ blur: e.currentTarget.value })}
			  /> {this.state.blur}
			</div>
				
				
			<div>
			  Max
			  <input
				type="range"
				min={0.1}
				max={3}
				step={0.1}
				value={this.state.max}
				onChange={(e) => this.setState({ max: e.currentTarget.value })}
			  /> {this.state.max}
			</div>
			
			
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