
import React from 'react';
import ReactDOM from 'react-dom';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import Button from 'react-bootstrap/Button';
import Style from './index.module.css'
import Axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'

const sports = [];
const api = 'https://yobetback.herokuapp.com/api/country'

const title = {
  'float': 'left',
  'fontSize': 'larger',
  'fontWeight': 'bolder'
}

const count = {
  'textAlign': 'left',
  'paddingLeft': '30px',
  'fontSize': 'large'
}

const button_ = {
  'marginTop':'30px',
  'marginBottom':'30px'
}

export default class AppComponent extends React.Component {
  state = { value: [], countries: [] };

  handleChange = (event) => {
    const values = event.target.value;
    const lastItem = values[values.length - 1];

    if (lastItem) {
      values.pop();
      const sameItem = values.find(value => value === lastItem);
      if (sameItem === undefined) {
        values.push(lastItem);
      }
    }

    this.setState({
      value: values.sort()
    });
  }

  SortByName(data) {

  }


  handleSubmit = async () => {
    const values = JSON.stringify(this.state.value)
    const query = {
      url: `${api}/multi?&&countries=${values}`,
      type: 'get'
    }
    let result = await Axios(query)

    if (result.data.response) {

      this.setState({
        countries: result.data.response
      })
    }

    else {

    }

  }

  render() {
    return (
      <div className='search'>
        
        <MultiSelect
           
          placeholder='Insert country name and press enter'
          onChange={this.handleChange}
          value={this.state.value}
          allowCustom={true}
        />
        <Button  style={
          button_
        } onClick={this.handleSubmit} full> Search </Button>

        {this.state.countries.map((country, index) => {

          const key = Object.keys(country)[0]

 
         if(!country[key].message){
          return (
            <div key={key}>
              <ListGroup.Item action  >
                <p style={title}> {key}</p>
                <div>

                {country[key].map((x) => {
                    return (
                      <ListGroup.Item action key={x.name}>
                       <p style={count}>
                       {x.name}
                       </p>
                      </ListGroup.Item>)
                  })}


                </div>
              </ListGroup.Item>
            </div>
          )
         }

         return (
          <div key={key}>
              <ListGroup.Item action  >
                <p style={title}> {key}</p>
                <div>

                 
                      <ListGroup.Item action  >
                       <p style={count}>
                            {"Country not available"}
                       </p>
                      </ListGroup.Item>)
                 


                </div>
              </ListGroup.Item>
            </div>
         )
        })}
      </div>
    );
  }
}



{/* <div key={this.state.value[index]}>
              <ListGroup.Item action  >
                <p style={title}>
                  {this.state.value[index]}
                </p>
                <div>
                  {country[this.state.value[index]].map((x) => {
                    return (
                      <ListGroup.Item action  >
                       <p style={count}>
                       {x.name}
                       </p>
                      </ListGroup.Item>)
                  })}
                </div>
              </ListGroup.Item>
            </div> */}