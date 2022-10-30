import {useEffect} from "react"
import ReactDOM from 'react-dom'

export const toast = (props) => {
    if(document && !document.querySelector('#__popup .custom-toast')){
        ReactDOM.render(
            <Toast {...props} />,
            document.querySelector('#__popup')
        )
    }
}

const Toast = ({type = 'danger', message = 'Toast', onSuccess, callback, duration = 4000, onError}) => {

    duration = duration < 1000 ? 4000 : duration

    useEffect(() => {
        setTimeout(() => {
            type === 'success' && typeof onSuccess === 'function' ? onSuccess() : undefined
            type === 'danger' && typeof onError === 'function' ? onError() : undefined
            typeof callback === 'function' ? callback() : undefined

            ReactDOM.unmountComponentAtNode(
                document.querySelector(`#__popup`)
            )
        }, duration);
    }, [])

    return (
        <div className = "custom-toast po-fixed animated slideInDown top-0 left-0 w-100 p-4" style = {{zIndex: 5}}>
            <div style = {{maxWidth: "650px"}} className = {`mx-auto col-xs-12 col-md-10 col-lg-7 p-4 shadow text-white rounded bg-${type}`}>
                <div style = {{fontSize: "15px"}}>
                    {message}
                </div>
            </div>
        </div>
    )
}