import React, { Component } from 'react';


export class LocalFilter extends Component {
    constructor(props){
        super();
        this.state = {
            id: props.id,
            type: props.type,
            region: '',
            timePeriod: '',
        };
    }
    
    render(){
        

        return(
            <div>
                <p>Local Filter settings for a {this.state.type}</p>
            </div>
        );
    }
}

