import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { postAddNew, updateSettings } from '../actions'
import { capitalize } from '../utils/helpers'
import PostForm from './PostForm'
import NavigationBar from './NavigationBar'


class AddNewPostPage extends Component {

    /**
     * It is done this way becuase the assigment need all state to be managed by the Store.
     * Normally, this can be handle by component own state
     */
    componentWillMount() {
        this.props.isRedirectBack && (
            this.props.updateSettings('redirectFromAddNewPost', false)
        )
    }

    /**
     * It is done this way becuase the assigment need all state to be managed by the Store.
     * Normally, this can be handle by component own state
     */    componentWillUnmount() {
        this.props.isRedirectBack && (
            this.props.updateSettings('redirectFromAddNewPost', false)
        )
    }

    mySubmitHandler(values) {
        //console.log('my handler:: ' + JSON.stringify(values, null, 2))
        this.props.postAddNew(values)

        //change redirect State in the Store
        this.props.updateSettings('redirectFromAddNewPost', true)
    }

    render() {
        const { isRedirectBack, categories } = this.props
        //console.log('AddNewPostPage:: ' + JSON.stringify(this.props, null, 2))

        const redirectPath = this.props.location.caller ? this.props.location.caller : '/'
        //console.log('redirectPath:: ' + JSON.stringify(redirectPath, null, 2))

        return (
            <div>
                <NavigationBar />

                <div className="my-form-page-header">
                    <Link to={redirectPath} className="back-arrow" title="Back" />
                    {' '}
                   <span className="my-header-title">
                        Add New Post
                    </span>
                </div>
                <div>
                <PostForm
                    categoryOptions={categories}
                    onSubmit={values => this.mySubmitHandler(values)}
                />
                </div>
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

export default connect(
    mapStateToProps,
    { postAddNew, updateSettings }
)(AddNewPostPage)
