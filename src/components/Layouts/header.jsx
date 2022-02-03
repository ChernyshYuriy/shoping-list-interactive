// import React, { Component } from "react";
import { t } from "i18next";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link  } from "react-router-dom";
import Styles from "../../css/header.module.css";
import "../../css/mainLayout.css";
import { changeLoading, changePopup } from "../../store/appConfigData";
import { logout } from "../../store/userInfo";
class AppHeader extends Component {

   logoutAccount = async () => {
    this.props.changeLoading({ status: true, message: "Logout_user" });
    await this.props.logout();
    await this.props.changePopup({visibility: true})
    this.props.changeLoading({ status: false, message: "Data_processing" });
  }

  render() {
    return (
      // const nickName = useSelector(state => state.appData.nickName)
      // const nav = useNavigate();

      <div className={Styles.header}>
        <div className={`container ${Styles.row}`}>
          <Link className="link logo" to={'/'}>Manage easily</Link>
          <div className={Styles.row}>
          <Link to={'/edit-products'} className={`${Styles.block} ${Styles.language} clickable`}>
              {t("edit_product_list")}
            </Link>
            <div className={`${Styles.block} ${Styles.language} clickable`}>
              {t("select_language")}
            </div>
            <div
              className={`${Styles.block} ${Styles["user-account"]} clickable`}
            >
              <div>{this.props.userNickName}</div>
              <div>{t("account_settings")}</div>
            </div>
            <Link to={'/'} onClick={this.logoutAccount} className={`${Styles.block} ${Styles.logout} clickable`}>
              {t("logout")}
            </Link>
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
export default connect(mapStateToProps, {logout, changeLoading, changePopup})(AppHeader);

// function AppHeader(props) {
//   return (

//   );
// }

// export default AppHeader;
