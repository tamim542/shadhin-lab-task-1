import React, { useState } from 'react';
import { upazilasOf,districtsOf,allDivision } from '@bangladeshi/bangladesh-address';

const Modal = () => {

    const [firstName, setFirstName]=useState('');
    const [lastName, setLastName]=useState('');
    const [userType, setUserType]=useState('');
   
    const [errorFName, setErrorFName]=useState('');
    const [errorLName, setErrorLName]=useState('');
    const [errorUserType, setErrorUserType]=useState('');




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
        console.log('item==',item);
        fetch('https://60f2479f6d44f300177885e6.mockapi.io/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })

            .then(response => response.json())
            .then(data => {
              if(data){
                alert('ok');
                // console.log('data==',data);
              }
            });
          

            event.target.reset();

          }

    }

        // -------------------------- division district drop downd -----------------------------


const division=allDivision();


;
//console.log('district==',district);

//const [regionId, setRegionId]=useState('');
const [divisionName, setDivisionName]=useState('');
//const [districtName, setDistrictName]=useState('');

// const handleDivision=(event)=>{
//   const getcountryid= event.target.value;
//   setRegionId(getcountryid);
// }
const handleDivision=(event)=>{
  const divisionname= event.target.value;
  setDivisionName(divisionname);
}

const districtList = districtsOf(divisionName);

// const handlestate=(event)=>{
//   const getstateid= event.target.value;
//   setStateid(getstateid);
// }






    return (
        <div>
                 {/* --------------------------modal --------------------- */}
                 <div>
                
                <button type="button" className="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Add User</button>



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
         { 
          userType=='admin'?<input type="text" name='division' className="form-control" id="recipient-name" required /> 

            :<select type="text" name='division' className="form-control" id="recipient-name" required onBlur={(e)=>handleDivision(e)} >
            <option value="">--Select Division--</option>
                {
                division.map(divisions=>(
                <option  value={divisions}>{divisions } </option>
                ))
                }
              </select>
              }
          </div>


         

      {/* ----------------------------------- district drop down -------------------------------------- */}

          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">District:</label>
          { 
        userType=='admin'? <input type="text" name='district' className="form-control" id="recipient-name" required /> 

            :<select type="text" name='district' className="form-control" id="recipient-name" required  >
                  <option value="">--Select District--</option>
                  {
                    districtList?.map( districts=>(
                     <option  value={districts }>{districts } </option>
                    )) 
                  }                  
                </select>
                }
           
          </div>






          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">ID:</label>
            <input type="text" name='id' className="form-control" id="recipient-name" required />
          </div>
         
        <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Add</button>
    
        </form>
      </div>
      
    </div>
  </div>
</div>


            </div>
        </div>
    );
};

export default Modal;