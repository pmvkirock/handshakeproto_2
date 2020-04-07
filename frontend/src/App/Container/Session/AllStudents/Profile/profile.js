import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import Education from './education_prof';
import Experience from './job_prof';
import Primary from './primary';
import Skills from './skills';
import { loadProfileData } from '../../../../../actions/getOtherStudents';

class Stud_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      hideProfileForm: 'HideForm',
      hideObj: 'HideForm',
      phone_num: '',
      email: '',
      career_obj: ''
    };
  }

  getInfo = () => {
    const data = {
      user_id: this.props.match.params.id
    };
    this.props.dispatch(loadProfileData(data));
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    return (
      <Container style={{ width: 80 + '%' }}>
        <Row>
          <Col xl={4}>
            <Row
              className="all-row"
              style={{ textAlign: 'center', marginTop: 10 + 'px' }}
            >
              <Primary id={this.props.match.params.id} />
            </Row>
            <Row className="all-row">
              <Skills id={this.props.match.params.id} />
            </Row>
            <Row className="all-row">
              <Container className="background top-10 padding-all skills">
                <h5>Contact Info</h5>
                <p>
                  Mobile No: <span>{this.props.getOtherStudent.phone_num}</span>
                </p>
                <p>
                  Email: <span>{this.props.getOtherStudent.email}</span>
                </p>
              </Container>
            </Row>
          </Col>
          <Col
            xl={8}
            className="height-200 left-10"
            style={{ marginTop: 10 + 'px', width: 95 + '%' }}
          >
            <Row>
              <Container className="background padding-all">
                <h5>My Journey</h5>
                <Form>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <p>{this.props.getOtherStudent.obj}</p>
                  </Form.Group>
                </Form>
              </Container>
            </Row>
            <Row>
              <Education id={this.props.match.params.id} />
            </Row>
            <Row>
              <Experience id={this.props.match.params.id} />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    getOtherStudent: state.getOtherStudent
  };
};

export default connect(mapStateToProps)(Stud_Profile);
