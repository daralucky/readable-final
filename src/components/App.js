import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'

class App extends Component {


  componentDidMount() {
    this.props.fetchCat()
    //this.props.getMyCatWow()
  }

  render() {
    const {categories } = this.props


    return (
      <div className="App">
        <h1>Readable 02</h1>
       { console.log("my props: " + JSON.stringify(categories)) }
       {categories.map((c) => (c))}

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  //console.log(state.categories)
  return {
    categories: state.categories.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCat: () => dispatch(fetchCategories())
    //getMyCatWow: () => dispatch(receiveCategories('hello'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
