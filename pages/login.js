import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {logIn,signUp} from '../actions/userAction'
import {useDispatch,useSelector} from 'react-redux'
import Router from "next/router";

const Login = () => {
    const {isLoggedIn} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const onFinish = (values) => {
        console.log('Success:', values);
        logIn({userId: values.username,password:values.password}).then(function(result){
            dispatch(result)
        }).then()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        console.log('isLoggedIn 값이 설정됨');
        console.log(isLoggedIn);
        return () => {
          console.log('isLoggedIn 가 바뀌기 전..');
          console.log(isLoggedIn);
        };
      }, [isLoggedIn]);
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

export default Login