import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Result extends Component {

    constructor(props){
        super(props)
    
        this.state = {
            flag:1
        }
      }
  render() {
      let arr = localStorage.getItem('FinalRes');
      let arrnew = JSON.parse(arr);
      
      return (
        <div className="App">
            <div className="Menu-style">
                <button style={{float: "left"}} type="button" className=" btn btn-light" data-toggle="collapse" 
                                data-target={"#copp"}>
                    <div className="menu"></div>
                    <div className="menu"></div>
                    <div className="menu"></div>
                </button> 
                    {' '}{" "}
              <Link>
              <a style={{marginleft: "10%", display:"block"}}>Finding Falcone !! ...</a>
              </Link>
              <Link style={{float: "right"}} >
              <a onClick={this.refresh}>Reset</a>
              </Link>
              <Link to ="/" style={{float: "right"}}>
              <a href="#" >GeekTrust Home</a>
              </Link>

            </div>

            
            <div id="copp" className="collapse topnav">
                <div id="myLinks" >
                    <Link to ="/">
                    <a href="#" >GeekTrust Home</a>
                    </Link>
                    <Link>
                    <a onClick={this.refresh}>Reset</a>
                    </Link>
                </div>
            </div>
            

            <div className="Content" style={{height: "590px"}}>
                <br></br><br></br>
                
                <strong>{arrnew[0]}</strong><br></br><br></br>
        
                <strong>{arrnew[1]}</strong><br></br><br></br>

                <strong>{arrnew[2]}</strong><br></br><br></br>
            </div>

            <div className="Footer">
            <footer>
                <div className="footer-copyright text-center py-3">© 2020 Copyright: Coding Problem / www.geektrust.in/finding-falcone
                    
                </div>
            </footer>
            </div>
        </div>
      );
  }
}

export default Result;