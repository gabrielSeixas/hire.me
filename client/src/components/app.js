import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Modal from 'react-modal';
import logo from '../logo.svg';

class App extends React.Component {
  componentWillMount() {
    this.props.fetchUrls();
  }

  handleShortenUrl() {
    this.props.shortenUrl(
      this.refs.fullUrl.value
    );
  }

  closeModal() {
    this.props.urls.isOpen = false;
  }

  renderUrl(url) {
    return (
      <div className="card card-block">
        <div>{url.fullUrl} ..... {url.shortUrl}</div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <Modal
          isOpen={this.props.urls.isOpen}
          onRequestClose={this.closeModal}>
          <button onClick={this.closeModal}> Fechar </button>
          <h1>Url criada</h1>
          <a href={ this.props.urls.newUrl } >{ this.props.urls.newUrl } </a>
        </Modal>
       
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to ShortenerJs</h2>
          <div className="field-container">
            <input type="text" ref="fullUrl" className="input-text" />
            <button type="button" className="button-blue" 
              onClick={() => this.handleShortenUrl()}> 
              Encurtar url
            </button>
          </div>
        </div>
        <p className="App-intro">
          { typeof this.props.urls.urlList === 'undefined' ? (
            'Carregando...'
          ) : (
            this.props.urls.urlList.map(this.renderUrl)
          )}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    urls: state.urls
  };
}

export default connect(mapStateToProps, actions)(App);
