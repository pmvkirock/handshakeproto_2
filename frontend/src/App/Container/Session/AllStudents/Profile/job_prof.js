import React from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

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

  addSchool = () => {
    if (this.state.hideForm == 'ShowForm') {
      this.setState({
        hideForm: 'HideForm'
      });
    } else {
      this.setState({
        hideForm: 'ShowForm'
      });
    }
  };

  getInfo = () => {
    const data = {
      stud_id: this.props.id
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post('http://localhost:8000/stud_exp', data)
      .then(response => {
        console.log('EDU Status Code : ' + response.status);
        console.log(response.data);
        if (response.status === 200) {
          this.setState({
            data: response.data
          });
          response.data.map(
            ({
              company_name,
              title,
              location,
              fromMth,
              toMth,
              fromYr,
              toYr,
              idstudent_exp,
              jobDesc
            }) => {
              this.setState(prevState => {
                return {
                  editJobForm: prevState.editJobForm.concat('HideForm'),
                  company_name: prevState.company_name.concat(company_name),
                  title: prevState.title.concat(title),
                  location: prevState.location.concat(location),
                  fromMth: prevState.fromMth.concat(fromMth),
                  toMth: prevState.toMth.concat(toMth),
                  fromYr: prevState.fromYr.concat(fromYr),
                  toYr: prevState.toYr.concat(toYr),
                  idstudent_exp: prevState.idstudent_exp.concat(idstudent_exp),
                  desc: prevState.desc.concat(jobDesc)
                };
              });
            }
          );
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
    var i = -1;
    var renderDet = this.state.data.map(() => {
      i++;
      return (
        <div key={this.state.idstudent_exp[i]}>
          <div className="edu-details" style={{ paddingTop: 10 + 'px' }}>
            <h6>{this.state.company_name[i]}</h6>
            <p>{this.state.title[i]}</p>
            <p>{this.state.location[i]}</p>
            <p>
              {this.state.fromMth[i]}/{this.state.fromYr[i]}-
              {this.state.toMth[i]}/{this.state.toYr[i]}
            </p>
            <p>{this.state.desc[i]}</p>
          </div>
        </div>
      );
    });

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

export default Education;
