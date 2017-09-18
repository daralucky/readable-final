import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { commentEdit, updateSettings } from '../actions'
import CommentForm from './CommentForm'
import NavigationBar from './NavigationBar'

class EditCommentPage extends Component {

    /**
     * It is done this way becuase the assigment need all state to be managed by the Store.
     * Normally, this can be handle by component own state
     */
    componentWillMount() {
        this.props.isRedirectBack && (
            this.props.changeSettings('redirectFromEditComment', false)
        )
    }

    /**
     * It is done this way becuase the assigment need all state to be managed by the Store.
     * Normally, this can be handle by component own state
     */    componentWillUnmount() {
        this.props.isRedirectBack && (
            this.props.changeSettings('redirectFromEditComment', false)
        )
    }

    mySubmitHandler(values) {
        //console.log('my handler:: ' + JSON.stringify(values, null, 2))
        this.props.editComment(values)

        //change redirect State in the Store
        this.props.changeSettings('redirectFromEditComment', true)
    }

    render() {
        const commentId = this.props.match.params.commentId
        const { isRedirectBack, comments } = this.props

        const currentComment = comments[commentId]

        const redirectPath = this.props.location.caller ? this.props.location.caller : '/'

        return (
            <div>
                <NavigationBar />

                <div className="my-post-list-page-header">
                    <span style={{ color: 'DodgerBlue', fontWeight: 'bold', fontSize: 'x-large' }}>
                        Add New Comment
                    </span>
                </div>

                <CommentForm
                    initialValues={currentComment}
                    onSubmit={values => this.mySubmitHandler(values)}
                />

                {
                    isRedirectBack && (
                        <Redirect to={redirectPath} />
                    )
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments,
        isRedirectBack: state.settings.redirectFromEditComment
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editComment: (value) => (dispatch(commentEdit(value))),
        changeSettings: (key, value) => dispatch(updateSettings(key, value)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCommentPage)
