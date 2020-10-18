import moment from 'moment';

export const getMillisecondsFromDate = date => {
  const nowDate = Date.now();
  const momentNow = moment(date).valueOf();
  const momentDate = moment().valueOf();
  let timeZoneDiff = new Date();
  timeZoneDiff = timeZoneDiff.getTimezoneOffset();
  timeZoneDiff = timeZoneDiff  * 60000;
  timeZoneDiff = timeZoneDiff > 0 ? timeZoneDiff : -timeZoneDiff;
  return (momentDate - momentNow - timeZoneDiff) / 1000;
};

