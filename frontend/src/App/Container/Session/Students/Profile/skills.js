import React from 'react';
import { Form, Container, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadProfileData } from '../../../../../actions';

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
      user_id: localStorage.getItem('user_id'),
      skill_name: this.state.addSkill
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/stud_profile/insertSkill', data)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            error: '',
            addSkill: ''
          });
          this.props.dispatch(loadProfileData(data));
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

  render() {
    var x = this.props.getProfileInfo.skill.map(({ _id, skill_name }) => {
      return <span key={_id}>{skill_name}</span>;
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

const mapStateToProps = function(state) {
  return {
    getProfileInfo: state.getProfileInfo
  };
};

export default connect(mapStateToProps)(skills);
