import React from 'react';
// import {
//   Row,
//   Col
// } from 'reactstrap';

const LoadingContent = () => (
  <div className="text-center">
    <h1>
      <i className="fa fa-circle-o-notch fa-spin" />
    </h1>
    <h2>Just one second</h2>
    <p>We are fetching that content for you</p>
  </div>
);

const TimeoutMessage = () => (
  <h3 className="text-center">
    <i className="fa fa-clock-o" aria-hidden="true" />&nbsp; Something went
    wrong please try again later
  </h3>
);

const AuthorizedMessage = () => (
  <h2 className="text-center">
    <i className="fa fa-clock-o" aria-hidden="true" />&nbsp; You are not
    authorized to access this page
  </h2>
);

export { LoadingContent, TimeoutMessage, AuthorizedMessage };
