import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {AutoAffix} from 'react-overlays';
import axios from 'axios';
import './css/App.css';
import HeatMapFS from './visuals/HeatMap.js';
import TimeLine from './Timeline.js';
import Header from './Header';
import TableFS from './visuals/Table.js';
import Filter from './Filters.js';
import { PieChart} from './Visualizations';
import BarChartFS from './visuals/BarChart';
import LineGraphFS from './visuals/LineGraph';
import PieChartFS from './visuals/PieChart';
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;

var VIS_PER_ROW = 3;
var VIS_SIZE = 6;
var TABLE_SIZE = 12;

class App extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
            visuals: [],
			visual_info: [],
            hiddenVisuals: [],
            sidebarOpen: false,
            hideMode: false,
            revealMode: false,
            filterType: 'global',
            filterCodes: this.getFilterCodes(),
            GF_settings: {
              times: 'Past Month',
              days: '',
              codes: 'AUTO THEFT,BURGLARY,LARCENY,LARCENY FROM AUTO,ROBBERY - CARJACKING,ROBBERY - COMMERCIAL,ROBBERY - RESIDENCE,ROBBERY - STREET',
              regions: '',
			  descriptions: 'AUTO THEFT,BURGLARY,LARCENY,LARCENY FROM AUTO,ROBBERY - CARJACKING,ROBBERY - COMMERCIAL,ROBBERY - RESIDENCE,ROBBERY - STREET',
              weapons: 'All',
              io: 'Both',
            },
            requestURL: {
              timeframe: 'start_date=2018-03-18&end_date=2018-04-18&start_time=&end_time=',
              days: '&days=[]',
              codes: '&descriptions=[]',
              regions: '&districts=[]',
              weapons: '&weapons=[]',
              geography: '&start_lat=&end_lat=&start_long=&end_long=',
              io: '&i_o=[]',
            },

            visualsData: [],
            crimesInfo: {
              days: [],
              dates : [],
              times: [],
              codes: [],
              descriptions: [],
              weapons: [],
              districts: [],
              doors: [],
              lats: [],
              lons: [],
              addresses: [],
              neighborhoods: [],
              premises: [],
            },
        };

	    this.defaultVisuals = this.defaultVisuals.bind(this);
        this.addOne = this.addOne.bind(this);
        this.getFilterCodes = this.getFilterCodes.bind(this);
        this.hideOne = this.hideOne.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
        this.renderUserVisuals = this.renderUserVisuals.bind(this);
        this.toggleGlobalFilter = this.toggleGlobalFilter.bind(this);
        this.updateGlobalFilterRequest = this.updateGlobalFilterRequest.bind(this);
		this.loadVisuals = this.loadVisuals.bind(this);
    }

    componentWillMount() {
      this.setState({
        contentStyle : {
          width: '100%',
          //height: '93%',
          //overflowY: 'scroll',
        },
        sidebarOpen: false,
      })
    }

    // on page load, default data must be set
    componentDidMount() {
	  var today = new Date();
	  var day = today.getDate();
	  if (day < 10) {
		  day = ('0' + day);
	  }
	  var month = today.getMonth();
	  if (month < 10) {
		  month = ('0' + month);
	  }
	  var year = today.getFullYear();
	  var one_month_ago = (year + '-' + month + '-' + day);
	  this.loadVisuals();
      this.getFilterCodes();
	  this.updateGlobalFilterRequest('start_date=' + one_month_ago + '&end_date=&start_time=&end_time=', 'Time Frame', 'Past Month');
	  this.updateGlobalFilterRequest('&descriptions=' + this.state.GF_settings.descriptions, 'Descriptions', this.state.GF_settings.descriptions);
      //this.makeRequest();
    }

	async defaultVisuals() {
		this.state.visual_info.push({type: 'bar', name: 'Distribution of Crimes by Day of Week', key: 1, id: 1, field: 'days'});
		this.state.visual_info.push({type: 'line', name: 'Trend of Crimes Over Times of Day', key: 2, id: 2, field: 'times'});
		this.state.visual_info.push({type: 'bar', name: 'Weapon Distribution', key: 3, id: 3, field: 'weapons'});
		this.state.visual_info.push({type: 'line', name: 'Trend of Crimes Over Dates', key: 4, id: 4, field: 'dates'});
		this.state.visual_info.push({type: 'bar', name: 'Distribution of Crimes by Description', key: 5, id: 5, field: 'descriptions'});
		this.state.visual_info.push({type: 'bar', name: 'Distribution of Crimes by District', key: 6, id: 6, field: 'districts'});
	}

	async loadVisuals() {
		var req = ('http://127.0.0.1:8000/api/getvisuals/');
		var result = await axios.get(req);
		var returned_vis = result.data.data;
		for (var i = 0; i < returned_vis.length; i++) {
			if (returned_vis[i].name === "") {
				returned_vis[i].name = returned_vis[i].field;
			}
			this.state.visual_info.push({type: returned_vis[i].type, name: returned_vis[i].name, key: returned_vis[i].id, id: returned_vis[i].id, field: returned_vis[i].field});
		}


	}


    addOne(vis, info){
        var newVisual = vis;
        if(info.name === ''){
          info.name = info.field
        }
        this.state.visual_info.push(info);
        this.state.visuals.push(newVisual);
        this.setState({
            counter: this.state.visuals.length,
        })
        this.renderUserVisuals();
		this.render();
    }

    hideOne(info){
		if(info.name === ''){
          info.name = info.field
        }
		var new_visuals = [];
		var new_visuals_info = [];
		for (var index = 0; index < this.state.visual_info.length; index++) {
			if (this.state.visual_info[index].id != info.id) {
				new_visuals.push(this.state.visuals[index]);
				new_visuals_info.push(this.state.visual_info[index]);
			}
		}
		this.setState({visuals: new_visuals});
		this.setState({visual_info: new_visuals_info});
        this.setState({
            counter:this.state.counter - 1
        })
		this.render();
    }

    toggleGlobalFilter(open) {
        this.setState({
          sidebarOpen: !this.state.sidebarOpen,
          filterType: 'global',
          contentStyle: {
            width: this.state.sidebarOpen ? '100%':'80%',
            //height: '93%',
            //overflowY: 'scroll',
          }
        }, () => {
          this.renderUserVisuals();
        });
    }

    makeRequest(){ //start_date=&end_date=&start_time=&end_time=&days=[]&codes=[]&districts=[]&weapons=[]&start_lat=&end_lat=&start_long=&end_long=&i_o=
      var req = ('http://127.0.0.1:8000/api/'+
        this.state.requestURL.timeframe+
        this.state.requestURL.days+
        this.state.requestURL.codes+
        this.state.requestURL.regions+
        this.state.requestURL.weapons+
        this.state.requestURL.geography+
        this.state.requestURL.io
      )
      axios.get(req, {responseType: 'json'})
      .then(res => {
        const visualsData = res.data.data;
        this.setState(
          {
            visualsData,
            crimesInfo: {
              days: visualsData.map(days => days.day),
              dates: visualsData.map(dates => dates.date),
              times: visualsData.map(times => times.time),
              codes: visualsData.map(codes => codes.code),
              descriptions: visualsData.map(descriptions => descriptions.description),
              weapons: visualsData.map(weapons => weapons.weapon),
              districts: visualsData.map(districts => districts.district),
              doors: visualsData.map(doors => doors.inside_outside),
              lats: visualsData.map(lats => lats.latitude),
              lons: visualsData.map(lons => lons.longitude),
              addresses: visualsData.map(addresses => addresses.address),
              neighborhoods: visualsData.map(neighborhoods => neighborhoods.neighborhood),
              premises: visualsData.map(premises => premises.premise),
            },
          },
          () => {
    		  this.setState({visuals: []});
          this.renderUserVisuals();
        });
      });
    }

    renderUserVisuals() {
      var visuals_to_add = [];
      for (var i = 0; i < this.state.visual_info.length; i++) {
        if (this.state.visual_info[i].type === "bar") {
          visuals_to_add.push(<BarChartFS name={this.state.visual_info[i].name} key={this.state.visual_info[i].key} id={this.state.visual_info[i].id} data={this.state.crimesInfo[this.state.visual_info[i].field]} field={this.state.visual_info[i].field} restore={false} hideOne={this.hideOne}/>);
        }

        else if (this.state.visual_info[i].type === "line") {
          visuals_to_add.push(<LineGraphFS name={this.state.visual_info[i].name} key={this.state.visual_info[i].key} id={this.state.visual_info[i].id} data={this.state.crimesInfo[this.state.visual_info[i].field]} field={this.state.visual_info[i].field} restore={false} hideOne={this.hideOne}/>);
        }

        else if (this.state.visual_info[i].type === "pie") {
          visuals_to_add.push(<PieChartFS name={this.state.visual_info[i].name} key={this.state.visual_info[i].key} id={this.state.visual_info[i].id} data={this.state.crimesInfo[this.state.visual_info[i].field]} field={this.state.visual_info[i].field} restore={false} hideOne={this.hideOne}/>);
        }
      }
      this.setState({visuals: visuals_to_add});
    }

    getFilterCodes() {
      axios.get(`http://127.0.0.1:8000/api/codelookup/`)
        .then(res => {
          const filterCodes = res.data.data;
          this.setState(
            {
              filterCodes,
            });
        });
    }

    updateGlobalFilterRequest(uriString, selection, value){
      let newRequest = this.state.requestURL;
      let newSettings = this.state.GF_settings;
      switch(selection){
        case 'Time Frame':
          newRequest.timeframe = uriString;
          newSettings.times = value;
          this.setState({requestURL: newRequest, GF_settings: newSettings}, ()=>{
            this.makeRequest();
          });
          break;
        case 'Districts':
          newRequest.regions = uriString;
          newSettings.regions = value;
          this.setState({requestURL: newRequest, GF_settings: newSettings} , ()=>{
            this.makeRequest();
          });
          break;
        case 'Days':
          newRequest.days = uriString;
          newSettings.days = value;
          this.setState({requestURL: newRequest, GF_settings: newSettings} , ()=>{
            this.makeRequest();
          });
          break;
        case 'Weapons':
          newRequest.weapons = uriString;
          newSettings.weapons = value;
          this.setState({requestURL: newRequest, GF_settings: newSettings} , ()=>{
            this.makeRequest();
          });
          break;
        case 'Indoor/Outdoor':
          newRequest.io = uriString;
          newSettings.io = value;
          this.setState({requestURL: newRequest, GF_settings: newSettings} , ()=>{
            this.makeRequest();
          });
          break;
        case 'Descriptions':
          newRequest.codes = uriString;
          newSettings.codes = value;
          this.setState({requestURL: newRequest, GF_settings: newSettings} , ()=>{
            this.makeRequest();
          });
          break;
        default:
          console.log('App doesnt know how to handle ' + selection);
      }
      /*
      axios.get(`http://127.0.0.1:8000/api/gfilter/?{uriString}`)
        .then(res => {
          const posts = res.data.data.children.map(obj => obj.data);
          this.setState({ posts });
        });
      */
    }
	

    render() {
        this.state.counter = this.state.visuals.length;
        var filter = [];
        if(this.state.sidebarOpen){
          filter.push(
            <div className='sidebar'>
              <Filter
                  id="rightSide"
                  filterCodes = {this.state.filterCodes}
                  scope = {this.state.filterType}
                  key = {499}
                  updateRequest = {this.updateGlobalFilterRequest}
                  settings = {this.state.GF_settings}
                  show={!this.state.sidebarOpen}
              />
            </div>
          );
        }

        return (
            <div className="App">

                <div className="header">
                  <Header
                      data ={this.state.crimesInfo}
                      addOne={this.addOne}
                      hideOne={this.hideOne}
                      counter={this.state.counter}
                      toggleGlobalFilter={this.toggleGlobalFilter}
                  />
                </div>

                <div className='content'>
                  <div className='content-visuals' style={this.state.contentStyle}>
                    <a name="Top"></a>
                    <TimeLine key={500} data={this.state.crimesInfo.dates} width={this.state.contentStyle.width}/>
                    <HeatMapFS
                        data ={this.state.crimesInfo}
                    />
                    <a name="Visuals"></a>
					<Grid fluid id="grid">
                        <FormatGrid
                            counter={this.state.visuals.length}
                            visuals={this.state.visuals}
                        />
                    </Grid> 
                    <div id='table-reference'>
                      <a name="Table"></a>
                      <TableFS
                        data = {this.state.visualsData}
                      />
                    </div>
                  </div>
                  {filter}
                </div>

            </div>
        );
    }
}

function FormatGrid(props) {
    // format the grid
    var grid = [];
    var rowNum=0;
    var rows = Math.ceil(props.visuals.length/VIS_PER_ROW);
    for(var i=0; i < rows; i++){
        // add each row to an html object to return
        grid.push(
            <Row key={100+i} >
                <FormatRow
                    key={200+i}
                    currentRow={rowNum}
                    visuals={props.visuals}
                />
            </Row>
        );
        rowNum++;
    }
    return grid;
}

function FormatRow(props){
   var row = [];
    var rowNum = props.currentRow;
    for(var j=rowNum*VIS_PER_ROW; j < (rowNum+1)*VIS_PER_ROW; j++){
        row.push(
            props.visuals[j]
        );
    }
    return row;
}

export default App;
