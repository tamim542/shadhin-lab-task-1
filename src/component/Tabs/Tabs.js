import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Tabs.css';

const Tabs = () => {
    const [toggleState, setToggleState] = useState(1);
    const [project, setproject] = useState([]);
    const [admin, setAdmin] = useState([]);
    
    const [firstName, setFirstName]=useState('');
    const [lastName, setLastName]=useState('');
    const [userType, setUserType]=useState('');
   
    const [errorFName, setErrorFName]=useState('');
    const [errorLName, setErrorLName]=useState('');
    const [errorUserType, setErrorUserType]=useState('');

    const toggleTab = (index) => {
      setToggleState(index);
    };
   




        // ---------- form validation -----------------

        const onBlurHandleFname=(event)=>{
          setFirstName(event.target.value)
        }
        const onBlurHandleLname=(event)=>{
          setLastName(event.target.value)
        }
        const onBlurHandleFUserType=(event)=>{
          setUserType(event.target.value)
         
        }

        


        // ---------- add user using modal -----------------

        const handleForm = (event) => {
          event.preventDefault();

          if( !/^[a-zA-Z ]+$/.test(firstName) || firstName.length>20){
            setErrorFName("First Name must be lass than 21 character and Without any Special Character")
         }

         else if( !/^[a-zA-Z ]+$/.test(lastName) || lastName.length>20){
          setErrorLName("Last Name must be lass than 21 character and Without any Special Character")
       } 
       else if( !/^[a-zA-Z ]+$/.test(userType) || userType.length>10){
        setErrorUserType("User Type only admin or employee")
     } 
    
         else{
          const first_name = event.target.first_name.value;
         
          const last_name = event.target.last_name.value;
          
          const user_type = event.target.user_type.value;
          const division = event.target.division.value;
          const district = event.target.district.value;
          const id = event.target.id.value;
          
          const item = {first_name, last_name,  user_type, division, district,id };
          
          fetch('https://60f2479f6d44f300177885e6.mockapi.io/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item)
          })
  
              .then(response => response.json())
              .then(data => {
                if(data){
                  alert('ok');
                }
              });
            
  
              event.target.reset();

            }
  
      }

    

      // ------------ get data ---------------------------

      useEffect(() => {

        const myProject = async () => {

          

            const url = `https://60f2479f6d44f300177885e6.mockapi.io/users`;
          

            const { data } = await axios.get(url)
            setproject(data);
           console.log('data===',data);


        }
        myProject();






    }, [])

    
    

  // ----------------- details navigate -------------------------
  const navigate = useNavigate();
  const navigateToDetails = id => {
   
   
    navigate(`/details/${id}`);
}

 // ----------------- Update info navigate -------------------------
const navigateToInventory = id => {
 
  const id1 = id.toString();

  navigate(`/updateinfo/${id1}`)
}

// -------------------------- division district drop downd -----------------------------

const countryCityState = require('country-city-state')
 
const regions = countryCityState.getCountryRegions('RU')
const cities = countryCityState.getCountryCities('RU')



const [regionId, setRegionId]=useState('');
const [stateid, setStateid]=useState('');

const handleDivision=(event)=>{
  const getcountryid= event.target.value;
  setRegionId(getcountryid);
}


const handlestate=(event)=>{
  const getstateid= event.target.value;
  setStateid(getstateid);
}


    return (
        <div>


        

          {/* --------------------------modal --------------------- */}
            <div>
                
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Add User</button>



<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">User Form</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleForm}>
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">First Name:</label>
            <p style={{color:'red'}}>{errorFName}</p>
            <input type="text" name='first_name' onBlur={onBlurHandleFname} className="form-control" id="recipient-name" required/>
          </div>
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Last Name:</label>
            <p style={{color:'red'}}>{errorLName}</p>
            <input type="text" name='last_name' onBlur={onBlurHandleLname} className="form-control" id="recipient-name" required />
          </div>
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">User Type:</label>
            <p style={{color:'red'}}>{errorUserType}</p>
            <input type="text" name='user_type' onBlur={onBlurHandleFUserType} className="form-control" id="recipient-name" required />
          </div>


      {/* ---------------------------- division dropdown--------------------------------- */}

          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Division:</label>
            {/* <input type="text" name='division' className="form-control" id="recipient-name" required /> */}

             <select type="text" name='division' className="form-control" id="recipient-name" required onBlur={(e)=>handleDivision(e)} >
             <option value="">--Select Division--</option>
                  {
                 regions.map(region=>(
                  <option  value={region.id}>{region.name } </option>
                 ))
                  }
                </select>
          </div>


         

      {/* ----------------------------------- district drop down -------------------------------------- */}

          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">District:</label>
            {/* <input type="text" name='district' className="form-control" id="recipient-name" required /> */}

            <select type="text" name='district' className="form-control" id="recipient-name" required  onBlur={(e)=>handlestate(e)}>
                  <option value="">--Select District--</option>
                  {
                    cities.filter(data=>data.regionId==regionId).map( district=>(
                     <option  value={district.name }>{district.name } </option>
                    )) 
                  }                  
                </select>
          </div>






          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">ID:</label>
            <input type="text" name='id' className="form-control" id="recipient-name" required />
          </div>
         
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Add</button>
    
        </form>
      </div>
      
    </div>
  </div>
</div>


            </div>



            {/* -----------------------tab create ------------------------- */}
             <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          {/* Tab 1 */} Admin List
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          {/* Tab 2 */} Employee List
        </button>
       
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>Content 1</h2>
          <hr />
          <p>
           {/* ---------------- Data get and separate from api admin and employee */}
        <div>
        {

project.filter(data=>data.user_type=='admin').map(project1=><div className="col"><div className="card h-100 border border-primary mt-2" style={{width: '18rem'}}>

<div className="card-body">
  <h4 className="card-title" style={{color: 'blue'}}>{project1.projectname}</h4>
  <p className="card-text"><span style={{fontWeight:'bolder'}}>First Name: </span>{project1.first_name} {project1.last_name}</p>
  
 
 
  <button type="button" className="btn btn-primary" onClick={() => navigateToInventory(project1.id)}>Update Info</button><br></br><br></br>



  <button type="button" className="btn btn-primary ms-2" onClick={() => navigateToDetails(project1.id)} >Details</button>
  
</div>
</div>
</div>




)

}
        </div>

          </p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Content 2</h2>
          <hr />
          <p>
          {

project.filter(data=>data.user_type=='employee').map(project1=><div className="col"><div className="card h-100 border border-primary mt-2" style={{width: '18rem'}}>

<div className="card-body">
  <h4 className="card-title" style={{color: 'blue'}}>{project1.projectname}</h4>
  <p className="card-text"><span style={{fontWeight:'bolder'}}>Name: </span>{project1.first_name} {project1.last_name}</p>
  
 
  <button type="button" className="btn btn-primary" onClick={() => navigateToInventory(project1.id)}>Update Info</button><br></br><br></br>



  <button type="button" className="btn btn-primary ms-2" onClick={() => navigateToDetails(project1.id)} >Details</button>
  
</div>
</div>
</div>




)

}
          </p>
        </div>

       
      </div>
    </div>


    

        </div>
    );
};

export default Tabs;