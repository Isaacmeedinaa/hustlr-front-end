import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { userAutoLogin } from "../../store/actions/user";
import { cardIsSaved, cardIsNotSaved } from "../../store/actions/cardSaved";
import { fetchIndustries } from "../../store/actions/industries";
import {
  uploadBusinessProfilePicture,
  uploadBackdropImage,
} from "../../store/actions/card";

import SideToolbar from "../UI/SideToolbar";
import TopToolbar from "../UI/home/TopToolbar";
import BottomToolbar from "../UI/BottomToolbar";
import CardFormImageCropperModal from "../UI/home/cardform/modals/CardFormImageCropperModal";
import CardFormBackdropImageCropperModal from "../UI/home/cardform/modals/CardFormBackdropImageCropperModal";
import CardFormSocialMediaModal from "../UI/home/cardform/modals/CardFormSocialMediaModal";
import CardFormPaymentMethodsModal from "../UI/home/cardform/modals/CardFormPaymentMethodsModal";
import CardFormOfferingModal from "../UI/home/cardform/modals/CardFormOfferingModal";
import CardForm from "../UI/home/cardform/CardForm";
import Card from "../UI/home/card/Card";

import Loader from "react-loader-spinner";

import "../../constants/colors.css";
import "./pages.css";
import "../UI/home/cardform/CardFormUI.css";

class HomeContainer extends Component {
  state = {
    largeScreen: false,
    inputImg: "",
    inputBackdropImg: "",
  };

  componentDidMount() {
    if (this.props.industries.length === 0) {
      this.props.fetchIndustries();
    }

    if (window.innerWidth > 1100) {
      this.setState({
        ...this.state,
        largeScreen: true,
      });
    } else {
      this.setState({
        ...this.state,
        largeScreen: false,
      });
    }

    const mql = window.matchMedia("(max-width: 1100px)");
    mql.addEventListener("change", this.mediaQueryListener);
  }

  componentWillUnmount() {
    const mql = window.matchMedia("(max-width: 1100px)");
    mql.removeEventListener("change", this.mediaQueryListener);
  }

  mediaQueryListener = (event) => {
    if (!event.matches) {
      this.setState({
        ...this.state,
        largeScreen: true,
      });
    } else {
      this.setState({
        ...this.state,
        largeScreen: false,
      });
    }
  };

  componentDidUpdate() {
    const keysToCompare = [
      "title",
      "description",
      "city",
      "state",
      "email",
      "phoneNumber",
      "pathToCard",
      "isPublic",
      "facebookLink",
      "instagramLink",
      "snapchatLink",
      "twitterLink",
      "themeId",
      "industryId",
    ];
    const localStorageCard = JSON.parse(localStorage.getItem("card"));

    if (this.props.cardData.id === null) return;

    for (const key in localStorageCard) {
      if (localStorageCard.hasOwnProperty(key)) {
        if (
          Array.isArray(localStorageCard[key]) ||
          typeof localStorageCard[key] === "object"
        ) {
          if (key === "location") {
            if (
              localStorageCard[key]?.googlePlaceId !==
              this.props.cardData[key]?.googlePlaceId
            ) {
              this.props.cardIsNotSaved();
              return;
            }
          } else if (key === "industry") {
            if (localStorageCard[key]?.id !== this.props.cardData[key]?.id) {
              this.props.cardIsNotSaved();
              return;
            }
          } else if (key === "offerings") {
            for (let i = 0; i < localStorageCard.offerings.length; i++) {
              let foundChanges = false;
              this.props.cardData.offerings.forEach((offeringRedux) => {
                if (
                  offeringRedux.id === localStorageCard.offerings[i].id &&
                  (offeringRedux.title !==
                    localStorageCard.offerings[i].title ||
                    offeringRedux.price !==
                      localStorageCard.offerings[i].price ||
                    offeringRedux.description !==
                      localStorageCard.offerings[i].description)
                ) {
                  this.props.cardIsNotSaved();
                  foundChanges = true;
                  return; // this only breaks from forEach loop, that's why we need the boolean
                }
              });
              if (foundChanges) return;
            }
          } else {
            continue;
          }
        } else if (
          localStorageCard[key] !== this.props.cardData[key] &&
          keysToCompare.indexOf(key) > -1
        ) {
          this.props.cardIsNotSaved();
          return;
        }
      }
    }
    this.props.cardIsSaved();
  }

  setInputImg = (inputImg) => {
    this.setState({
      ...this.state,
      inputImg: inputImg,
    });
  };

  setInputBackdropImg = (inputBackdropImg) => {
    this.setState({
      ...this.state,
      inputBackdropImg: inputBackdropImg,
    });
  };

  render() {
    if (this.props.cardLoader || this.props.industriesLoader) {
      return (
        <div className="page-loader-container">
          <Loader type="TailSpin" color="#2ecc71" width={48} height={48} />
        </div>
      );
    }

    return (
      <Fragment>
        <CardFormImageCropperModal inputImg={this.state.inputImg} />
        <CardFormBackdropImageCropperModal
          inputBackdropImg={this.state.inputBackdropImg}
        />
        <CardFormSocialMediaModal />
        <CardFormPaymentMethodsModal />
        <CardFormOfferingModal />
        <TopToolbar />
        <div className="grid-container-home">
          <SideToolbar
            pathname={this.props.location.pathname}
            history={this.props.history}
          />
          <Fragment>
            <div
              className="secondary-light-bg card-form-col-wrapper"
              style={{
                display: this.state.largeScreen
                  ? "block"
                  : this.props.tabs !== "EDIT"
                  ? "none"
                  : "block",
              }}
            >
              <div className="card-form-col-container">
                <CardForm
                  setInputImg={this.setInputImg}
                  setInputBackdropImg={this.setInputBackdropImg}
                />
              </div>
            </div>
            <div
              className="secondary-light-bg card-show-col-wrapper"
              style={{
                display: this.state.largeScreen
                  ? "block"
                  : this.props.tabs !== "PREVIEW"
                  ? "none"
                  : "block",
              }}
            >
              <div className="card-show-col-container">
                <Card />
              </div>
            </div>
          </Fragment>
        </div>
        <BottomToolbar
          pathname={this.props.location.pathname}
          history={this.props.history}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cardData: state.card.cardData,
    cardId: state.card.cardData.id,
    cardLoader: state.cardLoader,
    industries: state.industries.dropdownIndustries,
    industriesLoader: state.industriesLoader,
    tabs: state.tabs,
    imageCropperModal: state.imageCropperModal,
    backdropImageCropperModal: state.backdropImageCropperModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userAutoLogin: (history) => dispatch(userAutoLogin(history)),
    cardIsSaved: () => dispatch(cardIsSaved()),
    cardIsNotSaved: () => dispatch(cardIsNotSaved()),
    fetchIndustries: () => dispatch(fetchIndustries()),
    uploadBusinessProfilePicture: (reqImgData, cardId) =>
      dispatch(uploadBusinessProfilePicture(reqImgData, cardId)),
    uploadBackdropImage: (reqImgData, cardId) =>
      dispatch(uploadBackdropImage(reqImgData, cardId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
