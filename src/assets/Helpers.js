/* Helpers.js */
/* add common functions here to be shared across site */

export function consoleLog(msg) {
  //   console.log("[CLG] " + msg);
}

export function appendLeadingZeroes(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
}
