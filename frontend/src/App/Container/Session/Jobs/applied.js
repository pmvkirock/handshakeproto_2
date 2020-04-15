import React from 'react';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApplied } from '../../../../actions/getApplied';

class apply extends React.Component {
  state = { setShow: false, tprof_pic: '', data: [] };

  handleClose = () => {
    this.props.handleClose();
    this.setState({ setShow: false });
  };
  handleShow = () => this.setState({ setShow: true });

  componentDidUpdate(prevProps) {
    if (prevProps.show != this.props.show) {
      this.setState({
        setShow: this.props.show
      });

      this.applyJob();
    }
  }

  job_cat = (e, idstudent) => {
    e.preventDefault();
    var data = {
      idjob: this.props.idjob,
      idstudent: idstudent,
      status: e.target.value,
      idcompany: localStorage.getItem('user_id')
    };
    if (
      data.idstudent != undefined &&
      data.idjob != undefined &&
      data.idcompany != undefined &&
      data.status != undefined
    ) {
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post('jobs/updateApplied', data)
        .then(response => {
          console.log('Status Code : ', response.status);
          if (response.status === 200) {
            this.setState({
              error: '',
              authFlag: true
            });
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
    }
  };

  applyJob = () => {
    var data = {};
    if (this.props.idjob) {
      data = {
        comp_id: localStorage.getItem('user_id'),
        job_id: this.props.idjob
      };
      this.props.dispatch(getApplied(data));
    } else if (this.props.getAllJobs.jobs[0]._id) {
      data = {
        comp_id: localStorage.getItem('user_id'),
        job_id: this.props.getAllJobs.jobs[0]._id
      };
    }
  };

  componentDidMount() {
    this.applyJob();
  }

  render() {
    //console.log(this.props.getApplied.appli[0].idstudent);
    var printJobs = this.props.getApplied.appli.map(
      ({ idstudent, status, resume }) => {
        return (
          <Row key={idstudent._id} className={'border-tb top-3'}>
            <Col xl={9}>
              <Container>
                <Link to={`/student_prof/` + idstudent._id}>
                  <h5 className="mbottom-5">
                    {idstudent.fname + ' ' + idstudent.lname}
                  </h5>
                </Link>
                <h6 className="mbottom-5">{idstudent.school_info[0].name}</h6>
                <Row
                  className="mleft-1 small-font"
                  style={{ paddingBottom: 0 }}
                >
                  <Col xl={6}>
                    <Row>
                      <p className="mbottom-5">
                        {idstudent.school_info[0].degree}
                      </p>
                    </Row>
                  </Col>
                  <Col xl={6}>
                    <Row>
                      <p className="mbottom-5">
                        {idstudent.school_info[0].major}
                      </p>
                    </Row>
                  </Col>
                </Row>
                <Form.Group controlId="formOwnership">
                  <Form.Control
                    as="select"
                    onChange={e => {
                      this.job_cat(e, idstudent._id);
                    }}
                    value={status}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Declined">Declined</option>
                  </Form.Control>
                </Form.Group>
              </Container>
            </Col>
            <Col xl={3}>
              <Container>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    `http://localhost:8000/prof_pic/` +
                    resume.replace('resume', 'file') +
                    `.pdf`
                  }
                >
                  Resume
                </a>
              </Container>
            </Col>
          </Row>
        );
      }
    );
    return (
      <Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply Now</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: 'scroll' }}>{printJobs}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    getType: state.getType,
    getProfileInfo: state.getProfileInfo,
    getCompInfo: state.getCompInfo,
    getAllJobs: state.getAllJobs,
    getApplied: state.getApplied
  };
};

export default connect(mapStateToProps)(apply);
