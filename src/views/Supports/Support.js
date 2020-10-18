import React, {Component} from 'react';
import style from './Support.module.css'
import {Button} from "../../components/Button/Button";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import {lastNameSelector, phoneSelector} from "../../modules/support/supportSelectors";
import {compose} from "redux";
import {writeInSupport} from "../../modules/support/supportActions";
import {toggleFieldInFocus} from "../../modules/windowSizeToggle/windowSizeAction";


class Support extends Component {
    state={
      message:'',
      openModal:false
    };

  handleChange =(ev)=>{
     this.setState({message : ev.target.value})
  };

  sendMassage=()=>{
    this.props.writeInSupport(this.state.message, this.props.phone, this.props.name);
    this.setState({openModal: true})

  };

  handleOpenModal=()=>{
    this.setState({openModal: false})
    this.setState({message: ''})
  };


    focusHandler =()=>{
        this.props.toggleFieldInFocus(true)
    };

    blurHandler =()=>{
        this.props.toggleFieldInFocus(false)
    };

  render() {
    return (
        <div className={style.supportContainer}>
            <Modal
                modalTitle={'Thanks for contacting!'}
                valueRightBtn={'Continue'}
                onClickRightBtn={this.handleOpenModal}
                modalToggle={this.state.openModal}
                modalText={'We will consider your question. In the near future and, if necessary, we will contact with you'}/>

            <div className={style.supportWrapper}>

                <span className={style.title}>Support</span>

                <div className={style.supportText}>
                    If you have any problems using the service, you can ask your question in support.
                </div>

                <textarea
                    value={this.state.message}
                    onChange={this.handleChange}
                    name='message'
                    placeholder={'Your Message'}
                    className={style.supportField}
                    onFocus={this.focusHandler}
                    onBlur={this.blurHandler}
                />

                <div className={style.buttonWrapper}>
                    <Button
                        onClick={this.sendMassage}
                        style={{width: '136px'}}>
                        Send Message
                    </Button>
                </div>
            </div>
        </div>
    );
  }
}
const mapStateToProps = state => ({
    phone: phoneSelector(state),
    name: lastNameSelector(state)
});

export default compose(connect(mapStateToProps, {writeInSupport, toggleFieldInFocus}), withRouter)(Support);
