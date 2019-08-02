
import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import Axios from 'axios'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import spin from './index.module.css'
const api = 'https://yobetback.herokuapp.com/api/'


function  App  ()  {

    const [val, setVal] = useState('')
    const [data, setData] = useState([])
    const [main, setMain] = useState([])
    const onchange = (value) => {
  
    }
  
    const submit = () => {
  
    }
  
  
    const handleChange=(e)=>{ 
         
        const value = e.target.value
        setVal(value)
        const newArray = []
        for (let i = 0; i < main.length; i++) {
         
          const name = main[i].name.toLowerCase()
          
          if (name.includes(value.toLowerCase())) {
            newArray.push(main[i])
          }
          
        }
  
        
  
        setData(newArray)
    }
  
    useEffect(() => {
      const fetchData = async () => {
       
      const query = {
        url:`${api}/all`,
        type:'get'
      }
      let result  = await Axios(query)
  
      if (result.data.status) {
        setMain(result.data.response)
        setData(result.data.response)
        }
  
        else{
          setData([])
        }
      };
  
      fetchData();
    }, []);
  
     
    return (
      <div className="">
        <div className={spin.spinner}>
       {  main.length==0 && <Loader  
         type="Puff"
         color="#fff"
         height="100"
         width="100"
      />   }
        </div>
        <div >
          <div className='search'>
            <Form.Group md="4" controlId="validationFormikUsername">
              <Form.Label>search for country</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">🔍</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Country"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={val}
                  onChange={e=>{
                    handleChange(e)
                  }}
                // isInvalid={!!errors.username}
                />
                {/* <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback> */}
              </InputGroup>
            </Form.Group>
          </div>
  
          <div className='customlist'>
            <ListGroup defaultActiveKey="#link1">
              {/* <ListGroup.Item action href="#link1">
                Link 1
            </ListGroup.Item> */}
  
              {data.map((country) => {
                return (
                  <div key={country.name}>
                    <ListGroup.Item action  >
                      {country.name}
                    </ListGroup.Item>
                  </div>
                )
              })}
            </ListGroup>,
          </div>
        </div>
  
      </div>
    );
  }
  
  export default App;
  