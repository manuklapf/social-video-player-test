export default function formatSecondsToMSString(timestamp: number) {
  timestamp = timestamp * 1000;
  let milliseconds: string = Math.floor(timestamp % 1000).toString();
  let seconds: string | number = Math.floor((timestamp / 1000) % 60);
  let minutes: string | number = Math.floor((timestamp / (1000 * 60)) % 60);
  let hours: string | number = Math.floor((timestamp / (1000 * 60 * 60)) % 24);
  if (hours) {
    hours = (hours < 10 ? "0" + hours : hours) + ":";
  } else {
    hours = "";
  }
  minutes = (minutes < 10 && hours ? "0" + minutes : minutes) + ":";
  seconds = seconds < 10 ? "0" + seconds : seconds;
  if (milliseconds.length < 2) {
    milliseconds = "00" + milliseconds;
  } else if (milliseconds.length < 3) {
    milliseconds = "0" + milliseconds;
  }

  return hours + minutes + seconds + ":" + milliseconds;
}
