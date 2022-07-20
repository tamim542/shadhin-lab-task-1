import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import './Update.css';

const Update = () => {
   
    const {id} = useParams();
   
    const [users, setUser] = useState({});
    
    useEffect( () =>{
        const url = `https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data));
    }, []);

    const handleUpdateUser = event =>{
        event.preventDefault();
        
       
       

        const first_name = event.target.first_name.value;
        const last_name = event.target.last_name.value;
        
        const user_type = event.target.user_type.value;
        const division = event.target.division.value;
        const district = event.target.district.value;
        const id = event.target.id.value;

        const updatedUser = {first_name, last_name,  user_type, division, district,id};

        // send data to the server
        console.log('id==',id,first_name);
        const url = `https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data =>{
            console.log('success', data);
            alert('users update successfully!!!');
            event.target.reset();
        })
    }
    return (
        <div>
            <div>
            <div className='form-center'>
                <div >
                    <form  onSubmit={handleUpdateUser}>

                        <h1 style={{ color: '#31c75e' }}>Update User Information</h1>
                       
                        <span>First Name</span>
                        <br />
                        <input type="text" name='first_name' className='input-feildreview' defaultValue={users.first_name} required />
                        <br />

                        
                        <span>Last Name</span>
                        <br />
                        <input type="text" name='last_name' className='input-feildreview' defaultValue={users.last_name} required />
                        
                        <br />


                        <span>User Type</span>
                        <br />
                        <input type="text" name='user_type' className='input-feildreview' defaultValue={users.user_type} required />
                        
                        <br />


                        <span>Division</span>
                        <br />
                        <input type="text"  name='division' className='input-feildreview' defaultValue={users.division} required />
                        <br />
                        <span>District</span>
                        <br />
                        <input type="text"  name='district' className='input-feildreview' defaultValue={users.district} required />
                        <br />
                        <span>ID</span>
                        <br />
                        <input type="number"  name='id' className='input-feildreview' value={users.id} required />
                        <br />
                        
                       
                        <button type='submit' className='button-form mb-4'><span style={{ color: 'white' }}>Update Info</span></button>
                        <br />
                    </form>

                </div>
            </div>
        </div>
        </div>
    );
};

export default Update;