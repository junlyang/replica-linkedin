import React, { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import ProfileCard from '../partials/ProfileCard'
import styles from '../styles/Home.module.css'
import { Button } from 'antd';
import axios from 'axios';
import {getExperiences} from '../actions/experienceAction'
import {useDispatch,useSelector} from 'react-redux'

export default function Home() {
  const dispatch = useDispatch();
  const getExperiencesAciton = () => getExperiences('eomlyang').then(function(result){
    console.log('index',result)
    dispatch(result)}) 
  const {experiences} = useSelector((state) => state.experience);
  useEffect(() => {
    console.log('experiences',experiences)
  })
  return (
    <>
      <ProfileCard/>
      <Button type="primary" onClick={getExperiencesAciton} >get Experiences</Button>
      {experiences && experiences.map(obj=>
        <h1>{obj.company}</h1>)}
    </>
  )
}
