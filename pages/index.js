import React, { useEffect, useState  } from 'react'
import { List, Avatar, Button, Skeleton } from 'antd';
import {logIn,getUsers} from '../actions/userAction'
import {addFollow, getFollows, getFollowsRequest} from '../actions/followAction'
import {useDispatch,useSelector} from 'react-redux'
import {createDummyUsers} from '../utils/dummyInsert'
import router from 'next/router'
import io from 'socket.io-client';

export default function Home() {
  const dispatch = useDispatch();
  const getUsersAction = () => getUsers().then((result)=>{dispatch(result)})
  const followers = (id) => getFollows(id).then(dispatch)
  let isLoggedIn = useSelector((state) => state.user && state.user.isLoggedIn)
  let me = useSelector((state) => state.user && state.user.me)
  let follows = useSelector((state) => state.follow && state.follow.follows)
  
  let users = useSelector(state =>state.user && state.user.users)
  const follow = (from,to) => {addFollow({from: from,to: to}).then((result)=>dispatch(result))}
 
  useEffect(()=>{
    getUsersAction()
  },[])
  
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
          <Button onClick={getUsersAction}>loading more</Button>
        </div>
      ) : null;

  return (
    <>
      <Button type="primary" onClick={()=>createDummyUsers()}>더미생성</Button>  
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={users}
        renderItem={(item,i) => (
          <List.Item
            actions={[<Button key="list-loadmore-more" type="link" onClick={()=>router.push('/detail/'+item.id)}>
              {isLoggedIn && me.id == item.id ? "It's me":"more"}
              </Button>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.img} />
                }
                key={i}
                title={<a href="https://ant.design">{item.username}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  )
}
