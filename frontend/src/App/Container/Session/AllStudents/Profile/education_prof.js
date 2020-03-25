import React from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

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

  getInfo = () => {
    const data = {
      stud_id: this.props.id
    };
    axios.defaults.withCredentials = true;
    axios
      .post('http://localhost:8000/stud_edu', data)
      .then(response => {
        console.log('EDu Status Code : ' + response.status);
        console.log(response.data);
        if (response.status === 200) {
          response.data.map(
            ({
              coll_name,
              degree,
              major,
              curr_CGPA,
              pass_year,
              fromMth,
              toMth,
              fromYr,
              toYr,
              idstudent_edu
            }) => {
              console.log(idstudent_edu);
              this.setState(prevState => {
                return {
                  editSchoolForm: prevState.editSchoolForm.concat('HideForm'),
                  coll_name: prevState.coll_name.concat(coll_name),
                  degree: prevState.degree.concat(degree),
                  major: prevState.major.concat(major),
                  curr_CGPA: prevState.curr_CGPA.concat(curr_CGPA),
                  pass_year: prevState.pass_year.concat(pass_year),
                  fromMth: prevState.fromMth.concat(fromMth),
                  toMth: prevState.toMth.concat(toMth),
                  fromYr: prevState.fromYr.concat(fromYr),
                  toYr: prevState.toYr.concat(toYr),
                  idstudent_edu: prevState.idstudent_edu.concat(idstudent_edu)
                };
              });
            }
          );
          this.setState({
            data: response.data,
            i: response.data.length
          });
          console.log(this.state.coll_name[0]);
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
    var i = -1,
      renderer;

    renderer = this.state.data.map(() => {
      i++;
      return (
        <div key={this.state.idstudent_edu[i]}>
          <div className="edu-details" style={{ paddingTop: 10 + 'px' }}>
            <h6>{this.state.coll_name[i]}</h6>
            <p>
              {this.state.degree[i]} - <span>{this.state.major[i]}</span>
            </p>
            <p>
              {this.state.fromMth[i]}/{this.state.fromYr[i]}-
              {this.state.toMth[i]}/{this.state.toYr[i]}
            </p>
            <p>Year of passing: {this.state.pass_year[i]}</p>
            <p>Current CGPA: {this.state.curr_CGPA[i]}</p>
          </div>
        </div>
      );
    });

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

export default Education;
