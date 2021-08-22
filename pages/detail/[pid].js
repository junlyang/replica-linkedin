import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import {getUserById,patchOpen} from '../../actions/userAction'
import { Descriptions, Badge, Image, List, Button, Skeleton } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import { getFollows, addFollow, acceptFollowRequest } from '../../actions/followAction';

const Detail = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [pid,setPid ]= useState(router.query.pid || null);
    const [user,setUser] = useState(null)
    const [follows,setFollows] = useState([])
    
    let me = useSelector((state)=>state.user.me)
    let myConnections = useSelector((state)=>state.follow.follows)
    let win = null;

    useEffect(() => pid && getUserById(pid).then((result)=>{
        setUser(result.payload),
        getFollows(result.payload.id).then((followers)=>setFollows(followers.payload))
    }),[pid])
    useEffect (()=>{setPid(router.query.pid)},[router])

    const followRequest = (from,to) => {
        console.log(from,to)
        from ? addFollow({from:from,to:to}).then(dispatch) : router.push('/login')
    }
    const acceptRequest = (follow) => acceptFollowRequest(follow).then((result)=>{
        dispatch(result),
        setFollows({follows:[...follows.map(obj => obj.id == follow.id ? {...obj,isAccepted:true}:obj)]})
    })
    const connectRequest = (follows=[],me=null,user=null) => {
        let request = me && follows.filter(follow => follow.from.id == user.id)[0]
        return request ? request.isAccepted ? "이미 친구" : <Button onClick={()=>acceptRequest(request)}>수락하기</Button> : ""
    }
    const connectRespopnse = (follows=[],me=null,user=null) => {
        let response = me && follows.filter(follow => follow.to.id == user.id)[0]
        return response ? response.isAccepted ? "이미 친구" : "요청중" : ""
    }
    const connect = (follows=[],me=null,user=null) => {
        me && follows.filter(follow => follow.to.id == user.id || follow.from.id == user.id)
        const result = !me ? <Button onClick={(()=>router.push('/login'))}>Connect</Button> 
        : follows.filter(follow => follow.to.id == user.id || follow.from.id == user.id).length == 0 && <Button onClick={(()=>followRequest(me,user))}>Connect</Button>
        
        return result
    }

    const isFriend = (follows=[],me=null,user=null) => {
        return me && user && me.id == user.id ? 
            '나다' :
            [connectRequest(follows,me,user),connectRespopnse(follows,me,user),connect(follows,me,user)]
    }
    var openDialog = function(uri, name, options, closeCallback) {
        win = window.open(uri, name, options);
        var interval = window.setInterval(function() {
            try {
                if (win == null || win.closed) {
                    window.clearInterval(interval);
                    closeCallback(win);
                }
            }
            catch (e) {
            }
        }, 1000);
        return win ;
    };
    const goEditExperience = (id) => {
        openDialog(`http://localhost:1337/admin/plugins/content-manager/collectionType/application::experiences.experiences/${id}`, "자식", null, function(win) {
            getUserById(pid).then((result)=>{setUser(result.payload)})
        });
    }
    const goEditProfile = (id) => {
        openDialog(`http://localhost:1337/admin/plugins/content-manager/collectionType/plugins::users-permissions.user/${id}`, "자식", null, function(win) {
            getUserById(pid).then((result)=>{setUser(result.payload)})
        });
    }

    const isOpen = (user) => {
        patchOpen(user).then((result)=>{dispatch(result),setUser({
            ...user,opened: !user.opened
        })})
    }
    return (
        <>
            {user &&
            <>
                <Descriptions title="User Info" bordered>
                    <Descriptions.Item label="Img" span={3}><Image src={user.img} width={200}></Image></Descriptions.Item>
                    <Descriptions.Item label="Name">{user.username}</Descriptions.Item>

                    <Descriptions.Item label="Open"span={2}>{isFriend(myConnections,me,user)}</Descriptions.Item>
                    <Descriptions.Item label="Connections">
                        {follows && follows.filter(follow => follow.isAccepted).length}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        {me && user.id == me.id ? 
                        <><Button onClick={()=>goEditProfile(me.id)}>프로필수정</Button><Button onClick={()=>isOpen(me)}>{user.opened ? 'OPEN TO' : 'CLOSE'}</Button></> 
                        : <>{user.opened ? "OPEN TO" : "CLOSE"}</>}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Experiences" span={3}>
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={user.experiences}
                        renderItem={(item,i) => (
                        <List.Item
                            key={i}
                            actions={[me && user.id == me.id && <Button key="list-loadmore-more" type="link" onClick={()=>goEditExperience(item.id)} >Edit</Button>]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">{item.company}</a>}
                                    description={item.role}
                                />
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