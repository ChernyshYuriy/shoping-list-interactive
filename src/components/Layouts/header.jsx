// import React, { Component } from "react";
import { t } from "i18next";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Styles from "../../css/header.module.css";
import "../../css/mainLayout.css";
import { changeLoading, changePopup } from "../../store/appConfigData";
import { logout } from "../../store/userInfo";
class AppHeader extends Component {
  state = {
    showMobileMenu: false,
  };

  changeMobileMenuVisibility = (status = !this.state.showMobileMenu) => {
    this.setState({ showMobileMenu: status });
  };

  logoutAccount = async () => {
    this.props.changeLoading({ status: true, message: "Logout_user" });
    await this.props.logout();
    await this.props.changePopup({ visibility: true });
    this.props.changeLoading({ status: false, message: "Data_processing" });
  };

  render() {
    return (
      // const nickName = useSelector(state => state.appData.nickName)
      // const nav = useNavigate();
      <React.Fragment>
        <div className={Styles.header}>
          <div className={Styles["main-icon"]}>
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 122.88 85.36"
              onClick={this.changeMobileMenuVisibility}
            >
              <g>
                <path d="M6.12,12.23C2.74,12.23,0,9.49,0,6.12C0,2.74,2.74,0,6.12,0h110.65c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12 H6.12L6.12,12.23z M6.12,36.61C2.74,36.61,0,33.87,0,30.49c0-3.38,2.74-6.12,6.12-6.12H76.5c3.38,0,6.12,2.74,6.12,6.12 c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,36.61z M6.12,60.99C2.74,60.99,0,58.25,0,54.87c0-3.38,2.74-6.12,6.12-6.12h110.65 c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,60.99z M6.12,85.36C2.74,85.36,0,82.63,0,79.25 c0-3.38,2.74-6.12,6.12-6.12H76.5c3.38,0,6.12,2.74,6.12,6.12c0,3.38-2.74,6.12-6.12,6.12H6.12L6.12,85.36z" />
              </g>
            </svg>
          </div>
          <div className={`container ${Styles.row} ${Styles.content}`}>
            <Link className="link logo" to={"/"}>
              Manage easily
            </Link>
            <div className={Styles.row}>
              <Link
                to={"/edit-products"}
                className={`${Styles.block} clickable`}
              >
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
              <Link
                to={"/"}
                onClick={this.logoutAccount}
                className={`${Styles.block} ${Styles.logout} clickable`}
              >
                {t("logout")}
              </Link>
            </div>
          </div>
        </div>
        {this.state.showMobileMenu ? (
          <div
            className={Styles["mobile-menu-background"]}
            onClick={() => this.changeMobileMenuVisibility(false)}
          >
            <div
              className={Styles["mobile-menu"]}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <Link
                  className="link logo logo-mobile"
                  to={"/"}
                  onClick={() => this.changeMobileMenuVisibility(false)}
                >
                  Manage easily
                </Link>
                <span
                  className={Styles["mobile-menu__icon"]}
                  onClick={() => this.changeMobileMenuVisibility(false)}
                >
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="10.8379"
                      y="10.1113"
                      width="22.8565"
                      height="2.28565"
                      rx="1.14282"
                      transform="rotate(45 10.8379 10.1113)"
                      fill="white"
                    ></rect>
                    <rect
                      x="9.3501"
                      y="26.4272"
                      width="22.8565"
                      height="2.28565"
                      rx="1.14282"
                      transform="rotate(-46 9.3501 26.4272)"
                      fill="white"
                    ></rect>
                  </svg>
                </span>
              </div>

              <div className={`${Styles["user-account-mobile"]} clickable`}>
                <div>{this.props.userNickName}</div>
                <div>{t("account_settings")}</div>
              </div>
              <Link
                to={"/edit-products"}
                className={`${Styles["mobile-menu__element"]} ${Styles.link} clickable`}
                onClick={() => this.changeMobileMenuVisibility(false)}
              >
                {t("edit_product_list")}
              </Link>
              <div
                className={`${Styles["mobile-menu__element"]} ${Styles["language-mobile"]} clickable`}
              >
                {t("select_language")}
              </div>
              <Link
                to={"/"}
                onClick={this.logoutAccount}
                className={`${Styles["mobile-menu__element"]} ${Styles["logout-mobile"]} clickable`}
              >
                {t("logout")}
              </Link>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    userNickName: state.appData.users.nickName,
  };
}
export default connect(mapStateToProps, { logout, changeLoading, changePopup })(
  AppHeader
);

// function AppHeader(props) {
//   return (

//   );
// }

// export default AppHeader;
