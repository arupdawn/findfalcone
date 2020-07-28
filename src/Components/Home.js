import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {

  constructor(props){
    super(props)

    this.state = {
        arrplanets: [],
        arrplanets2: [],
        arrvehicles: [],
        ddlArr:[],

        ddlArr1: [],
        ddlArr2: [],
        ddlArr3: [],
        ddlArr4: [],

        vehicleArr1: [],
        vehicleArr2: [],
        vehicleArr3: [],
        vehicleArr4: [],

        flag1:0,
        flag2:0,
        flag3:0,
        flag4:0,

        ddlPlanet:'Select',
        ddlPlanet2:'Select',
        selectedPlanetsArr: [],
        Vid: '',
        Sid: "Veh1",
        ddLID:0,
        maxDistance: 50,
        UsedVehicle:[],
        Time: 0,
        Result:1,

        SuccessFailmsg:"",
        Planetmsg:""

    }
  }

  componentDidMount(){
      this.getData();
      //this.getFindFalcone();
  }

  componentDidUpdate(){
    
    if((document.getElementById(this.state.Vid)) !== null){
      console.log("this.state.vid : "+this.state.Vid);
      this.getItDisabled();
      //this.getItDisabled(this.state.Sid);

      this.setState({
        Vid: null,
      });
    }
  }

  async getData(){
    const dataplanets = await fetch(`https://findfalcone.herokuapp.com/planets`);
    const fdataplanets = await dataplanets.json();

    const datavehicle = await fetch(`https://findfalcone.herokuapp.com/vehicles`);
    const fdatavehicle = await datavehicle.json();

     

    this.setState({
        arrplanets: fdataplanets,
        arrplanets2: fdataplanets,

        arrvehicles_main: fdatavehicle,
        arrvehicles: fdatavehicle,

        ddlArr1: fdataplanets,
        ddlArr2: fdataplanets,
        ddlArr3: fdataplanets,
        ddlArr4: fdataplanets,

        vehicleArr1: fdatavehicle,
        vehicleArr2: fdatavehicle,
        vehicleArr3: fdatavehicle,
        vehicleArr4: fdatavehicle,

         
    })
    //console.log("arrplanets is"+this.state.arrplanets[0].id);
    
  }

  async getFindFalcone(){

    const token = await fetch('https://findfalcone.herokuapp.com/token', {
        method: 'POST', // or 'PUT'
        headers: {
          "Accept" : "application/json",
        }
      });

      const tdata = await token.json();
      console.log("Token is "+tdata.token);

      const bodydata = { "token": tdata.token,
                          "planet_names": [
                            "Donlon",
                            "Enchai",
                            "Pingasor",
                            "Sapir"
                          ],
                          "vehicle_names": [
                            "Space pod",
                            "Space rocket",
                            "Space rocket",
                            "Space rocket"
                          ]
                       }
      
      let onlyplanet = [];
      for(let i=0; i<this.state.selectedPlanetsArr.length; i++){
          onlyplanet.push(this.state.selectedPlanetsArr[i].name);
      }

      let maindat = { "token": tdata.token,
                        "planet_names": [...onlyplanet],
                        "vehicle_names": [...this.state.UsedVehicle]
      }
      console.log("Planet names are:" +this.state.selectedPlanetsArr[2].name);
      console.log("Vehicle names are:" +this.state.UsedVehicle);
      console.log("Mindat planets are:" +maindat.planet_names[1]);
      
      let falconeresult={};               
      fetch('https://findfalcone.herokuapp.com/find', {
        method: 'POST', // or 'PUT'
        headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(maindat),
      })
      .then(response => response.json())
      .then(data => {
        falconeresult = data;
        this.setState({
          Result: falconeresult,
        });
        console.log('Success:', falconeresult);
        console.log('Status:--', this.state.Result.status);
        if(falconeresult.status == "success"){
          console.log("Success! Congratulations on finding Falcone, King Shan is mighty pleased");
          console.log("Planet found"+falconeresult.planet_name);
          let newarr = ["","",""];
          let str = "Planet found is : "+falconeresult.planet_name;
          this.setState({
            SuccessFailmsg:"Success! Congratulations on finding Falcone, King Shan is mighty pleased",
            Planetmsg:str
          });
          newarr[0] = "Time Taken is: "+ this.state.Time;
          newarr[1] = "Success! Congratulations on finding Falcone, King Shan is mighty pleased";
          newarr[2] = str;

          localStorage.setItem('FinalRes',JSON.stringify(newarr));
          setTimeout(window.history.go(),6000);
        }
        else{
          console.log("Sorry! Falcone not found");
          this.setState({
            SuccessFailmsg:"Sorry! Falcone not found",
          });
          let newarr = ["","",""];
          newarr[0] = "Time Taken is: "+ this.state.Time;
          newarr[1] = "Sorry! Falcone not found";
          newarr[2] = "";

          localStorage.setItem('FinalRes',JSON.stringify(newarr));
          setTimeout(window.history.go(),6000);
        }
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  getSelectPlanet = (event) => {

    let ddlId = event.target.id, darr;

    if(ddlId == 1){
     darr = [...this.state.ddlArr1];
    }
    else if(ddlId == 2){
     darr = [...this.state.ddlArr2];
    }
    else if(ddlId == 3){
     darr = [...this.state.ddlArr3];
    }
    else{
      darr = [...this.state.ddlArr4];
    }

    
    let pname = event.target.value,pos;
    let selectedPlanet = [...this.state.selectedPlanetsArr];
    


    for (let i=0; i<darr.length; i++){
       if(darr[i].name == pname){
          pos=i;
          break;
       }
    }

    

    selectedPlanet.splice(selectedPlanet.length, 0,darr[pos]);

    darr.splice(pos, 1);

    console.log("selectedPlanet distance is "+selectedPlanet[selectedPlanet.length-1].distance);

    /*this.setState({
      arrplanets2:darr,
      selectedPlanetsArr:selectedPlanet
    });*/

    if(ddlId == 1){
      this.setState({
        ddlArr2:darr,
        arrplanets: darr,
        selectedPlanetsArr:selectedPlanet,
        ddLID: ddlId
      });
     }
     else if(ddlId == 2){
      this.setState({
        ddlArr3:darr,
        arrplanets: darr,
        selectedPlanetsArr:selectedPlanet,
        ddLID: ddlId
      });
     }
     else if(ddlId == 3){
      this.setState({
        ddlArr4:darr,
        arrplanets: darr,
        selectedPlanetsArr:selectedPlanet,
        ddLID: ddlId
      });
     }
     else{
      this.setState({
        arrplanets: darr,
        selectedPlanetsArr:selectedPlanet,
        ddLID: ddlId
      });
     }

    

    //console.log("No. of Planets left "+this.state.arrplanets2.length);
    console.log("No. of darrPlanets left "+darr.length);

    //console.log("DDL id is "+ddlId);
    //console.log("DDL planet2 "+this.state.selectedPlanetsArr[0].name);
    let selectele = document.getElementById(ddlId);
    selectele.disabled = true;

    if(ddlId == 1){
        let x = document.getElementById("Veh1");
        if (x.style.display === "none") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }else if(ddlId == 2){
        let x = document.getElementById("Veh2");
        if (x.style.display === "none") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }else if(ddlId == 3){
        let x = document.getElementById("Veh3");
        if (x.style.display === "none") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }else{
        let x = document.getElementById("Veh4");
        if (x.style.display === "none") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }
      

  }

  getItDisabled = () => {

        var node_list = document.getElementsByTagName('input');
        for (var i = 0; i < node_list.length; i++) {
            var node = node_list[i];
            if ((node.getAttribute('type') === 'radio')&&(node.disabled !== true)) {
                node.checked = true;
                node.disabled = true;
                console.log("Node Value is"+node.value);
                break;
            }
        } 
        
  }

  getSelectShip = (event) => {
    let sname = event.target.value;
    let sid = event.target.name;
    let sarr =[],pos=0,name='def',total=0,max_distance=100,speed=2;
    let vid = event.target.id;

    if(sid == "Veh1"){
      sarr = [...this.state.vehicleArr1];
     }
     else if(sid == "Veh2"){
      sarr = [...this.state.vehicleArr2];
     }
     else if(sid == "Veh3"){
      sarr = [...this.state.vehicleArr3];
     }
     else{
      sarr = [...this.state.vehicleArr4];
     }
 
    
    //console.log("Space ship is"+sname);

    for (let i=0; i<sarr.length; i++){
      if(sarr[i].name == sname){
         if(sarr[i].total_no > 0){
            total = sarr[i].total_no - 1;
            pos=i;
            break;
         }
      }
    }

    name = sarr[pos].name;
    max_distance = sarr[pos].max_distance;
    speed = sarr[pos].speed;

    

    //console.log("sarr[pos].name :"+sarr[pos].name);
    sarr.splice(pos,1);
    sarr.splice(pos,0, {"name":name,"total_no":total,"max_distance":max_distance,"speed":speed});
    //

    let newarr=[...this.state.UsedVehicle];
    newarr.push(name);
    //

    let time = this.state.Time;
    let pdistance = this.state.selectedPlanetsArr[this.state.selectedPlanetsArr.length-1].distance;
    time = time + (pdistance/speed);

    console.log("Selected Planets :"+pdistance);

    this.setState({
      UsedVehicle: newarr,
      Time: time
    })

    if(this.state.UsedVehicle !== null){
      console.log("NewArr elem: "+this.state.UsedVehicle[this.state.UsedVehicle.length-1]);
    }

    console.log("UsedVehicle: "+this.state.UsedVehicle);

    
    
  
    

      /*this.setState({
        arrvehicles: sarr,
        vehicleArr1: sarr,
      });*/

      if(sid == "Veh1"){
        this.setState({
          arrvehicles: sarr,
          vehicleArr1: sarr,
          vehicleArr2: sarr,
          maxDistance: max_distance
        });
       }
       else if(sid == "Veh2"){
        this.setState({
          arrvehicles: sarr,
          vehicleArr2: sarr,
          vehicleArr3: sarr,
          maxDistance: max_distance
        });
       }
       else if(sid == "Veh3"){
        this.setState({
          arrvehicles: sarr,
          vehicleArr3: sarr,
          vehicleArr4: sarr,
          maxDistance: max_distance
        });
       }
       else{
        this.setState({
          arrvehicles: sarr,
          vehicleArr4: sarr,
          maxDistance: max_distance
        });
       }

       //console.log("Vehicle id: "+document.getElementById(vid).checked);
       console.log("Vehicle id: "+vid);
       this.setState({
        Vid: vid,
        Sid: sid
       });
       
       
       
       document.getElementById(sid).disabled = true;
        var nodes = document.getElementById(sid).getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
              nodes[i].disabled = true;
        }
        //this.getItDisabled();

      

  }

  refresh(){
    window.history.go();
  }
  
  render() {

    //console.log("Planet2 is "+this.state.ddlPlanet);
    

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

        <div className="Content">
          <br></br>
          <h4>Select Planets you want to search in:</h4>

        <div className="MainClass">

        <div className="Planets">
          <p>Destination 1</p>

        <select name="planets" id="1" onChange={this.getSelectPlanet} className="">
        <option value="select">Select</option>
        {
          
          this.state.ddlArr1.map((planet)=>{
                return(
                        <option key={planet.distance} value={planet.name}>{planet.name}</option>
                )
            }
          )
        }
        </select>
        <br></br>
        
        
        <br></br>
        <div id="Veh1">
          {
            this.state.vehicleArr1.map((vehicle)=>{
                let maxDist = vehicle.max_distance;
                
                  
                  if(this.state.ddLID == 1){
                    let planetDist = this.state.selectedPlanetsArr[this.state.selectedPlanetsArr.length-1].distance;
                    console.log("MaxDist == "+maxDist+" && PlanetDist == "+planetDist);
                    console.log("DDL id is ="+this.state.ddLID);
                    if((maxDist >= planetDist)&&(vehicle.total_no>0)){
                      return(
                        <div key={vehicle.max_distance} >
                          <input type="radio"  id={vehicle.max_distance} name="Veh1" value={vehicle.name} 
                            onChange={this.getSelectShip}/>{" "}
                          <label for={vehicle.name}>{vehicle.name}{" "}{"("}{vehicle.total_no}{")"}</label>
                          <br></br>
                        </div>
                      )
                    }
                    else{
                      return(
                        <div key={vehicle.max_distance} >
                          <input type="radio"  id={vehicle.max_distance} name="Veh1" value={vehicle.name} 
                            onChange={this.getSelectShip} disabled/>{" "}
                          <label for={vehicle.name}>{vehicle.name}{" "}{"("}{vehicle.total_no}{")"}</label>
                          <br></br>
                        </div>
                      )
                    }
                  }
                  else{
                    return(
                      <div key={vehicle.max_distance} >
                        <input type="radio"  id={vehicle.max_distance} name="Veh1" value={vehicle.name} 
                          onChange={this.getSelectShip} disabled/>{" "}
                        <label for={vehicle.name}>{vehicle.name}{" "}{"("}{vehicle.total_no}{")"}</label>
                        <br></br>
                      </div>
                    )
                  }
                  
              }
              
            )

          }
        </div>
        </div>

        <br></br>

        {" "}
        <div className="Planets">

          <p>Destination 2</p>

        <select name="planets" id="2" onChange={this.getSelectPlanet}>
        <option value="select">Select</option>
        {
          this.state.ddlArr2.map((planet)=>{
                return(
                        <option key={planet.distance} value={planet.name}>{planet.name}</option>
                )
            }
          )
        }
        </select>
        {" "}
        <br></br><br></br>
        <div id="Veh2">
          {
            this.state.vehicleArr2.map((vehicle)=>{
              let maxDist = vehicle.max_distance;
              
                
                if(this.state.ddLID == 2){
                  let planetDist = this.state.selectedPlanetsArr[this.state.selectedPlanetsArr.length-1].distance;
                  console.log("MaxDist == "+maxDist+" && PlanetDist == "+planetDist);
                  console.log("DDL id is ="+this.state.ddLID);
                  if((maxDist >= planetDist)&&(vehicle.total_no>0)){
                    return(
                      <div key={vehicle.max_distance} >
                        <input type="radio"  id={vehicle.max_distance} name="Veh2" value={vehicle.name} 
                          onChange={this.getSelectShip}/>{" "}
                        <label for={vehicle.name}>{vehicle.name}{" "}{"("}{vehicle.total_no}{")"}</label>
                        <br></br>
                      </div>
                    )
                  }
                  else{
                    return(
                      <div key={vehicle.max_distance} >
                        <input type="radio"  id={vehicle.max_distance} name="Veh2" value={vehicle.name} 
                          onChange={this.getSelectShip} disabled/>{" "}
                        <label for={vehicle.name}>{vehicle.name}{" "}{"("}{vehicle.total_no}{")"}</label>
                        <br></br>
                      </div>
                    )
                  }
                }
                else{
                  return(
                    <div key={vehicle.max_distance} >
                      <input type="radio"  id={vehicle.max_distance} name="Veh2" value={vehicle.name} 
                        onChange={this.getSelectShip} disabled/>{" "}
                      <label for={vehicle.name}>{vehicle.name}{" "}{"("}{vehicle.total_no}{")"}</label>
                      <br></br>
                    </div>
                  )
                }
                
            }
            
          )
          }
        </div>
        </div>

        

        <br></br> <br></br>
        <div className="Planets">

            <p>Destination 3</p>

        <select name="planets" id="3" onChange={this.getSelectPlanet}>
        <option value="select">Select</option>
        {
          this.state.ddlArr3.map((planet)=>{
                return(
                        <option key={planet.distance} value={planet.name}>{planet.name}</option>
                )
            }
          )
        }
        </select>
        {" "}
        <br></br><br></br>
        <div id="Veh3">
          {
            this.state.vehicleArr3.map((vehicle)=>{
              let maxDist = vehicle.max_distance;
              
                
                if(this.state.ddLID == 3){
                  let planetDist = this.state.selectedPlanetsArr[this.state.selectedPlanetsArr.length-1].distance;
                  console.log("MaxDist == "+maxDist+" && PlanetDist == "+planetDist);
                  console.log("DDL id is ="+this.state.ddLID);
                  if((maxDist >= planetDist)&&(vehicle.total_no>0)){
                    return(
                      <div key={vehicle.max_distance} >
                        <input type="radio"  id={vehicle.max_distance} name="Veh3" value={vehicle.name} 
                          onChange={this.getSelectShip}/>{" "}
                        <label for={vehicle.name}>{vehicle.name}{" "}{"("}{vehicle.total_no}{")"}</label>
                        <br></br>
                      </div>
                    )
                  }
                  else{
                    return(
                      <div key={vehicle.max_distance} >
                        <input type="radio"  id={vehicle.max_distance} name="Veh3" value={vehicle.name} 
                          onChange={this.getSelectShip} disabled/>{" "}
                        <label for={vehicle.name}>{vehicle.name}{" "}{"("}{vehicle.total_no}{")"}</label>
                        <br></br>
                      </div>
                    )
                  }
                }
                else{
                  return(
                    <div key={vehicle.max_distance} >
                      <input type="radio"  id={vehicle.max_distance} name="Veh3" value={vehicle.name} 
                        onChange={this.getSelectShip} disabled  />{" "}
                      <label for={vehicle.name}>{vehicle.name}{" "}{"("}{vehicle.total_no}{")"}</label>
                      <br></br>
                    </div>
                  )
                }
                
            }
            
          )
          }
        </div>
        </div>

        <br></br> <br></br>
        <div className="Planets">

            <p>Destination 4</p>

        <select name="planets" id="4" onChange={this.getSelectPlanet}>
        <option value="select">Select</option>
        {
          this.state.ddlArr4.map((planet)=>{
                return(
                        <option key={planet.distance} value={planet.name}>{planet.name}</option>
                )
            }
          )
        }
        </select>
        {" "}

        <br></br> <br></br>

        <div id="Veh4">
          {
            this.state.vehicleArr4.map((vehicle)=>{
              let maxDist = vehicle.max_distance;
                
                
                if(this.state.ddLID == 4){
                  let planetDist = this.state.selectedPlanetsArr[this.state.selectedPlanetsArr.length-1].distance;
                  console.log("MaxDist == "+maxDist+" && PlanetDist == "+planetDist);
                  console.log("DDL id is ="+this.state.ddLID);
                  if((maxDist >= planetDist)&&(vehicle.total_no>0)){
                    return(
                      <div key={vehicle.max_distance} >
                        <input type="radio"  id={vehicle.max_distance} name="Veh4" value={vehicle.name} 
                          onChange={this.getSelectShip}/>{" "}
                        <label for={vehicle.name}>{vehicle.name}{" "}{"("}{vehicle.total_no}{")"}</label>
                        <br></br>
                      </div>
                    )
                  }
                  else{
                    return(
                      <div key={vehicle.max_distance} >
                        <input type="radio"  id={vehicle.max_distance} name="Veh4" value={vehicle.name} 
                          onChange={this.getSelectShip} disabled/>{" "}
                        <label for={vehicle.name}>{vehicle.name}{" "}{"("}{vehicle.total_no}{")"}</label>
                        <br></br>
                      </div>
                    )
                  }
                }
                else{
                  return(
                    <div key={vehicle.max_distance} >
                      <input type="radio"  id={vehicle.max_distance} name="Veh4" value={vehicle.name} 
                        onChange={this.getSelectShip} disabled/>{" "}
                      <label for={vehicle.name}>{vehicle.name}{" "}{"("}{vehicle.total_no}{")"}</label>
                      <br></br>
                    </div>
                  )
                }
                
            }
            
          )
          }
        </div>
        </div>

        </div>
        
        <br></br><br></br>
        
        {"Total Time taken :"+this.state.Time}
        <br></br><br></br>
        
        <Link to="/result">
        <button onClick={async () => {await this.getFindFalcone();}}
        className="btn btn-success"> Find Falcone! </button>
        </Link>
        <br></br><br></br>
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

export default Home;