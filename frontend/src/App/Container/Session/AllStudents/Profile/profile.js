import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import Education from './education_prof';
import Experience from './job_prof';
import Primary from './primary';

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
      stud_id: this.props.match.params.id
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/stud_profile', data)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            error: '',
            phone_num: response.data[0].phone_num,
            email: response.data[0].email_ID,
            career_obj: response.data[0].Career_obj,
            tphone_num: response.data[0].phone_num,
            temail: response.data[0].email_ID,
            tcareer_obj: response.data[0].Career_obj
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
              <Container className="background top-10 padding-all skills">
                <h5>Skills</h5>
                <p>
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>PHP</span>
                  <span>Bootstrap</span>
                </p>
              </Container>
            </Row>
            <Row className="all-row">
              <Container className="background top-10 padding-all skills">
                <h5>Contact Info</h5>
                <p>
                  Mobile No: <span>{this.state.phone_num}</span>
                </p>
                <p>
                  Email: <span>{this.state.email}</span>
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
                    <p>{this.state.career_obj}</p>
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

export default Stud_Profile;
