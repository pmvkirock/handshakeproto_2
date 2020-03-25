import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';

class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      event_name: '',
      location: '',
      event_des: '',
      time: '',
      date: '',
      eligibility: '',
      deadline: ''
    };
  }

  updatePers = e => {
    e.preventDefault();
    const data = {
      event_name: this.state.event_name,
      location: this.state.location,
      deadline: this.state.deadline,
      event_des: this.state.event_des,
      time: this.state.time,
      date: this.state.date,
      eligibility: this.state.eligibility,
      id: cookie.load('cookie')
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/insertEvent', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            error: '',
            authFlag: true,
            event_name: '',
            location: '',
            event_des: '',
            time: '',
            date: '',
            eligibility: '',
            deadline: ''
          });
          this.handleClose();
          this.props.getInfo();
        } else {
          this.setState({
            error:
              '<p style={{color: red}}>Please enter correct credentials</p>',
            authFlag: false
          });
        }
      })
      .catch(e => {
        this.setState({
          error: 'Please enter correct credentials' + e
        });
      });
  };
  event_name = e => {
    this.setState({
      event_name: e.target.value
    });
  };

  location = e => {
    this.setState({
      location: e.target.value
    });
  };

  desc = e => {
    this.setState({
      event_des: e.target.value
    });
  };

  date = e => {
    this.setState({
      date: e.target.value
    });
  };

  time = e => {
    this.setState({
      time: e.target.value
    });
  };

  eligibility = e => {
    this.setState({
      eligibility: e.target.value
    });
  };

  deadline = e => {
    this.setState({
      deadline: e.target.value
    });
  };

  handleClose = () => {
    this.props.handleClose();
    this.setState({ setShow: false });
  };
  handleShow = () => this.setState({ setShow: true });

  componentDidMount() {
    this.setState({
      setShow: this.props.show
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show != this.props.show) {
      this.setState({
        setShow: this.props.show
      });
    }
  }

  render() {
    console.log(this.state.data);
    return (
      <Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: 'scroll' }}>
          <Form classname="top-10">
            <Form.Group controlId="formCompanyName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Job Title"
                value={this.state.event_name}
                onChange={this.event_name}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={this.state.location}
                onChange={this.location}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Application Deadline</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Application Deadline"
                value={this.state.deadline}
                onChange={this.deadline}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Time"
                value={this.state.time}
                onChange={this.time}
              />
            </Form.Group>
            <Form.Group controlId="formOwnership">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Date"
                value={this.state.date}
                onChange={this.date}
              />
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Eligibility</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Eligibility"
                value={this.state.eligibility}
                onChange={this.eligibility}
              />
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Add Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.event_des}
                onChange={this.desc}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.updatePers}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default edit;
