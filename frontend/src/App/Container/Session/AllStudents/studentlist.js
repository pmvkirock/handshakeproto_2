import React from 'react';
import { Container, Pagination } from 'react-bootstrap';
import { getStudents } from '../../../../actions/getAllStudents';
import { connect } from 'react-redux';
import Stud from './stud';

class studlist extends React.Component {
  state = {
    data: [],
    page: 1
  };

  pageSet = page => {
    var data = {
      page: page,
      name: this.props.getStudFilter,
      sname: this.props.getSchoolFilter,
      major: this.props.getMajorFilter,
      skill: this.props.getFilterSkill
    };

    this.props.dispatch(getStudents(data));
    this.setState({
      page: page
    });
  };

  getInfo = () => {
    var data = {
      page: 1,
      name: this.props.getStudFilter,
      sname: this.props.getSchoolFilter,
      major: this.props.getMajorFilter,
      skill: this.props.getFilterSkill
    };
    this.props.dispatch(getStudents(data));
  };

  componentDidMount() {
    this.getInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.getStudFilter !== prevProps.getStudFilter) {
      this.getInfo();
    }
    if (this.props.getSchoolFilter !== prevProps.getSchoolFilter) {
      this.getInfo();
    }
    if (this.props.getMajorFilter !== prevProps.getMajorFilter) {
      this.getInfo();
    }
    if (this.props.getFilterSkill !== prevProps.getFilterSkill) {
      this.getInfo();
    }
  }

  render() {
    var profile = this.props.getAllStudents.students.map(
      ({ _id, fname, lname, school_info }) => {
        if (
          localStorage.getItem('type') == 'Company' ||
          (localStorage.getItem('type') == 'Student' &&
            localStorage.getItem('user_id') != _id)
        ) {
          return (
            <Stud
              key={_id}
              id={_id}
              First_Name={fname}
              Last_Name={lname}
              coll_name={school_info[0].name}
              degree={school_info[0].degree}
              major={school_info[0].major}
              pass_year={school_info[0].yop}
            />
          );
        }
      }
    );
    let items = [];
    for (let number = 1; number <= this.props.getAllStudents.pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={
            number === this.props.getAllStudents.page ||
            (this.props.getAllStudents.page === null && number === 1)
          }
          onClick={() => this.pageSet(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return (
      <Container>
        {profile}
        <Pagination>{items}</Pagination>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    getStudFilter: state.getStudFilter,
    getSchoolFilter: state.getSchoolFilter,
    getMajorFilter: state.getMajorFilter,
    getFilterSkill: state.getFilterSkill,
    getAllStudents: state.getAllStudents
  };
};

export default connect(mapStateToProps)(studlist);
