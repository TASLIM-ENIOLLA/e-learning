import Template from '/components/dashboard/Template'
import {JWTVerficationComponent} from '/components/jwt'
import {parseObjectToFormData} from '/functions'
import {API} from '/config'
import {useState, useEffect} from 'react'

export default function MyCourses({jwt_token}){
    const [courses, setCourses] = useState()

    useEffect(() => {
        fetch(API.dashboard.registered_courses_list, {method: 'POST', body: parseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({type, message, data}) => setCourses(data))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <Template title = 'courses'>
                <div className = 'row'>
                    <div className = 'col-12 mb-4'>
                        <h4 className = 'theme-color'>All courses</h4>
                    </div>{
                        (courses)
                        ? (
                            (courses.length > 0)
                            ? courses.map(each => (
                                <div className = 'col-6 col-sm-6 col-md-4 col-lg-3 mb-4'>
                                    <CoursesCard {...each} />
                                </div>
                            ))
                            : (
                                <div className = 'col-12 mb-4'>
                                    <div className = 'text-muted bold text-center p-5 shadow-sm rounded-2x'>
                                        You have not enrolled for any course!
                                    </div>
                                </div>
                            )
                        )
                        : (
                            (courses === undefined)
                            ? (
                                <div className = 'col-12 mb-4'>
                                    <div className = 'text-muted bold text-center p-5 shadow-sm rounded-2x'>
                                        Loading...
                                    </div>
                                </div>
                            )
                            : (
                                <div className = 'col-12 mb-4'>
                                    <div className = 'text-muted bold text-center p-5 shadow-sm rounded-2x'>
                                        Couldn't retrive any data!
                                    </div>
                                </div>
                            )
                        )
                    }
                    </div>
            </Template>
        </JWTVerficationComponent>
    )
}

function CoursesCard({course_name, courseID, module_progress, course_description}){
    return (
        <div className = 'overflow-0 rounded-2x border d-flex flex-column'>
            <div className = 'card-bg'></div>
            <div className = 'p-3 border-top'>
                <p className = 'bold text-dark mb-2'>
                    <a href = {`./courses/${courseID}`} className = 'underline-0 text-capitalize'>{course_name}</a>
                </p>
                <p className = 'text-muted mb-3 double-line text-sentence'>{course_description}</p>
                <p className = 'text-muted m-0'>Completed {module_progress?.data?.length}/{module_progress?.total} modules</p>
            </div>
            <style jsx>{`
                .card-bg{
                    min-height: 130px;
                    background-size: cover;
                    background-position: center;
                    background-image: linear-gradient(rgba(50,50,50,.6), rgba(50,50,50,.6)), url(/images/course.jpg);
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
