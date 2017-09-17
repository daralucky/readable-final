import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Glyphicon } from 'react-bootstrap'

const AddNewPost = (props) => (
    <span className="pull-right">
        <Link to={{
            pathname: '/add-new-post',
            hash: `#${props.caller}`
        }}>
            <Button bsStyle="success" bsSize="sm"><Glyphicon glyph="plus" /> Add Post </Button>
        </Link>
    </span >
)

export default AddNewPost