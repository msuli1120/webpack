import React from 'react';
import ReactDOM from 'react-dom';

class Layout extends React.Component {

  render() {
    return (
      <h1>From My React {this.props.data}</h1>
    );
  }
}

const ract = document.getElementById("ract");

console.log(ract.getAttribute('data'));

ReactDOM.render(<Layout/>, ract);