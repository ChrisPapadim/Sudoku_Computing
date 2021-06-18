const Time = Object.create(null)

//Converts seconds into string of MM:SS format
 Time.timeConversion = function (time) {
    let minutes = Math.floor(time /60);
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
  }

export default Object.freeze(Time)