import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import {getUserById} from '../../actions/userAction'
import { Descriptions, Badge, Image, List, Button, Skeleton } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import { getFollows, addFollow } from '../../actions/followAction';

const Detail = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pid = router.query && router.query.pid;
    
    useEffect(() => getUserById(pid).then((result)=>{
        dispatch(result),
        result && result.payload && getFollows(result.payload.id).then(dispatch)
        }),[pid])
    
    function goAdmin() {
       const win = window.open('http://localhost:1337/admin/plugins/content-manager/collectionType/plugins::users-permissions.user/611b438b38e83a906f7b05c7', '_blank')
    }
    const followRequest = (from,to) => {
        addFollow({from:from,to:to}).then(dispatch)
    }

    let user = useSelector((state)=>state.user.user)
    let me = useSelector((state)=>state.user.me)
    let follows = useSelector((state)=>state.follow.follows)
    const isFriend = (followers = [],me=null,user=null) => {
        const follow = follow && me && followers.filter(follow => follow.from.id == me.id || follow.to.id == me.id )[0]
        const result = follow ? follow.isAccepted ? "friend" : "pending" : 
        <Button onClick={()=> me ? followRequest(me,user) : router.push('/login')}>Connection</Button>
        return result
    }


    return (
        <>
            {user &&
            <>
                <Descriptions title="User Info" bordered>
                    <Descriptions.Item label="Img" span={3}><Image src={user.img}></Image></Descriptions.Item>
                    <Descriptions.Item label="Name">{user.username}</Descriptions.Item>

                    <Descriptions.Item label="Billing Mode"span={2}>{isFriend(follows,me,user)}</Descriptions.Item>
                    <Descriptions.Item label="Connections">
                        {follows.filter(follow => follow.isAccepted).length}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running" />
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Experiences" span={3}>
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={user.experiences}
                        renderItem={item => (
                        <List.Item
                            actions={[
                            <Button key="list-loadmore-more" type="link" onClick={()=>console.log(11)}>Edit</Button>]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">{item.company}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                                <div>content</div>
                            </Skeleton>
                        </List.Item>
                        )}
                    />
                    </Descriptions.Item>
                </Descriptions>
            </>
            }
        </>
    )
}

export default Detail