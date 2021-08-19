import React, { useEffect, useState  } from 'react'
import ProfileCard from '../partials/ProfileCard'
import styles from '../styles/Home.module.css'
import { List, Avatar, Button, Skeleton } from 'antd';
import axios from 'axios';
import {getExperiences} from '../actions/experienceAction'
import {getProfiles} from '../actions/profileAction'
import {logIn,signUp} from '../actions/userAction'
import {useDispatch,useSelector} from 'react-redux'
import router from 'next/router'

export default function Home() {
  const dispatch = useDispatch();
  const getProfileAction = () => getProfiles().then(function(result){
    console.log('index',result)
    dispatch(result)}
  ) 
  let isLoggedIn = useSelector((state) => state.user && state.user.isLoggedIn)
  //useEffect(() => !isLoggedIn && router.push('/login'), [isLoggedIn]);

  const checkLogIn = () => logIn({userId: 'eomlyang@gmail.com',password:'co2h2oco'}).then(function(result){
    dispatch(result)
  }) 
  let profileList = useSelector(state =>state.profile && state.profile.profiles)
  
  const [initLoading,setInitLoading] = useState(false)
  const loadMore =
      !initLoading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button >loading more</Button>
        </div>
      ) : null;
  return (
    <>
      <Button type="primary" onClick={getProfileAction} >get ProfileAction</Button>
      <Button type="primary" onClick={checkLogIn}>로그인</Button>    
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={profileList}
        renderItem={item => (
          
          <List.Item
            actions={[<a key="list-loadmore-edit">Follow</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.img} />
                }
                title={<a href="https://ant.design">{item.name}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  )
}
