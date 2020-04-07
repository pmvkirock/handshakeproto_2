import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApplied } from '../../../../actions/getEventsApplied';

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

  applyJob = () => {
    var data = {};
    if (this.props.idjob) {
      data = {
        comp_id: localStorage.getItem('user_id'),
        job_id: this.props.idjob
      };
      this.props.dispatch(getApplied(data));
    } else if (this.props.getAllEvents.events[0]._id) {
      data = {
        comp_id: localStorage.getItem('user_id'),
        job_id: this.props.getAllEvents.events[0]._id
      };
      this.props.dispatch(getApplied(data));
    }
  };

  componentDidMount() {
    this.applyJob();
  }

  render() {
    var printJobs = this.props.getEventsApplied.appli.map(({ idstudent }) => {
      return (
        <Row key={idstudent} className={'border-tb top-3'}>
          <Col xl={12}>
            <Container>
              <Link to={`/student_prof/` + idstudent}>
                <h5 className="mbottom-5">
                  {idstudent.fname + ' ' + idstudent.lname}
                </h5>
              </Link>
              <h6 className="mbottom-5">{idstudent.school_info[0].name}</h6>
              <Row className="mleft-1 small-font" style={{ paddingBottom: 0 }}>
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
            </Container>
          </Col>
        </Row>
      );
    });
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
    getAllEvents: state.getAllEvents,
    getEventsApplied: state.getEventsApplied
  };
};

export default connect(mapStateToProps)(apply);
