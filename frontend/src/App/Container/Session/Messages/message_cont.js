/* eslint react/prop-types: 0 */

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import Job from './message';
import JobDes from './chat_box';

import { getAllMessages } from '../../../../actions/getMessages';

class JobCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeMessage: '',
      setShow: false,
      i: 0
    };
  }

  handleJob = message_id => {
    this.setState({
      activeMessage: message_id
    });
  };

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => {
    this.setState({ setShow: true });
  };

  getInfo = () => {
    var data = {
      user_id: localStorage.getItem('user_id')
    };

    this.props.dispatch(getAllMessages(data));
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    var printJobs = this.props.getAllMessages.messages.map(
      ({ _id, sendername, recievername }) => {
        return (
          <a
            indexkey={_id}
            onClick={() => this.handleJob(_id)}
            className="jobCont"
            key={_id}
            href={'#'}
          >
            <Job
              data-key={_id}
              senderName={sendername}
              recieverName={recievername}
            />
          </a>
        );
      }
    );
    return (
      <Row className="background top-10">
        <Col xl={4} style={{ overflowY: 'scroll', height: 90 + 'vh' }}>
          <Row>
            <Container className="job-listing">
              <h6>Messages</h6>
            </Container>
          </Row>
          {printJobs}
        </Col>
        <Col xl={8} style={{ overflowY: 'scroll', height: 90 + 'vh' }}>
          <JobDes idjob={this.state.activeMessage} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getAllMessages: state.getAllMessages
  };
};

export default connect(mapStateToProps)(JobCont);
