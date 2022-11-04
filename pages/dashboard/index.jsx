import Template from '/components/dashboard/Template'
import {JWTVerficationComponent} from '/components/jwt'
import {parseObjectToFormData} from '/functions'
import {API} from '/config'
import {useState, useEffect} from 'react'

export default function Index({jwt_token}){
    const [pageData, setPageData] = useState({
        available_courses: {
            count: 0,
            title: 'available-courses',
            icon: 'journals'
        },
        registered_courses: {
            count: 0,
            title: 'registered-courses',
            icon: 'journal'
        },
        completed_courses: {
            count: 0,
            title: 'completed-courses',
            icon: 'journal-check'
        }
    })

    useEffect(() => {
        fetch(API.dashboard.available_courses, {method: 'POST', body: parseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({type, message, data}) => setPageData((currentValue) => ({
            ...currentValue,
            available_courses: {
                ...currentValue.available_courses,
                count: data
            }
        })))

        fetch(API.dashboard.registered_courses, {method: 'POST', body: parseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({type, message, data}) => setPageData((currentValue) => ({
            ...currentValue,
            registered_courses: {
                ...currentValue.registered_courses,
                count: data
            }
        })))

        fetch(API.dashboard.completed_courses, {method: 'POST', body: parseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({type, message, data}) => setPageData((currentValue) => ({
            ...currentValue,
            completed_courses: {
                ...currentValue.completed_courses,
                count: data
            }
        })))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <Template>
                <div className="row a-i-c">
                    <div className = 'col-12 mb-4'>
                        <h4 className = 'theme-color'>My engagements</h4>
                    </div>{
                    Object.values(pageData).map((routes, index) => (
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4" key = {`${new Date().getTime()}-${index}`}>
                            <CoursesCards {...routes} />
                        </div>
                    ))
                }</div>
            </Template>
        </JWTVerficationComponent>
    )
}

function CoursesCards({icon, count, title}){

    return (
        <a href = {`./dashboard/courses?c=${title}`} className = 'blocks bg-white rounded-1x shadow-sm py-4 px-2 d-block w-100 underline-0'>
            <div className="row">
                <div className="col">
                    <div className="text-muted text-capitalize mb-2 one-line">{title.replace('-', ' ')}</div>
                    <h3 className="text-primary bold m-0 one-line">{new Intl.NumberFormat().format(count)}</h3>
                </div>
                <div className="col-auto">
                    <div className="bg-light px-3 py-2 border rounded-lg">
                        <div className={`bi bi-${icon} fa-2x text-muted`}></div>
                    </div>
                </div>
            </div>
            <style>{`
                .blocks{
                    min-height: 120px;
                    background-position: center;
                    background-size: center;
                }
            `}</style>
        </a>
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
