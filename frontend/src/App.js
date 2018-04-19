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
import {LineGraph, PieChart, BarChart} from './Visualizations'

var VIS_PER_ROW = 3;
var VIS_SIZE = 6;
var TABLE_SIZE = 12;

class App extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
            visuals: [],
            hiddenVisuals: [],
            sidebarOpen: false,
            hideMode: false,
            revealMode: false,
            filterType: 'global',
            filterCodes: '',
            GF_settings: {
              times: 'Past Month',
              days: '',
              codes: '',
              regions: '',
              weapons: 'All',
              io: 'Both',
            },
            requestURL: {
              timeframe: 'start_date=2018-03-18&end_date=2018-04-18&start_time=&end_time=',
              days: '&days=[]',
              codes: '&codes=[]',
              regions: '&districts=[]',
              weapons: '&weapons=[]',
              geography: '&start_lat=&end_lat=&start_long=&end_long=',
              io: '&i_o=[]',
            },

            visualsData: [],
            crimesInfo: {
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
            }

        };

        this.addOne = this.addOne.bind(this);
        this.hideOne = this.hideOne.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
        this.toggleGlobalFilter = this.toggleGlobalFilter.bind(this);
        this.updateGlobalFilterRequest = this.updateGlobalFilterRequest.bind(this);
    }

    componentWillMount() {
    }

    // on page load, default data must be set
    componentDidMount() {
      axios.get(`http://127.0.0.1:8000/api/codelookup/`)
        .then(
          res => {
          this.setState({filterCodes: res.data.data}, () => {
            console.log("got filter codes");
          });
        });

      this.makeRequest();

      this.setState({
        visuals: [
          <LineGraph data={this.state.crimesInfo.dates} id={0} name={'Trend of Crime'} key={0} />,
          <PieChart data={this.state.crimesInfo.weapons} id={1} name={'Weapon Distribution'} key={1} />,
          <BarChart data={this.state.crimesInfo.doors} id={2} name={'Indoor/Outdoor Distribution'} key={2} />,
        ],
      })
    }

    addOne(vis){
        var newVisual = vis;
        this.state.visuals.push(newVisual)
        this.setState({
            counter: this.state.visuals.length,
        })
    }

    hideOne(vis){
        var hideVisual = 3;
        this.state.hiddenVisuals.push(
            this.state.visuals.splice(hideVisual, 1)
        );
        this.setState({
            counter:this.state.counter - 1
        })
    }

    toggleGlobalFilter(open) {
        this.setState({sidebarOpen: !this.state.sidebarOpen, filterType: 'global'});
        if(this.state.sidebarOpen){
          VIS_PER_ROW=3;
          VIS_SIZE=6;
          TABLE_SIZE = 12;
        }
        else{
          VIS_PER_ROW=2;
          VIS_SIZE=5;
          TABLE_SIZE = 9;
        }
        //console.log(VIS_PER_ROW);
    }

    makeRequest(){
      //start_date=&end_date=&start_time=&end_time=&days=[]&codes=[]&districts=[]&weapons=[]&start_lat=&end_lat=&start_long=&end_long=&i_o=
      //console.log(this.state.requestURL);
      var req = ('http://127.0.0.1:8000/api/'+
        this.state.requestURL.timeframe+
        this.state.requestURL.days+
        this.state.requestURL.codes+
        this.state.requestURL.regions+
        this.state.requestURL.weapons+
        this.state.requestURL.geography+
        this.state.requestURL.io
      )
      console.log(req);
      axios.get(req, {responseType: 'json'})
      .then(res => {
        const visualsData = res.data.data;
        this.setState(
          {
            visualsData,
            crimesInfo: {
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
          console.log("response: ", this.state.visualsData)
          //console.log("lat: ", this.state.crimesInfo.lats)
        });
      });
    }

    updateGlobalFilterRequest(uriString, selection, value){
      switch(selection){
        case 'Time Frame':
          var newRequest = this.state.requestURL;
          var newSettings = this.state.GF_settings;
          newRequest.timeframe = uriString;
          newSettings.times = value;
          //console.log(uriString + ' from ' + selection);
          this.setState({requestURL: newRequest, GF_settings: newSettings}, ()=>{
            this.makeRequest();
          });
          break;
        case 'Districts':
          var newRequest = this.state.requestURL;
          var newSettings = this.state.GF_settings;
          newRequest.regions = uriString;
          newSettings.regions = value;
          this.setState({requestURL: newRequest, GF_settings: newSettings} , ()=>{
            this.makeRequest();
          });
          break;
        case 'Days':
          var newRequest = this.state.requestURL;
          var newSettings = this.state.GF_settings;
          newRequest.days = uriString;
          newSettings.days = value;
          this.setState({requestURL: newRequest, GF_settings: newSettings} , ()=>{
            this.makeRequest();
          });
          break;
        case 'Weapons':
          var newRequest = this.state.requestURL;
          var newSettings = this.state.GF_settings;
          newRequest.weapons = uriString;
          newSettings.weapons = value;
          this.setState({requestURL: newRequest, GF_settings: newSettings} , ()=>{
            this.makeRequest();
          });
          break;
        case 'Indoor/Outdoor':
          var newRequest = this.state.requestURL;
          var newSettings = this.state.GF_settings;
          newRequest.io = uriString;
          newSettings.io = value;
          this.setState({requestURL: newRequest, GF_settings: newSettings} , ()=>{
            this.makeRequest();
          });
          break;
        case 'Codes':
          var newRequest = this.state.requestURL;
          var newSettings = this.state.GF_settings;
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
        if(this.state.sidebarOpen === true){
//*
            filter.push(
                <Filter
                    id="rightSide"
                    filterCodes = {this.state.filterCodes}
                    scope = {this.state.filterType}
                    key = '0'
                    updateRequest = {this.updateGlobalFilterRequest}
                    settings = {this.state.GF_settings}
                />
            );
//*/
//        filter.push(<p>woo!</p>);
        }
        return (
            <div className="App">
                <Grid fluid>
                  <a name="home"></a>
                  <Row>
                    <AutoAffix>
                      <div className="header">
                          <Header
                              data ={this.state.crimesInfo}
                              addOne={this.addOne}
                              hideOne={this.hideOne}
                              counter={this.state.counter}
                              toggleGlobalFilter={this.toggleGlobalFilter}
                          />
                          <TimeLine className='timeline' dates={this.state.crimesInfo.dates}/>
                      </div>
                    </AutoAffix>
                  </Row>
                  <Row className="topRow">
                    <Col xs={4} sm={TABLE_SIZE} md={TABLE_SIZE}>
                        <HeatMapFS
                            data ={this.state.visualsData}
                        />
                    </Col>
                    <Col xs={2} sm={2} md={3} className="filterHolder">
                      <div className="filter">
                        {filter}
                      </div>
                    </Col>
                  </Row>
                  <Row className="userVisuals">
                    <div>
                        <Grid fluid id="grid">
                            <FormatGrid
                                counter={this.state.counter}
                                visuals={this.state.visuals}
                            />
                        </Grid>
                    </div>
                  </Row>
                  <Row className="table-reference" >
                    <div><a name="Table"></a></div>
                  </Row>
                  <Row className="table">
                    <Col xs={TABLE_SIZE} sm={TABLE_SIZE} md={TABLE_SIZE}>
                      <TableFS
                        data = {this.state.visualsData}
                      />
                    </Col>
                  </Row>
                </Grid>


            </div>
        );
    }
}

function FormatGrid(props) {
    // format the grid
    var grid = [];
    var rowNum=0;
    var rows = Math.ceil(props.counter/VIS_PER_ROW);
    for(var i=0; i < rows; i++){
        // add each row to an html object to return
        grid.push(
            <Row key={i} >
                <FormatRow
                    key={i}
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
