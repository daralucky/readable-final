import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AddNewPost extends Component {
    render() {
        return (
            <div id='add-new-post-block'>
                <p style={{ textAlign: 'center' }}>

                    <Link to='/add-new-post'>ADD NEW POST</Link>
                </p>
            </div>
        )
    }
}

export default AddNewPost