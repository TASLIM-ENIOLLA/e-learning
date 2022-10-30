import {useEffect, useState} from 'react'
import {TopRibbon, NavBar, SearchBar, Footer, Banner, CourseCard} from '../components/pages'
import {toast} from '../components/toast'
import {server} from '../config'

export default function Index(){
    const [courseList, setCourseList] = useState([])

    useEffect(() => {
        fetch(`${server.backend.url}/php/processes/admin/courses.php`)
        .then(res => res.json())
        .then(({data}) => setCourseList(data))
    }, [])

    return (
        <section>
            <TopRibbon />
            <NavBar />
            <SearchBar />
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
                                    (courseList.length > 0)
                                    ? courseList.map((each, key) => (
                                        <CourseCard onClick = {() => {
                                            if(accountType === 'user'){
                                                window.location = `/courses/${each.id}`
                                            }
                                            else{
                                                toast({
                                                    type: 'secondary',
                                                    message: 'You have to be logged in before you can book a course!'
                                                });
                                            }
                                        }} courseData = {each} key = {key} />
                                    ))
                                    : (
                                        <div className = 'p-5 mx-auto col-lg-10'>
                                            <div className = 'border shadow-sm rounded-1x p-5 text-c text-muted bold letter-spacing-1 text-capitalize'>
                                                There are no other courses available
                                            </div>
                                        </div>
                                    )
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
