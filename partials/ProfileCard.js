
import React, { useEffect, useState } from 'react'
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Image } from 'antd';

const { Meta } = Card;
const ProfileCard = (profile) => {
    console.log(profile)    
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<Image alt="example" src={profile.profile.img} />}>
            <Meta title={profile.profile.name} description="www.instagram.com" />
        </Card>
    )
}

export default ProfileCard