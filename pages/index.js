import React, { useEffect, useState  } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import ProfileCard from '../partials/ProfileCard'
import styles from '../styles/Home.module.css'
import { Button } from 'antd';
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
  return (
    <>
      {profileList.map((profile,i) => <ProfileCard key={i} profile={profile}/>)}
      <Button type="primary" onClick={getProfileAction} >get ProfileAction</Button>
      <Button type="primary" onClick={checkLogIn}>로그인</Button>    </>
  )
}
