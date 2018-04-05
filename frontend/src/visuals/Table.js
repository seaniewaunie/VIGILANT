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
        {
            accessor: 'crimedate', 
            Header: 'Date',
            width: 103
        }, {
            accessor: 'crimetime',
            Header: 'Time', 
        }, {
            accessor: 'crimecode', 
            Header: 'Crime Code',
            width: 90
        }, {
            accessor: 'description', 
            Header: 'Description',
            width: 300
        }, {
            accessor: 'district', 
            Header: 'District'
        }, {
            accessor: 'inside_outside', 
            Header: 'Indoor/Outdoor',
        }, {
            accessor: 'latitude', 
            Header: 'Latitude'
        }, {
            accessor: 'longitude', 
            Header: 'Longitude'
        }, {
            accessor: 'location', 
            Header: 'Address'
        }, {
            accessor: 'neighborhood', 
            Header: 'Neighborhood'
        }, {
            accessor: 'post', 
            Header: 'Post'
        }, {
            accessor: 'premise', 
            Header: 'Premise'
        }, {
            accessor: 'total_incidents', 
            Header: 'Total Incidents',
            width: 50
        },
    ];

    var excludeColumns = [
        'total_incidents'
    ];
    
    const { data } = this.state;
    return (
        <div className="TableFS">
           <ReactTable 
                defaultPageSize={20}
                className="-highlight"
                data= {data} 
                columns={columns}
                defaultSorted={[
                    {
                        id: "crimedate",
                        desc: true
                    }
                ]}
            
            
            
            /> 
        </div>
    );
  }
}

function getData(){
    // this is where the function will be to access the api
    // for data
    // the api will be a link, something like
    // 127.0.0.1:8000/api
    // and will return a json of the data
    return jsonData;
}

export default TableFS;
