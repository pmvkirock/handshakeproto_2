import React from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: false,
      content: ''
    };
  }

  handleClose = () => this.setState({ message: false });
  handleShow = () => this.setState({ message: true });

  setContent = e => {
    this.setState({ content: e.target.value });
  };

  sendMessage = () => {
    var data = {
      senderid: localStorage.getItem('user_id'),
      recieverid: this.props.getOtherStudent._id,
      type: localStorage.getItem('type'),
      recievername:
        this.props.getOtherStudent.fname +
        ' ' +
        this.props.getOtherStudent.lname,
      content: this.state.content
    };
    if (localStorage.getItem('type') == 'Company') {
      data = Object.assign(data, {
        sendername: this.props.getCompProfile.cname
      });
    } else {
      data = Object.assign(data, {
        sendername:
          this.props.getProfileInfo.fname +
          ' ' +
          this.props.getProfileInfo.lname
      });
    }
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/messages/sendMessage', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          alert('Message Sent');
        } else {
          alert('Error');
        }
      })
      .catch(e => {
        this.setState({
          error: 'Please enter correct credentials' + e
        });
      });
  };

  render() {
    let picture = '';
    if (this.props.getOtherStudent.profile_pic == null) {
      picture = `/profile.png`;
    } else {
      picture =
        `http://localhost:8000/prof_pic/` +
        this.props.getOtherStudent.profile_pic.replace('Prof_Pic', 'file') +
        `.jpeg`;
    }
    return (
      <Container className="background padding-all prof-info">
        <img
          src={picture}
          alt="user pic"
          style={{ width: 100 + 'px', borderRadius: 50 + '%' }}
        />
        <h4>
          {this.props.getOtherStudent.fname +
            ' ' +
            this.props.getOtherStudent.lname}
        </h4>
        <p>{}</p>
        <p>{}</p>
        <p>
          {this.props.getOtherStudent.city +
            ', ' +
            this.props.getOtherStudent.state +
            ', ' +
            this.props.getOtherStudent.country}
        </p>
        <Button onClick={this.handleShow}>Message</Button>
        <Modal show={this.state.message} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Send Message</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className={'top-10'}>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.content}
                onChange={this.setContent}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button onClick={this.sendMessage} variant="primary">
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    getOtherStudent: state.getOtherStudent,
    getCompProfile: state.getCompProfile,
    getProfileInfo: state.getProfileInfo
  };
};

export default connect(mapStateToProps)(Primary);
