import React from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import Stud from './stud';

class studlist extends React.Component {
  state = {
    data: []
  };

  getInfo = () => {
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .get('http://localhost:8000/getAllStudents')
      .then(response => {
        if (response.status === 200) {
          this.setState({
            error: '',
            data: response.data
          });
          console.log(this.state.data);
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
    var profile = this.state.data.map(
      ({
        idstudent,
        First_Name,
        Last_Name,
        coll_name,
        degree,
        major,
        pass_year,
        skill
      }) => {
        let showJob = 'ShowForm';

        let regexfName = new RegExp(this.props.getStudFilter, 'gi');
        let regexlName = new RegExp(this.props.getStudFilter, 'gi');

        if (
          First_Name.match(regexfName) == null &&
          Last_Name.match(regexlName) == null
        )
          showJob = 'HideForm';

        let regexSchool = new RegExp(this.props.getSchoolFilter, 'gi');
        if (coll_name.match(regexSchool) == null) showJob = 'HideForm';

        let regexMajor = new RegExp(this.props.getMajorFilter, 'gi');
        if (major.match(regexMajor) == null) showJob = 'HideForm';

        if (skill != null) {
          console.log(true);
          let regexSkill = new RegExp(this.props.getFilterSkill, 'gi');
          if (skill.match(regexSkill) == null) showJob = 'HideForm';
        }

        return (
          <Stud
            key={idstudent}
            id={idstudent}
            First_Name={First_Name}
            Last_Name={Last_Name}
            coll_name={coll_name}
            degree={degree}
            major={major}
            pass_year={pass_year}
            showJob={showJob}
          />
        );
      }
    );
    return <Container>{profile}</Container>;
  }
}

const mapStateToProps = state => {
  return {
    getStudFilter: state.getStudFilter,
    getSchoolFilter: state.getSchoolFilter,
    getMajorFilter: state.getMajorFilter,
    getFilterSkill: state.getFilterSkill
  };
};

export default connect(mapStateToProps)(studlist);
