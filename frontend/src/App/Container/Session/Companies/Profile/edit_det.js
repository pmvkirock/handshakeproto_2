import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      tprof_pic: '',
      comp_name: '',
      location: '',
      des: '',
      type: '',
      no: '',
      web: '',
      email: '',
      owner: ''
    };
  }

  updatePers = e => {
    e.preventDefault();
    const data = {
      comp_name: this.state.comp_name,
      location: this.state.location,
      des: this.state.des,
      type: this.state.type,
      no: this.state.no,
      web: this.state.web,
      email: this.state.email,
      owner: this.state.owner,
      id: localStorage.getItem('user_id'),
      prof_pic: this.state.tprof_pic
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/comp_profile/updateCompany', data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            error: '',
            authFlag: true
          });
          this.handleClose();
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
  compName = e => {
    this.setState({
      comp_name: e.target.value
    });
  };

  location = e => {
    this.setState({
      location: e.target.value
    });
  };

  desc = e => {
    this.setState({
      des: e.target.value
    });
  };

  type = e => {
    this.setState({
      type: e.target.value
    });
  };

  noofemp = e => {
    this.setState({
      no: e.target.value
    });
  };

  website = e => {
    this.setState({
      web: e.target.value
    });
  };

  owner = e => {
    this.setState({
      owner: e.target.value
    });
  };

  email = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleFileUpload = event => {
    let data = new FormData();
    console.log(event.target.files[0]);
    data.append('file', event.target.files[0]);
    data.append('name', 'prof_pic');
    axios
      .post('http://localhost:8000/files', data)
      .then(response => {
        console.log(response);
        this.setState({
          tprof_pic: response.data
        });
      })
      .catch(error => console.log('error ' + error));
  };

  handleClose = () => {
    this.props.handleClose();
    this.setState({ setShow: false });
  };
  handleShow = () => this.setState({ setShow: true });

  componentDidMount() {
    this.setState({
      setShow: this.props.show,
      comp_name: this.props.data.cname,
      location: this.props.data.location,
      des: this.props.data.des,
      type: this.props.data.company_type,
      no: this.props.data.noofemp,
      web: this.props.data.website,
      email: this.props.data.email,
      owner: this.props.data.owner_ship,
      tprof_pic: this.props.data.profile_pic
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
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: 'scroll' }}>
          <Form classname="top-10">
            <Form.Group controlId="formCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Name"
                value={this.state.comp_name}
                onChange={this.compName}
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
              <Form.Label>Company Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Type"
                value={this.state.type}
                onChange={this.type}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>No of Employees </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Employee Count"
                value={this.state.no}
                onChange={this.noofemp}
              />
            </Form.Group>
            <Form.Group controlId="formOwnership">
              <Form.Label>Ownership Type </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Ownership Type"
                value={this.state.owner}
                onChange={this.owner}
              />
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Website"
                value={this.state.web}
                onChange={this.website}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.email}
              />
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.des}
                onChange={this.desc}
              />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Control
                name="resume"
                type="file"
                onChange={this.handleFileUpload}
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
