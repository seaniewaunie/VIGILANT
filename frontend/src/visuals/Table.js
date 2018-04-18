// Full Screen impl.
import React, { Component } from 'react';
import jsonData from '../json/big.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TableFS extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    //this.getData = this.getData.bind(this);
  }

  render() {
    const columns = [
        {
            accessor: 'date',
            Header: 'Date',
            width: 103
        }, {
            accessor: 'time',
            Header: 'Time',
        }, {
            accessor: 'code',
            Header: 'Crime Code',
            width: 90
        }, {
            accessor: 'description',
            Header: 'Description',
            width: 300
        }, {
            accessor: 'weapon',
            Header: 'Weapon'
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
            accessor: 'address',
            Header: 'Address'
        }, {
            accessor: 'neightborhood',
            Header: 'Neighborhood'
        }, {
            accessor: 'premise',
            Header: 'Premise'
        },
    ];

    var excludeColumns = [
        'total_incidents',
        'post'
    ];

    return (
        <div className="TableFS">
           <ReactTable
                defaultPageSize={20}
                className="-highlight"
                data= {this.props.data}
                columns={columns}
                defaultSorted={[
                    {
                        id: "date",
                        desc: true
                    }
                ]}
            />
        </div>
    );
  }
}



export default TableFS;
