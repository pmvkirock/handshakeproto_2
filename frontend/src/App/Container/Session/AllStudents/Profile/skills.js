import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

class skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      addSkill: ''
    };
  }

  render() {
    var x = this.props.getOtherStudent.skill.map(({ _id, skill_name }) => {
      return <span key={_id}>{skill_name}</span>;
    });
    return (
      <Container className="background top-10 padding-all skills">
        <h5>Skills</h5>
        <p>{x}</p>
      </Container>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getOtherStudent: state.getOtherStudent
  };
};

export default connect(mapStateToProps)(skills);
