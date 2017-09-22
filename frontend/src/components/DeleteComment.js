import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commentDelete } from '../actions'
import Confirm from 'react-confirm-bootstrap'

class DeleteComment extends Component {

    onConfirmDeleteComment(id) {

        this.props.deleteComment(id)

    }

    render() {

        const { commentId } = this.props

        return (
            <span>
                <Confirm
                    onConfirm={() => this.onConfirmDeleteComment(commentId)}
                    body="Are you sure you want to delete this comment?"
                    confirmText="Confirm Delete"
                    title="Deleting Comment">
                    <a href='#delete-comment'> delete </a>
                </Confirm>
            </span>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteComment: (id) => (dispatch(commentDelete(id)))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(DeleteComment)

