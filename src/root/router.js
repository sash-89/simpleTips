import React, {useEffect, useRef, useState} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import LoginContainer from "../views/Login/LoginContainer";
import HeaderContainer from "../views/Header/HeaderContainer";
import "../assets/styles/style.css"
import BalanceContainer from "../views/Balance/BalanceContainer";
import QuestionContainer from "../views/Questions/QuestionContainer";
import InviteContainer from "../views/Invite/InviteContainer";
import UserContainer from "../views/User/UserContainer";
import NumberSelectionContainer from "../views/NumberSelection/NumberSelectionContainer";
import PersonalContainer from "../views/Personal/PersonalContainer";
import ChangeEmail from "../views/Personal/PersonalMobile/ChangeEmail/ChangeEmail";
import OrganisationContainer from "../views/Organisation/OrganisationContainer";
import NotificationsContainer from "../views/Notifications/NotificationsContainer";
import RoomsContainer from "../views/Rooms/RoomsContainer";
import AddEmployeeContainer from "../views/AddEmployee/AddEmployeeContainer";
import AddNumberContainer from "../views/AddNumber/AddNumberContainer";
import AddRangeOfNumbersContainer from "../views/AddRangeOfNumbers/AddRangeOfNumbersContainer";
import RecipientsContainer from "../views/Recipients/RecipientsContainer";
import AddNewRecipientContainer from "../views/AddNewRecipient/AddNewRecipientContainer";
import RegisteredRecipientContainer from "../views/RegisteredRecipient/RegisteredRecipientContainer";
import ReviewsContainer from "../views/Reviews/ReviewsContainer";
import PrintFormsContainer from "../views/PrintForms/PrintFormsContainer";
import ConfirmEmail from "../views/Personal/PersonalMobile/ChangeEmail/ConfirmEmail";
import ReviewsSettingsContainer from "../views/ReviewsSettings/ReviewsSettingsContainer";
import {ProtectedRoute} from "../components/ProtectedRoute";
import {connect} from "react-redux";
import {compose} from "redux";
import OrganisationAndAdministratorContainer from "../views/OrganisationAndAdministrator/OrganisationAndAdministratorContainer";
import Menu from "../views/Menu/Menu";
import HeaderDT from "../views/Header/HeaderDesktop/HeaderDT";
import Contacts from "../views/Contacts/Contacts";
import Support from "../views/Supports/Support";
import AttachOrReplaceEmployeeContainer from "../views/RightAttachEmployee/AttachOrReplaceEmployeeContainer";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import {setWindowSize} from "../modules/windowSizeToggle/windowSizeAction";
import {isRightPopupOpenSelector, windowSizeSelector} from "../modules/windowSizeToggle/windowSizeSelectors";
import RedirectHomePage from "../components/Redirect/Redirect";
import {authTokenSelector} from "../modules/auth/authSelectors";
import {
  adminOrganizationSelector,
  roleSelector,
  successMessageSelector,
  userSelector
} from "../modules/userProfile/userProfileSelectors";
import {deleteSuccessMessage} from "../modules/userProfile/userProfileActions";
import ChangePhoneContainer from "../views/Personal/PersonalMobile/ChangePhone/ChangePhoneContainer";
import {isIOS} from "../utils/validators";
import {requestToGetAdminOrganization} from "../modules/organization/organizationActions";
import {initialization} from "../modules/appInitialized/appInitializedActions";
import {appInitializedSelector} from "../modules/appInitialized/appInitializedSelectors";


