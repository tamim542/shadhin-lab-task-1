import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FacebookIcon, FacebookShareCount } from 'react-share';
import { FacebookButton, FacebookCount } from "react-social";
import './Details.css';

const Details = () => {

    let url = "https://i.ibb.co/DV4dnWY/v921-audi-wit-014.jpg";
    let fname;
    const { id } = useParams();

    const [users, setUser] = useState({});

    useEffect(() => {
        const url = `https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`;

        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);
    console.log(' users===', users);
    return (
        <div className='design-width'>
            <div class="img-border" >

                <div style={{ paddingLeft: '60px' }}>
                    <div className='inner-card'>

                        <p className='skill-name'>First Name: {users.first_name}</p>
                        <p className='skill-name'>Last Name: {users.last_name}</p>
                        <p className='skill-name'>User Type: {users.user_type}</p>
                        <p className='skill-name'>Division: {users.division}</p>
                        <p className='skill-name'>District: {users.district}</p>

                        <FacebookButton url={url} appId={375746281362827}>
                            <FacebookCount url={url} />
                        


                            {/* <FacebookShareCount fname={users.first_name}>
                                {shareCount => <span className="myShareCountWrapper">{users.first_name}</span>}
                            </FacebookShareCount> */}


                            <FacebookIcon size={32} round /> {"Share"}


                        </FacebookButton>
                    </div>

                </div>

            </div>



        </div>


    );
};

export default Details;