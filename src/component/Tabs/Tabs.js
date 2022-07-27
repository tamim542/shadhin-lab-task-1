import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Tabs.css';
import ReactPaginate from "react-paginate";

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

//---------------------------- pagination ---------------------------------------


const adminList = project.filter(data=>data.user_type=='admin');

const [pageNumber, setPageNumber] = useState(0);

const usersPerPage = 2;
const pagesVisited = pageNumber * usersPerPage;



const displayUsers = adminList
  .slice(pagesVisited, pagesVisited + usersPerPage)
  .map((project1) => {
    return (
      <div className="">
       <div className="col"><div className="card h-100 border border-primary mt-2 ms-2" style={{width: '18rem'}}>

<div className="card-body">
  <h4 className="card-title" style={{color: 'blue'}}>{project1.projectname}</h4>
  <p className="card-text"><span style={{fontWeight:'bolder'}}>First Name: </span>{project1.first_name} {project1.last_name}</p>
  
 
 
  <button type="button" className="btn btn-primary" onClick={() => navigateToInventory(project1.id)}>Update Info</button><br></br><br></br>



  <button type="button" className="btn btn-primary ms-2" onClick={() => navigateToDetails(project1.id)} >Details</button>
  
</div>
</div>
</div>




      </div>
    );
  });

const pageCount = Math.ceil(adminList.length / usersPerPage);

const changePage = ({ selected }) => {
  setPageNumber(selected);
};



//------------------- employee -----------------------------------

const employeeList = project.filter(data=>data.user_type=='employee');

const [pageNumberEm, setPageNumberEm] = useState(0);

const emUsersPerPage = 2;
const emPagesVisited = pageNumber * emUsersPerPage;

const displayUsersEmployee = employeeList
.slice(emPagesVisited, emPagesVisited + emUsersPerPage)
.map((project1) => {
  return (
    <div>
      <div className="col"><div className="card h-100 border border-primary mt-2 ms-2" style={{width: '18rem'}}>

<div className="card-body">
  <h4 className="card-title" style={{color: 'blue'}}>{project1.projectname}</h4>
  <p className="card-text"><span style={{fontWeight:'bolder'}}>Name: </span>{project1.first_name} {project1.last_name}</p>
  
 
  <button type="button" className="btn btn-primary" onClick={() => navigateToInventory(project1.id)}>Update Info</button><br></br><br></br>



  <button type="button" className="btn btn-primary ms-2" onClick={() => navigateToDetails(project1.id)} >Details</button>
  
</div>
</div>
</div>
    </div>
  );
});

const emPageCount = Math.ceil(employeeList.length / emUsersPerPage);

const emChangePage = ({ selected }) => {
  setPageNumberEm(selected);
};



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
           {/* ---------------- Data get and separate from api admin  */}
        <div>
       

{/* -------------------- for pagination --------------------------- */}

<div>
   <div  className="card-display">  {displayUsers} </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>


        </div>

          </p>
        </div>

{/* ---------------------------- employee ------------------------------- */}
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Content 2</h2>
          <hr />
         

          <div className="">
          <div className="card-display">{displayUsersEmployee}</div> 
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={emPageCount}
        onPageChange={emChangePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
        </div>

       
      </div>
    </div>


    

        </div>
    );
};

export default Tabs;