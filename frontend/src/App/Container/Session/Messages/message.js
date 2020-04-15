import React from 'react';
import { Container, Row } from 'react-bootstrap';

import { connect } from 'react-redux';

class Job extends React.Component {
  render() {
    let name = '';
    console.log(this.props.recieverName + this.props.senderName);
    if (localStorage.getItem('type') == 'Company') {
      if (this.props.getCompProfile.cname == this.props.recieverName)
        name = this.props.senderName;
      else name = this.props.recieverName;
    } else {
      if (
        this.props.getProfileInfo.fname +
          ' ' +
          this.props.getProfileInfo.lname ==
        this.props.recieverName
      )
        name = this.props.senderName;
      else name = this.props.recieverName;
    }
    return (
      <Row>
        <Container className={'job-listing left-10 ' + this.props.show}>
          <h6>{name}</h6>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getAllMessages: state.getAllMessages,
    getProfileInfo: state.getProfileInfo,
    getCompProfile: state.getCompProfile
  };
};

export default connect(mapStateToProps)(Job);
