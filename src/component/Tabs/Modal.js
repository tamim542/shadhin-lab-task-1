import React, { useState } from 'react';
import {districtsOf,allDivision } from '@bangladeshi/bangladesh-address';

import { useFormik } from 'formik'

const Modal = () => {

    
    const [userType, setUserType]=useState('');
   
    
      const onBlurHandleFUserType=(event)=>{
        setUserType(event.target.value)
       
      }

      


      


        // -------------------------- division district drop downd -----------------------------


const division=allDivision();



const [divisionName, setDivisionName]=useState('');

const handleDivision=(event)=>{
  const divisionname= event.target.value;
  setDivisionName(divisionname);
}

const districtList = districtsOf(divisionName);

//------------------------------------------- formik validation --------------------------------------------------


const validate = values => {
    const errors = {}

    if (!values.first_name) {
      errors.first_name = 'Required';
    } else if (!/^[a-zA-Z ]+$/.test(values.first_name)) {
      errors.first_name = 'Do not allow any Special Character';
    }else if(values.first_name.length>20){
        errors.first_name ='First Name must be less than 21';
    }



    if (!values.last_name) {
      errors.last_name = 'Required'
    } else if (values.last_name.length >21) {
      errors.last_name = 'Last Name must be less than 21';
    } else if (!/^[a-zA-Z ]+$/.test(values.last_name)) {
      errors.last_name = 'Do not allow any Special Character';
    }




    if (!values.user_type) {
      errors.user_type = 'Required'
    } else if (!/^[a-zA-Z ]+$/.test(values.user_type)) {
      errors.user_type = 'Do not allow any Special Character'
    }else if (values.user_type!='admin' && values.user_type!='employee' ) {
        errors.user_type = 'User type must be admin or employee'
      }

    return errors
  }

  const formik = useFormik({

    initialValues: {
        first_name: '',
        last_name: '',
        user_type: '',
        division: '',
        district: '',
        id: ''
    },
    validate,
    
    onSubmit: values => {
    //   alert(JSON.stringify(values, null, 2))
      
//---------------------------- data post ------------------------------------------------
const first_name=values.first_name;
const last_name=values.last_name;
const user_type=values.user_type;
const division=values.division;
const district=values.district;
const id=values.id;

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
  

    



    }
    

  })



//--------------------------------------------- end ------------------------------------------------------


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
        <form onSubmit={formik.handleSubmit}>



          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">First Name:</label>
            {/* <p style={{color:'red'}}>{errorFName}</p> */}
            <input 
            type="text" name='first_name'  onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first_name}
            className="form-control" id="recipient-name"/>
            {formik.touched.first_name && formik.errors.first_name ? <div style={{color:'red'}}>{formik.errors.first_name}</div> : null}
          </div>




          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Last Name:</label>
            {/* <p style={{color:'red'}}>{errorLName}</p> */}
            <input type="text" name='last_name' onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.last_name}
            className="form-control" id="recipient-name"  />
            {formik.touched.last_name && formik.errors.last_name ? <div style={{color:'red'}}>{formik.errors.last_name}</div> : null}
          </div>




          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">User Type:</label>
            {/* <p style={{color:'red'}}>{errorUserType}</p> */}
            <input type="text" name='user_type'  onChange={formik.handleChange}
        onBlur={onBlurHandleFUserType}
        value={formik.values.user_type}
         className="form-control" id="recipient-name" />
         {formik.touched.user_type && formik.errors.user_type ? <div style={{color:'red'}}>{formik.errors.user_type}</div> : null}
          </div>


      {/* ---------------------------- division dropdown--------------------------------- */}

          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Division:</label>
         { 
          userType=='admin'?<input type="text" name='division' onChange={formik.handleChange} value={formik.values.division} className="form-control" id="recipient-name" required /> 

            :<select type="text" name='division' onChange={formik.handleChange} value={formik.values.division} className="form-control" id="recipient-name" required onBlur={(e)=>handleDivision(e)} >
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
        userType=='admin'? <input type="text" name='district' onChange={formik.handleChange} value={formik.values.district} className="form-control" id="recipient-name" required /> 

            :<select type="text" name='district' onChange={formik.handleChange} value={formik.values.district} className="form-control" id="recipient-name" required  >
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
            <input type="number" name='id' onChange={formik.handleChange} value={formik.values.id} className="form-control" id="recipient-name" required />
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