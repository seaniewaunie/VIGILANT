// Full Screen impl.
import React, { Component } from 'react';
import jsonData from '../json/big.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TableFS extends Component {

  constructor() {
    super();
    this.state = {
        data : getData()
    };
    //console.log(this.state.data);
  }

  render() {
    const columns = [
        {accessor: 'crimecode', Header: 'Crime Code',},
        {accessor: 'crimedate', Header: 'Date'}, 
        {accessor: 'description', Header: 'Description'},
        {accessor: 'district', Header: 'District'},
        {accessor: 'inside_outside', Header: 'Indoor/Outdoor'},
        {accessor: 'latitude', Header: 'Latitude'},
        {accessor: 'longitude', Header: 'Longitude'},
        {accessor: 'location', Header: 'Address'},
        {accessor: 'neighborhood', Header: 'Neighborhood'},
        {accessor: 'post', Header: 'Post'},
        {accessor: 'premise', Header: 'Premise'},
        {accessor: 'total_incidents', Header: 'Total Incidents'},
    ];

    var excludeColumns = [
        'total_incidents'
    ];
    
    const { data } = this.state;
    return (
        <div className="TableFS">
           <ReactTable 
                data= {data} 
                columns={columns}
                defaultSorted={[
                    {
                        id: "data",
                        desc: false
                    }
                ]}
            
            
            
            /> 
        </div>
    );
  }
}

function getData(){
    return jsonData;
}

export default TableFS;
