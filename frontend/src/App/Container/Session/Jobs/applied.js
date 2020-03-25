import React from 'react';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

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

  job_cat = e => {
    e.preventDefault();
    var data = {
      idjob: this.props.idjob,
      idstudent: this.state.data[0].idstudent,
      status: e.target.value,
      idcompany: cookie.load('cookie')
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
        .post('http://localhost:8000/updateApplied', data)
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
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .get(
        'http://localhost:8000/getApplied?idcompany=' +
          cookie.load('cookie') +
          '&idjob=' +
          this.props.idjob
      )
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            error: '',
            authFlag: true,
            data: response.data
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
  };

  componentDidMount() {
    this.setState({
      setShow: this.props.show
    });
  }

  render() {
    var printJobs = this.state.data.map(
      ({
        idstudent,
        First_Name,
        Last_Name,
        coll_name,
        degree,
        major,
        resume
      }) => {
        return (
          <Row key={idstudent} className={'border-tb top-3'}>
            <Col xl={9}>
              <Container>
                <Link to={`/student_prof/` + idstudent}>
                  <h5 className="mbottom-5">{First_Name + ' ' + Last_Name}</h5>
                </Link>
                <h6 className="mbottom-5">{coll_name}</h6>
                <Row
                  className="mleft-1 small-font"
                  style={{ paddingBottom: 0 }}
                >
                  <Col xl={6}>
                    <Row>
                      <p className="mbottom-5">{degree}</p>
                    </Row>
                  </Col>
                  <Col xl={6}>
                    <Row>
                      <p className="mbottom-5">{major}</p>
                    </Row>
                  </Col>
                </Row>
                <Form.Group controlId="formOwnership">
                  <Form.Control as="select" onChange={this.job_cat}>
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

export default apply;
