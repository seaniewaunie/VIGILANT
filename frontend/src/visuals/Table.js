// Full Screen impl.
import React, { Component } from 'react';
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
            width: 84
        }, {
            accessor: 'time',
            Header: 'Time',
        }, {
            accessor: 'code',
            Header: 'Code',
            width: 62
        }, {
            accessor: 'description',
            Header: 'Description',
            width: 180
        }, {
            accessor: 'weapon',
            Header: 'Weapon'
        }, {
            accessor: 'district',
            Header: 'District',
            width: 118
        }, {
            accessor: 'inside_outside',
            Header: 'I/O',
            width: 55
        }, {
            accessor: 'address',
            Header: 'Address',
            width: 184
        }, {
            accessor: 'neighborhood',
            Header: 'Neighborhood',
            width: 220
        }, {
            accessor: 'premise',
            Header: 'Premise'
        }, {
            accessor: 'latitude',
            Header: 'Latitude'
        }, {
            accessor: 'longitude',
            Header: 'Longitude'
        },
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
