const moment = require('moment-timezone');

moment.tz.setDefault('Asia/Kolkata');
moment.fn.ktm = function () {
  return this.utcOffset(5 * 60 + 45);
};
exports.getCurrentDateTimeInKathmandu = () => {
    const currentDateTime = moment().ktm();

    const date= currentDateTime.format('YYYY-MM-DD');
    const time = currentDateTime.format('hh:mm:ss');

    return {
        date:date,
        time: time,
        combinedDateTime: `${date} ${time}`
    }
};
