import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {DebounceInput} from 'react-debounce-input';
import {NavLink} from 'react-router-dom';






class App extends Component {

  async componentDidMount() {
    
    axios.get('http://localhost:3000/?hotelname=&hotelrating=&hotellocation=')
    .then(response => {
      console.log(response)
      this.setState({search: response.data.results})
    })
    .catch(error => console.log(error))
  }
  

  constructor(props) {
    super(props);

    this.state = {
      search: [],
      tags:[{ id: "Thailand", text: "Thailand" },
      { id: "India", text: "India" }],
      hotelname:'',
     hotelcity:'',
     hotelrating:''};
    this.handleChange = this.handleChange.bind(this);
    }

  fetchdata=()=> {
    const name=this.state.hotelname;
    const city=this.state.hotelcity;
    const rating=this.state.hotelrating;
    axios.get(`http://localhost:3000/?hotelname=${name}&hotelrating=${rating}&hotellocation=${city}`)
    .then(response => {
    console.log("response",response.data.results)
    this.setState({search: response.data.results})
    })
    .catch(error => console.log(error))
    }

    

  handleChange=(e)=>{
      if(e.target.name === "hotel_name"){
        this.setState({hotelname:e.target.value},this.fetchdata);
      }
     
      if(e.target.name === "hotel_city"){
        this.setState({hotelcity:e.target.value},this.fetchdata);
      }
      
    }
    createTable = (star) => {
      let table = [];
  
      // Outer loop to create parent
      for (let i = 0; i < 1; i++) {
        let children = []
        //Inner loop to create children
        for (let j = 0; j < star; j++) {
          children.push(<i class="fas fa-star"></i>)
        }
        //Create the parent and add the children
        table.push(<span>{children}</span>) 
      }
      return table
    }
  
    removeFilter = (e) => {
      console.log(e)
    };
  

  render() {
    

  
    return (
      <div>
        <h1>Search Query</h1> <br/>
        <div className="container">
        
        <label>Search hotel by Name</label><br/>
        <DebounceInput
          minLength={0}
          debounceTimeout={300}
          onChange={this.handleChange}
          value={this.state.hotelname}
          name="hotel_name" />

        <br/>
        <label>Search hotel by rating</label><br/>
        {/* <input type="number" name="hotel_rating"  value={this.state.hotelrating} onChange={this.handleChange} /> */}
        <select value={this.state.hotelrating} style={{marginLeft:`10${'px'}`}} className="form-control" id="sel1" onChange={event => this.setState({hotelrating : event.target.value },this.fetchdata)}>
             <option value="" selected></option>
              <option value="1" >1</option>
              <option value="2" >2</option>
              <option value="3" >3</option>
              <option value="4" >4</option>
              <option value="5" >5</option>
        </select><br/>
        <label>Search hotel by city</label><br/>
        
        <DebounceInput
          minLength={0}
          debounceTimeout={300}
          onChange={this.handleChange}
          value={this.state.hotelcity}
          name="hotel_city" /><br/><br/>
      </div>
      <div style={{marginLeft:`85${'px'}`,marginBottom:`50${'px'}`}}>
      
      {this.state.hotelname ? <span style={{marginLeft:`5${'px'}`}}>{<div class="ui image label">
      {this.state.hotelname}
      <i class="delete icon" name="hotel_name" onClick={()=>{this.setState({hotelname:''},this.fetchdata)}}></i>
      </div> }</span> : ''}

      {this.state.hotelrating ? <span style={{marginLeft:`5${'px'}`}}>{<div class="ui image label">
      {this.createTable(this.state.hotelrating)}
      <i class="delete icon" onClick={()=>{this.setState({hotelrating:''},this.fetchdata)}}></i>
      </div> }</span> : ''}

      {this.state.hotelcity ? <span style={{marginLeft:`5${'px'}`}}>{<div class="ui image label">
      {this.state.hotelcity}
      <i class="delete icon" onClick={()=>{this.setState({hotelcity:''},this.fetchdata)}}></i>
      </div> }</span> : ''}          
      

      </div>
      <div class="row">
      
      {this.state.search.map((prod, i) => (
      <div class ="col-sm">
      <span key={i} className="card" style={{width:`18${'em'}`}}>
      <img className="card-img-top" src={`${prod.thumb}`} alt="Card image cap"/>
      <span className="card-body">
        <h5 className="card-title">{`${prod.hotelname}`}</h5>
        <p className="card-text">{`Price : ${prod.price} `}&#x20b9;<br/>
        {`Locality : ${prod.locality}`}<br/>
          Star :  {this.createTable(`${prod.star}`)}
          </p>
        <NavLink className="btn btn-primary" to={'/enquiry/'+prod.hotelid}>Make an Enquiry</NavLink>
      </span>
      </span>
      </div>
      ))}
      </div>
      </div>
      
    ); 
  }
}

export default App;
