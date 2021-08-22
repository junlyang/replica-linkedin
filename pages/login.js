import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { logIn, signUp } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getFollows, getFollowsRequest } from '../actions/followAction'
import io from 'socket.io-client';

const LogIn = () => {
    let isLoggedIn = useSelector((state) => state.user && state.user.isLoggedIn)
    const [me,setMe] = useState(null)

    const router = useRouter()
    const dispatch = useDispatch();
    const socket = io.connect('http://localhost:4002', { transports: ['websocket'] })

    const onFinish = (values) => {
        console.log('Success:', values);
        logIn({userId: values.username,password:values.password}).then((result)=>{
            dispatch(result),
            setMe(result.user),
            getFollows(result.user.id).then(dispatch),
            getFollowsRequest(result.user.id).then(dispatch),
            connectSocketServer(result.user)
        })
    };
    const connectSocketServer = (user) => {
        console.log('action socekt',socket)    
        socket.emit('login',{ uid: user.id})
    }
    useEffect(()=>{
        socket.on('followRequest',({uid})=>{
          me && me.id == uid && getFollowsRequest(me.id).then(dispatch)
        }),
        socket.on('followAccept',({uid})=>{
            me && me.id == uid && getFollows(me.id).then(dispatch)
          })
    },[me])

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => isLoggedIn && router.back(),[isLoggedIn]);
    useEffect(()=>console.log('LOGIN PAGE ',me),[me])
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LogIn