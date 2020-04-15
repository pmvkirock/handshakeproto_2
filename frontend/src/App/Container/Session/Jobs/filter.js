import React from 'react';
import {
  Row,
  Form,
  Col,
  Container,
  Button,
  ButtonToolbar
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  PartTime,
  FullTime,
  Logout,
  OnCampus,
  Internship,
  updateJobFilter,
  updateCityFilter,
  getMyJobs
} from '../../../../actions';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allJobs: true,
      PartTime: false,
      FullTime: false,
      Internship: false,
      OnCampus: false,
      MyJobs: false
    };
  }

  jobChange = e => {
    this.props.dispatch(updateJobFilter(e.target.value));
  };

  cityChange = e => {
    this.props.dispatch(updateCityFilter(e.target.value));
  };

  deactivateActive = () => {
    this.setState({
      allJobs: false,
      PartTime: false,
      FullTime: false,
      Internship: false,
      OnCampus: false,
      MyJobs: false
    });
  };

  render() {
    var myJobs = '';
    if (this.props.getType == 'Company') {
      myJobs = (
        <Button
          className="mleft-10"
          variant="outline-primary"
          onClick={() => {
            this.props.dispatch(getMyJobs());
            this.deactivateActive();
            this.setState({
              MyJobs: true
            });
          }}
          active={this.state.MyJobs}
        >
          My Jobs
        </Button>
      );
    }
    console.log(myJobs);
    return (
      <Row>
        <Container className="background top-10 padding-all box-shadow">
          <Form>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Search for Job Titles"
                  onChange={this.jobChange}
                />
              </Col>
              <Col>
                <Form.Control placeholder="City" onChange={this.cityChange} />
              </Col>
            </Row>
            <Row className="top-10">
              <Col>
                <ButtonToolbar>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      this.props.dispatch(Logout());
                      this.deactivateActive();
                      this.setState({
                        allJobs: true
                      });
                    }}
                    active={this.state.allJobs}
                  >
                    All Jobs
                  </Button>
                  <Button
                    className="mleft-10"
                    variant="outline-primary"
                    onClick={() => {
                      this.props.dispatch(FullTime());
                      this.deactivateActive();
                      this.setState({
                        FullTime: true
                      });
                    }}
                    active={this.state.FullTime}
                  >
                    Full Time
                  </Button>
                  <Button
                    className="mleft-10"
                    variant="outline-primary"
                    onClick={() => {
                      this.props.dispatch(PartTime());
                      this.deactivateActive();
                      this.setState({
                        PartTime: true
                      });
                    }}
                    active={this.state.PartTime}
                  >
                    Part Time
                  </Button>
                  <Button
                    className="mleft-10"
                    variant="outline-primary"
                    onClick={() => {
                      this.props.dispatch(OnCampus());
                      this.deactivateActive();
                      this.setState({
                        OnCampus: true
                      });
                    }}
                    active={this.state.OnCampus}
                  >
                    On Campus
                  </Button>
                  <Button
                    className="mleft-10"
                    variant="outline-primary"
                    onClick={() => {
                      this.props.dispatch(Internship());
                      this.deactivateActive();
                      this.setState({
                        Internship: true
                      });
                    }}
                    active={this.state.Internship}
                  >
                    Internship
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Form>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getJobFilterPartFull: state.getJobFilterPartFull,
    updateJobFilter: state.updateJobFilter,
    updateCityFilter: state.updateCityFilter,
    getType: state.getType
  };
};

export default connect(mapStateToProps)(Filter);
