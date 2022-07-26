import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Tabs.css';
import ReactPaginate from "react-paginate";
import { upazilasOf,districtsOf,allDivision } from '@bangladeshi/bangladesh-address';
import Modal from './Modal';

const Tabs = () => {
    const [toggleState, setToggleState] = useState(1);
    const [project, setproject] = useState([]);
   


    


    const toggleTab = (index) => {
      setToggleState(index);
    };
   





    

      // ------------- get data ---------------------------

      useEffect(() => {

        const myProject = async () => {

          

            const url = `https://60f2479f6d44f300177885e6.mockapi.io/users`;
          

            const { data } = await axios.get(url)
            setproject(data);
          


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




    return (
        <div>

        <Modal></Modal>
        

        



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