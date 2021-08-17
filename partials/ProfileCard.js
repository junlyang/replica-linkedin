
import React, { useEffect, useState } from 'react'
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';


const ProfileCard = () => {
    const [profile, setProfile] = useState({
        imgUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        name:'Junlyang'
    });
    return (
        <>
            <figure>
                <img src={profile.imgUrl} width="200" height="200"></img>
            </figure>
            <div>
                <h1>{profile.name}</h1>
            </div>
            <div><button>Edit</button></div>
        </>
    )
}

export default ProfileCard