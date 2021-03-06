import React, { Component } from "react";
import { connect } from "react-redux";
import Popup from "../components/ui/popup";
import {
  createAccount,
  createShortAccount,
  // getShortUserList,
  // isUserAlreadyHaveAccount,
  loginUser,
} from "../store/userInfo";
import "../css/form.css";
import { t } from "i18next";
import { changeLoading, changePopup } from "../store/appConfigData";

// import { coder } from "./mixins/coder";

class LoginUser extends Component {
  state = {
    popupFunctionalityStatus: "login",
    nickName: null,
    isLastActionSuccess: { status: true, massage: "" },
  };

  constructor(props) {
    super(props);
    this.localStorageNickName = localStorage.getItem("nickName") || "";
    this.nickName = React.createRef();
    this.pinCode = React.createRef();
    this.email = React.createRef();
  }

  // constructor(props) {
  //   super(props);
  //   this.nickNameRef = React.createRef();
  // }

  componentDidMount() {
    // console.log(coder('1080', false), `coder('1080')`);

    this.setState({ nickName: this.localStorageNickName });
    // if (this.localStorageNickName)
    // // document.getElementById("nickName").value = localStorageNickName;
    // // this.nickName.current.value = this.localStorageNickName;
    // console.log(this.nickName, 'this.nickName.current.value', this.localStorageNickName);
  }

  async handleLoginAccount(e) {
    e.preventDefault();

    try {
      // const nickName = document.getElementById("nickName").value.toLowerCase();
      // const pinCode = document.getElementById("pinCode").value;
      // const email = document.getElementById("email").value;
      const nickName = this.nickName.current.value.toLowerCase();
      const pinCode = this.pinCode.current.value;
      const email = this.email.current.value;
      // console.log(this.nickName.current.value,
      //   this.pinCode.current.value,
      //   this.email.current.value, "Ref");
      // console.log(nickName, pinCode, email);
      if (this.state.popupFunctionalityStatus === "login") {
        await this.props.changeLoading({
          status: true,
          message: "getUserData",
        });
        await this.props.loginUser(nickName, pinCode);
        localStorage.setItem("nickName", nickName);
        this.setState({ nickName });
      } else if (this.state.popupFunctionalityStatus === "createAccount") {
        await this.props.changeLoading({
          status: true,
          message: "creatingAccount",
        });
        await this.props.createAccount(nickName, pinCode, email);
        localStorage.setItem("nickName", nickName);
        this.setState({ nickName });
      }
      // // // console.log(0);
      // // // console.log(
      // // //   this.props.userNickName,
      // // //   this.props.userId,
      // // //   this.props.userNickName && this.props.userId,
      // // //   "this.props.userNickName && this.props.userId this.props.userNickName && this.props.userId this.props.userNickName && this.props.userId"
      // // // );

      // try {
      //   new Promise((resolve, reject) => {
      //     const nickName = document.getElementById("nickName").value;
      //     const pinCode = document.getElementById("pinCode").value;
      //     const email = document.getElementById("email").value;
      //     if (this.state.popupFunctionalityStatus === "login") {
      //       this.props.changeLoading({ message: "getUserData" });
      //       this.props.loginUser(nickName, pinCode);
      //       resolve()
      //     } else if (this.state.popupFunctionalityStatus === "createAccount") {
      //       this.props.changeLoading({ message: "creatingAccount" });
      //       this.props.createAccount(nickName, pinCode, email);
      //       resolve()
      //     }

      //     console.log(0);
      //     console.log(
      //       this.props.userNickName,
      //       this.props.userId,
      //       this.props.userNickName && this.props.userId,
      //       "this.props.userNickName && this.props.userId this.props.userNickName && this.props.userId this.props.userNickName && this.props.userId"
      //     );
      //   }).then(() => {
      //     console.log(1);
      //     if ( !!this.props.userNickName && !!this.props.userId) {
      //       console.log("closePopup");
      //       this.props.changePopup({ visibility: false });
      //     }
      //   })

      // this.props.changeLoading({ status: true, message: 'checkingIsAccountCreated' })
      // await this.props.getShortUserList(false);
      // const selectedUser = isUserAlreadyHaveAccount(
      //   nickName,
      //   pinCode,
      //   this.props.shortUserList
      // );
      // console.log(selectedUser, 'selectedUser');
      // console.log(!nickName && !pinCode, '!nickName && !pinCode');

      // if (!nickName || !pinCode || pinCode.length !== 4) {
      //   this.setState({isLastActionSuccess: { status: false, massage: "wrong_fild_nickName_or_pinCode" }})
      //   return
      // }
      // if (
      //   this.state.popupFunctionalityStatus === "login" &&
      //   selectedUser.length !== 0
      // ) {
      //   this.props.changeLoading({message: 'getUserData' })
      //   await this.props.loginUser(selectedUser[0].userId);
      // } else if (
      //   this.state.popupFunctionalityStatus === "login" &&
      //   selectedUser.length === 0
      // ) this.setState({isLastActionSuccess: { status: false, massage: "loginFailed" }})
      // if (
      //   this.state.popupFunctionalityStatus === "createAccount" &&
      //   selectedUser.length === 0
      // ) {
      //   this.props.changeLoading({message: 'creatingAccount' })
      //   await this.props.createAccount({ nickName, pinCode: coder(pinCode) }, false);
      //   this.props.changeLoading({message: 'creatingAccount' })
      //   await this.props.createShortAccount({
      //     nickName,
      //     pinCode :coder(pinCode),
      //     userId: this.props.userId,
      //   });
      // } else if (
      //   this.state.popupFunctionalityStatus === "createAccount" &&
      //   selectedUser.length !== 0
      // ) this.setState({isLastActionSuccess: { status: false, massage: "createAccountFailed" }})
    } finally {
      // this.props.changeLoading({ status: false, message: "Data_processing" });
    }
  }

