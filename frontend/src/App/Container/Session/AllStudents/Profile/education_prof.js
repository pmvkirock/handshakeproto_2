import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      editSchoolForm: [],
      error: '',
      data: [],
      coll_name: [],
      degree: [],
      major: [],
      curr_CGPA: [],
      pass_year: [],
      fromMth: [],
      toMth: [],
      fromYr: [],
      toYr: [],
      idstudent_edu: [],
      i: null
    };
  }

  getInfo = () => {};

  componentDidMount() {
    this.getInfo();
  }

  render() {
    var renderer = this.props.getOtherStudent.school_info.map(
      ({
        _id,
        name,
        degree,
        major,
        fromMonth,
        fromYear,
        toMonth,
        toYear,
        yop,
        CGPA
      }) => {
        return (
          <div key={_id}>
            <div className="edu-details" style={{ paddingTop: 10 + 'px' }}>
              <h6>{name}</h6>
              <p>
                {degree} - <span>{major}</span>
              </p>
              <p>
                {fromMonth}/{fromYear}-{toMonth}/{toYear}
              </p>
              <p>Year of passing: {yop}</p>
              <p>Current CGPA: {CGPA}</p>
            </div>
          </div>
        );
      }
    );

    return (
      <Container className="background top-10 padding-all education">
        <div>
          <h5>Education</h5>
          {renderer}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    getOtherStudent: state.getOtherStudent
  };
};

export default connect(mapStateToProps)(Education);
