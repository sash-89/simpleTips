import React, {Component} from 'react';
import {InputField} from "../../../components/InputField/InputField";
import style from './ReviewsSettings.module.css'
import {Button} from "../../../components/Button/Button";
import {BlueSwitch} from "../../../components/BlueSwitch/BlueSwitch";
import HeaderSecondMB from "../../Header/HeaderMobile/HeaderSecondMB";

class ReviewsSettings extends Component {
  state={
    checked: false,
  };


  handleChange(checked) {
    this.setState({checked})
  }

  render() {
    return (
        <div className={style.reviewsSettingsContainer}>
          <div className={"Mobile"}>
            <HeaderSecondMB title={"Reviews Setting"}/>
          </div>

          <div className={"Desktop"}>
            <h5 className={style.title}>Reviews Setting</h5>
          </div>

          <div className={style.contentWrapper}>

            <div className={style.inputs}>
              <InputField
                  placeholder={'Form header'}
                  value={"Leave review"}
              />
            </div>

            <div className={style.inputs}>
              <InputField
                  className={style.inputs}
                  placeholder={'Form description'}
                  isTextarea={true}
                  value={"Your feedback here... (much appreciated!)"}
              />
            </div>


            <div className={style.text}>
              <p>Display organization name on payment pages</p>

              <BlueSwitch checked={this.state.checked} onChange={e => this.handleChange(e.target.checked)}/>
            </div>

            <Button className={style.button}>
              Save changes
            </Button>
          </div>
        </div>
    );
  }
}

export default ReviewsSettings;
