import React, { useEffect, useState  } from 'react'
import { Layout, Menu, Breadcrumb, Modal, Button, List, Avatar, Badge } from 'antd';
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import {acceptFollowRequest} from '../actions/followAction'
import {useDispatch,useSelector} from 'react-redux'

const AppLayout = ({ children }) => {
    const { Header, Content, Footer } = Layout;
    let me = useSelector((state) => state.user && state.user.me)
    let followsRequest = useSelector((state) => state.follow.followsRequest)
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const acceptRequest = (follow) => acceptFollowRequest(follow).then(dispatch)
    const router = useRouter()
    const goHome = () => router.push('/')
    
    const showModal = () => {
        setIsModalVisible(true);
      };
    
    const handleOk = () => {
        setIsModalVisible(false);
      };
    const handleCancel = () => {
        setIsModalVisible(false);
      };

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={goHome}>Home</Menu.Item>
               
                <Menu.Item key="2" onClick={showModal}>
                <Badge count={followsRequest.length}>Notifffications</Badge>
                </Menu.Item>
                <Menu.Item key="3"onClick={()=>followsRequest(me.id)}>요청확인</Menu.Item>
            </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                {children}
            </div>
            </Content>
            <Modal title="Notification" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <List
                    itemLayout="horizontal"
                    dataSource={followsRequest}
                    renderItem={item => (
                    <List.Item
                        actions={[<Button key="list-loadmore-edit" type="link"onClick={()=>acceptRequest(item)}>수락</Button>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={item.from.img} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={`${item.from.username} 님이 연결 친성 하셨습니다.`}
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
