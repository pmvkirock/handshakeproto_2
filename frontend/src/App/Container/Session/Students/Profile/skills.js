import React from 'react';
import { Form, Container, Col, Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import axios from 'axios';

class skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      addSkill: ''
    };
  }

  changeSkill = e => {
    this.setState({
      addSkill: e.target.value
    });
  };

  addSkill = e => {
    e.preventDefault();
    let data = {
      idstudent: cookie.load('cookie'),
      skill_name: this.state.addSkill
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/insertSkill', data)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            error: '',
            addSkill: ''
          });
          this.getInfo();
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

  getInfo = () => {
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .get('http://localhost:8000/getSkill?stud_id=' + cookie.load('cookie'))
      .then(response => {
        if (response.status === 200) {
          this.setState({
            error: '',
            skills: response.data
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
    var x = this.state.skills.map(({ skill_name, idstudent_skills }) => {
      return <span key={idstudent_skills}>{skill_name}</span>;
    });
    return (
      <Container className="background top-10 padding-all skills">
        <h5>Skills</h5>
        <p>{x}</p>
        <Form>
          <Form.Row>
            <Col>
              <Form.Control
                value={this.state.skill}
                placeholder="Skills"
                onChange={this.changeSkill}
              />
            </Col>
            <Col>
              <Button variant="primary" onClick={this.addSkill}>
                Add
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
    );
  }
}

export default skills;
