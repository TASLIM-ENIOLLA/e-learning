import {useEffect, useState} from 'react'
import {TopRibbon, NavBar, SearchBar, Footer, Banner} from '../components/pages'
import {toast} from '../components/toast'
import {server, API} from '../config'
import {parseObjectToFormData} from '/functions'

export default function Index(){
    const [courseList, setCourseList] = useState([])

    useEffect(() => {
        fetch(API.user.courses, {
            method: 'POST',
            body: parseObjectToFormData({account_type: 'user'})
        })
        .then(res => res.json())
        .then(({data}) => setCourseList(data))
    }, [])

    return (
        <section>
            <TopRibbon />
            <NavBar />
            <Banner />
            <section>
                <div className = 'py-5'>
                    <div className = 'py-5'>
                        <div className = 'px-4'>
                            <h1 className = 'text-c text-capitalize mb-3'>discover <span className = 'text-orange h1'>more</span></h1>
                            <p className = 'fo-s-15 text-c'>
                                Fusce id sem at ligula laoreet hendrerit venenatis sed purus. Ut pellentesque maximus lacus, nec pharetra augue.
                            </p>
                            <div className="row mx-auto mt-5" style = {{maxWidth: '600px'}}>
                                <a href = '/log-in' className = 'col-xs-12 col-md-6 mb-4'>
                                    <div className="py-5 text-capitalize text-c px-3 rounded-1x shadow fo-s-18px text-white w-100 h-100 login-bg">log in</div>
                                </a>
                                <a href = '/sign-up' className = 'col-xs-12 col-md-6 mb-4'>
                                    <div className="py-5 text-capitalize text-c px-3 rounded-1x shadow fo-s-18px text-white w-100 h-100 signup-bg">sign up</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'py-5 bg-light'>
                    <div className = 'py-5'>
                        <div className = 'px-4'>
                            <h1 className = 'text-c text-capitalize mb-3'>
                                popular <span className = 'text-orange h1'>courses</span>
                            </h1>
                            <p className = 'fo-s-18px text-c'>
                                Fusce id sem at ligula laoreet hendrerit venenatis sed purus. Ut pellentesque maximus lacus, nec pharetra augue.
                            </p>
                            <div className = 'container mt-5'>
                                <div className = 'row'>{(
                                    (courseList)
                                    ? (courseList.length > 0)
                                        ? courseList.map((each, key) => (
                                            <CourseCard {...each} key = {key} />
                                        ))
                                        : (
                                            <div className = 'p-5 mx-auto col-lg-10'>
                                                <div className = 'border shadow-sm rounded-1x p-5 text-c text-muted bold letter-spacing-1 text-capitalize'>
                                                    There are no other courses available
                                                </div>
                                            </div>
                                        )
                                    : <></>
                                )}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </section>
    )
}


export const CourseCard = ({name, mda_name, description, modules}) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mb-5">
            <div className = 'row p-3 border bg-white rounded-1x'>
                <div className = 'col-xs-12 px-0'>
                    <div style = {{width: '150px', height: '150px'}} className = 'border signup-bg rounded'></div>
                </div>
                <div className = 'col-xs-12 col px-0 flex-1 px-3 py-2'>
                    <div className = 'text-capitalize flex-h bold letter-spacing-1'>
                        <span className = 'flex-1 fo-s-20 text-orange pb-2 single-line'>{name}</span>
                    </div>
                    <div className = 'text-capitalize flex-h bold letter-spacing-1'>
                        <span className = 'flex-1 fo-s-15 pb-2 single-line'>{mda_name}</span>
                    </div>
                    <div className = 'text-capitalize flex-h'>
                        <span className = 'flex-1 pb-2 single-line'>{description}</span>
                    </div>
                    <div className = 'row mt-3'>
                        <div className="col-12 px-0">
                            <button onClick = {() => toast({type: 'secondary', message: 'Please login to view course data'})} className = 'd-block text-c w-100 px-4 py-2 border rounded shadow underline-0 text-white single-line text-capitalize light-blue-btn'>view course</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
