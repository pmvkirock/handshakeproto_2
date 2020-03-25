import React from 'react';
import { Container, Row, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  updateStudName,
  updateSchoolName,
  updateMajor,
  updateSkill
} from '../../../../actions';

class filter extends React.Component {
  constructor(props) {
    super(props);
  }

  nameChange = e => {
    this.props.dispatch(updateStudName(e.target.value));
  };

  schoolChange = e => {
    this.props.dispatch(updateSchoolName(e.target.value));
  };

  majorChange = e => {
    this.props.dispatch(updateMajor(e.target.value));
  };

  skillChange = e => {
    this.props.dispatch(updateSkill(e.target.value));
  };

  render() {
    return (
      <Container>
        <Row className="background padding-all">
          <Form>
            <h5
              style={{
                paddingTop: 20 + 'px',
                paddingBottom: 20 + 'px',
                borderBottom: 1 + 'px Solid #d6d6c2'
              }}
            >
              Filters
            </h5>
            <Form.Group controlId="Name" className="top-10">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name"
                onChange={this.nameChange}
              />
            </Form.Group>
            <Form.Group controlId="School" className="top-10">
              <Form.Label>School Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a school"
                onChange={this.schoolChange}
              />
            </Form.Group>
            <Form.Group controlId="Major" className="top-10">
              <Form.Label>Major</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a major"
                onChange={this.majorChange}
              />
            </Form.Group>
            <Form.Group controlId="Major" className="top-10">
              <Form.Label>Skill</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a skill"
                onChange={this.skillChange}
              />
            </Form.Group>
          </Form>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    getStudFilter: state.getStudFilter,
    getSchoolFilter: state.getSchoolFilter,
    getMajorFilter: state.getMajorFilter
  };
};

export default connect(mapStateToProps)(filter);
