import Template from '/components/dashboard/Template'
import {JWTVerficationComponent} from '/components/jwt'
import {parseObjectToFormData} from '/functions'
import {API} from '/config'
import {useEffect, useState} from 'react'

export default function MyCourses({jwt_token}){

    useEffect(() => {
        fetch(API.dashboard.profile, {method: 'POST', body: parseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then((e) => console.log(e))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <Template title = 'profile'>
                <div className = 'row'>
                    <div className = 'col-12 mb-4'>
                        <h4 className = 'theme-color'>User profile</h4>
                    </div>
                    <div className = 'col-12 mx-auto- mb-4' style = {{maxWidth: '650px'}}>
                        <div className = 'bg-white rounded-2x py-5 border mb-5'>
                            <div className = 'container-fluid'>
                                <div className = 'row'>
                                    <div className = 'col-12 mb-5'>
                                        <UserProfileImg />
                                    </div>
                                    <div className = 'col-md-6 mb-4'>
                                        <p className = 'mb-1 bold'>First name</p>
                                        <input type = 'text' className = 'd-block w-100 p-3 border rounded-1x' />
                                    </div>
                                    <div className = 'col-md-6 mb-4'>
                                        <p className = 'mb-1 bold'>Last name</p>
                                        <input type = 'text' className = 'd-block w-100 p-3 border rounded-1x' />
                                    </div>
                                    <div className = 'col-12 mb-4'>
                                        <p className = 'mb-1 bold'>Email address</p>
                                        <input type = 'email' className = 'd-block w-100 p-3 border rounded-1x' />
                                    </div>
                                    <div className = 'col-md-6 mb-4'>
                                        <p className = 'mb-1 bold'>Employee ID</p>
                                        <input type = 'text' className = 'd-block w-100 p-3 border rounded-1x' />
                                    </div>
                                    <div className = 'col-md-6 mb-4'>
                                        <p className = 'mb-1 bold'>MDA type</p>
                                        <input type = 'text' className = 'd-block w-100 p-3 border rounded-1x' />
                                    </div>
                                    <div className = 'col-12 mb-4'>
                                        <p className = 'mb-1 bold'>MDA name</p>
                                        <input type = 'text' className = 'd-block w-100 p-3 border rounded-1x' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Template>
        </JWTVerficationComponent>
    )
}

function UserProfileImg(){
    return (
        <div className = 'bg-white user-profile-bg po-rel rounded-circle border shadow-sm mx-auto'>
            <button title = 'Change profile image' className = 'po-abs bottom-0 right-0 shadow-sm px-2 py-1 rounded-2x border-0 theme-bg'>
                <span className = 'bi-pencil fo-s-16 text-white'></span>
            </button>
            <style jsx>{`
                .user-profile-bg{
                    width: 140px;
                    height: 140px;
                }
            `}</style>
        </div>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}, resolvedUrl} = context
    const cookie = cookies['E_LEARNING']

    if(!cookie) return {
        notFound: true
    }

    return {
        props: {
            jwt_token: cookie
        }
    }
}
