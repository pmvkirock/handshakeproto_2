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
  declined,
  pending,
  reviewed,
  updateJobFilter,
  updateCityFilter,
  Logout
} from '../../../../../actions';

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
      pending: false,
      declined: false,
      reviewed: false
    });
  };

  render() {
    return (
      <Row>
        <Container className="background top-10 padding-all">
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
                      this.props.dispatch(pending());
                      this.deactivateActive();
                      this.setState({
                        pending: true
                      });
                    }}
                    active={this.state.pending}
                  >
                    Pending
                  </Button>
                  <Button
                    className="mleft-10"
                    variant="outline-primary"
                    onClick={() => {
                      this.props.dispatch(reviewed());
                      this.deactivateActive();
                      this.setState({
                        reviewed: true
                      });
                    }}
                    active={this.state.reviewed}
                  >
                    Reviewed
                  </Button>
                  <Button
                    className="mleft-10"
                    variant="outline-primary"
                    onClick={() => {
                      this.props.dispatch(declined());
                      this.deactivateActive();
                      this.setState({
                        declined: true
                      });
                    }}
                    active={this.state.declined}
                  >
                    Declined
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
