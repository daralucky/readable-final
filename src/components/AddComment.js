import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Glyphicon } from 'react-bootstrap'

const AddComment = (props) => (
    <span className="pull-right">
        <Link to={{
            pathname: `/add-comment/${props.postId}`,

            caller: props.caller
        }}>
            <Button bsStyle="success" bsSize="xsmall">
                <Glyphicon glyph="plus" /> Add Comment
            </Button>
        </Link>
    </span >
)

export default AddComment