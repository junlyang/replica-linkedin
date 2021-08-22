import { signUp } from '../actions/userAction'

const DummyUsers = [
    {
        username: 'Dummy 1',
        email: 'dumm1@gmail.com',
        password: '12341234',
        img: 'https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-sign-collection-avatar-image-stock-symbol-web-vector-design-avatar-dummy-137160097.jpg',
        experiences : [
            {company:'company1',role:'senior'},
            {company:'company2',role:'senior'},
            {company:'company3',role:'senior'}
        ]
    },
    {
        username: 'Dummy 2',
        email: 'dumm2@gmail.com',
        password: '12341234',
        img : 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png'
    },
    {
        username: 'Dummy 3',
        email: 'dumm3@gmail.com',
        password: '12341234',
        img: 'https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105477/115490218-vector-illustration-of-avatar-and-dummy-icon-set-of-avatar-and-image-vector-icon-for-stock-.jpg'
    },
    {
        username: 'Dummy 4',
        email: 'dumm4@gmail.com',
        password: '12341234',
        img: 'https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-logo-set-image-stock-isolated-object-icon-collection-137161298.jpg'
    },
    {
        username: 'Dummy 5',
        email: 'dumm5@gmail.com',
        password: '12341234',
        img: 'https://www.pngkit.com/png/full/349-3499672_kevin-wooster-dummy-profile.png'
    },
]

export const createDummyUsers = (Users=DummyUsers) => {
    console.log(Users)
    Users.map((user)=>signUp(user))
}