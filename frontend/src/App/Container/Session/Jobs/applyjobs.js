import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../../config';
import { applyJob } from '../../../../actions/applyJobs';
import { connect } from 'react-redux';

class apply extends React.Component {
  state = { setShow: false, tprof_pic: '' };

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

  handleFileUpload = event => {
    let data = new FormData();
    console.log(event.target.files[0]);
    data.append('file', event.target.files[0]);
    data.append('name', 'resume');
    axios
      .post(`${config.apiURL}/files`, data)
      .then(response => {
        console.log(response);
        this.setState({
          tprof_pic: response.data
        });
      })
      .catch(error => console.log('error ' + error));
  };

  applyJob = e => {
    e.preventDefault();
    const data = {
      idstudent: localStorage.getItem('user_id'),
      idjob: this.props.idjob,
      idcompany: this.props.idcompany,
      resume: this.state.tprof_pic,
      status: 'Pending'
    };
    this.props.dispatch(applyJob(data));
  };

  render() {
    return (
      <Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form classname="top-10">
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
          <Button variant="primary" onClick={this.applyJob}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    getType: state.getType
  };
};

export default connect(mapStateToProps)(apply);
