import React from 'react';
import ReactDOM from 'react-dom';

class Layout extends React.Component {
  render() {
    return (
      <h1>From My React</h1>
    );
  }
}

const ract = document.getElementById("ract");

ReactDOM.render(<Layout/>, ract);