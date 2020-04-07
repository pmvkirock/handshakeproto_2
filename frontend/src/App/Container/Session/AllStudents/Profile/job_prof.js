import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: 'HideForm',
      editJobForm: [],
      error: '',
      data: [],
      company_name: [],
      title: [],
      location: [],
      fromMth: [],
      toMth: [],
      fromYr: [],
      toYr: [],
      idstudent_exp: [],
      desc: [],
      i: null
    };
  }

  getInfo = () => {};

  componentDidMount() {
    this.getInfo();
  }

  render() {
    var renderDet = this.props.getOtherStudent.work_exp.map(
      ({
        _id,
        name,
        title,
        location,
        fromMonth,
        fromYear,
        toMonth,
        toYear,
        work_des
      }) => {
        return (
          <div key={_id}>
            <div className="edu-details" style={{ paddingTop: 10 + 'px' }}>
              <h6>{name}</h6>
              <p>{title}</p>
              <p>{location}</p>
              <p>
                {fromMonth}/{fromYear}-{toMonth}/{toYear}
              </p>
              <p>{work_des}</p>
            </div>
          </div>
        );
      }
    );

    return (
      <Container className="background top-10 padding-all education">
        <div className="edu-details">
          <h5>Job Details</h5>
          {renderDet}
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
