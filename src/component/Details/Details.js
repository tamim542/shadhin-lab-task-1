import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';

const Details = () => {
   
    const {id} = useParams();
  
    const [users, setUser] = useState({});
    
    useEffect( () =>{
        const url = `https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`;
        
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data));
    }, []);
    console.log(' users===',users);
    return (
        <div className='design-width'>
               <div class="img-border" >
           
               <div style={{paddingLeft:'60px'}}>
                <div className='inner-card'>

                <p className='skill-name'>First Name: {users.first_name}</p>
                <p className='skill-name'>Last Name: {users.last_name}</p>
                <p className='skill-name'>User Type: {users.user_type}</p>
                <p className='skill-name'>Division: {users.division}</p>
                <p className='skill-name'>District: {users.district}</p>
                </div>
                
                </div>
               
            </div>

             
       
       </div>

      
    );
};

export default Details;