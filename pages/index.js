import React, {useState,useCallback,useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import ProfileCard from '../partials/ProfileCard'
import styles from '../styles/Home.module.css'
import { useDispatch } from 'react-redux'
import { LOG_IN } from '../reducers/user'
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type:LOG_IN,
      data: {
        id: 'eomlyang',
        password: 'co2h2oco'
      }
    })
  }, []);
  return (
    <>
      <ProfileCard/>
    </>
  )
}
