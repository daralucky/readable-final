import React from 'react'
import { Link } from 'react-router-dom'

const EditComment = (props) => (
    <span>
        <Link to={{
            pathname: `/edit-comment/${props.commentId}`,
            caller: props.caller
        }}>
            edit
        </Link>
    </span>
)

export default EditComment