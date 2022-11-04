import {API} from '/config'
import {useEffect, useState} from 'react'
import {parseObjectToFormData} from '/functions'
import Template from '/components/dashboard/Template'
import {JWTVerficationComponent} from '/components/jwt'

export default function Index({jwt_token, account_type}){
    const [courses, setCourses] = useState()

    useEffect(() => {
        fetch(API.admin.modules, {
            method: 'POST',
            body: parseObjectToFormData({jwt_token})
        })
        .then(e => e.json())
        .then(({data}) => setCourses(data))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <Template account_type = 'admin'>
                <div className="row a-i-c">
                    <div className = 'col-12 mb-4'>
                        <h4 className = 'theme-color'>Modules</h4>
                    </div>
                    <div className = 'col-12'>
                        <div className = 'mb-5 text-right'>
                            <a href = {`./modules/new`} className = 'p-3 rounded-2x shadow bg-success text-white px-5 border-0'>Add module</a>
                        </div>
                        <div className = 'table-responsive rounded-2x shadow'>
                            <table className = 'table table-striped m-0 overflow-0'>
                                <thead className = 'table-dark'>
                                    <tr>
                                        <td>S/N</td>
                                        <td>Name</td>
                                        <td className = 'text-center'>MDA</td>
                                        <td className = 'text-center'>Course</td>
                                        <td className = 'text-center'>Description</td>
                                        <td className = 'text-center'>Video</td>
                                        <td className = 'text-center'>More</td>
                                    </tr>
                                </thead>
                                <tbody className = 'table-light'>{
                                    (courses)
                                    ? (
                                        (courses.length > 0)
                                        ?   courses.map(({id, name, mda_name, course_name, description, status}, index) => (
                                            <tr className = 'text-capitalize' key = {id}>
                                                <td>{++index}</td>
                                                <td>{name}</td>
                                                <td className = 'text-center'>{mda_name}</td>
                                                <td className = 'text-center'>{course_name}</td>
                                                <td className = 'text-center'>{description}</td>
                                                <td className = 'text-center'>{status}</td>
                                                <td className = 'text-center'>
                                                    <a href = {`./modules/${id}`} className = 'underline theme-color'>
                                                        <span>see more</span>
                                                        <span className = 'ml-3 bi-box-arrow-up-right'></span>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                        : (
                                            <tr>
                                                <td colSpan = '7'>
                                                    <div className = 'p-5 text-center bold text-muted'>Empty rows returned!</div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                    : (
                                        (courses === undefined)
                                        ? (
                                            <tr>
                                                <td colSpan = '7'>
                                                    <div className = 'p-5 text-center bold text-muted'>Loading...</div>
                                                </td>
                                            </tr>
                                        )
                                        : (
                                            <tr>
                                                <td colSpan = '7'>
                                                    <div className = 'p-5 text-center bold text-muted'>Couldn't retrieve data!</div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                }</tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <style>{`
                    thead td{
                        font-weight: 900;
                        letter-spacing: 1px;
                    }
                    td{
                        padding: 20px 15px !important;
                    }
                `}</style>
            </Template>
        </JWTVerficationComponent>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}} = context
    const cookie = cookies['E_LEARNING_ADMIN']

    if(!cookie) return {
        redirect: {
            destination: './'
        }
    }

    return {props: {
        jwt_token: cookie,
        account_type: './admin'
    }}
}
