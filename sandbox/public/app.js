"use strict";
var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["ACCESSERROR"] = 0] = "ACCESSERROR";
    ErrorType[ErrorType["SERVERERROR"] = 1] = "SERVERERROR";
    ErrorType[ErrorType["AUTHENTICATIONERROR"] = 2] = "AUTHENTICATIONERROR";
})(ErrorType || (ErrorType = {}));
const err1 = {
    message: "wrong login credential",
    code: ErrorType.AUTHENTICATIONERROR
};
console.log(err1.code);
