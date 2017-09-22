import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Glyphicon } from 'react-bootstrap'

const EditPost = (props) => (
    <span>
        <Link to={{
            pathname: `/edit-post/${props.postId}`,
            caller: props.caller
        }}>
            <Button bsStyle="warning" bsSize="xsmall">
                <Glyphicon glyph="pencil" /> Edit
            </Button>
        </Link>
    </span >
)

export default EditPost