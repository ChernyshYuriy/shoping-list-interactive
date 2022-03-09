// import React, { Component } from "react";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Styles from "../../css/header.module.css";
import "../../css/mainLayout.css";
import { changeLoading, changePopup } from "../../store/appConfigData";
import { logout } from "../../store/userInfo";
// import i18n from "../../i18n";
import { t } from "i18next";
import DropDown from "./../ui/dropDownList";

class AppHeader extends Component {
  state = {
    showMobileMenu: false,
    languages: [
      {
        title: "English",
        id: "en",
      },
      {
        title: "Українська",
        id: "ua",
      },
    ],
    languageSelectorShow: false,
  };

  // changeLanguage = (lang) => {
  //   i18n.changeLanguage(lang);
  //   console.log(lang, i18n.resolvedLanguage, i18n, "i18n");
  //   this.forceUpdate();
  //   localStorage.setItem('lang', lang);
  // };

  changeMobileMenuVisibility = (status = !this.state.showMobileMenu) => {
    this.setState({ showMobileMenu: status });
  };

  changeLanguageStatus = () => {
    this.setState({ languageSelectorShow: !this.state.languageSelectorShow });
  };

  logoutAccount = async () => {
    this.props.changeLoading({ status: true, message: "Logout user" });
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
            <Link to={"/"} className="clickable">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="34px"
                height="34px"
              >
                <path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z" />
              </svg>
            </Link>
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
              <div
                className={`${Styles.block} ${Styles.language} clickable`}
                onClick={this.changeLanguageStatus}
              >
                {t("select_language")}
                <DropDown
                  status={this.state.languageSelectorShow}
                  list={this.state.languages}
                  titleKey="title"
                  idKey="id"
                  clickEvent={this.props.changeLanguage}
                />
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

        <div
          className={`${Styles["mobile-menu-background"]} ${
            this.state.showMobileMenu
              ? Styles["mobile-menu-background--open"]
              : Styles["mobile-menu-background--close"]
          }`}
          onClick={() => this.changeMobileMenuVisibility(false)}
        >
          <div
            className={`${Styles["mobile-menu"]} ${
              this.state.showMobileMenu
                ? Styles["mobile-menu--open"]
                : Styles["mobile-menu--close"]
            }`}
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
              className={`${Styles["mobile-menu__element"]} ${
                Styles["language-mobile"]
              } ${
                this.state.languageSelectorShow
                  ? Styles["language-mobile--open"]
                  : Styles["language-mobile--close"]
              } clickable`}
              onClick={this.changeLanguageStatus}
            >
              {t("select_language")}
              {this.state.languages.map((lang) => {
                return (
                  <div
                    key={lang.id}
                    onClick={() => this.props.changeLanguage(lang.id)}
                  >
                    {lang.title}
                  </div>
                );
              })}
              {/* <DropDown
                  status={this.state.languageSelectorShow}
                  list={this.state.languages}
                  titleKey="title"
                  idKey="id"
                  clickEvent={this.props.changeLanguage}
                /> */}
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
