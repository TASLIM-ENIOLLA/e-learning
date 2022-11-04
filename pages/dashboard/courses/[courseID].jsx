import {useEffect, useState} from 'react'
import {toast} from '/components/toast'
import {server, API} from '/config'
import {parseObjectToFormData} from '/functions'
import Template from '/components/dashboard/Template'
import {JWTVerficationComponent} from '/components/jwt'

export default function CourseID({jwt_token, course_id}){
    const [courseData, setCourseData] = useState()
    const {name, course_modules} = courseData || {}

    useEffect(() => {
        fetch(API.dashboard.course_data, {
            method: 'POST',
            body: parseObjectToFormData({jwt_token, course_id})
        })
        .then(e => e.json())
        .then(({data}) => setCourseData(data))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <Template title = 'courses'>
                <section>
                    <div className = 'py-5'>
                        <div className = 'p-4'>
                            <div className = 'col-12 mb-4 p-0'>
                                <h4 className = 'theme-color text-capitalize'>Course "{name}"</h4>
                            </div>
                            <div className = 'col-md-9 p-0'>
                                <img style = {{maxWidth: '700px'}} src = '/images/course.jpg' className = 'd-block w-100 rounded shadow border' />
                            </div>
                            <div className = 'py-4'>{
                                (course_modules && typeof course_modules === 'object')
                                ? course_modules.map(({name, id}) => (
                                    <div className = 'd-flex a-i-c mb-4'>
                                        <span className = 'bi-camera-video-fill mr-3 fa-2x'></span>
                                        <a href = {`../modules/${id}`} className = 'h5 text-sentence underline m-0'>{name}</a>
                                    </div>
                                ))
                                : undefined
                            }</div>
                        </div>
                    </div>
                </section>
            </Template>
        </JWTVerficationComponent>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}, query: {courseID}} = context
    const cookie = cookies['E_LEARNING']

    if(!cookie) return {
        notFound: true
    }

    return {
        props: {
            course_id: courseID,
            jwt_token: cookie
        }
    }
}
