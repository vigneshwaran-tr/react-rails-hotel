import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Enquiry extends Component {

    
    constructor(props) {
        super(props);
    
        this.state = {
         search:[],isDisabled:true,
         custnameError:false,
         roomreq:1
        }
        this.submitdata = this.submitdata.bind(this);
    }

    async componentDidMount() {
        const hotelid=this.props.match.params.hotelid
        this.setState({hotelid: hotelid},this.fetchdata);
        
      }

    handleChange=(e)=>{
        
        if(e.target.name==='custname'){
            
            if(e.target.value==='' || e.target.value===null ){
              
              this.setState({
                custnameError:true,
                custnamelenError:false,
                noverall:false
              })
            
           } else {
            if(e.target.value.length>3){
              this.setState({
                custnameError:false,
                custnamelenError:false,     
                custname:e.target.value,
                noverall:true
              })
            }
            else{
              this.setState({
                custnameError:false,
                custnamelenError:true  ,
                noverall:false
              })
            }
          }
          }

          if(e.target.name==='custemail'){
            if(e.target.value==='' || e.target.value===null ){
              
              this.setState({
                custemailError:true,
                custemailvalError:false,
                eoverall:false
              })
            
           } else {
            const pattern=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
             const result=pattern.test(e.target.value);
            if(result===true){
                this.setState({
                    custemailvalError:false,
                    custemailError:false,
                    custemail:e.target.value,
                    eoverall:true
                  })
                }
                else{
                  this.setState({
                    custemailError:false,
                    custemailvalError:true,
                    poverall:false
                  })
                }
          }
          }

          if(e.target.name==='custcountry'){
              
            if(e.target.value==='' || e.target.value===null ){
              
              this.setState({
                custcountryError:true,
                custcountrylenError:false,
                coverall:false
              })
            
           } else {
            if(e.target.value.length>2){
              this.setState({
                custcountryError:false,
                custcountrylenError:false,     
                custcountry:e.target.value,
                coverall:true
              })
            }
            else{
              this.setState({
                custcountryError:false,
                custcountrylenError:true  ,
                coverall:false
              })
            }
          }
          }

          if(e.target.name==='custphone'){
            if(e.target.value==='' || e.target.value===null ){
              
              this.setState({
                custphoneError:true,
                custphonevalError:false,
                poverall:false
              })
            
           } else {
            const pattern=/^[0-9]*$/;
             const result=pattern.test(e.target.value);
            if(result===true){
                this.setState({
                    custphonevalError:false,
                    custphoneError:false,
                    custphone:e.target.value,
                    poverall:true
                  })
                }
                else{
                  this.setState({
                    custphoneError:false,
                    custphonevalError:true,
                    poverall:false
                  })
                }
          }
          }

          if(this.state.noverall === true && this.state.coverall === true && this.state.eoverall === true && this.state.poverall === true ){
            this.setState({isDisabled:false})
          }
          else {
            this.setState({isDisabled:true})
          }
        
          
          if(e.target.name === "custphone"){
            this.setState({custphone:e.target.value});
          }
          if(e.target.name === "roomreq"){
            this.setState({roomreq:e.target.value});
          }
        
    }

      fetchdata(){
          axios.get(`http://localhost:3000/enquiry?hotelid=${this.state.hotelid}`)
        .then(response => {
          console.log(response)
          this.setState({search: response.data.results[0]})
        })
        .catch(error => console.log(error))
      }

      submitdata(){
       
        // console.log(`http://localhost:3000/add?hotelid=${this.state.search.hotelid}&hotelname=${this.state.search.hotelname}&custname=${this.state.custname}&custemail=${this.state.custemail}&custcountry=${this.state.custcountry}&&custphone=${this.state.custphone}&&roomreq=${this.state.roomreq}`)
        axios.get(`http://localhost:3000/enquiryadd?hotelid=${this.state.search.hotelid}&hotelname=${this.state.search.hotelname}&custname=${this.state.custname}&custemail=${this.state.custemail}&custcountry=${this.state.custcountry}&&custphone=${this.state.custphone}&&roomreq=${this.state.roomreq}`)
      .then(response => {
        console.log(response.data)
        if(response.data.status === 200){
            alert("Enquiry has been registered.You will be contacted soon by our representative !!!");
        }
      })
      .catch(error => console.log(error))
    }

    render(){
    return (
        <div>
            
            <h2>Enquiry</h2>
                <input value={this.state.search.hotelname} name="hotelname" disabled />
                <input placeholder ="Enter your Name" onChange={this.handleChange} name="custname"/>
                {this.state.custnameError ? <span style={{color: "red",marginLeft:"15px"}}>Please Enter some text</span> : ''}
                {"   "}{this.state.custnamelenError ? <span style={{color: "red",marginLeft:"15px"}}>Please Enter more than 3 characters</span> : ''}
                
                <input placeholder ="Enter your Email" onChange={this.handleChange}  name="custemail" />
                {this.state.custemailError ? <span style={{color: "red",marginLeft:"15px"}}>Please Enter your email</span> : ''}
                {"   "}{this.state.custemailvalError ? <span style={{color: "red",marginLeft:"15px"}}>Please Enter valid email</span> : ''}


                <input placeholder ="Enter your Country" onChange={this.handleChange}  name="custcountry"/>
                {this.state.custcountryError ? <span style={{color: "red",marginLeft:"15px"}}>Please Enter your country</span> : ''}
                {"   "}{this.state.custcountrylenError ? <span style={{color: "red",marginLeft:"15px"}}>Please Enter more than 2 characters</span> : ''}

                <input type="number" placeholder ="Enter your Phone Number" onChange={this.handleChange}  name="custphone"/>
                {this.state.custphoneError ? <span style={{color: "red",marginLeft:"15px"}}>Please Enter your Phone Number</span> : ''}
                {"   "}{this.state.custphonevalError ? <span style={{color: "red",marginLeft:"15px"}}>Please Enter valid Number</span> : ''}
        
                <select style={{marginLeft:"10px"}} value={this.state.roomreq} className="form-control" id="sel1" onChange={event => this.setState({roomreq : event.target.value })}>
             
              <option value="1" selected>1</option>
              <option value="2" >2</option>
              <option value="3" >3</option>
              <option value="4" >4</option>
              <option value="5" >5</option>
              </select>
                
                
                
                <input className="btn btn-success" disabled={this.state.isDisabled} type ="submit" onClick={this.submitdata}/>
            
        </div>
    )
}
}


export default Enquiry;