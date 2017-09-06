import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'

class App extends Component {


  componentDidMount() {
    this.props.fetchCat()
  }

  render() {
    const { categories } = this.props


    return (
      <div className="App">
        <h1>Readable 02</h1>
        {console.log("categories: " + JSON.stringify(categories))}
        <ul>
          {categories.map((cat) => (

            <li key={cat.path}>{cat.name}</li>

          ))}
        </ul>


      </div>
    );
  }
}


const mapStateToProps = (state) => {
  //console.log(state.categories)
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCat: () => dispatch(fetchCategories()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
