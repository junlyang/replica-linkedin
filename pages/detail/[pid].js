import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import {getUserById} from '../../actions/userAction'
import {useDispatch,useSelector} from 'react-redux'
const Detail = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pid = router.query.pid
    useEffect(() => getUserById(pid).then(dispatch),[pid])
    let user = useSelector((state)=>state.user.user)
    return (
        <>
            디테일 {pid}
            {user.username}
        </>
    )
}

export default Detail