import React, { Component } from 'react';

import { Modal } from '../../components/shared';

const withErrorHandler = (WrappedComponent, axios) => {
  class HOC extends Component {
    state = {
      error: null
    };

    // :(
    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.clearError();
        return request;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        response => response,
        error => this.setState({ error })
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    clearError = () => this.setState({ error: null });

    render() {
      const { error } = this.state;

      return (
        <>
          {error && <Modal onClose={this.clearError}>{error.message}</Modal>}
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }

  return HOC;
};

export default withErrorHandler;
