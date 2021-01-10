import React from 'react'
import { Link } from 'react-router-dom'

 const CreateEventButton = () => {
    return (
        <React.Fragment>
            <Link to="/addEvent" className="btn btn-lg btn-info">
            Create new Event
            </Link>
        </React.Fragment>
    )
}
export default CreateEventButton;
