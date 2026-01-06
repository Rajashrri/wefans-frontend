import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
// import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from 'react-i18next';

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader
} from "../../store/actions";
import withRouter from "../Common/withRouter";

class SidebarContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pathName: this.props.router.location.pathname,
    
        roleName: localStorage.getItem("role_name") || "",
           privileges: {}, // store backend privileges here
    };

  }

  componentDidMount() {
    this.initMenu();
      const storedRoleName = localStorage.getItem("role_name") || "";
    this.setState({ roleName: storedRoleName });
    this.getPrivileges(); // fetch privileges when sidebar loads
  }
 getPrivileges = async () => {
    try {
      const roleId = localStorage.getItem("role_id");
      const roleName = localStorage.getItem("role_name") || "";

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/privileges/getprivileges/${roleId}`
      );
      const result = await response.json();

      if (result.msg && result.msg.length > 0) {
        this.setState({
          privileges: result.msg[0],
          roleName // keep roleName from localStorage
        });
      }
    } catch (error) {
      console.error("Error fetching privileges:", error);
    }
  };

  UNSAFE_componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {

        if (this.props.type !== prevProps.type) {
            this.initMenu();
        }

    }
    if (this.props.router.location.pathname !== prevProps.router.location.pathname) {
      this.setState({ pathName: this.props.router.location.pathname }, () => {
        this.initMenu();
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");
    const { pathName } = this.state;


    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = item => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
 
const { privileges, roleName } = this.state;
    const isAdmin = roleName && roleName.trim().toLowerCase() === "admin";
    return (
      <React.Fragment>
        <div id="sidebar-menu">

          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t('Menu')}</li>

            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="ri-dashboard-line"></i>
                <span className="ms-1">{this.props.t('Dashboard')}</span>
              </Link>
            </li>
           <li>
              <Link to="/professional-list" className="waves-effect">
                <i className="mdi mdi-account-key-outline"></i> 
                <span className="ms-1">{this.props.t('Profession Master')}</span>
              </Link>
            </li>
           
            <li>
              <Link to="/language-master" className="waves-effect">
                <i className="mdi mdi-account-key-outline"></i> 
                <span className="ms-1">{this.props.t('Language Master')}</span>
              </Link>
            </li>
              <li>
              <Link to="/triviaTypes-master" className="waves-effect">
                <i className="mdi mdi-account-key-outline"></i> 
                <span className="ms-1">{this.props.t('Trivia Types')}</span>
              </Link>

               <Link to="/sociallink-list" className="waves-effect">
                <i className="mdi mdi-account-key-outline"></i> 
                <span className="ms-1">{this.props.t('Social Links ')}</span>
              </Link>
               <Link to="/celebrity-list" className="waves-effect">
                <i className="mdi mdi-account-key-outline"></i> 
                <span className="ms-1">{this.props.t('Celebrity ')}</span>
              </Link>
               <Link to="/timeline-list" className="waves-effect">
                <i className="mdi mdi-account-key-outline"></i> 
                <span className="ms-1">{this.props.t('Timeline Entries ')}</span>
              </Link>
               <Link to="/triviaentries-list" className="waves-effect">
                <i className="mdi mdi-account-key-outline"></i> 
                <span className="ms-1">{this.props.t('Trivia Entries ')}</span>
              </Link>
               <Link to="/sectionmaster-list" className="waves-effect">
                <i className="mdi mdi-account-key-outline"></i> 
                <span className="ms-1">{this.props.t('Section Types Master ')}</span>
              </Link>
            </li>
           
         
       

       

          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return { ...state.Layout };
};

export default withRouter(connect(mapStatetoProps, {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeLayoutWidth,
  changePreloader
})(withTranslation()(SidebarContent)));
