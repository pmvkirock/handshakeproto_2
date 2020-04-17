import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Desc from './description';
import Contact from './contact';
import { companyProfileData } from '../../../../../actions/getOtherCompany';
import { connect } from 'react-redux';
import config from '../../../../../config';

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  getInfo = () => {
    const data = {
      user_id: this.props.id
    };
    this.props.dispatch(companyProfileData(data));
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    var pic;
    if (!this.props.getOtherCompany.prof_pic) {
      pic = '/profile.png';
    } else {
      pic =
        `${config.apiURL}/prof_pic/` +
        this.props.getOtherCompany.prof_pic.replace('prof_pic', 'file') +
        `.png`;
    }
    return (
      <Container>
        <Row className={'padding-bottom-15 background'}>
          <Col xl={1}>
            <img
              src={pic}
              alt="user pic"
              style={{ width: 70 + 'px', marginTop: 20 + 'px' }}
            />
          </Col>
          <Col xl={11} style={{ width: 100 + '%' }}>
            <Container>
              <Row className="top-10 mleft-10">
                <Container>
                  <h3>{this.props.getOtherCompany.cname}</h3>
                </Container>
              </Row>
              <Row className="mleft-10">
                <Container>
                  <Col xl={7}>
                    <Row>
                      <h6 className="small-grey">
                        {this.props.getOtherCompany.location}
                      </h6>
                    </Row>
                    <Row>
                      <h6 className="small-grey">
                        {this.props.getOtherCompany.noofemp} Employees
                      </h6>
                    </Row>
                  </Col>
                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">
                        {this.props.getOtherCompany.company_type}
                      </h6>
                    </Row>
                    <Row>
                      <h6 className="small-grey">
                        {this.props.getOtherCompany.owner_ship}
                      </h6>
                    </Row>
                  </Col>
                </Container>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row className="top-10">
          <Col xl={8} style={{ paddingLeft: 0 + 'px', width: 100 + '%' }}>
            <Desc des={this.props.getOtherCompany.desc} />
          </Col>
          <Col xl={4} style={{ paddingRight: 0 + 'px', width: 100 + '%' }}>
            <Contact
              email={this.props.getOtherCompany.email}
              website={this.props.getOtherCompany.website}
              data={this.props.getOtherCompany}
              getInfo={this.getInfo}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    getOtherCompany: state.getOtherCompany
  };
};

export default connect(mapStateToProps)(Primary);
