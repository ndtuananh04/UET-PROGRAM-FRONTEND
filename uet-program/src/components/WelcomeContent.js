import * as React from 'react';

export default class WelcomeContent extends React.Component {

  render() {
    return (
        <div className="row justify-content-md-center">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="text-center display-4">Welcome to UET Program</h1>
                <p className="text-center lead">Login to continue</p>
              </div>
            </div>
        </div>
    );
  };
}