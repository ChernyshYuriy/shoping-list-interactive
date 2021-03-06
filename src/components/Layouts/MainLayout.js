import React, { Component } from "react";
import AppHeader from "./header";
import "../../css/mainLayout.css";
import i18n from "../../i18n";
import { changeLanguage } from "../../store/appConfigData";
import { connect } from 'react-redux';
import { AddToHomeScreen } from 'react-pwa-add-to-homescreen';

class MainLayout extends Component {
  componentDidMount(){
    // console.log(localStorage.getItem('lang'), "lang");

    if (!localStorage.getItem('lang')) {
      this.changeLanguage("en")
    }

    // console.log(localStorage.getItem('lang'), "lang2");
  }
  changeLanguage = async (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    // console.log(lang, i18n.resolvedLanguage, i18n, "i18n");
    this.props.changeLanguage(lang);
  };
  componentDidUpdate(prevProps){
    if(prevProps.language !== this.props.language){
      this.forceUpdate();
      // console.log(this.props.language);
    }
    
  }

  render() {
    return (
      <React.Fragment>
        <AppHeader lang={this.props.language} changeLanguage={this.changeLanguage}></AppHeader>
        <div className="container">{this.props.children}</div>
        <AddToHomeScreen skipFirstVisit={false}/>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.appConfig.language,
  };
}

export default connect(mapStateToProps, { changeLanguage })(MainLayout);
