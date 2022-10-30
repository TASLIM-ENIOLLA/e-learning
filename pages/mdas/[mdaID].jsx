import {useEffect, useState} from 'react'
import {TopRibbon, NavBar, SearchBar, Footer, CourseCard} from '../../components/pages'
import {toast} from '../../components/toast'
import {server} from '../../config'

export default function Index({mdaID}){
    const [MDAData, setMDAData] = useState()

    useEffect(() => {
        fetch(`${server.backend.url}/php/processes/user/mda-data.php?mdaID=${mdaID}`)
        .then(res => res.json())
        .then(({data}) => setMDAData(data))
    }, [])

    if(!MDAData){
        return <></>
    }

    return (
        <section>
            <TopRibbon />
            <NavBar />
            <section className = 'fluid-padding border-top'>
                <div className = 'shadow py-5'>
                    <div className = 'p-4'>
                        <div className = 'pb-5 bold letter-spacing-1 text-capitalize text-c'>
                            <h2 className = 'thick-border-bottom d-inline-block pb-3 theme-color'>MDA</h2>
                        </div>
                        <div className = 'col-md-9 p-0'>
                            <img style = {{maxWidth: '700px'}} src = '/images/course.jpg' className = 'd-block w-100 rounded shadow border' />
                        </div>
                        <div className = 'mt-5'>
                            <h2 className = 'text-capitalize bold letter-spacing-1'>{MDAData.name}</h2>
                            <p className = 'bold letter-spacing-1'>
                                <span className = 'text-orange text-capitalize'>{MDAData.type}</span>
                            </p>
                        </div>
                        <hr />
                        <div className = 'py-4'>
                            <h4 className = 'text-capitalize bold letter-spacing-1 mb-3'>MDA description:</h4>
                            <p className = 'text-capitalize mb-0 fo-s-16'>
                                {MDAData.description}
                            </p>
                        </div>
                        <hr />
                        <div className = 'py-4'>
                            <h4 className = 'text-capitalize bold letter-spacing-1'>MDA courses</h4>
                            <div className = 'bold letter-spacing-1 mb-3'>
                                <span className = 'text-orange text-capitalize'>{MDAData.courses.length} courses</span>
                            </div>
                            <div className = 'row pt-4' style = {{margin: '0 -15px'}}>{(
                                (MDAData.courses.length > 0)
                                ? MDAData.courses.map(
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
                                            No course under this MDA
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

export const getServerSideProps = (context) => {
    const {query: {mdaID}} = context

    return {
        props: {
            mdaID
        }
    }
}
