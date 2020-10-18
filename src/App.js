import React, {useEffect} from 'react';
import './assets/styles/style.css'
import Router from "./root/router";
import {isFiendInFocusSelector, windowSizeSelector} from "./modules/windowSizeToggle/windowSizeSelectors";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {isIOS} from "./utils/validators";

class App extends React.Component {
    // fixedScrollToIPhone = () => {
    //
    //     if(isIOS && !this.props.isFiendInFocus) {
    //         window.scrollTo();
    //     }
    //
    // };


    componentDidMount() {
        if (!this.props.isFiendInFocus && isIOS && this.props.windowSizeMobile) {
            // window.addEventListener('scroll', e => this.fixedScrollToIPhone(e), false)
            document.body.style.overflow = "hidden";
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isFiendInFocus !== this.props.isFiendInFocus) {
            if (!this.props.isFiendInFocus && isIOS && this.props.windowSizeMobile) {
                // window.addEventListener('scroll', e => this.fixedScrollToIPhone(e), false)
                document.body.style.overflow = "hidden";


            } else if (this.props.isFiendInFocus && isIOS && this.props.windowSizeMobile) {
                document.body.style.overflow = "visible";
                // return window.removeEventListener('scroll', e => this.fixedScrollToIPhone(e), false)
            }
        }
    }

    render() {
        return (
            <>
                <Router/>
            </>
        );
    }
}


const mapStateToProps = state => ({
    windowSizeMobile: windowSizeSelector(state),
    isFiendInFocus: isFiendInFocusSelector(state)
});

export default compose(connect(mapStateToProps, null), withRouter,)(App)
