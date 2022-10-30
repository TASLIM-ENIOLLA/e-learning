import {useEffect, useState} from 'react'
import {TopRibbon, NavBar, SearchBar, Footer, CourseCard} from '/components/pages'
import {toast} from '/components/toast'
import {server} from '/config'

export default function Courses({mdaID}){
    const [courses, setCourses] = useState()

    useEffect(() => {
        fetch(`${server.backend.url}/php/processes/User/GetCourses.php`)
        .then(e => e.json())
        .then(({data}) => setCourses(data))
    }, [])

    if(!courses) return <></>

    return (
        <section>
            <TopRibbon />
            <NavBar />
            <section className = 'fluid-padding border-top'>
                <div className = 'shadow py-5'>
                    <div className = 'p-4'>
                        <div className = 'pb-5 bold letter-spacing-1 text-capitalize text-c'>
                            <h2 className = 'thick-border-bottom d-inline-block pb-3 theme-color'>Available Courses</h2>
                        </div>
                        <div className = 'col-md-9 p-0'>
                            <img style = {{maxWidth: '700px'}} src = '/images/course.jpg' className = 'd-block w-100 rounded shadow border' />
                        </div>
                        <div className = 'py-4'>
                            <div className = 'row pt-4' style = {{margin: '0 -15px'}}>{(
                                (courses && courses.length > 0)
                                ? courses && courses.map(
                                    (each, key) => (
                                        <CourseCard href = {false} onClick = {() => {
                                            setToast({
                                                visible: true,
                                                theme: 'secondary',
                                                message: 'You have to be logged in before you can book a course!'
                                            })
                                        }} courseData = {each} key = {key} />
                                    )
                                )
                                : (
                                    <div className="col-lg-12 mx-auto px-3">
                                        <div className = 'bold letter-spacing-1 text-muted text-capitalize text-c border shadow-sm p-5 rounded-1x'>
                                            No course available
                                        </div>
                                    </div>
                                )
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </section>
    )
}