const Router = ({appInitialized, role, authToken, user, windowSizeMobile, setWindowSize, successMessage, deleteSuccessMessage,
                  requestToGetAdminOrganization, organization, initialization, isRightPopupOpen, location}) => {
  const [isOpen, isOpenToggle] = useState(false);
  const [isUp, upToggle] = useState(false);

  const [path, setPath] = useState(location.pathname);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(()=>{
    setPath(prevState => {
      setPrevPath(prevState);
      return location.pathname
    })

  }, [location.pathname]);


  const ref = useRef();

  const isOutLeft = prevPath === "/user/change_email" || prevPath === "/user/change_phone_number";
  const isOutRight = location.pathname === "/user/change_email" || location.pathname === "/user/change_phone_number";

  const menuToggle = () => {
    isOpenToggle(!isOpen)
  };

  const isUpToggle = () => {
    upToggle(!isUp)
  };

  useEffect(()=>{
    setWindowSize(window.innerWidth <1024);
    window.addEventListener("orientationchange" , ()=>setWindowSize(window.innerWidth <1024), false);
    window.addEventListener("resize" , ()=>setWindowSize(window.innerWidth <1024), false);

    return ()=>{
      window.removeEventListener("orientationchange" , ()=>setWindowSize(window.innerWidth <1024), false);
      window.removeEventListener("resize" , ()=>setWindowSize(window.innerWidth <1024), false);
    }
  }, []);

  useEffect(() => {
    if (successMessage) window.addEventListener("popstate", deleteSuccessMessage, false);

    return () => {
      window.removeEventListener("popstate", deleteSuccessMessage, false);
    }
  }, [successMessage]);

  useEffect(()=>{
  if(location.pathname !== "/balance" || location.pathname !== "/reviews") upToggle(false)
  }, [location.pathname]);


  useEffect(()=>{
    if (role === "ADMIN" && !organization){
      // new Promise((resolve, reject) => {
      //   resolve(requestToGetAdminOrganization());
      // })
      //     .then(r => initialization(r))
      requestToGetAdminOrganization()
    } else if (role !== "ADMIN"){
      // requestToGetAdminOrganization()
      initialization()
    } else if (!authToken){

      initialization()}

  }, [role, organization]);

  return (
      appInitialized &&
      <div className={(isIOS && !windowSizeMobile && !isRightPopupOpen) ? "AppContainerIOS" : "AppContainer"} ref={ref}>
        <Menu isOpen={isOpen} menuToggle={menuToggle} role={role}/>

        <HeaderDT user={user} role={role}/>

        <div style={isUp && !windowSizeMobile ? {overflow: "hidden"} : null}
            className={isUp ? "AppWrapperUp" : !isOpen ? "AppWrapper" : "AppWrapperClose"}>

          <HeaderContainer menuToggle={menuToggle} isUp={isUp}/>

          <div className={isOpen || isUp ? "Backdrop" : "BackdropOff"}/>

          <Switch>
            <Route path={'/login'} exact component={LoginContainer}/>

            {/*USER*/}
            <ProtectedRoute isAllowed={authToken} path={'/'} exact render={() => role !== "ADMIN" ? <NumberSelectionContainer/> : <Redirect to={"/rooms"}/>}/>
            <Route isAllowed={authToken} path={'/balance'} exact render={() =>  role !== "ADMIN" ? <BalanceContainer isUp={isUp} isUpToggle={isUpToggle}/> : <Redirect to={"/rooms"}/>}/>

            {/*ADMIN*/}
            <ProtectedRoute isAllowed={authToken} path={'/rooms'} render={() => role === "ADMIN" ? <RoomsContainer/> : <Redirect to={"/"}/>}/>
            <ProtectedRoute isAllowed={authToken} path={'/recipients'} render={() => role === "ADMIN" ? <RecipientsContainer/> : <Redirect to={"/"}/>}/>
            <ProtectedRoute isAllowed={authToken} path={'/reviews'} render={() => role === "ADMIN" ? <ReviewsContainer isUp={isUp} isUpToggle={isUpToggle}/> : <Redirect to={"/"}/>}/>
            <ProtectedRoute isAllowed={authToken} path={'/print_forms'} render={() => role === "ADMIN" ? <PrintFormsContainer/> : <Redirect to={"/"}/>}/>


            <ProtectedRoute isAllowed={authToken} path={'/questions'} component={QuestionContainer}/>
            <ProtectedRoute isAllowed={authToken} path={'/contacts'} component={Contacts}/>
            <ProtectedRoute isAllowed={authToken} path={'/support'} component={Support}/>
            <ProtectedRoute isAllowed={authToken} path={'/invite'} component={InviteContainer}/>
            <ProtectedRoute isAllowed={authToken} path={'/confirm-email/:id'} component={ConfirmEmail}/>


            <Route render={() => <RedirectHomePage role={role} />}/>
          </Switch>

{/*AnimationDT*/}
          <ProtectedRoute isAllowed={authToken} render={({location})=>(
              <TransitionGroup
                  className={"slideIn"}
                      >
                <CSSTransition
                    key={location.key}
                    timeout={400}
                >
                  <Switch location={location}>
                    <Route path={'/rooms/attach_employee'} component={AddEmployeeContainer}/>
                    <Route path={'/rooms/replace_employee'} component={AddEmployeeContainer}/>
                    <Route path={'/rooms/add_number'} component={AddNumberContainer}/>
                    <Route path={'/rooms/add_range_of_numbers'} component={AddRangeOfNumbersContainer}/>

                    <Route path={'/recipients/add_new_recipient'} component={AddNewRecipientContainer}/>
                    <Route path={'/recipients/registered_recipient'} component={RegisteredRecipientContainer}/>
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
          )} />


{/*AnimationMB*/}
          <ProtectedRoute isAllowed={authToken} path={'/user'} render={() => <UserContainer user={user} role={role}/>}/>

          <ProtectedRoute isAllowed={authToken} render={({location})=>(
              <TransitionGroup
                  className={isOutLeft ? "outLeft" : isOutRight ? "outRight" : "mobileSlide"}
              >
                <CSSTransition
                    key={location.key}
                    timeout={ windowSizeMobile ? 400 : 0}
                >
                  <Switch location={location}>
                    <Route path={'/rooms/attach_or_replace_employee'} component={AttachOrReplaceEmployeeContainer}/>

                    <Route path={'/user/change_phone_number'} component={ChangePhoneContainer}/>
                    <Route path={'/user/change_email'} render={() => <ChangeEmail role={role}/>}/>
                    <Route path={'/user/personal'} component={PersonalContainer}/>
                    <Route path={'/user/organisation'} component={OrganisationContainer}/>
                    <Route path={'/user/notifications'} component={NotificationsContainer}/>

                    <Route path={'/user/organisation_and_administrator'} component={OrganisationAndAdministratorContainer}/>
                    <Route path={'/user/reviews_setting'} component={ReviewsSettingsContainer}/>

                  </Switch>
                </CSSTransition>
              </TransitionGroup>
          )} />

        </div>
      </div>
  );

}

const mapStateToProps = state => ({
  appInitialized: appInitializedSelector(state),
  authToken: authTokenSelector(state),
  user: userSelector(state),
  role: roleSelector(state),
  organization: adminOrganizationSelector(state),
  successMessage: successMessageSelector(state),
  windowSizeMobile: windowSizeSelector(state),
  isRightPopupOpen: isRightPopupOpenSelector(state),
});

export default compose(connect(mapStateToProps, {setWindowSize, deleteSuccessMessage, requestToGetAdminOrganization, initialization}), withRouter,)(Router)


