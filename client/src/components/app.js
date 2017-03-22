import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import logo from '../logo.svg';

class App extends React.Component {
  componentWillMount() {
    this.props.fetchUrls();
  }

  renderUrl(url) {
    return (
      <div className="card card-block">
        <h4 className="card-title">{url.shortUrl}</h4>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {this.props.urls.map(this.renderUrl)}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { urls: state.urls };
}

export default connect(mapStateToProps, actions)(App);
