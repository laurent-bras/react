// https://www.geeksforgeeks.org/reactjs-setstate/

import React, { Component } from 'react'
import countries from '../assets/countries.json'
    
class Req extends Component { 
    constructor (props) {
        super(props)
        
        // Set initial state 
        this.state = {
            message: 0,
            countries: countries,
            details: {
                "name": "name",
                "code": "code",
                "capital": "capital",
                "region": "region",
                "currency": {
                    "code": "ALL",
                    "name": "Albanian lek",
                    "symbol": "L"
                },
                "language": {
                    "code": "sq",
                    "name": "Albanian"
                },
                "flag": ""
            },
        }
        
        // Binding this keyword 
        this.updateState = this.updateState.bind(this) 
        this.showDetails = this.showDetails.bind(this) 
    } 
    
    componentDidMount() {
        // setInterval(() => {
            // Changing state 
            this.setState((prevState) => {
                const value = this.getValue();
                return { message: prevState.message + value}
            })  
        // }, 2000);
    }

    getValue() {
        return parseInt(this.props.counter)
    }

    updateState(){ 
        // Changing state 
        this.setState((prevState) => {
            const value = this.getValue() * 2 + 1;
            return { message: prevState.message + value}
        })  
    }
 
    ajax(index) {
        return new Promise((resolve, reject) => {
            const out = countries.list[index];
            setTimeout(() => {
                resolve(out)
            }, 800);
            
        });
    }

    async showDetails(index) {
        const out = await this.ajax(index);
        this.setState(() => {
            return { details: out }
        })
    }
    
    render () {
      return (
        <div>
            <p>{this.state.details.name}</p>
            <img style={{height: 100 + 'px'}} src={this.state.details.flag} alt="logo" />

            <p>{this.state.details.code}</p>
            <p>{this.state.details.capital}</p>
            <p>{this.state.details.region}</p>
            <p>lang: {this.state.details.language.name}</p>


          <p>Message: {this.state.message}</p>
            <ul>
                {this.state.countries.list.map((item, index) => (
                    <li key={index} value={index} onMouseOver={e => this.showDetails(e.target.value)}>{item.name} - C. {item.capital}</li>
                ))}
            </ul>
          <button onClick={this.updateState}>Click me!</button> 
        </div>
      );
    }
}

export default Req;