import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { postAddNew, updateSettings } from '../actions'
import { capitalize } from '../utils/helpers'
import AddNewPostForm from './AddNewPostForm'
import NavigationBar from './NavigationBar'

class AddNewPostPage extends Component {

    /**
     * It is done this way becuase the assigment need all state to be managed by the Store.
     * Normally, this can be handle by component own state
     */
    componentWillMount() {
        this.props.isRedirectBack && (
            this.props.changeSettings('redirectFromAddNewPost', false)
        )
    }

    /**
     * It is done this way becuase the assigment need all state to be managed by the Store.
     * Normally, this can be handle by component own state
     */    componentWillUnmount() {
        this.props.isRedirectBack && (
            this.props.changeSettings('redirectFromAddNewPost', false)
        )
    }

    mySubmitHandler(values) {
        //console.log('my handler:: ' + JSON.stringify(values, null, 2))
        this.props.addPost(values)

        //change redirect State in the Store
        this.props.changeSettings('redirectFromAddNewPost', true)
    }

    render() {
        const { isRedirectBack } = this.props
        //console.log('AddNewPostPage:: ' + JSON.stringify(this.props, null, 2))

        const redirectPath = this.props.location.hash.replace('#', '')

        return (
            <div>
                <NavigationBar />

                <div className="my-post-list-page-header">
                    <span style={{ color: 'DodgerBlue', fontWeight: 'bold', fontSize: 'x-large' }}>
                        Add New Post
                    </span>
                </div>

                <AddNewPostForm categoryOptions={this.props.categories} onSubmit={values => this.mySubmitHandler(values)} />

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
    let categories = []
    for (let myCat of Object.values(state.categories)) {
        categories.push(
            { 'value': myCat.path, 'text': capitalize(myCat.name) }
        )
    }

    return {
        categories,
        isRedirectBack: state.settings.redirectFromAddNewPost
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPost: (value) => (dispatch(postAddNew(value))),
        changeSettings: (key, value) => dispatch(updateSettings(key, value)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewPostPage)
