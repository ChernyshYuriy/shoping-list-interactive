// import React, { Component } from "react";
import { t } from "i18next";
import React, {Component} from "react";
import { connect } from "react-redux";
import Styles from "../../css/header.module.css";
import "../../css/mainLayout.css";

 class AppHeader extends Component {
   render() {
     return (
        // const nickName = useSelector(state => state.appData.nickName)

        <div className={Styles.header}>
        <div className={`container ${Styles.row}`}>
          <div>Logo</div>
          <div className={Styles.row}>
            <div className={`${Styles.block} ${Styles.language} clickable`}>{t('select_language')}</div>
            <div className={`${Styles.block} ${Styles['user-account']} clickable`}>
              <div>{this.props.userNickName}</div>
              <div>{t('account_settings')}</div>
            </div>
            <div className={`${Styles.block} ${Styles.logout} clickable`}>{t('logout')}</div>
          </div>
        </div>
      </div>
      );
   }
 }
 function mapStateToProps(state) {
    return {
      userNickName: state.appData.users.nickName,
    };
  }
 export default connect(mapStateToProps)(AppHeader);

// function AppHeader(props) {
//   return (

//   );
// }

// export default AppHeader;
