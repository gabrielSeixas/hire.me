import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import logo from '../logo.svg';
import SuccessModal from './successModal';

class App extends React.Component {
  componentWillMount() {
    this.props.fetchUrls();
  }

  handleShortenUrl() {
    if (this.refs.fullUrl.value) {
      this.props.shortenUrl(
        this.refs.fullUrl.value,
        this.refs.customAlias.value
      );
    }
  }

  handleCloseModal() {
    this.props.closeModal();
    this.refs.fullUrl.value = '';
    this.refs.customAlias.value = '';
  }

  renderUrl(url, index) {
    return (
      <tr key={index}>
        <td className="text-left">{url.fullUrl}</td>
        <td className="text-left">{url.shortUrl}</td>
        <td className="text-left">{url.accessCount}</td>
      </tr>
    );
  }

  render() {
    return (
      <div className="app">
        <SuccessModal 
          urls={this.props.urls}
          closeModal={() => this.handleCloseModal()}/>
       
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>Welcome to ShortenerJs</h2>
          <div className="field-container">
            <input type="text" ref="fullUrl" className="input-text" placeholder="Full url" />
            <input type="text" ref="customAlias" className="input-text" placeholder="Custom Alias"/>
            <button type="button" className="button-blue" 
              onClick={() => this.handleShortenUrl()}> 
              Encurtar url
            </button>
          </div>

          <div className="field-container">
            
          </div>
        </div>
        <p className="app-intro">
          <h3> As 10 urls mais acessadas </h3>
          { typeof this.props.urls.urlList === 'undefined' ? (
            'Carregando...'
          ) : (
            <table className="table-fill">
              <thead>
                <tr>
                  <th className="text-left"> Url original </th>
                  <th className="text-left"> Url encurtada </th>
                  <th className="text-left"> Acessos </th>
                </tr>
              </thead>
              <tbody>
                {this.props.urls.urlList.map(this.renderUrl)}
              </tbody>
            </table>
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