  // async componentDidMount() {
  //   // console.log(this.props.createAccount);
  //   await this.props.getShortUserList();
  //   console.log(
  //     isUserAlreadyHaveAccount("DADA!@22", this.props.shortUserList),
  //     `isUserAlreadyHaveAccount("DADA!@22", this.props.shortUserList)`
  //   );
  //   console.log(this.props.shortUserList);

  //   console.log(isUserAlreadyHaveAccount, "isUserAlreadyHaveAccount");
  //   if (isUserAlreadyHaveAccount.length === 0) {
  //     await this.props.createAccount({ nickName: "DADA!@22" });
  //     console.log("create", this.props.userId);
  //     await this.props.createShortAccount({
  //       nickName: "DADA!@22",
  //       userId: this.props.userId,
  //     });
  //   }
  //   if (this.props.userId) {
  //     await this.props.loginUser(this.props.userId);
  //   }
  //   if (!!false) {
  //     await this.props.loginUser("177F3563-77AA-4829-A30D-52FE8FEC73D2");
  //   }
  //   // this.props.createAccount()
  // }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps !== this.props &&
      !!this.props.userNickName &&
      !!this.props.userId
    ) {
      this.props.changePopup({ visibility: false });
    }
    if (this.nickName.current !== null) {
      if (this.localStorageNickName)
        // document.getElementById("nickName").value = localStorageNickName;
        this.nickName.current.value = this.state.nickName;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Popup closureActive={false}>
          <form className="form" onSubmit={(e) => this.handleLoginAccount(e)}>
            {/*  */}
            <div className="form-block">
              <label htmlFor="nickName">
                {this.state.popupFunctionalityStatus === "login"
                  ? t("login")
                  : t("create_account")}
              </label>
              <input
                type="text"
                className="input"
                name=""
                // ref={this.nickNameRef}
                ref={this.nickName}
                id="nickName"
                placeholder={t("enter_nickName")}
              />
              <input
                style={{
                  display:
                    this.state.popupFunctionalityStatus === "login"
                      ? "none"
                      : "block",
                }}
                type="email"
                className="input"
                name=""
                // ref={this.nickNameRef}
                ref={this.email}
                id="email"
                placeholder={t("enter_email")}
              />

              <input
                type="password"
                className="input"
                name=""
                maxLength="4"
                // ref={this.nickNameRef}
                ref={this.pinCode}
                id="pinCode"
                placeholder={t("enter_pinCode")}
              />
              {/* <div className="form-warning">
                {this.state.isLastActionSuccess.status
                  ? null
                  : t(this.state.isLastActionSuccess.massage)}
              </div> */}
              <div className="form-warning">
                {t(this.props.validationError)}
              </div>
            </div>
            <button
              className={`btn ${
                this.state.popupFunctionalityStatus === "login"
                  ? "btn-edit"
                  : "btn-save"
              }`}
            >
              {this.state.popupFunctionalityStatus === "login"
                ? t("login")
                : t("create_account")}
            </button>
          </form>
          {this.state.popupFunctionalityStatus === "login" ? (
            <div
              className="link"
              onClick={() => this.changePopupFunctionality("createAccount")}
            >
              {t("create_account")}
            </div>
          ) : (
            <div
              className="link"
              onClick={() => this.changePopupFunctionality("login")}
            >
              {t("login")}
            </div>
          )}
        </Popup>
      </React.Fragment>
    );
  }

  changePopupFunctionality(status) {
    this.setState({
      popupFunctionalityStatus: status,
    });
    this.setState({ isLastActionSuccess: { status: true, massage: "" } });
  }
}
function mapStateToProps(state) {
  return {
    shortUserList: state.appData.users.shortUserList,
    userId: state.appData.users.objectId,
    userNickName: state.appData.users.nickName,
    validationError: state.appConfig.popup.validationError,
  };
}

export default connect(mapStateToProps, {
  createAccount,
  // getShortUserList,
  createShortAccount,
  loginUser,
  changePopup,
  changeLoading,
})(LoginUser);
