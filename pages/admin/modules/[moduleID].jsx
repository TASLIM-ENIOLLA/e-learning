import {API} from '/config'
import {useEffect, useState} from 'react'
import {parseObjectToFormData} from '/functions'
import Template from '/components/dashboard/Template'
import {JWTVerficationComponent} from '/components/jwt'

export default function Index({jwt_token, module_id, account_type}){
    const [moduleData, setModuleData] = useState()
    const {
        id, name, mda_name, features, course_name, description, status, timestamp
    } = moduleData || {}

    useEffect(() => {
        fetch(API.admin.module_data, {
            method: 'POST',
            body: parseObjectToFormData({jwt_token, module_id})
        })
        .then(e => e.json())
        .then(({data}) => setModuleData(data))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <Template account_type = 'admin'>
                <div className="row a-i-c">
                    <div className = 'col-12 mb-4'>
                        <h4 className = 'theme-color text-capitalize'>Module "{name}"</h4>
                    </div>
                    <div className = 'col-12 pt-5'>{
                        (moduleData)
                        ? (
                            <>
                                <div className = 'mb-5 text-capitalize'>
                                    <h5 className = 'theme-color'>Name</h5>
                                    <p className = 'text-muted'>{name}</p>
                                </div>
                                <div className = 'mb-5 text-capitalize'>
                                    <h5 className = 'theme-color'>MDA</h5>
                                    <p className = 'text-muted'>{mda_name}</p>
                                </div>
                                <div className = 'mb-5 text-capitalize'>
                                    <h5 className = 'theme-color'>Course</h5>
                                    <p className = 'text-muted'>{course_name}</p>
                                </div>
                                <div className = 'mb-5 text-capitalize'>
                                    <h5 className = 'theme-color'>Features</h5>
                                    <p className = 'text-muted'>{
                                        features.map((each, index) => (
                                            <p key = {index} className = 'text-muted d-inline-block px-3 py-2 rounded-2x shadow mr-3 bg-warning mb-0'>{each}</p>
                                        ))
                                    }</p>
                                </div>
                                <div className = 'mb-5 text-capitalize'>
                                    <h5 className = 'theme-color'>Description</h5>
                                    <p className = 'text-muted'>{description}</p>
                                </div>
                                <div className = 'mb-5 text-capitalize'>
                                    <h5 className = 'theme-color'>Status</h5>
                                    <p className = 'text-muted'>{status}</p>
                                </div>
                                <div className = 'mb-5 text-capitalize'>
                                    <h5 className = 'theme-color'>Date Created</h5>
                                    <p className = 'text-muted'>{new Date(timestamp).toDateString()} {new Date(timestamp).toLocaleTimeString()}</p>
                                </div>
                                <div className = 'row d-none'>
                                    <div className = ''>
                                        <a href = {`./new`} className = 'p-3 d-block w-100 rounded-2x shadow bg-warning text-dark px-5 border-0'>Remove Course</a>
                                    </div>
                                </div>
                            </>
                        )
                        : <></>
                    }</div>
                </div>
            </Template>
        </JWTVerficationComponent>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}, query: {moduleID}} = context
    const cookie = cookies['E_LEARNING_ADMIN']

    if(!cookie) return {
        redirect: {
            destination: './'
        }
    }

    return {props: {
        module_id: moduleID,
        jwt_token: cookie,
        account_type: './admin'
    }}
}
