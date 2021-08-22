import React, { useEffect, useState  } from 'react'
import { Layout, Menu, Breadcrumb, Modal, Button, List, Avatar, Badge } from 'antd';
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import {acceptFollowRequest,rejectFollowRequest,getFollowsRequest, getFollows} from '../actions/followAction'
import {useDispatch,useSelector} from 'react-redux'

const AppLayout = ({ children }) => {
    const { Header, Content, Footer } = Layout;
    const router = useRouter();
    let me = useSelector((state) => state.user && state.user.me)
    let followsRequest = useSelector((state) => state.follow.followsRequest)
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const acceptRequest = (follow) => 
    {
        acceptFollowRequest(follow).then(dispatch),
        getFollows(me.id).then(dispatch)
    }
    const rejectRequest = (follow) => rejectFollowRequest(follow).then(dispatch)
    
    const showModal = () => {
        setIsModalVisible(true);
      };
    
    const handleOk = () => {
        setIsModalVisible(false);
      };
    const handleCancel = () => {
        setIsModalVisible(false);
      };
    
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background:'white' }}>
            <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={()=>router.push('/')}>Home</Menu.Item>
                <Menu.Item key="2" onClick={showModal}>
                <Badge count={followsRequest.length}>Notifffications</Badge>
                </Menu.Item>
                {me ? <Menu.Item key="3">{me.username}</Menu.Item> :<Menu.Item key="3"onClick={()=>router.push('/login')}>로그인</Menu.Item>}
            </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                {children}
            </div>
            </Content>
            <Modal title="Notification" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <List
                    itemLayout="horizontal"
                    dataSource={followsRequest}
                    renderItem={(item,i) => (
                    <List.Item
                        key={i}
                        actions={[
                        <Button key="list-loadmore-edit" type="link"onClick={()=>acceptRequest(item)}>수락</Button>,
                        <Button key="list-loadmore-edit" type="link"onClick={()=>rejectRequest(item)}>거부</Button>
                        ]}>
                        <List.Item.Meta
                        avatar={<Avatar src={item.from.img} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={`${item.from.username} 님이 연결 신청 하셨습니다.`}
                        />
                    </List.Item>
                    )}
                />
            </Modal>
        </Layout>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node,
}
export default AppLayout
