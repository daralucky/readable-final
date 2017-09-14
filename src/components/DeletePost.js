import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { postDelete, updateSettings, postUpdateChildrenComment } from '../actions'
import Confirm from 'react-confirm-bootstrap'
import { Button, Glyphicon } from 'react-bootstrap'

class DeletePost extends Component {

    componentWillMount() {
        this.props.redirectFromPost && (
            this.props.changeSettings('redirectFromPost', false)
        )
    }

    onConfirmDeletePost(id) {
        // Preform your action.
        console.log('Delete Post Id: ' + id)
        this.props.deletePost(id)

        let relatedComments = this.props.comments.filter(c => c.parentId === id)
        relatedComments = relatedComments.map( c => c.id)
        //console.log('relatedComments: ' + JSON.stringify(relatedComments))
        this.props.updateChildComments(relatedComments)

        //redirect
        this.props.needRedirection && (
            this.props.changeSettings('redirectFromPost', true)
        )

    }

    render() {
        const { postId, redirectFromPost, needRedirection } = this.props

        return (
            <span>
                <Confirm
                    onConfirm={() => this.onConfirmDeletePost(postId)}
                    body="Are you sure you want to delete this post?"
                    confirmText="Confirm Delete"
                    title="Deleting Post">
                    <Button bsStyle="danger" bsSize="xsmall">
                        <Glyphicon glyph="trash" /> Delete </Button>
                </Confirm>

                {needRedirection && (
                    redirectFromPost && (
                        <Redirect to='/' />
                    )
                )}
            </span>

        )
    }
}

const mapStateToProps = state => {
    let comments = []
    for (let myComment of Object.values(state.comments)) {
        comments.push(myComment)
    }

    return {
        comments,
        redirectFromPost: state.settings.redirectFromPost
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeSettings: (key, value) => dispatch(updateSettings(key, value)),
        deletePost: (id) => (dispatch(postDelete(id))),
        updateChildComments: (children) => (dispatch(postUpdateChildrenComment(children)))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeletePost)

