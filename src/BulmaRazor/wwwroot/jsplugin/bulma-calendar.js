(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["bulmaCalendar"] = factory();
    else
        root["bulmaCalendar"] = factory();
})(typeof self !== 'undefined' ? self : this, function () {
    return /******/ (function (modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/
        var installedModules = {};
        /******/
        /******/ 	// The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/ 		// Check if module is in cache
            /******/
            if (installedModules[moduleId]) {
                /******/
                return installedModules[moduleId].exports;
                /******/
            }
            /******/ 		// Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/            i: moduleId,
                /******/            l: false,
                /******/            exports: {}
                /******/
            };
            /******/
            /******/ 		// Execute the module function
            /******/
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ 		// Flag the module as loaded
            /******/
            module.l = true;
            /******/
            /******/ 		// Return the exports of the module
            /******/
            return module.exports;
            /******/
        }

        /******/
        /******/
        /******/ 	// expose the modules object (__webpack_modules__)
        /******/
        __webpack_require__.m = modules;
        /******/
        /******/ 	// expose the module cache
        /******/
        __webpack_require__.c = installedModules;
        /******/
        /******/ 	// define getter function for harmony exports
        /******/
        __webpack_require__.d = function (exports, name, getter) {
            /******/
            if (!__webpack_require__.o(exports, name)) {
                /******/
                Object.defineProperty(exports, name, {
                    /******/                configurable: false,
                    /******/                enumerable: true,
                    /******/                get: getter
                    /******/
                });
                /******/
            }
            /******/
        };
        /******/
        /******/ 	// getDefaultExport function for compatibility with non-harmony modules
        /******/
        __webpack_require__.n = function (module) {
            /******/
            var getter = module && module.__esModule ?
                /******/            function getDefault() {
                    return module['default'];
                } :
                /******/            function getModuleExports() {
                    return module;
                };
            /******/
            __webpack_require__.d(getter, 'a', getter);
            /******/
            return getter;
            /******/
        };
        /******/
        /******/ 	// Object.prototype.hasOwnProperty.call
        /******/
        __webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/ 	// __webpack_public_path__
        /******/
        __webpack_require__.p = "";
        /******/
        /******/ 	// Load entry module and return exports
        /******/
        return __webpack_require__(__webpack_require__.s = 163);
        /******/
    })
        /************************************************************************/
        /******/ ([
            /* 0 */
            /***/ (function (module, exports, __webpack_require__) {

                var isDate = __webpack_require__(19)

                var MILLISECONDS_IN_HOUR = 3600000
                var MILLISECONDS_IN_MINUTE = 60000
                var DEFAULT_ADDITIONAL_DIGITS = 2

                var parseTokenDateTimeDelimeter = /[T ]/
                var parseTokenPlainTime = /:/

// year tokens
                var parseTokenYY = /^(\d{2})$/
                var parseTokensYYY = [
                    /^([+-]\d{2})$/, // 0 additional digits
                    /^([+-]\d{3})$/, // 1 additional digit
                    /^([+-]\d{4})$/ // 2 additional digits
                ]

                var parseTokenYYYY = /^(\d{4})/
                var parseTokensYYYYY = [
                    /^([+-]\d{4})/, // 0 additional digits
                    /^([+-]\d{5})/, // 1 additional digit
                    /^([+-]\d{6})/ // 2 additional digits
                ]

// date tokens
                var parseTokenMM = /^-(\d{2})$/
                var parseTokenDDD = /^-?(\d{3})$/
                var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/
                var parseTokenWww = /^-?W(\d{2})$/
                var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/

// time tokens
                var parseTokenHH = /^(\d{2}([.,]\d*)?)$/
                var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/
                var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/

// timezone tokens
                var parseTokenTimezone = /([Z+-].*)$/
                var parseTokenTimezoneZ = /^(Z)$/
                var parseTokenTimezoneHH = /^([+-])(\d{2})$/
                var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/

                /**
                 * @category Common Helpers
                 * @summary Convert the given argument to an instance of Date.
                 *
                 * @description
                 * Convert the given argument to an instance of Date.
                 *
                 * If the argument is an instance of Date, the function returns its clone.
                 *
                 * If the argument is a number, it is treated as a timestamp.
                 *
                 * If an argument is a string, the function tries to parse it.
                 * Function accepts complete ISO 8601 formats as well as partial implementations.
                 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
                 *
                 * If all above fails, the function passes the given argument to Date constructor.
                 *
                 * @param {Date|String|Number} argument - the value to convert
                 * @param {Object} [options] - the object with options
                 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
                 * @returns {Date} the parsed date in the local time zone
                 *
                 * @example
                 * // Convert string '2014-02-11T11:30:30' to date:
                 * var result = parse('2014-02-11T11:30:30')
                 * //=> Tue Feb 11 2014 11:30:30
                 *
                 * @example
                 * // Parse string '+02014101',
                 * // if the additional number of digits in the extended year format is 1:
                 * var result = parse('+02014101', {additionalDigits: 1})
                 * //=> Fri Apr 11 2014 00:00:00
                 */
                function parse(argument, dirtyOptions) {
                    if (isDate(argument)) {
                        // Prevent the date to lose the milliseconds when passed to new Date() in IE10
                        return new Date(argument.getTime())
                    } else if (typeof argument !== 'string') {
                        return new Date(argument)
                    }

                    var options = dirtyOptions || {}
                    var additionalDigits = options.additionalDigits
                    if (additionalDigits == null) {
                        additionalDigits = DEFAULT_ADDITIONAL_DIGITS
                    } else {
                        additionalDigits = Number(additionalDigits)
                    }

                    var dateStrings = splitDateString(argument)

                    var parseYearResult = parseYear(dateStrings.date, additionalDigits)
                    var year = parseYearResult.year
                    var restDateString = parseYearResult.restDateString

                    var date = parseDate(restDateString, year)

                    if (date) {
                        var timestamp = date.getTime()
                        var time = 0
                        var offset

                        if (dateStrings.time) {
                            time = parseTime(dateStrings.time)
                        }

                        if (dateStrings.timezone) {
                            offset = parseTimezone(dateStrings.timezone)
                        } else {
                            // get offset accurate to hour in timezones that change offset
                            offset = new Date(timestamp + time).getTimezoneOffset()
                            offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset()
                        }

                        return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)
                    } else {
                        return new Date(argument)
                    }
                }

                function splitDateString(dateString) {
                    var dateStrings = {}
                    var array = dateString.split(parseTokenDateTimeDelimeter)
                    var timeString

                    if (parseTokenPlainTime.test(array[0])) {
                        dateStrings.date = null
                        timeString = array[0]
                    } else {
                        dateStrings.date = array[0]
                        timeString = array[1]
                    }

                    if (timeString) {
                        var token = parseTokenTimezone.exec(timeString)
                        if (token) {
                            dateStrings.time = timeString.replace(token[1], '')
                            dateStrings.timezone = token[1]
                        } else {
                            dateStrings.time = timeString
                        }
                    }

                    return dateStrings
                }

                function parseYear(dateString, additionalDigits) {
                    var parseTokenYYY = parseTokensYYY[additionalDigits]
                    var parseTokenYYYYY = parseTokensYYYYY[additionalDigits]

                    var token

                    // YYYY or ±YYYYY
                    token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString)
                    if (token) {
                        var yearString = token[1]
                        return {
                            year: parseInt(yearString, 10),
                            restDateString: dateString.slice(yearString.length)
                        }
                    }

                    // YY or ±YYY
                    token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString)
                    if (token) {
                        var centuryString = token[1]
                        return {
                            year: parseInt(centuryString, 10) * 100,
                            restDateString: dateString.slice(centuryString.length)
                        }
                    }

                    // Invalid ISO-formatted year
                    return {
                        year: null
                    }
                }

                function parseDate(dateString, year) {
                    // Invalid ISO-formatted year
                    if (year === null) {
                        return null
                    }

                    var token
                    var date
                    var month
                    var week

                    // YYYY
                    if (dateString.length === 0) {
                        date = new Date(0)
                        date.setUTCFullYear(year)
                        return date
                    }

                    // YYYY-MM
                    token = parseTokenMM.exec(dateString)
                    if (token) {
                        date = new Date(0)
                        month = parseInt(token[1], 10) - 1
                        date.setUTCFullYear(year, month)
                        return date
                    }

                    // YYYY-DDD or YYYYDDD
                    token = parseTokenDDD.exec(dateString)
                    if (token) {
                        date = new Date(0)
                        var dayOfYear = parseInt(token[1], 10)
                        date.setUTCFullYear(year, 0, dayOfYear)
                        return date
                    }

                    // YYYY-MM-DD or YYYYMMDD
                    token = parseTokenMMDD.exec(dateString)
                    if (token) {
                        date = new Date(0)
                        month = parseInt(token[1], 10) - 1
                        var day = parseInt(token[2], 10)
                        date.setUTCFullYear(year, month, day)
                        return date
                    }

                    // YYYY-Www or YYYYWww
                    token = parseTokenWww.exec(dateString)
                    if (token) {
                        week = parseInt(token[1], 10) - 1
                        return dayOfISOYear(year, week)
                    }

                    // YYYY-Www-D or YYYYWwwD
                    token = parseTokenWwwD.exec(dateString)
                    if (token) {
                        week = parseInt(token[1], 10) - 1
                        var dayOfWeek = parseInt(token[2], 10) - 1
                        return dayOfISOYear(year, week, dayOfWeek)
                    }

                    // Invalid ISO-formatted date
                    return null
                }

                function parseTime(timeString) {
                    var token
                    var hours
                    var minutes

                    // hh
                    token = parseTokenHH.exec(timeString)
                    if (token) {
                        hours = parseFloat(token[1].replace(',', '.'))
                        return (hours % 24) * MILLISECONDS_IN_HOUR
                    }

                    // hh:mm or hhmm
                    token = parseTokenHHMM.exec(timeString)
                    if (token) {
                        hours = parseInt(token[1], 10)
                        minutes = parseFloat(token[2].replace(',', '.'))
                        return (hours % 24) * MILLISECONDS_IN_HOUR +
                            minutes * MILLISECONDS_IN_MINUTE
                    }

                    // hh:mm:ss or hhmmss
                    token = parseTokenHHMMSS.exec(timeString)
                    if (token) {
                        hours = parseInt(token[1], 10)
                        minutes = parseInt(token[2], 10)
                        var seconds = parseFloat(token[3].replace(',', '.'))
                        return (hours % 24) * MILLISECONDS_IN_HOUR +
                            minutes * MILLISECONDS_IN_MINUTE +
                            seconds * 1000
                    }

                    // Invalid ISO-formatted time
                    return null
                }

                function parseTimezone(timezoneString) {
                    var token
                    var absoluteOffset

                    // Z
                    token = parseTokenTimezoneZ.exec(timezoneString)
                    if (token) {
                        return 0
                    }

                    // ±hh
                    token = parseTokenTimezoneHH.exec(timezoneString)
                    if (token) {
                        absoluteOffset = parseInt(token[2], 10) * 60
                        return (token[1] === '+') ? -absoluteOffset : absoluteOffset
                    }

                    // ±hh:mm or ±hhmm
                    token = parseTokenTimezoneHHMM.exec(timezoneString)
                    if (token) {
                        absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)
                        return (token[1] === '+') ? -absoluteOffset : absoluteOffset
                    }

                    return 0
                }

                function dayOfISOYear(isoYear, week, day) {
                    week = week || 0
                    day = day || 0
                    var date = new Date(0)
                    date.setUTCFullYear(isoYear, 0, 4)
                    var fourthOfJanuaryDay = date.getUTCDay() || 7
                    var diff = week * 7 + day + 1 - fourthOfJanuaryDay
                    date.setUTCDate(date.getUTCDate() + diff)
                    return date
                }

                module.exports = parse


                /***/
            }),
            /* 1 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js (c) KNOWLEDGECODE | MIT
                 */
                (function (global) {
                    'use strict';

                    var date = {},
                        lang = 'en',
                        locales = {
                            en: {
                                MMMM: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                                dddd: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                                ddd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                                dd: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                                A: ['a.m.', 'p.m.'],
                                formatter: {
                                    YYYY: function (d/*, formatString*/) {
                                        return ('000' + d.getFullYear()).slice(-4);
                                    },
                                    YY: function (d/*, formatString*/) {
                                        return ('0' + d.getFullYear()).slice(-2);
                                    },
                                    Y: function (d/*, formatString*/) {
                                        return '' + d.getFullYear();
                                    },
                                    MMMM: function (d/*, formatString*/) {
                                        return this.MMMM[d.getMonth()];
                                    },
                                    MMM: function (d/*, formatString*/) {
                                        return this.MMM[d.getMonth()];
                                    },
                                    MM: function (d/*, formatString*/) {
                                        return ('0' + (d.getMonth() + 1)).slice(-2);
                                    },
                                    M: function (d/*, formatString*/) {
                                        return '' + (d.getMonth() + 1);
                                    },
                                    DD: function (d/*, formatString*/) {
                                        return ('0' + d.getDate()).slice(-2);
                                    },
                                    D: function (d/*, formatString*/) {
                                        return '' + d.getDate();
                                    },
                                    HH: function (d/*, formatString*/) {
                                        return ('0' + d.getHours()).slice(-2);
                                    },
                                    H: function (d/*, formatString*/) {
                                        return '' + d.getHours();
                                    },
                                    A: function (d/*, formatString*/) {
                                        return this.A[d.getHours() > 11 | 0];
                                    },
                                    hh: function (d/*, formatString*/) {
                                        return ('0' + (d.getHours() % 12 || 12)).slice(-2);
                                    },
                                    h: function (d/*, formatString*/) {
                                        return '' + (d.getHours() % 12 || 12);
                                    },
                                    mm: function (d/*, formatString*/) {
                                        return ('0' + d.getMinutes()).slice(-2);
                                    },
                                    m: function (d/*, formatString*/) {
                                        return '' + d.getMinutes();
                                    },
                                    ss: function (d/*, formatString*/) {
                                        return ('0' + d.getSeconds()).slice(-2);
                                    },
                                    s: function (d/*, formatString*/) {
                                        return '' + d.getSeconds();
                                    },
                                    SSS: function (d/*, formatString*/) {
                                        return ('00' + d.getMilliseconds()).slice(-3);
                                    },
                                    SS: function (d/*, formatString*/) {
                                        return ('0' + (d.getMilliseconds() / 10 | 0)).slice(-2);
                                    },
                                    S: function (d/*, formatString*/) {
                                        return '' + (d.getMilliseconds() / 100 | 0);
                                    },
                                    dddd: function (d/*, formatString*/) {
                                        return this.dddd[d.getDay()];
                                    },
                                    ddd: function (d/*, formatString*/) {
                                        return this.ddd[d.getDay()];
                                    },
                                    dd: function (d/*, formatString*/) {
                                        return this.dd[d.getDay()];
                                    },
                                    Z: function (d/*, formatString*/) {
                                        var offset = d.utc ? 0 : d.getTimezoneOffset() / 0.6;
                                        return (offset > 0 ? '-' : '+') + ('000' + Math.abs(offset - offset % 100 * 0.4)).slice(-4);
                                    },
                                    post: function (str) {
                                        return str;
                                    }
                                },
                                parser: {
                                    find: function (array, str) {
                                        var index = -1, length = 0;

                                        for (var i = 0, len = array.length, item; i < len; i++) {
                                            item = array[i];
                                            if (!str.indexOf(item) && item.length > length) {
                                                index = i;
                                                length = item.length;
                                            }
                                        }
                                        return {index: index, length: length};
                                    },
                                    MMMM: function (str/*, formatString*/) {
                                        return this.parser.find(this.MMMM, str);
                                    },
                                    MMM: function (str/*, formatString*/) {
                                        return this.parser.find(this.MMM, str);
                                    },
                                    A: function (str/*, formatString*/) {
                                        return this.parser.find(this.A, str);
                                    },
                                    h: function (h, a) {
                                        return (h === 12 ? 0 : h) + a * 12;
                                    },
                                    pre: function (str) {
                                        return str;
                                    }
                                }
                            }
                        };

                    /**
                     * formatting a date
                     * @param {Object} dateObj - date object
                     * @param {String} formatString - format string
                     * @param {Boolean} [utc] - output as UTC
                     * @returns {String} the formatted string
                     */
                    date.format = function (dateObj, formatString, utc) {
                        var d = date.addMinutes(dateObj, utc ? dateObj.getTimezoneOffset() : 0),
                            locale = locales[lang], formatter = locale.formatter;

                        d.utc = utc;
                        return formatString.replace(/(\[[^\[\]]*]|\[.*\][^\[]*\]|YYYY|YY|MMM?M?|DD|HH|hh|mm|ss|SSS?|ddd?d?|.)/g, function (token) {
                            var format = formatter[token];
                            return format ? formatter.post(format.call(locale, d, formatString)) : token.replace(/\[(.*)]/, '$1');
                        });
                    };

                    /**
                     * parsing a date string
                     * @param {String} dateString - date string
                     * @param {String} formatString - format string
                     * @param {Boolean} [utc] - input as UTC
                     * @returns {Object} the constructed date
                     */
                    date.parse = function (dateString, formatString, utc) {
                        var locale = locales[lang], dString = locale.parser.pre(dateString),
                            offset = 0, keys, i, token, length, p, str, result, dateObj,
                            re = /(MMMM?|A)|(YYYY)|(SSS)|(MM|DD|HH|hh|mm|ss)|(YY|M|D|H|h|m|s|SS)|(S)|(.)/g,
                            exp = {2: /^\d{1,4}/, 3: /^\d{1,3}/, 4: /^\d\d/, 5: /^\d\d?/, 6: /^\d/},
                            last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                            dt = {Y: 1970, M: 1, D: 1, H: 0, m: 0, s: 0, S: 0};

                        while ((keys = re.exec(formatString))) {
                            for (i = 0, length = 1, token = ''; !token;) {
                                token = keys[++i];
                            }
                            p = token.charAt(0);
                            str = dString.slice(offset);
                            if (i < 2) {
                                result = locale.parser[token].call(locale, str, formatString);
                                dt[p] = result.index;
                                if (p === 'M') {
                                    dt[p]++;
                                }
                                length = result.length;
                            } else if (i < 7) {
                                result = (str.match(exp[i]) || [''])[0];
                                dt[p] = (p === 'S' ? (result + '000').slice(0, -token.length) : result) | 0;
                                length = result.length;
                            } else if (p !== ' ' && p !== str[0]) {
                                return NaN;
                            }
                            if (!length) {
                                return NaN;
                            }
                            offset += length;
                        }
                        if (offset !== dString.length || !result) {
                            return NaN;
                        }
                        dt.Y += dt.Y < 70 ? 2000 : dt.Y < 100 ? 1900 : 0;
                        dt.H = dt.H || locale.parser.h(dt.h || 0, dt.A || 0);

                        dateObj = new Date(dt.Y, dt.M - 1, dt.D, dt.H, dt.m, dt.s, dt.S);
                        last[1] += date.isLeapYear(dateObj) | 0;
                        if (dt.M < 1 || dt.M > 12 || dt.D < 1 || dt.D > last[dt.M - 1] || dt.H > 23 || dt.m > 59 || dt.s > 59) {
                            return NaN;
                        }
                        return utc ? date.addMinutes(dateObj, -dateObj.getTimezoneOffset()) : dateObj;
                    };

                    /**
                     * validation
                     * @param {String} dateString - date string
                     * @param {String} formatString - format string
                     * @returns {Boolean} whether the date string is a valid date
                     */
                    date.isValid = function (dateString, formatString) {
                        return !!date.parse(dateString, formatString);
                    };

                    /**
                     * adding years
                     * @param {Object} dateObj - date object
                     * @param {Number} years - adding year
                     * @returns {Object} the date after adding the value
                     */
                    date.addYears = function (dateObj, years) {
                        return date.addMonths(dateObj, years * 12);
                    };

                    /**
                     * adding months
                     * @param {Object} dateObj - date object
                     * @param {Number} months - adding month
                     * @returns {Object} the date after adding the value
                     */
                    date.addMonths = function (dateObj, months) {
                        var d = new Date(dateObj.getTime());

                        d.setMonth(d.getMonth() + months);
                        return d;
                    };

                    /**
                     * adding days
                     * @param {Object} dateObj - date object
                     * @param {Number} days - adding day
                     * @returns {Object} the date after adding the value
                     */
                    date.addDays = function (dateObj, days) {
                        var d = new Date(dateObj.getTime());

                        d.setDate(d.getDate() + days);
                        return d;
                    };

                    /**
                     * adding hours
                     * @param {Object} dateObj - date object
                     * @param {Number} hours - adding hour
                     * @returns {Object} the date after adding the value
                     */
                    date.addHours = function (dateObj, hours) {
                        return date.addMilliseconds(dateObj, hours * 3600000);
                    };

                    /**
                     * adding minutes
                     * @param {Object} dateObj - date object
                     * @param {Number} minutes - adding minute
                     * @returns {Object} the date after adding the value
                     */
                    date.addMinutes = function (dateObj, minutes) {
                        return date.addMilliseconds(dateObj, minutes * 60000);
                    };

                    /**
                     * adding seconds
                     * @param {Object} dateObj - date object
                     * @param {Number} seconds - adding second
                     * @returns {Object} the date after adding the value
                     */
                    date.addSeconds = function (dateObj, seconds) {
                        return date.addMilliseconds(dateObj, seconds * 1000);
                    };

                    /**
                     * adding milliseconds
                     * @param {Object} dateObj - date object
                     * @param {Number} milliseconds - adding millisecond
                     * @returns {Object} the date after adding the value
                     */
                    date.addMilliseconds = function (dateObj, milliseconds) {
                        return new Date(dateObj.getTime() + milliseconds);
                    };

                    /**
                     * subtracting
                     * @param {Object} date1 - date object
                     * @param {Object} date2 - date object
                     * @returns {Object} the result object after subtracting the date
                     */
                    date.subtract = function (date1, date2) {
                        var delta = date1.getTime() - date2.getTime();

                        return {
                            toMilliseconds: function () {
                                return delta;
                            },
                            toSeconds: function () {
                                return delta / 1000 | 0;
                            },
                            toMinutes: function () {
                                return delta / 60000 | 0;
                            },
                            toHours: function () {
                                return delta / 3600000 | 0;
                            },
                            toDays: function () {
                                return delta / 86400000 | 0;
                            }
                        };
                    };

                    /**
                     * leap year
                     * @param {Object} dateObj - date object
                     * @returns {Boolean} whether the year is a leap year
                     */
                    date.isLeapYear = function (dateObj) {
                        var y = dateObj.getFullYear();
                        return (!(y % 4) && !!(y % 100)) || !(y % 400);
                    };

                    /**
                     * comparison of dates
                     * @param {Object} date1 - target for comparison
                     * @param {Object} date2 - target for comparison
                     * @returns {Boolean} whether the dates are the same day (times are ignored)
                     */
                    date.isSameDay = function (date1, date2) {
                        return date.format(date1, 'YYYYMMDD') === date.format(date2, 'YYYYMMDD');
                    };

                    /**
                     * setting a locale
                     * @param {String} [code] - language code
                     * @returns {String} current language code
                     */
                    date.locale = function (code) {
                        if (code) {
                            if (!locales[code] && "function" === 'function' && global) {
                                __webpack_require__(262)("./" + code);
                            }
                            lang = code;
                        }
                        return lang;
                    };

                    /**
                     * getting a definition of locale
                     * @param {String} [code] - language code
                     * @returns {Object} definition of locale
                     */
                    date.getLocales = function (code) {
                        return locales[code || lang];
                    };

                    /**
                     * adding a new definition of locale
                     * @param {String} code - language code
                     * @param {Object} options - definition of locale
                     * @returns {void}
                     */
                    date.setLocales = function (code, options) {
                        var copy = function (src, proto) {
                                var Locale = function () {
                                }, dst, key;

                                Locale.prototype = proto;
                                dst = new Locale();
                                for (key in src) {
                                    if (src.hasOwnProperty(key)) {
                                        dst[key] = src[key];
                                    }
                                }
                                return dst;
                            },
                            base = locales[code] || locales.en,
                            locale = copy(options, base);

                        if (options.formatter) {
                            locale.formatter = copy(options.formatter, base.formatter);
                        }
                        if (options.parser) {
                            locale.parser = copy(options.parser, base.parser);
                        }
                        locales[code] = locale;
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        module.exports = date;
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
                            return date;
                        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        global.date = date;
                    }

                }(this));


                /***/
            }),
            /* 2 */
            /***/ (function (module, exports) {

                var commonFormatterKeys = [
                    'M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd',
                    'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG',
                    'H', 'HH', 'h', 'hh', 'm', 'mm',
                    's', 'ss', 'S', 'SS', 'SSS',
                    'Z', 'ZZ', 'X', 'x'
                ]

                function buildFormattingTokensRegExp(formatters) {
                    var formatterKeys = []
                    for (var key in formatters) {
                        if (formatters.hasOwnProperty(key)) {
                            formatterKeys.push(key)
                        }
                    }

                    var formattingTokens = commonFormatterKeys
                        .concat(formatterKeys)
                        .sort()
                        .reverse()
                    var formattingTokensRegExp = new RegExp(
                        '(\\[[^\\[]*\\])|(\\\\)?' + '(' + formattingTokens.join('|') + '|.)', 'g'
                    )

                    return formattingTokensRegExp
                }

                module.exports = buildFormattingTokensRegExp


                /***/
            }),
            /* 3 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var startOfISOWeek = __webpack_require__(4)

                /**
                 * @category ISO Week-Numbering Year Helpers
                 * @summary Get the ISO week-numbering year of the given date.
                 *
                 * @description
                 * Get the ISO week-numbering year of the given date,
                 * which always starts 3 days before the year's first Thursday.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the ISO week-numbering year
                 *
                 * @example
                 * // Which ISO-week numbering year is 2 January 2005?
                 * var result = getISOYear(new Date(2005, 0, 2))
                 * //=> 2004
                 */
                function getISOYear(dirtyDate) {
                    var date = parse(dirtyDate)
                    var year = date.getFullYear()

                    var fourthOfJanuaryOfNextYear = new Date(0)
                    fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4)
                    fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0)
                    var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear)

                    var fourthOfJanuaryOfThisYear = new Date(0)
                    fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4)
                    fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0)
                    var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear)

                    if (date.getTime() >= startOfNextYear.getTime()) {
                        return year + 1
                    } else if (date.getTime() >= startOfThisYear.getTime()) {
                        return year
                    } else {
                        return year - 1
                    }
                }

                module.exports = getISOYear


                /***/
            }),
            /* 4 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfWeek = __webpack_require__(11)

                /**
                 * @category ISO Week Helpers
                 * @summary Return the start of an ISO week for the given date.
                 *
                 * @description
                 * Return the start of an ISO week for the given date.
                 * The result will be in the local timezone.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the start of an ISO week
                 *
                 * @example
                 * // The start of an ISO week for 2 September 2014 11:55:00:
                 * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Mon Sep 01 2014 00:00:00
                 */
                function startOfISOWeek(dirtyDate) {
                    return startOfWeek(dirtyDate, {weekStartsOn: 1})
                }

                module.exports = startOfISOWeek


                /***/
            }),
            /* 5 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Day Helpers
                 * @summary Return the start of a day for the given date.
                 *
                 * @description
                 * Return the start of a day for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the start of a day
                 *
                 * @example
                 * // The start of a day for 2 September 2014 11:55:00:
                 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Tue Sep 02 2014 00:00:00
                 */
                function startOfDay(dirtyDate) {
                    var date = parse(dirtyDate)
                    date.setHours(0, 0, 0, 0)
                    return date
                }

                module.exports = startOfDay


                /***/
            }),
            /* 6 */
            /***/ (function (module, exports, __webpack_require__) {

                module.exports = {
                    addDays: __webpack_require__(7),
                    addHours: __webpack_require__(29),
                    addISOYears: __webpack_require__(30),
                    addMilliseconds: __webpack_require__(8),
                    addMinutes: __webpack_require__(32),
                    addMonths: __webpack_require__(13),
                    addQuarters: __webpack_require__(33),
                    addSeconds: __webpack_require__(34),
                    addWeeks: __webpack_require__(21),
                    addYears: __webpack_require__(35),
                    areRangesOverlapping: __webpack_require__(164),
                    closestIndexTo: __webpack_require__(165),
                    closestTo: __webpack_require__(166),
                    compareAsc: __webpack_require__(10),
                    compareDesc: __webpack_require__(22),
                    differenceInCalendarDays: __webpack_require__(12),
                    differenceInCalendarISOWeeks: __webpack_require__(167),
                    differenceInCalendarISOYears: __webpack_require__(36),
                    differenceInCalendarMonths: __webpack_require__(37),
                    differenceInCalendarQuarters: __webpack_require__(168),
                    differenceInCalendarWeeks: __webpack_require__(169),
                    differenceInCalendarYears: __webpack_require__(39),
                    differenceInDays: __webpack_require__(40),
                    differenceInHours: __webpack_require__(170),
                    differenceInISOYears: __webpack_require__(171),
                    differenceInMilliseconds: __webpack_require__(14),
                    differenceInMinutes: __webpack_require__(172),
                    differenceInMonths: __webpack_require__(23),
                    differenceInQuarters: __webpack_require__(173),
                    differenceInSeconds: __webpack_require__(24),
                    differenceInWeeks: __webpack_require__(174),
                    differenceInYears: __webpack_require__(175),
                    distanceInWords: __webpack_require__(42),
                    distanceInWordsStrict: __webpack_require__(176),
                    distanceInWordsToNow: __webpack_require__(177),
                    eachDay: __webpack_require__(178),
                    endOfDay: __webpack_require__(25),
                    endOfHour: __webpack_require__(179),
                    endOfISOWeek: __webpack_require__(180),
                    endOfISOYear: __webpack_require__(181),
                    endOfMinute: __webpack_require__(182),
                    endOfMonth: __webpack_require__(46),
                    endOfQuarter: __webpack_require__(183),
                    endOfSecond: __webpack_require__(184),
                    endOfToday: __webpack_require__(185),
                    endOfTomorrow: __webpack_require__(186),
                    endOfWeek: __webpack_require__(45),
                    endOfYear: __webpack_require__(187),
                    endOfYesterday: __webpack_require__(188),
                    format: __webpack_require__(189),
                    getDate: __webpack_require__(190),
                    getDay: __webpack_require__(191),
                    getDayOfYear: __webpack_require__(47),
                    getDaysInMonth: __webpack_require__(20),
                    getDaysInYear: __webpack_require__(192),
                    getHours: __webpack_require__(193),
                    getISODay: __webpack_require__(51),
                    getISOWeek: __webpack_require__(26),
                    getISOWeeksInYear: __webpack_require__(194),
                    getISOYear: __webpack_require__(3),
                    getMilliseconds: __webpack_require__(195),
                    getMinutes: __webpack_require__(196),
                    getMonth: __webpack_require__(197),
                    getOverlappingDaysInRanges: __webpack_require__(198),
                    getQuarter: __webpack_require__(38),
                    getSeconds: __webpack_require__(199),
                    getTime: __webpack_require__(200),
                    getYear: __webpack_require__(201),
                    isAfter: __webpack_require__(202),
                    isBefore: __webpack_require__(203),
                    isDate: __webpack_require__(19),
                    isEqual: __webpack_require__(204),
                    isFirstDayOfMonth: __webpack_require__(205),
                    isFriday: __webpack_require__(206),
                    isFuture: __webpack_require__(207),
                    isLastDayOfMonth: __webpack_require__(208),
                    isLeapYear: __webpack_require__(50),
                    isMonday: __webpack_require__(209),
                    isPast: __webpack_require__(210),
                    isSameDay: __webpack_require__(211),
                    isSameHour: __webpack_require__(52),
                    isSameISOWeek: __webpack_require__(54),
                    isSameISOYear: __webpack_require__(55),
                    isSameMinute: __webpack_require__(56),
                    isSameMonth: __webpack_require__(58),
                    isSameQuarter: __webpack_require__(59),
                    isSameSecond: __webpack_require__(61),
                    isSameWeek: __webpack_require__(27),
                    isSameYear: __webpack_require__(63),
                    isSaturday: __webpack_require__(212),
                    isSunday: __webpack_require__(213),
                    isThisHour: __webpack_require__(214),
                    isThisISOWeek: __webpack_require__(215),
                    isThisISOYear: __webpack_require__(216),
                    isThisMinute: __webpack_require__(217),
                    isThisMonth: __webpack_require__(218),
                    isThisQuarter: __webpack_require__(219),
                    isThisSecond: __webpack_require__(220),
                    isThisWeek: __webpack_require__(221),
                    isThisYear: __webpack_require__(222),
                    isThursday: __webpack_require__(223),
                    isToday: __webpack_require__(224),
                    isTomorrow: __webpack_require__(225),
                    isTuesday: __webpack_require__(226),
                    isValid: __webpack_require__(49),
                    isWednesday: __webpack_require__(227),
                    isWeekend: __webpack_require__(228),
                    isWithinRange: __webpack_require__(229),
                    isYesterday: __webpack_require__(230),
                    lastDayOfISOWeek: __webpack_require__(231),
                    lastDayOfISOYear: __webpack_require__(232),
                    lastDayOfMonth: __webpack_require__(233),
                    lastDayOfQuarter: __webpack_require__(234),
                    lastDayOfWeek: __webpack_require__(64),
                    lastDayOfYear: __webpack_require__(235),
                    max: __webpack_require__(236),
                    min: __webpack_require__(237),
                    parse: __webpack_require__(0),
                    setDate: __webpack_require__(238),
                    setDay: __webpack_require__(239),
                    setDayOfYear: __webpack_require__(240),
                    setHours: __webpack_require__(241),
                    setISODay: __webpack_require__(242),
                    setISOWeek: __webpack_require__(243),
                    setISOYear: __webpack_require__(31),
                    setMilliseconds: __webpack_require__(244),
                    setMinutes: __webpack_require__(245),
                    setMonth: __webpack_require__(65),
                    setQuarter: __webpack_require__(246),
                    setSeconds: __webpack_require__(247),
                    setYear: __webpack_require__(248),
                    startOfDay: __webpack_require__(5),
                    startOfHour: __webpack_require__(53),
                    startOfISOWeek: __webpack_require__(4),
                    startOfISOYear: __webpack_require__(9),
                    startOfMinute: __webpack_require__(57),
                    startOfMonth: __webpack_require__(249),
                    startOfQuarter: __webpack_require__(60),
                    startOfSecond: __webpack_require__(62),
                    startOfToday: __webpack_require__(250),
                    startOfTomorrow: __webpack_require__(251),
                    startOfWeek: __webpack_require__(11),
                    startOfYear: __webpack_require__(48),
                    startOfYesterday: __webpack_require__(252),
                    subDays: __webpack_require__(253),
                    subHours: __webpack_require__(254),
                    subISOYears: __webpack_require__(41),
                    subMilliseconds: __webpack_require__(255),
                    subMinutes: __webpack_require__(256),
                    subMonths: __webpack_require__(257),
                    subQuarters: __webpack_require__(258),
                    subSeconds: __webpack_require__(259),
                    subWeeks: __webpack_require__(260),
                    subYears: __webpack_require__(261)
                }


                /***/
            }),
            /* 7 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Day Helpers
                 * @summary Add the specified number of days to the given date.
                 *
                 * @description
                 * Add the specified number of days to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of days to be added
                 * @returns {Date} the new date with the days added
                 *
                 * @example
                 * // Add 10 days to 1 September 2014:
                 * var result = addDays(new Date(2014, 8, 1), 10)
                 * //=> Thu Sep 11 2014 00:00:00
                 */
                function addDays(dirtyDate, dirtyAmount) {
                    var date = parse(dirtyDate)
                    var amount = Number(dirtyAmount)
                    date.setDate(date.getDate() + amount)
                    return date
                }

                module.exports = addDays


                /***/
            }),
            /* 8 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Millisecond Helpers
                 * @summary Add the specified number of milliseconds to the given date.
                 *
                 * @description
                 * Add the specified number of milliseconds to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of milliseconds to be added
                 * @returns {Date} the new date with the milliseconds added
                 *
                 * @example
                 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
                 * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
                 * //=> Thu Jul 10 2014 12:45:30.750
                 */
                function addMilliseconds(dirtyDate, dirtyAmount) {
                    var timestamp = parse(dirtyDate).getTime()
                    var amount = Number(dirtyAmount)
                    return new Date(timestamp + amount)
                }

                module.exports = addMilliseconds


                /***/
            }),
            /* 9 */
            /***/ (function (module, exports, __webpack_require__) {

                var getISOYear = __webpack_require__(3)
                var startOfISOWeek = __webpack_require__(4)

                /**
                 * @category ISO Week-Numbering Year Helpers
                 * @summary Return the start of an ISO week-numbering year for the given date.
                 *
                 * @description
                 * Return the start of an ISO week-numbering year,
                 * which always starts 3 days before the year's first Thursday.
                 * The result will be in the local timezone.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the start of an ISO year
                 *
                 * @example
                 * // The start of an ISO week-numbering year for 2 July 2005:
                 * var result = startOfISOYear(new Date(2005, 6, 2))
                 * //=> Mon Jan 03 2005 00:00:00
                 */
                function startOfISOYear(dirtyDate) {
                    var year = getISOYear(dirtyDate)
                    var fourthOfJanuary = new Date(0)
                    fourthOfJanuary.setFullYear(year, 0, 4)
                    fourthOfJanuary.setHours(0, 0, 0, 0)
                    var date = startOfISOWeek(fourthOfJanuary)
                    return date
                }

                module.exports = startOfISOYear


                /***/
            }),
            /* 10 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Common Helpers
                 * @summary Compare the two dates and return -1, 0 or 1.
                 *
                 * @description
                 * Compare the two dates and return 1 if the first date is after the second,
                 * -1 if the first date is before the second or 0 if dates are equal.
                 *
                 * @param {Date|String|Number} dateLeft - the first date to compare
                 * @param {Date|String|Number} dateRight - the second date to compare
                 * @returns {Number} the result of the comparison
                 *
                 * @example
                 * // Compare 11 February 1987 and 10 July 1989:
                 * var result = compareAsc(
                 *   new Date(1987, 1, 11),
                 *   new Date(1989, 6, 10)
                 * )
                 * //=> -1
                 *
                 * @example
                 * // Sort the array of dates:
                 * var result = [
                 *   new Date(1995, 6, 2),
                 *   new Date(1987, 1, 11),
                 *   new Date(1989, 6, 10)
                 * ].sort(compareAsc)
                 * //=> [
                 * //   Wed Feb 11 1987 00:00:00,
                 * //   Mon Jul 10 1989 00:00:00,
                 * //   Sun Jul 02 1995 00:00:00
                 * // ]
                 */
                function compareAsc(dirtyDateLeft, dirtyDateRight) {
                    var dateLeft = parse(dirtyDateLeft)
                    var timeLeft = dateLeft.getTime()
                    var dateRight = parse(dirtyDateRight)
                    var timeRight = dateRight.getTime()

                    if (timeLeft < timeRight) {
                        return -1
                    } else if (timeLeft > timeRight) {
                        return 1
                    } else {
                        return 0
                    }
                }

                module.exports = compareAsc


                /***/
            }),
            /* 11 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Week Helpers
                 * @summary Return the start of a week for the given date.
                 *
                 * @description
                 * Return the start of a week for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @param {Object} [options] - the object with options
                 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
                 * @returns {Date} the start of a week
                 *
                 * @example
                 * // The start of a week for 2 September 2014 11:55:00:
                 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Sun Aug 31 2014 00:00:00
                 *
                 * @example
                 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
                 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
                 * //=> Mon Sep 01 2014 00:00:00
                 */
                function startOfWeek(dirtyDate, dirtyOptions) {
                    var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0

                    var date = parse(dirtyDate)
                    var day = date.getDay()
                    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn

                    date.setDate(date.getDate() - diff)
                    date.setHours(0, 0, 0, 0)
                    return date
                }

                module.exports = startOfWeek


                /***/
            }),
            /* 12 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfDay = __webpack_require__(5)

                var MILLISECONDS_IN_MINUTE = 60000
                var MILLISECONDS_IN_DAY = 86400000

                /**
                 * @category Day Helpers
                 * @summary Get the number of calendar days between the given dates.
                 *
                 * @description
                 * Get the number of calendar days between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of calendar days
                 *
                 * @example
                 * // How many calendar days are between
                 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
                 * var result = differenceInCalendarDays(
                 *   new Date(2012, 6, 2, 0, 0),
                 *   new Date(2011, 6, 2, 23, 0)
                 * )
                 * //=> 366
                 */
                function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
                    var startOfDayLeft = startOfDay(dirtyDateLeft)
                    var startOfDayRight = startOfDay(dirtyDateRight)

                    var timestampLeft = startOfDayLeft.getTime() -
                        startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE
                    var timestampRight = startOfDayRight.getTime() -
                        startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE

                    // Round the number of days to the nearest integer
                    // because the number of milliseconds in a day is not constant
                    // (e.g. it's different in the day of the daylight saving time clock shift)
                    return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
                }

                module.exports = differenceInCalendarDays


                /***/
            }),
            /* 13 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var getDaysInMonth = __webpack_require__(20)

                /**
                 * @category Month Helpers
                 * @summary Add the specified number of months to the given date.
                 *
                 * @description
                 * Add the specified number of months to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of months to be added
                 * @returns {Date} the new date with the months added
                 *
                 * @example
                 * // Add 5 months to 1 September 2014:
                 * var result = addMonths(new Date(2014, 8, 1), 5)
                 * //=> Sun Feb 01 2015 00:00:00
                 */
                function addMonths(dirtyDate, dirtyAmount) {
                    var date = parse(dirtyDate)
                    var amount = Number(dirtyAmount)
                    var desiredMonth = date.getMonth() + amount
                    var dateWithDesiredMonth = new Date(0)
                    dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1)
                    dateWithDesiredMonth.setHours(0, 0, 0, 0)
                    var daysInMonth = getDaysInMonth(dateWithDesiredMonth)
                    // Set the last day of the new month
                    // if the original date was the last day of the longer month
                    date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()))
                    return date
                }

                module.exports = addMonths


                /***/
            }),
            /* 14 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Millisecond Helpers
                 * @summary Get the number of milliseconds between the given dates.
                 *
                 * @description
                 * Get the number of milliseconds between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of milliseconds
                 *
                 * @example
                 * // How many milliseconds are between
                 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
                 * var result = differenceInMilliseconds(
                 *   new Date(2014, 6, 2, 12, 30, 21, 700),
                 *   new Date(2014, 6, 2, 12, 30, 20, 600)
                 * )
                 * //=> 1100
                 */
                function differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) {
                    var dateLeft = parse(dirtyDateLeft)
                    var dateRight = parse(dirtyDateRight)
                    return dateLeft.getTime() - dateRight.getTime()
                }

                module.exports = differenceInMilliseconds


                /***/
            }),
            /* 15 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(43)
                var buildFormatLocale = __webpack_require__(44)

                /**
                 * @category Locales
                 * @summary English locale.
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 16 */
            /***/ (function (module, exports, __webpack_require__) {

                var map = {
                    "./_lib/build_formatting_tokens_reg_exp/index.js": 2,
                    "./ar/build_distance_in_words_locale/index.js": 97,
                    "./ar/build_format_locale/index.js": 98,
                    "./ar/index.js": 270,
                    "./bg/build_distance_in_words_locale/index.js": 99,
                    "./bg/build_format_locale/index.js": 100,
                    "./bg/index.js": 271,
                    "./ca/build_distance_in_words_locale/index.js": 101,
                    "./ca/build_format_locale/index.js": 102,
                    "./ca/index.js": 272,
                    "./cs/build_distance_in_words_locale/index.js": 103,
                    "./cs/build_format_locale/index.js": 104,
                    "./cs/index.js": 273,
                    "./da/build_distance_in_words_locale/index.js": 105,
                    "./da/build_format_locale/index.js": 106,
                    "./da/index.js": 274,
                    "./de/build_distance_in_words_locale/index.js": 107,
                    "./de/build_format_locale/index.js": 108,
                    "./de/index.js": 275,
                    "./el/build_distance_in_words_locale/index.js": 109,
                    "./el/build_format_locale/index.js": 110,
                    "./el/index.js": 276,
                    "./en/build_distance_in_words_locale/index.js": 43,
                    "./en/build_format_locale/index.js": 44,
                    "./en/index.js": 15,
                    "./eo/build_distance_in_words_locale/index.js": 111,
                    "./eo/build_format_locale/index.js": 112,
                    "./eo/index.js": 277,
                    "./es/build_distance_in_words_locale/index.js": 113,
                    "./es/build_format_locale/index.js": 114,
                    "./es/index.js": 278,
                    "./fi/build_distance_in_words_locale/index.js": 115,
                    "./fi/build_format_locale/index.js": 116,
                    "./fi/index.js": 279,
                    "./fil/build_distance_in_words_locale/index.js": 117,
                    "./fil/build_format_locale/index.js": 118,
                    "./fil/index.js": 280,
                    "./fr/build_distance_in_words_locale/index.js": 119,
                    "./fr/build_format_locale/index.js": 120,
                    "./fr/index.js": 281,
                    "./hr/build_distance_in_words_locale/index.js": 121,
                    "./hr/build_format_locale/index.js": 122,
                    "./hr/index.js": 282,
                    "./hu/build_distance_in_words_locale/index.js": 123,
                    "./hu/build_format_locale/index.js": 124,
                    "./hu/index.js": 283,
                    "./id/build_distance_in_words_locale/index.js": 125,
                    "./id/build_format_locale/index.js": 126,
                    "./id/index.js": 284,
                    "./is/build_distance_in_words_locale/index.js": 127,
                    "./is/build_format_locale/index.js": 128,
                    "./is/index.js": 285,
                    "./it/build_distance_in_words_locale/index.js": 129,
                    "./it/build_format_locale/index.js": 130,
                    "./it/index.js": 286,
                    "./ja/build_distance_in_words_locale/index.js": 131,
                    "./ja/build_format_locale/index.js": 132,
                    "./ja/index.js": 287,
                    "./ko/build_distance_in_words_locale/index.js": 133,
                    "./ko/build_format_locale/index.js": 134,
                    "./ko/index.js": 288,
                    "./mk/build_distance_in_words_locale/index.js": 135,
                    "./mk/build_format_locale/index.js": 136,
                    "./mk/index.js": 289,
                    "./nb/build_distance_in_words_locale/index.js": 137,
                    "./nb/build_format_locale/index.js": 138,
                    "./nb/index.js": 290,
                    "./nl/build_distance_in_words_locale/index.js": 139,
                    "./nl/build_format_locale/index.js": 140,
                    "./nl/index.js": 291,
                    "./pl/build_distance_in_words_locale/index.js": 141,
                    "./pl/build_format_locale/index.js": 142,
                    "./pl/index.js": 292,
                    "./pt/build_distance_in_words_locale/index.js": 143,
                    "./pt/build_format_locale/index.js": 144,
                    "./pt/index.js": 293,
                    "./ro/build_distance_in_words_locale/index.js": 145,
                    "./ro/build_format_locale/index.js": 146,
                    "./ro/index.js": 294,
                    "./ru/build_distance_in_words_locale/index.js": 147,
                    "./ru/build_format_locale/index.js": 148,
                    "./ru/index.js": 295,
                    "./sk/build_distance_in_words_locale/index.js": 149,
                    "./sk/build_format_locale/index.js": 150,
                    "./sk/index.js": 296,
                    "./sl/build_distance_in_words_locale/index.js": 151,
                    "./sl/build_format_locale/index.js": 152,
                    "./sl/index.js": 297,
                    "./sv/build_distance_in_words_locale/index.js": 153,
                    "./sv/build_format_locale/index.js": 154,
                    "./sv/index.js": 298,
                    "./th/build_distance_in_words_locale/index.js": 155,
                    "./th/build_format_locale/index.js": 156,
                    "./th/index.js": 299,
                    "./tr/build_distance_in_words_locale/index.js": 157,
                    "./tr/build_format_locale/index.js": 158,
                    "./tr/index.js": 300,
                    "./zh_cn/build_distance_in_words_locale/index.js": 159,
                    "./zh_cn/build_format_locale/index.js": 160,
                    "./zh_cn/index.js": 301,
                    "./zh_tw/build_distance_in_words_locale/index.js": 161,
                    "./zh_tw/build_format_locale/index.js": 162,
                    "./zh_tw/index.js": 302
                };

                function webpackContext(req) {
                    return __webpack_require__(webpackContextResolve(req));
                };

                function webpackContextResolve(req) {
                    var id = map[req];
                    if (!(id + 1)) // check for number or string
                        throw new Error("Cannot find module '" + req + "'.");
                    return id;
                };
                webpackContext.keys = function webpackContextKeys() {
                    return Object.keys(map);
                };
                webpackContext.resolve = webpackContextResolve;
                module.exports = webpackContext;
                webpackContext.id = 16;

                /***/
            }),
            /* 17 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "b", function () {
                    return uuid;
                });
                /* unused harmony export deepMerge */
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "a", function () {
                    return detectSupportsPassive;
                });
                var _extends = Object.assign || function (target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                };

                var _slicedToArray = function () {
                    function sliceIterator(arr, i) {
                        var _arr = [];
                        var _n = true;
                        var _d = false;
                        var _e = undefined;
                        try {
                            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                                _arr.push(_s.value);
                                if (i && _arr.length === i) break;
                            }
                        } catch (err) {
                            _d = true;
                            _e = err;
                        } finally {
                            try {
                                if (!_n && _i["return"]) _i["return"]();
                            } finally {
                                if (_d) throw _e;
                            }
                        }
                        return _arr;
                    }

                    return function (arr, i) {
                        if (Array.isArray(arr)) {
                            return arr;
                        } else if (Symbol.iterator in Object(arr)) {
                            return sliceIterator(arr, i);
                        } else {
                            throw new TypeError("Invalid attempt to destructure non-iterable instance");
                        }
                    };
                }();

                function _defineProperty(obj, key, value) {
                    if (key in obj) {
                        Object.defineProperty(obj, key, {
                            value: value,
                            enumerable: true,
                            configurable: true,
                            writable: true
                        });
                    } else {
                        obj[key] = value;
                    }
                    return obj;
                }

                function _toConsumableArray(arr) {
                    if (Array.isArray(arr)) {
                        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                            arr2[i] = arr[i];
                        }
                        return arr2;
                    } else {
                        return Array.from(arr);
                    }
                }

                var uuid = function uuid() {
                    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                    return prefix + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
                        return (c ^ (window.crypto || window.msCrypto).getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
                    });
                };
                var deepMerge = function deepMerge() {
                    for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
                        sources[_key] = arguments[_key];
                    }

                    var acc = {};
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var source = _step.value;

                            if (source instanceof Array) {
                                if (!(acc instanceof Array)) {
                                    acc = [];
                                }
                                acc = [].concat(_toConsumableArray(acc), _toConsumableArray(source));
                            } else if (source instanceof Object) {
                                var _iteratorNormalCompletion2 = true;
                                var _didIteratorError2 = false;
                                var _iteratorError2 = undefined;

                                try {
                                    for (var _iterator2 = Object.entries(source)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                        var _ref = _step2.value;

                                        var _ref2 = _slicedToArray(_ref, 2);

                                        var key = _ref2[0];
                                        var value = _ref2[1];

                                        if (value instanceof Object && key in acc) {
                                            value = deepMerge(acc[key], value);
                                        }
                                        acc = _extends({}, acc, _defineProperty({}, key, value));
                                    }
                                } catch (err) {
                                    _didIteratorError2 = true;
                                    _iteratorError2 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                            _iterator2.return();
                                        }
                                    } finally {
                                        if (_didIteratorError2) {
                                            throw _iteratorError2;
                                        }
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    return acc;
                };

                var detectSupportsPassive = function detectSupportsPassive() {
                    var supportsPassive = false;

                    try {
                        var opts = Object.defineProperty({}, 'passive', {
                            get: function get() {
                                supportsPassive = true;
                            }
                        });

                        window.addEventListener('testPassive', null, opts);
                        window.removeEventListener('testPassive', null, opts);
                    } catch (e) {
                    }

                    return supportsPassive;
                };

                /***/
            }),
            /* 18 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "c", function () {
                    return isFunction;
                });
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "e", function () {
                    return isString;
                });
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "b", function () {
                    return isDate;
                });
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "d", function () {
                    return isObject;
                });
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "a", function () {
                    return BooleanParse;
                });
                var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                    return typeof obj;
                } : function (obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };

                var isFunction = function isFunction(unknown) {
                    return typeof unknown === 'function';
                };
                var isString = function isString(unknown) {
                    return typeof unknown === 'string' || !!unknown && (typeof unknown === 'undefined' ? 'undefined' : _typeof(unknown)) === 'object' && Object.prototype.toString.call(unknown) === '[object String]';
                };
                var isDate = function isDate(unknown) {
                    return (Object.prototype.toString.call(unknown) === '[object Date]' || unknown instanceof Date) && !isNaN(unknown.valueOf());
                };
                var isObject = function isObject(unknown) {
                    return (typeof unknown === 'function' || (typeof unknown === 'undefined' ? 'undefined' : _typeof(unknown)) === 'object' && !!unknown) && !Array.isArray(unknown);
                };

                var falsy = /^(?:f(?:alse)?|no?|0+)$/i;
                var BooleanParse = function BooleanParse(val) {
                    return !falsy.test(val) && !!val;
                };

                /***/
            }),
            /* 19 */
            /***/ (function (module, exports) {

                /**
                 * @category Common Helpers
                 * @summary Is the given argument an instance of Date?
                 *
                 * @description
                 * Is the given argument an instance of Date?
                 *
                 * @param {*} argument - the argument to check
                 * @returns {Boolean} the given argument is an instance of Date
                 *
                 * @example
                 * // Is 'mayonnaise' a Date?
                 * var result = isDate('mayonnaise')
                 * //=> false
                 */
                function isDate(argument) {
                    return argument instanceof Date
                }

                module.exports = isDate


                /***/
            }),
            /* 20 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Month Helpers
                 * @summary Get the number of days in a month of the given date.
                 *
                 * @description
                 * Get the number of days in a month of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the number of days in a month
                 *
                 * @example
                 * // How many days are in February 2000?
                 * var result = getDaysInMonth(new Date(2000, 1))
                 * //=> 29
                 */
                function getDaysInMonth(dirtyDate) {
                    var date = parse(dirtyDate)
                    var year = date.getFullYear()
                    var monthIndex = date.getMonth()
                    var lastDayOfMonth = new Date(0)
                    lastDayOfMonth.setFullYear(year, monthIndex + 1, 0)
                    lastDayOfMonth.setHours(0, 0, 0, 0)
                    return lastDayOfMonth.getDate()
                }

                module.exports = getDaysInMonth


                /***/
            }),
            /* 21 */
            /***/ (function (module, exports, __webpack_require__) {

                var addDays = __webpack_require__(7)

                /**
                 * @category Week Helpers
                 * @summary Add the specified number of weeks to the given date.
                 *
                 * @description
                 * Add the specified number of week to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of weeks to be added
                 * @returns {Date} the new date with the weeks added
                 *
                 * @example
                 * // Add 4 weeks to 1 September 2014:
                 * var result = addWeeks(new Date(2014, 8, 1), 4)
                 * //=> Mon Sep 29 2014 00:00:00
                 */
                function addWeeks(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    var days = amount * 7
                    return addDays(dirtyDate, days)
                }

                module.exports = addWeeks


                /***/
            }),
            /* 22 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Common Helpers
                 * @summary Compare the two dates reverse chronologically and return -1, 0 or 1.
                 *
                 * @description
                 * Compare the two dates and return -1 if the first date is after the second,
                 * 1 if the first date is before the second or 0 if dates are equal.
                 *
                 * @param {Date|String|Number} dateLeft - the first date to compare
                 * @param {Date|String|Number} dateRight - the second date to compare
                 * @returns {Number} the result of the comparison
                 *
                 * @example
                 * // Compare 11 February 1987 and 10 July 1989 reverse chronologically:
                 * var result = compareDesc(
                 *   new Date(1987, 1, 11),
                 *   new Date(1989, 6, 10)
                 * )
                 * //=> 1
                 *
                 * @example
                 * // Sort the array of dates in reverse chronological order:
                 * var result = [
                 *   new Date(1995, 6, 2),
                 *   new Date(1987, 1, 11),
                 *   new Date(1989, 6, 10)
                 * ].sort(compareDesc)
                 * //=> [
                 * //   Sun Jul 02 1995 00:00:00,
                 * //   Mon Jul 10 1989 00:00:00,
                 * //   Wed Feb 11 1987 00:00:00
                 * // ]
                 */
                function compareDesc(dirtyDateLeft, dirtyDateRight) {
                    var dateLeft = parse(dirtyDateLeft)
                    var timeLeft = dateLeft.getTime()
                    var dateRight = parse(dirtyDateRight)
                    var timeRight = dateRight.getTime()

                    if (timeLeft > timeRight) {
                        return -1
                    } else if (timeLeft < timeRight) {
                        return 1
                    } else {
                        return 0
                    }
                }

                module.exports = compareDesc


                /***/
            }),
            /* 23 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var differenceInCalendarMonths = __webpack_require__(37)
                var compareAsc = __webpack_require__(10)

                /**
                 * @category Month Helpers
                 * @summary Get the number of full months between the given dates.
                 *
                 * @description
                 * Get the number of full months between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of full months
                 *
                 * @example
                 * // How many full months are between 31 January 2014 and 1 September 2014?
                 * var result = differenceInMonths(
                 *   new Date(2014, 8, 1),
                 *   new Date(2014, 0, 31)
                 * )
                 * //=> 7
                 */
                function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
                    var dateLeft = parse(dirtyDateLeft)
                    var dateRight = parse(dirtyDateRight)

                    var sign = compareAsc(dateLeft, dateRight)
                    var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight))
                    dateLeft.setMonth(dateLeft.getMonth() - sign * difference)

                    // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
                    // If so, result must be decreased by 1 in absolute value
                    var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign
                    return sign * (difference - isLastMonthNotFull)
                }

                module.exports = differenceInMonths


                /***/
            }),
            /* 24 */
            /***/ (function (module, exports, __webpack_require__) {

                var differenceInMilliseconds = __webpack_require__(14)

                /**
                 * @category Second Helpers
                 * @summary Get the number of seconds between the given dates.
                 *
                 * @description
                 * Get the number of seconds between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of seconds
                 *
                 * @example
                 * // How many seconds are between
                 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
                 * var result = differenceInSeconds(
                 *   new Date(2014, 6, 2, 12, 30, 20, 0),
                 *   new Date(2014, 6, 2, 12, 30, 7, 999)
                 * )
                 * //=> 12
                 */
                function differenceInSeconds(dirtyDateLeft, dirtyDateRight) {
                    var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / 1000
                    return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
                }

                module.exports = differenceInSeconds


                /***/
            }),
            /* 25 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Day Helpers
                 * @summary Return the end of a day for the given date.
                 *
                 * @description
                 * Return the end of a day for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the end of a day
                 *
                 * @example
                 * // The end of a day for 2 September 2014 11:55:00:
                 * var result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Tue Sep 02 2014 23:59:59.999
                 */
                function endOfDay(dirtyDate) {
                    var date = parse(dirtyDate)
                    date.setHours(23, 59, 59, 999)
                    return date
                }

                module.exports = endOfDay


                /***/
            }),
            /* 26 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var startOfISOWeek = __webpack_require__(4)
                var startOfISOYear = __webpack_require__(9)

                var MILLISECONDS_IN_WEEK = 604800000

                /**
                 * @category ISO Week Helpers
                 * @summary Get the ISO week of the given date.
                 *
                 * @description
                 * Get the ISO week of the given date.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the ISO week
                 *
                 * @example
                 * // Which week of the ISO-week numbering year is 2 January 2005?
                 * var result = getISOWeek(new Date(2005, 0, 2))
                 * //=> 53
                 */
                function getISOWeek(dirtyDate) {
                    var date = parse(dirtyDate)
                    var diff = startOfISOWeek(date).getTime() - startOfISOYear(date).getTime()

                    // Round the number of days to the nearest integer
                    // because the number of milliseconds in a week is not constant
                    // (e.g. it's different in the week of the daylight saving time clock shift)
                    return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
                }

                module.exports = getISOWeek


                /***/
            }),
            /* 27 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfWeek = __webpack_require__(11)

                /**
                 * @category Week Helpers
                 * @summary Are the given dates in the same week?
                 *
                 * @description
                 * Are the given dates in the same week?
                 *
                 * @param {Date|String|Number} dateLeft - the first date to check
                 * @param {Date|String|Number} dateRight - the second date to check
                 * @param {Object} [options] - the object with options
                 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
                 * @returns {Boolean} the dates are in the same week
                 *
                 * @example
                 * // Are 31 August 2014 and 4 September 2014 in the same week?
                 * var result = isSameWeek(
                 *   new Date(2014, 7, 31),
                 *   new Date(2014, 8, 4)
                 * )
                 * //=> true
                 *
                 * @example
                 * // If week starts with Monday,
                 * // are 31 August 2014 and 4 September 2014 in the same week?
                 * var result = isSameWeek(
                 *   new Date(2014, 7, 31),
                 *   new Date(2014, 8, 4),
                 *   {weekStartsOn: 1}
                 * )
                 * //=> false
                 */
                function isSameWeek(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
                    var dateLeftStartOfWeek = startOfWeek(dirtyDateLeft, dirtyOptions)
                    var dateRightStartOfWeek = startOfWeek(dirtyDateRight, dirtyOptions)

                    return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime()
                }

                module.exports = isSameWeek


                /***/
            }),
            /* 28 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                var _createClass = function () {
                    function defineProperties(target, props) {
                        for (var i = 0; i < props.length; i++) {
                            var descriptor = props[i];
                            descriptor.enumerable = descriptor.enumerable || false;
                            descriptor.configurable = true;
                            if ("value" in descriptor) descriptor.writable = true;
                            Object.defineProperty(target, descriptor.key, descriptor);
                        }
                    }

                    return function (Constructor, protoProps, staticProps) {
                        if (protoProps) defineProperties(Constructor.prototype, protoProps);
                        if (staticProps) defineProperties(Constructor, staticProps);
                        return Constructor;
                    };
                }();

                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }

                var EventEmitter = function () {
                    function EventEmitter() {
                        var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                        _classCallCheck(this, EventEmitter);

                        this._listeners = new Map(listeners);
                        this._middlewares = new Map();
                    }

                    _createClass(EventEmitter, [{
                        key: "listenerCount",
                        value: function listenerCount(eventName) {
                            if (!this._listeners.has(eventName)) {
                                return 0;
                            }

                            var eventListeners = this._listeners.get(eventName);
                            return eventListeners.length;
                        }
                    }, {
                        key: "removeListeners",
                        value: function removeListeners() {
                            var _this = this;

                            var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                            var middleware = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                            if (eventName !== null) {
                                if (Array.isArray(eventName)) {
                                    name.forEach(function (e) {
                                        return _this.removeListeners(e, middleware);
                                    });
                                } else {
                                    this._listeners.delete(eventName);

                                    if (middleware) {
                                        this.removeMiddleware(eventName);
                                    }
                                }
                            } else {
                                this._listeners = new Map();
                            }
                        }
                    }, {
                        key: "middleware",
                        value: function middleware(eventName, fn) {
                            var _this2 = this;

                            if (Array.isArray(eventName)) {
                                name.forEach(function (e) {
                                    return _this2.middleware(e, fn);
                                });
                            } else {
                                if (!Array.isArray(this._middlewares.get(eventName))) {
                                    this._middlewares.set(eventName, []);
                                }

                                this._middlewares.get(eventName).push(fn);
                            }
                        }
                    }, {
                        key: "removeMiddleware",
                        value: function removeMiddleware() {
                            var _this3 = this;

                            var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                            if (eventName !== null) {
                                if (Array.isArray(eventName)) {
                                    name.forEach(function (e) {
                                        return _this3.removeMiddleware(e);
                                    });
                                } else {
                                    this._middlewares.delete(eventName);
                                }
                            } else {
                                this._middlewares = new Map();
                            }
                        }
                    }, {
                        key: "on",
                        value: function on(name, callback) {
                            var _this4 = this;

                            var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                            if (Array.isArray(name)) {
                                name.forEach(function (e) {
                                    return _this4.on(e, callback);
                                });
                            } else {
                                name = name.toString();
                                var split = name.split(/,|, | /);

                                if (split.length > 1) {
                                    split.forEach(function (e) {
                                        return _this4.on(e, callback);
                                    });
                                } else {
                                    if (!Array.isArray(this._listeners.get(name))) {
                                        this._listeners.set(name, []);
                                    }

                                    this._listeners.get(name).push({
                                        once: once,
                                        callback: callback
                                    });
                                }
                            }
                        }
                    }, {
                        key: "once",
                        value: function once(name, callback) {
                            this.on(name, callback, true);
                        }
                    }, {
                        key: "emit",
                        value: function emit(name, data) {
                            var _this5 = this;

                            var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                            name = name.toString();
                            var listeners = this._listeners.get(name);
                            var middlewares = null;
                            var doneCount = 0;
                            var execute = silent;

                            if (Array.isArray(listeners)) {
                                listeners.forEach(function (listener, index) {
                                    // Start Middleware checks unless we're doing a silent emit
                                    if (!silent) {
                                        middlewares = _this5._middlewares.get(name);
                                        // Check and execute Middleware
                                        if (Array.isArray(middlewares)) {
                                            middlewares.forEach(function (middleware) {
                                                middleware(data, function () {
                                                    var newData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                                                    if (newData !== null) {
                                                        data = newData;
                                                    }
                                                    doneCount++;
                                                }, name);
                                            });

                                            if (doneCount >= middlewares.length) {
                                                execute = true;
                                            }
                                        } else {
                                            execute = true;
                                        }
                                    }

                                    // If Middleware checks have been passed, execute
                                    if (execute) {
                                        if (listener.once) {
                                            listeners[index] = null;
                                        }
                                        listener.callback({
                                            type: name,
                                            timeStamp: new Date().getTime(),
                                            data: data
                                        });
                                    }
                                });

                                // Dirty way of removing used Events
                                while (listeners.indexOf(null) !== -1) {
                                    listeners.splice(listeners.indexOf(null), 1);
                                }
                            }
                        }
                    }]);

                    return EventEmitter;
                }();

                /* harmony default export */
                __webpack_exports__["a"] = (EventEmitter);

                /***/
            }),
            /* 29 */
            /***/ (function (module, exports, __webpack_require__) {

                var addMilliseconds = __webpack_require__(8)

                var MILLISECONDS_IN_HOUR = 3600000

                /**
                 * @category Hour Helpers
                 * @summary Add the specified number of hours to the given date.
                 *
                 * @description
                 * Add the specified number of hours to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of hours to be added
                 * @returns {Date} the new date with the hours added
                 *
                 * @example
                 * // Add 2 hours to 10 July 2014 23:00:00:
                 * var result = addHours(new Date(2014, 6, 10, 23, 0), 2)
                 * //=> Fri Jul 11 2014 01:00:00
                 */
                function addHours(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_HOUR)
                }

                module.exports = addHours


                /***/
            }),
            /* 30 */
            /***/ (function (module, exports, __webpack_require__) {

                var getISOYear = __webpack_require__(3)
                var setISOYear = __webpack_require__(31)

                /**
                 * @category ISO Week-Numbering Year Helpers
                 * @summary Add the specified number of ISO week-numbering years to the given date.
                 *
                 * @description
                 * Add the specified number of ISO week-numbering years to the given date.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of ISO week-numbering years to be added
                 * @returns {Date} the new date with the ISO week-numbering years added
                 *
                 * @example
                 * // Add 5 ISO week-numbering years to 2 July 2010:
                 * var result = addISOYears(new Date(2010, 6, 2), 5)
                 * //=> Fri Jun 26 2015 00:00:00
                 */
                function addISOYears(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return setISOYear(dirtyDate, getISOYear(dirtyDate) + amount)
                }

                module.exports = addISOYears


                /***/
            }),
            /* 31 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var startOfISOYear = __webpack_require__(9)
                var differenceInCalendarDays = __webpack_require__(12)

                /**
                 * @category ISO Week-Numbering Year Helpers
                 * @summary Set the ISO week-numbering year to the given date.
                 *
                 * @description
                 * Set the ISO week-numbering year to the given date,
                 * saving the week number and the weekday number.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} isoYear - the ISO week-numbering year of the new date
                 * @returns {Date} the new date with the ISO week-numbering year setted
                 *
                 * @example
                 * // Set ISO week-numbering year 2007 to 29 December 2008:
                 * var result = setISOYear(new Date(2008, 11, 29), 2007)
                 * //=> Mon Jan 01 2007 00:00:00
                 */
                function setISOYear(dirtyDate, dirtyISOYear) {
                    var date = parse(dirtyDate)
                    var isoYear = Number(dirtyISOYear)
                    var diff = differenceInCalendarDays(date, startOfISOYear(date))
                    var fourthOfJanuary = new Date(0)
                    fourthOfJanuary.setFullYear(isoYear, 0, 4)
                    fourthOfJanuary.setHours(0, 0, 0, 0)
                    date = startOfISOYear(fourthOfJanuary)
                    date.setDate(date.getDate() + diff)
                    return date
                }

                module.exports = setISOYear


                /***/
            }),
            /* 32 */
            /***/ (function (module, exports, __webpack_require__) {

                var addMilliseconds = __webpack_require__(8)

                var MILLISECONDS_IN_MINUTE = 60000

                /**
                 * @category Minute Helpers
                 * @summary Add the specified number of minutes to the given date.
                 *
                 * @description
                 * Add the specified number of minutes to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of minutes to be added
                 * @returns {Date} the new date with the minutes added
                 *
                 * @example
                 * // Add 30 minutes to 10 July 2014 12:00:00:
                 * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
                 * //=> Thu Jul 10 2014 12:30:00
                 */
                function addMinutes(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE)
                }

                module.exports = addMinutes


                /***/
            }),
            /* 33 */
            /***/ (function (module, exports, __webpack_require__) {

                var addMonths = __webpack_require__(13)

                /**
                 * @category Quarter Helpers
                 * @summary Add the specified number of year quarters to the given date.
                 *
                 * @description
                 * Add the specified number of year quarters to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of quarters to be added
                 * @returns {Date} the new date with the quarters added
                 *
                 * @example
                 * // Add 1 quarter to 1 September 2014:
                 * var result = addQuarters(new Date(2014, 8, 1), 1)
                 * //=> Mon Dec 01 2014 00:00:00
                 */
                function addQuarters(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    var months = amount * 3
                    return addMonths(dirtyDate, months)
                }

                module.exports = addQuarters


                /***/
            }),
            /* 34 */
            /***/ (function (module, exports, __webpack_require__) {

                var addMilliseconds = __webpack_require__(8)

                /**
                 * @category Second Helpers
                 * @summary Add the specified number of seconds to the given date.
                 *
                 * @description
                 * Add the specified number of seconds to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of seconds to be added
                 * @returns {Date} the new date with the seconds added
                 *
                 * @example
                 * // Add 30 seconds to 10 July 2014 12:45:00:
                 * var result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
                 * //=> Thu Jul 10 2014 12:45:30
                 */
                function addSeconds(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addMilliseconds(dirtyDate, amount * 1000)
                }

                module.exports = addSeconds


                /***/
            }),
            /* 35 */
            /***/ (function (module, exports, __webpack_require__) {

                var addMonths = __webpack_require__(13)

                /**
                 * @category Year Helpers
                 * @summary Add the specified number of years to the given date.
                 *
                 * @description
                 * Add the specified number of years to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of years to be added
                 * @returns {Date} the new date with the years added
                 *
                 * @example
                 * // Add 5 years to 1 September 2014:
                 * var result = addYears(new Date(2014, 8, 1), 5)
                 * //=> Sun Sep 01 2019 00:00:00
                 */
                function addYears(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addMonths(dirtyDate, amount * 12)
                }

                module.exports = addYears


                /***/
            }),
            /* 36 */
            /***/ (function (module, exports, __webpack_require__) {

                var getISOYear = __webpack_require__(3)

                /**
                 * @category ISO Week-Numbering Year Helpers
                 * @summary Get the number of calendar ISO week-numbering years between the given dates.
                 *
                 * @description
                 * Get the number of calendar ISO week-numbering years between the given dates.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of calendar ISO week-numbering years
                 *
                 * @example
                 * // How many calendar ISO week-numbering years are 1 January 2010 and 1 January 2012?
                 * var result = differenceInCalendarISOYears(
                 *   new Date(2012, 0, 1),
                 *   new Date(2010, 0, 1)
                 * )
                 * //=> 2
                 */
                function differenceInCalendarISOYears(dirtyDateLeft, dirtyDateRight) {
                    return getISOYear(dirtyDateLeft) - getISOYear(dirtyDateRight)
                }

                module.exports = differenceInCalendarISOYears


                /***/
            }),
            /* 37 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Month Helpers
                 * @summary Get the number of calendar months between the given dates.
                 *
                 * @description
                 * Get the number of calendar months between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of calendar months
                 *
                 * @example
                 * // How many calendar months are between 31 January 2014 and 1 September 2014?
                 * var result = differenceInCalendarMonths(
                 *   new Date(2014, 8, 1),
                 *   new Date(2014, 0, 31)
                 * )
                 * //=> 8
                 */
                function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
                    var dateLeft = parse(dirtyDateLeft)
                    var dateRight = parse(dirtyDateRight)

                    var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear()
                    var monthDiff = dateLeft.getMonth() - dateRight.getMonth()

                    return yearDiff * 12 + monthDiff
                }

                module.exports = differenceInCalendarMonths


                /***/
            }),
            /* 38 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Quarter Helpers
                 * @summary Get the year quarter of the given date.
                 *
                 * @description
                 * Get the year quarter of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the quarter
                 *
                 * @example
                 * // Which quarter is 2 July 2014?
                 * var result = getQuarter(new Date(2014, 6, 2))
                 * //=> 3
                 */
                function getQuarter(dirtyDate) {
                    var date = parse(dirtyDate)
                    var quarter = Math.floor(date.getMonth() / 3) + 1
                    return quarter
                }

                module.exports = getQuarter


                /***/
            }),
            /* 39 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Year Helpers
                 * @summary Get the number of calendar years between the given dates.
                 *
                 * @description
                 * Get the number of calendar years between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of calendar years
                 *
                 * @example
                 * // How many calendar years are between 31 December 2013 and 11 February 2015?
                 * var result = differenceInCalendarYears(
                 *   new Date(2015, 1, 11),
                 *   new Date(2013, 11, 31)
                 * )
                 * //=> 2
                 */
                function differenceInCalendarYears(dirtyDateLeft, dirtyDateRight) {
                    var dateLeft = parse(dirtyDateLeft)
                    var dateRight = parse(dirtyDateRight)

                    return dateLeft.getFullYear() - dateRight.getFullYear()
                }

                module.exports = differenceInCalendarYears


                /***/
            }),
            /* 40 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var differenceInCalendarDays = __webpack_require__(12)
                var compareAsc = __webpack_require__(10)

                /**
                 * @category Day Helpers
                 * @summary Get the number of full days between the given dates.
                 *
                 * @description
                 * Get the number of full days between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of full days
                 *
                 * @example
                 * // How many full days are between
                 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
                 * var result = differenceInDays(
                 *   new Date(2012, 6, 2, 0, 0),
                 *   new Date(2011, 6, 2, 23, 0)
                 * )
                 * //=> 365
                 */
                function differenceInDays(dirtyDateLeft, dirtyDateRight) {
                    var dateLeft = parse(dirtyDateLeft)
                    var dateRight = parse(dirtyDateRight)

                    var sign = compareAsc(dateLeft, dateRight)
                    var difference = Math.abs(differenceInCalendarDays(dateLeft, dateRight))
                    dateLeft.setDate(dateLeft.getDate() - sign * difference)

                    // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
                    // If so, result must be decreased by 1 in absolute value
                    var isLastDayNotFull = compareAsc(dateLeft, dateRight) === -sign
                    return sign * (difference - isLastDayNotFull)
                }

                module.exports = differenceInDays


                /***/
            }),
            /* 41 */
            /***/ (function (module, exports, __webpack_require__) {

                var addISOYears = __webpack_require__(30)

                /**
                 * @category ISO Week-Numbering Year Helpers
                 * @summary Subtract the specified number of ISO week-numbering years from the given date.
                 *
                 * @description
                 * Subtract the specified number of ISO week-numbering years from the given date.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of ISO week-numbering years to be subtracted
                 * @returns {Date} the new date with the ISO week-numbering years subtracted
                 *
                 * @example
                 * // Subtract 5 ISO week-numbering years from 1 September 2014:
                 * var result = subISOYears(new Date(2014, 8, 1), 5)
                 * //=> Mon Aug 31 2009 00:00:00
                 */
                function subISOYears(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addISOYears(dirtyDate, -amount)
                }

                module.exports = subISOYears


                /***/
            }),
            /* 42 */
            /***/ (function (module, exports, __webpack_require__) {

                var compareDesc = __webpack_require__(22)
                var parse = __webpack_require__(0)
                var differenceInSeconds = __webpack_require__(24)
                var differenceInMonths = __webpack_require__(23)
                var enLocale = __webpack_require__(15)

                var MINUTES_IN_DAY = 1440
                var MINUTES_IN_ALMOST_TWO_DAYS = 2520
                var MINUTES_IN_MONTH = 43200
                var MINUTES_IN_TWO_MONTHS = 86400

                /**
                 * @category Common Helpers
                 * @summary Return the distance between the given dates in words.
                 *
                 * @description
                 * Return the distance between the given dates in words.
                 *
                 * | Distance between dates                                            | Result              |
                 * |-------------------------------------------------------------------|---------------------|
                 * | 0 ... 30 secs                                                     | less than a minute  |
                 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
                 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
                 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
                 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
                 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
                 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
                 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
                 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
                 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
                 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
                 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
                 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
                 * | N yrs ... N yrs 3 months                                          | about N years       |
                 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
                 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
                 *
                 * With `options.includeSeconds == true`:
                 * | Distance between dates | Result               |
                 * |------------------------|----------------------|
                 * | 0 secs ... 5 secs      | less than 5 seconds  |
                 * | 5 secs ... 10 secs     | less than 10 seconds |
                 * | 10 secs ... 20 secs    | less than 20 seconds |
                 * | 20 secs ... 40 secs    | half a minute        |
                 * | 40 secs ... 60 secs    | less than a minute   |
                 * | 60 secs ... 90 secs    | 1 minute             |
                 *
                 * @param {Date|String|Number} dateToCompare - the date to compare with
                 * @param {Date|String|Number} date - the other date
                 * @param {Object} [options] - the object with options
                 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
                 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
                 * @param {Object} [options.locale=enLocale] - the locale object
                 * @returns {String} the distance in words
                 *
                 * @example
                 * // What is the distance between 2 July 2014 and 1 January 2015?
                 * var result = distanceInWords(
                 *   new Date(2014, 6, 2),
                 *   new Date(2015, 0, 1)
                 * )
                 * //=> '6 months'
                 *
                 * @example
                 * // What is the distance between 1 January 2015 00:00:15
                 * // and 1 January 2015 00:00:00, including seconds?
                 * var result = distanceInWords(
                 *   new Date(2015, 0, 1, 0, 0, 15),
                 *   new Date(2015, 0, 1, 0, 0, 0),
                 *   {includeSeconds: true}
                 * )
                 * //=> 'less than 20 seconds'
                 *
                 * @example
                 * // What is the distance from 1 January 2016
                 * // to 1 January 2015, with a suffix?
                 * var result = distanceInWords(
                 *   new Date(2016, 0, 1),
                 *   new Date(2015, 0, 1),
                 *   {addSuffix: true}
                 * )
                 * //=> 'about 1 year ago'
                 *
                 * @example
                 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
                 * var eoLocale = require('date-fns/locale/eo')
                 * var result = distanceInWords(
                 *   new Date(2016, 7, 1),
                 *   new Date(2015, 0, 1),
                 *   {locale: eoLocale}
                 * )
                 * //=> 'pli ol 1 jaro'
                 */
                function distanceInWords(dirtyDateToCompare, dirtyDate, dirtyOptions) {
                    var options = dirtyOptions || {}

                    var comparison = compareDesc(dirtyDateToCompare, dirtyDate)

                    var locale = options.locale
                    var localize = enLocale.distanceInWords.localize
                    if (locale && locale.distanceInWords && locale.distanceInWords.localize) {
                        localize = locale.distanceInWords.localize
                    }

                    var localizeOptions = {
                        addSuffix: Boolean(options.addSuffix),
                        comparison: comparison
                    }

                    var dateLeft, dateRight
                    if (comparison > 0) {
                        dateLeft = parse(dirtyDateToCompare)
                        dateRight = parse(dirtyDate)
                    } else {
                        dateLeft = parse(dirtyDate)
                        dateRight = parse(dirtyDateToCompare)
                    }

                    var seconds = differenceInSeconds(dateRight, dateLeft)
                    var offset = dateRight.getTimezoneOffset() - dateLeft.getTimezoneOffset()
                    var minutes = Math.round(seconds / 60) - offset
                    var months

                    // 0 up to 2 mins
                    if (minutes < 2) {
                        if (options.includeSeconds) {
                            if (seconds < 5) {
                                return localize('lessThanXSeconds', 5, localizeOptions)
                            } else if (seconds < 10) {
                                return localize('lessThanXSeconds', 10, localizeOptions)
                            } else if (seconds < 20) {
                                return localize('lessThanXSeconds', 20, localizeOptions)
                            } else if (seconds < 40) {
                                return localize('halfAMinute', null, localizeOptions)
                            } else if (seconds < 60) {
                                return localize('lessThanXMinutes', 1, localizeOptions)
                            } else {
                                return localize('xMinutes', 1, localizeOptions)
                            }
                        } else {
                            if (minutes === 0) {
                                return localize('lessThanXMinutes', 1, localizeOptions)
                            } else {
                                return localize('xMinutes', minutes, localizeOptions)
                            }
                        }

                        // 2 mins up to 0.75 hrs
                    } else if (minutes < 45) {
                        return localize('xMinutes', minutes, localizeOptions)

                        // 0.75 hrs up to 1.5 hrs
                    } else if (minutes < 90) {
                        return localize('aboutXHours', 1, localizeOptions)

                        // 1.5 hrs up to 24 hrs
                    } else if (minutes < MINUTES_IN_DAY) {
                        var hours = Math.round(minutes / 60)
                        return localize('aboutXHours', hours, localizeOptions)

                        // 1 day up to 1.75 days
                    } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
                        return localize('xDays', 1, localizeOptions)

                        // 1.75 days up to 30 days
                    } else if (minutes < MINUTES_IN_MONTH) {
                        var days = Math.round(minutes / MINUTES_IN_DAY)
                        return localize('xDays', days, localizeOptions)

                        // 1 month up to 2 months
                    } else if (minutes < MINUTES_IN_TWO_MONTHS) {
                        months = Math.round(minutes / MINUTES_IN_MONTH)
                        return localize('aboutXMonths', months, localizeOptions)
                    }

                    months = differenceInMonths(dateRight, dateLeft)

                    // 2 months up to 12 months
                    if (months < 12) {
                        var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH)
                        return localize('xMonths', nearestMonth, localizeOptions)

                        // 1 year up to max Date
                    } else {
                        var monthsSinceStartOfYear = months % 12
                        var years = Math.floor(months / 12)

                        // N years up to 1 years 3 months
                        if (monthsSinceStartOfYear < 3) {
                            return localize('aboutXYears', years, localizeOptions)

                            // N years 3 months up to N years 9 months
                        } else if (monthsSinceStartOfYear < 9) {
                            return localize('overXYears', years, localizeOptions)

                            // N years 9 months up to N year 12 months
                        } else {
                            return localize('almostXYears', years + 1, localizeOptions)
                        }
                    }
                }

                module.exports = distanceInWords


                /***/
            }),
            /* 43 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'less than a second',
                            other: 'less than {{count}} seconds'
                        },

                        xSeconds: {
                            one: '1 second',
                            other: '{{count}} seconds'
                        },

                        halfAMinute: 'half a minute',

                        lessThanXMinutes: {
                            one: 'less than a minute',
                            other: 'less than {{count}} minutes'
                        },

                        xMinutes: {
                            one: '1 minute',
                            other: '{{count}} minutes'
                        },

                        aboutXHours: {
                            one: 'about 1 hour',
                            other: 'about {{count}} hours'
                        },

                        xHours: {
                            one: '1 hour',
                            other: '{{count}} hours'
                        },

                        xDays: {
                            one: '1 day',
                            other: '{{count}} days'
                        },

                        aboutXMonths: {
                            one: 'about 1 month',
                            other: 'about {{count}} months'
                        },

                        xMonths: {
                            one: '1 month',
                            other: '{{count}} months'
                        },

                        aboutXYears: {
                            one: 'about 1 year',
                            other: 'about {{count}} years'
                        },

                        xYears: {
                            one: '1 year',
                            other: '{{count}} years'
                        },

                        overXYears: {
                            one: 'over 1 year',
                            other: 'over {{count}} years'
                        },

                        almostXYears: {
                            one: 'almost 1 year',
                            other: 'almost {{count}} years'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'in ' + result
                            } else {
                                return result + ' ago'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 44 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    // Note: in English, the names of days of the week and months are capitalized.
                    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
                    // Generally, formatted dates should look like they are in the middle of a sentence,
                    // e.g. in Spanish language the weekdays and months should be in the lowercase.
                    var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                    var weekdays2char = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
                    var weekdays3char = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                    var weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    var rem100 = number % 100
                    if (rem100 > 20 || rem100 < 10) {
                        switch (rem100 % 10) {
                            case 1:
                                return number + 'st'
                            case 2:
                                return number + 'nd'
                            case 3:
                                return number + 'rd'
                        }
                    }
                    return number + 'th'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 45 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Week Helpers
                 * @summary Return the end of a week for the given date.
                 *
                 * @description
                 * Return the end of a week for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @param {Object} [options] - the object with options
                 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
                 * @returns {Date} the end of a week
                 *
                 * @example
                 * // The end of a week for 2 September 2014 11:55:00:
                 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Sat Sep 06 2014 23:59:59.999
                 *
                 * @example
                 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
                 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
                 * //=> Sun Sep 07 2014 23:59:59.999
                 */
                function endOfWeek(dirtyDate, dirtyOptions) {
                    var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0

                    var date = parse(dirtyDate)
                    var day = date.getDay()
                    var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn)

                    date.setDate(date.getDate() + diff)
                    date.setHours(23, 59, 59, 999)
                    return date
                }

                module.exports = endOfWeek


                /***/
            }),
            /* 46 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Month Helpers
                 * @summary Return the end of a month for the given date.
                 *
                 * @description
                 * Return the end of a month for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the end of a month
                 *
                 * @example
                 * // The end of a month for 2 September 2014 11:55:00:
                 * var result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Tue Sep 30 2014 23:59:59.999
                 */
                function endOfMonth(dirtyDate) {
                    var date = parse(dirtyDate)
                    var month = date.getMonth()
                    date.setFullYear(date.getFullYear(), month + 1, 0)
                    date.setHours(23, 59, 59, 999)
                    return date
                }

                module.exports = endOfMonth


                /***/
            }),
            /* 47 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var startOfYear = __webpack_require__(48)
                var differenceInCalendarDays = __webpack_require__(12)

                /**
                 * @category Day Helpers
                 * @summary Get the day of the year of the given date.
                 *
                 * @description
                 * Get the day of the year of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the day of year
                 *
                 * @example
                 * // Which day of the year is 2 July 2014?
                 * var result = getDayOfYear(new Date(2014, 6, 2))
                 * //=> 183
                 */
                function getDayOfYear(dirtyDate) {
                    var date = parse(dirtyDate)
                    var diff = differenceInCalendarDays(date, startOfYear(date))
                    var dayOfYear = diff + 1
                    return dayOfYear
                }

                module.exports = getDayOfYear


                /***/
            }),
            /* 48 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Year Helpers
                 * @summary Return the start of a year for the given date.
                 *
                 * @description
                 * Return the start of a year for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the start of a year
                 *
                 * @example
                 * // The start of a year for 2 September 2014 11:55:00:
                 * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
                 * //=> Wed Jan 01 2014 00:00:00
                 */
                function startOfYear(dirtyDate) {
                    var cleanDate = parse(dirtyDate)
                    var date = new Date(0)
                    date.setFullYear(cleanDate.getFullYear(), 0, 1)
                    date.setHours(0, 0, 0, 0)
                    return date
                }

                module.exports = startOfYear


                /***/
            }),
            /* 49 */
            /***/ (function (module, exports, __webpack_require__) {

                var isDate = __webpack_require__(19)

                /**
                 * @category Common Helpers
                 * @summary Is the given date valid?
                 *
                 * @description
                 * Returns false if argument is Invalid Date and true otherwise.
                 * Invalid Date is a Date, whose time value is NaN.
                 *
                 * Time value of Date: http://es5.github.io/#x15.9.1.1
                 *
                 * @param {Date} date - the date to check
                 * @returns {Boolean} the date is valid
                 * @throws {TypeError} argument must be an instance of Date
                 *
                 * @example
                 * // For the valid date:
                 * var result = isValid(new Date(2014, 1, 31))
                 * //=> true
                 *
                 * @example
                 * // For the invalid date:
                 * var result = isValid(new Date(''))
                 * //=> false
                 */
                function isValid(dirtyDate) {
                    if (isDate(dirtyDate)) {
                        return !isNaN(dirtyDate)
                    } else {
                        throw new TypeError(toString.call(dirtyDate) + ' is not an instance of Date')
                    }
                }

                module.exports = isValid


                /***/
            }),
            /* 50 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Year Helpers
                 * @summary Is the given date in the leap year?
                 *
                 * @description
                 * Is the given date in the leap year?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is in the leap year
                 *
                 * @example
                 * // Is 1 September 2012 in the leap year?
                 * var result = isLeapYear(new Date(2012, 8, 1))
                 * //=> true
                 */
                function isLeapYear(dirtyDate) {
                    var date = parse(dirtyDate)
                    var year = date.getFullYear()
                    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0
                }

                module.exports = isLeapYear


                /***/
            }),
            /* 51 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Weekday Helpers
                 * @summary Get the day of the ISO week of the given date.
                 *
                 * @description
                 * Get the day of the ISO week of the given date,
                 * which is 7 for Sunday, 1 for Monday etc.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the day of ISO week
                 *
                 * @example
                 * // Which day of the ISO week is 26 February 2012?
                 * var result = getISODay(new Date(2012, 1, 26))
                 * //=> 7
                 */
                function getISODay(dirtyDate) {
                    var date = parse(dirtyDate)
                    var day = date.getDay()

                    if (day === 0) {
                        day = 7
                    }

                    return day
                }

                module.exports = getISODay


                /***/
            }),
            /* 52 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfHour = __webpack_require__(53)

                /**
                 * @category Hour Helpers
                 * @summary Are the given dates in the same hour?
                 *
                 * @description
                 * Are the given dates in the same hour?
                 *
                 * @param {Date|String|Number} dateLeft - the first date to check
                 * @param {Date|String|Number} dateRight - the second date to check
                 * @returns {Boolean} the dates are in the same hour
                 *
                 * @example
                 * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
                 * var result = isSameHour(
                 *   new Date(2014, 8, 4, 6, 0),
                 *   new Date(2014, 8, 4, 6, 30)
                 * )
                 * //=> true
                 */
                function isSameHour(dirtyDateLeft, dirtyDateRight) {
                    var dateLeftStartOfHour = startOfHour(dirtyDateLeft)
                    var dateRightStartOfHour = startOfHour(dirtyDateRight)

                    return dateLeftStartOfHour.getTime() === dateRightStartOfHour.getTime()
                }

                module.exports = isSameHour


                /***/
            }),
            /* 53 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Hour Helpers
                 * @summary Return the start of an hour for the given date.
                 *
                 * @description
                 * Return the start of an hour for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the start of an hour
                 *
                 * @example
                 * // The start of an hour for 2 September 2014 11:55:00:
                 * var result = startOfHour(new Date(2014, 8, 2, 11, 55))
                 * //=> Tue Sep 02 2014 11:00:00
                 */
                function startOfHour(dirtyDate) {
                    var date = parse(dirtyDate)
                    date.setMinutes(0, 0, 0)
                    return date
                }

                module.exports = startOfHour


                /***/
            }),
            /* 54 */
            /***/ (function (module, exports, __webpack_require__) {

                var isSameWeek = __webpack_require__(27)

                /**
                 * @category ISO Week Helpers
                 * @summary Are the given dates in the same ISO week?
                 *
                 * @description
                 * Are the given dates in the same ISO week?
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} dateLeft - the first date to check
                 * @param {Date|String|Number} dateRight - the second date to check
                 * @returns {Boolean} the dates are in the same ISO week
                 *
                 * @example
                 * // Are 1 September 2014 and 7 September 2014 in the same ISO week?
                 * var result = isSameISOWeek(
                 *   new Date(2014, 8, 1),
                 *   new Date(2014, 8, 7)
                 * )
                 * //=> true
                 */
                function isSameISOWeek(dirtyDateLeft, dirtyDateRight) {
                    return isSameWeek(dirtyDateLeft, dirtyDateRight, {weekStartsOn: 1})
                }

                module.exports = isSameISOWeek


                /***/
            }),
            /* 55 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfISOYear = __webpack_require__(9)

                /**
                 * @category ISO Week-Numbering Year Helpers
                 * @summary Are the given dates in the same ISO week-numbering year?
                 *
                 * @description
                 * Are the given dates in the same ISO week-numbering year?
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} dateLeft - the first date to check
                 * @param {Date|String|Number} dateRight - the second date to check
                 * @returns {Boolean} the dates are in the same ISO week-numbering year
                 *
                 * @example
                 * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?
                 * var result = isSameISOYear(
                 *   new Date(2003, 11, 29),
                 *   new Date(2005, 0, 2)
                 * )
                 * //=> true
                 */
                function isSameISOYear(dirtyDateLeft, dirtyDateRight) {
                    var dateLeftStartOfYear = startOfISOYear(dirtyDateLeft)
                    var dateRightStartOfYear = startOfISOYear(dirtyDateRight)

                    return dateLeftStartOfYear.getTime() === dateRightStartOfYear.getTime()
                }

                module.exports = isSameISOYear


                /***/
            }),
            /* 56 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfMinute = __webpack_require__(57)

                /**
                 * @category Minute Helpers
                 * @summary Are the given dates in the same minute?
                 *
                 * @description
                 * Are the given dates in the same minute?
                 *
                 * @param {Date|String|Number} dateLeft - the first date to check
                 * @param {Date|String|Number} dateRight - the second date to check
                 * @returns {Boolean} the dates are in the same minute
                 *
                 * @example
                 * // Are 4 September 2014 06:30:00 and 4 September 2014 06:30:15
                 * // in the same minute?
                 * var result = isSameMinute(
                 *   new Date(2014, 8, 4, 6, 30),
                 *   new Date(2014, 8, 4, 6, 30, 15)
                 * )
                 * //=> true
                 */
                function isSameMinute(dirtyDateLeft, dirtyDateRight) {
                    var dateLeftStartOfMinute = startOfMinute(dirtyDateLeft)
                    var dateRightStartOfMinute = startOfMinute(dirtyDateRight)

                    return dateLeftStartOfMinute.getTime() === dateRightStartOfMinute.getTime()
                }

                module.exports = isSameMinute


                /***/
            }),
            /* 57 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Minute Helpers
                 * @summary Return the start of a minute for the given date.
                 *
                 * @description
                 * Return the start of a minute for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the start of a minute
                 *
                 * @example
                 * // The start of a minute for 1 December 2014 22:15:45.400:
                 * var result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
                 * //=> Mon Dec 01 2014 22:15:00
                 */
                function startOfMinute(dirtyDate) {
                    var date = parse(dirtyDate)
                    date.setSeconds(0, 0)
                    return date
                }

                module.exports = startOfMinute


                /***/
            }),
            /* 58 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Month Helpers
                 * @summary Are the given dates in the same month?
                 *
                 * @description
                 * Are the given dates in the same month?
                 *
                 * @param {Date|String|Number} dateLeft - the first date to check
                 * @param {Date|String|Number} dateRight - the second date to check
                 * @returns {Boolean} the dates are in the same month
                 *
                 * @example
                 * // Are 2 September 2014 and 25 September 2014 in the same month?
                 * var result = isSameMonth(
                 *   new Date(2014, 8, 2),
                 *   new Date(2014, 8, 25)
                 * )
                 * //=> true
                 */
                function isSameMonth(dirtyDateLeft, dirtyDateRight) {
                    var dateLeft = parse(dirtyDateLeft)
                    var dateRight = parse(dirtyDateRight)
                    return dateLeft.getFullYear() === dateRight.getFullYear() &&
                        dateLeft.getMonth() === dateRight.getMonth()
                }

                module.exports = isSameMonth


                /***/
            }),
            /* 59 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfQuarter = __webpack_require__(60)

                /**
                 * @category Quarter Helpers
                 * @summary Are the given dates in the same year quarter?
                 *
                 * @description
                 * Are the given dates in the same year quarter?
                 *
                 * @param {Date|String|Number} dateLeft - the first date to check
                 * @param {Date|String|Number} dateRight - the second date to check
                 * @returns {Boolean} the dates are in the same quarter
                 *
                 * @example
                 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
                 * var result = isSameQuarter(
                 *   new Date(2014, 0, 1),
                 *   new Date(2014, 2, 8)
                 * )
                 * //=> true
                 */
                function isSameQuarter(dirtyDateLeft, dirtyDateRight) {
                    var dateLeftStartOfQuarter = startOfQuarter(dirtyDateLeft)
                    var dateRightStartOfQuarter = startOfQuarter(dirtyDateRight)

                    return dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime()
                }

                module.exports = isSameQuarter


                /***/
            }),
            /* 60 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Quarter Helpers
                 * @summary Return the start of a year quarter for the given date.
                 *
                 * @description
                 * Return the start of a year quarter for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the start of a quarter
                 *
                 * @example
                 * // The start of a quarter for 2 September 2014 11:55:00:
                 * var result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Tue Jul 01 2014 00:00:00
                 */
                function startOfQuarter(dirtyDate) {
                    var date = parse(dirtyDate)
                    var currentMonth = date.getMonth()
                    var month = currentMonth - currentMonth % 3
                    date.setMonth(month, 1)
                    date.setHours(0, 0, 0, 0)
                    return date
                }

                module.exports = startOfQuarter


                /***/
            }),
            /* 61 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfSecond = __webpack_require__(62)

                /**
                 * @category Second Helpers
                 * @summary Are the given dates in the same second?
                 *
                 * @description
                 * Are the given dates in the same second?
                 *
                 * @param {Date|String|Number} dateLeft - the first date to check
                 * @param {Date|String|Number} dateRight - the second date to check
                 * @returns {Boolean} the dates are in the same second
                 *
                 * @example
                 * // Are 4 September 2014 06:30:15.000 and 4 September 2014 06:30.15.500
                 * // in the same second?
                 * var result = isSameSecond(
                 *   new Date(2014, 8, 4, 6, 30, 15),
                 *   new Date(2014, 8, 4, 6, 30, 15, 500)
                 * )
                 * //=> true
                 */
                function isSameSecond(dirtyDateLeft, dirtyDateRight) {
                    var dateLeftStartOfSecond = startOfSecond(dirtyDateLeft)
                    var dateRightStartOfSecond = startOfSecond(dirtyDateRight)

                    return dateLeftStartOfSecond.getTime() === dateRightStartOfSecond.getTime()
                }

                module.exports = isSameSecond


                /***/
            }),
            /* 62 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Second Helpers
                 * @summary Return the start of a second for the given date.
                 *
                 * @description
                 * Return the start of a second for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the start of a second
                 *
                 * @example
                 * // The start of a second for 1 December 2014 22:15:45.400:
                 * var result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
                 * //=> Mon Dec 01 2014 22:15:45.000
                 */
                function startOfSecond(dirtyDate) {
                    var date = parse(dirtyDate)
                    date.setMilliseconds(0)
                    return date
                }

                module.exports = startOfSecond


                /***/
            }),
            /* 63 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Year Helpers
                 * @summary Are the given dates in the same year?
                 *
                 * @description
                 * Are the given dates in the same year?
                 *
                 * @param {Date|String|Number} dateLeft - the first date to check
                 * @param {Date|String|Number} dateRight - the second date to check
                 * @returns {Boolean} the dates are in the same year
                 *
                 * @example
                 * // Are 2 September 2014 and 25 September 2014 in the same year?
                 * var result = isSameYear(
                 *   new Date(2014, 8, 2),
                 *   new Date(2014, 8, 25)
                 * )
                 * //=> true
                 */
                function isSameYear(dirtyDateLeft, dirtyDateRight) {
                    var dateLeft = parse(dirtyDateLeft)
                    var dateRight = parse(dirtyDateRight)
                    return dateLeft.getFullYear() === dateRight.getFullYear()
                }

                module.exports = isSameYear


                /***/
            }),
            /* 64 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Week Helpers
                 * @summary Return the last day of a week for the given date.
                 *
                 * @description
                 * Return the last day of a week for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @param {Object} [options] - the object with options
                 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
                 * @returns {Date} the last day of a week
                 *
                 * @example
                 * // The last day of a week for 2 September 2014 11:55:00:
                 * var result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Sat Sep 06 2014 00:00:00
                 *
                 * @example
                 * // If the week starts on Monday, the last day of the week for 2 September 2014 11:55:00:
                 * var result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
                 * //=> Sun Sep 07 2014 00:00:00
                 */
                function lastDayOfWeek(dirtyDate, dirtyOptions) {
                    var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0

                    var date = parse(dirtyDate)
                    var day = date.getDay()
                    var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn)

                    date.setHours(0, 0, 0, 0)
                    date.setDate(date.getDate() + diff)
                    return date
                }

                module.exports = lastDayOfWeek


                /***/
            }),
            /* 65 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var getDaysInMonth = __webpack_require__(20)

                /**
                 * @category Month Helpers
                 * @summary Set the month to the given date.
                 *
                 * @description
                 * Set the month to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} month - the month of the new date
                 * @returns {Date} the new date with the month setted
                 *
                 * @example
                 * // Set February to 1 September 2014:
                 * var result = setMonth(new Date(2014, 8, 1), 1)
                 * //=> Sat Feb 01 2014 00:00:00
                 */
                function setMonth(dirtyDate, dirtyMonth) {
                    var date = parse(dirtyDate)
                    var month = Number(dirtyMonth)
                    var year = date.getFullYear()
                    var day = date.getDate()

                    var dateWithDesiredMonth = new Date(0)
                    dateWithDesiredMonth.setFullYear(year, month, 15)
                    dateWithDesiredMonth.setHours(0, 0, 0, 0)
                    var daysInMonth = getDaysInMonth(dateWithDesiredMonth)
                    // Set the last day of the new month
                    // if the original date was the last day of the longer month
                    date.setMonth(month, Math.min(day, daysInMonth))
                    return date
                }

                module.exports = setMonth


                /***/
            }),
            /* 66 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Arabic (ar)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        var num = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'],
                            map = {'٠': 0, '١': 1, '٢': 2, '٣': 3, '٤': 4, '٥': 5, '٦': 6, '٧': 7, '٨': 8, '٩': 9};

                        date.setLocales('ar', {
                            MMMM: ['كانون الثاني يناير', 'شباط فبراير', 'آذار مارس', 'نيسان أبريل', 'أيار مايو', 'حزيران يونيو', 'تموز يوليو', 'آب أغسطس', 'أيلول سبتمبر', 'تشرين الأول أكتوبر', 'تشرين الثاني نوفمبر', 'كانون الأول ديسمبر'],
                            MMM: ['كانون الثاني يناير', 'شباط فبراير', 'آذار مارس', 'نيسان أبريل', 'أيار مايو', 'حزيران يونيو', 'تموز يوليو', 'آب أغسطس', 'أيلول سبتمبر', 'تشرين الأول أكتوبر', 'تشرين الثاني نوفمبر', 'كانون الأول ديسمبر'],
                            dddd: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
                            ddd: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
                            dd: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
                            A: ['ص', 'م'],
                            formatter: {
                                post: function (str) {
                                    return str.replace(/\d/g, function (i) {
                                        return num[i | 0];
                                    });
                                }
                            },
                            parser: {
                                pre: function (str) {
                                    return str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (i) {
                                        return '' + map[i];
                                    });
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 67 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Azerbaijani (az)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('az', {
                            MMMM: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'],
                            MMM: ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avq', 'sen', 'okt', 'noy', 'dek'],
                            dddd: ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'],
                            ddd: ['Baz', 'BzE', 'ÇAx', 'Çər', 'CAx', 'Cüm', 'Şən'],
                            dd: ['Bz', 'BE', 'ÇA', 'Çə', 'CA', 'Cü', 'Şə'],
                            A: ['gecə', 'səhər', 'gündüz', 'axşam'],
                            formatter: {
                                A: function (d) {
                                    var h = d.getHours();
                                    if (h < 4) {
                                        return this.A[0];   // gecə
                                    } else if (h < 12) {
                                        return this.A[1];   // səhər
                                    } else if (h < 17) {
                                        return this.A[2];   // gündüz
                                    }
                                    return this.A[3];       // axşam
                                }
                            },
                            parser: {
                                h: function (h, a) {
                                    if (a < 2) {
                                        return h;               // gecə, səhər
                                    }
                                    return h > 11 ? h : h + 12; // gündüz, axşam
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 68 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Bengali (bn)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('bn', {
                            MMMM: ['জানুয়ারী', 'ফেবুয়ারী', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'অগাস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'],
                            MMM: ['জানু', 'ফেব', 'মার্চ', 'এপর', 'মে', 'জুন', 'জুল', 'অগ', 'সেপ্ট', 'অক্টো', 'নভ', 'ডিসেম্'],
                            dddd: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পত্তিবার', 'শুক্রবার', 'শনিবার'],
                            ddd: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পত্তি', 'শুক্র', 'শনি'],
                            dd: ['রব', 'সম', 'মঙ্গ', 'বু', 'ব্রিহ', 'শু', 'শনি'],
                            A: ['রাত', 'সকাল', 'দুপুর', 'বিকাল'],
                            formatter: {
                                A: function (d) {
                                    var h = d.getHours();
                                    if (h < 4) {
                                        return this.A[0];   // রাত
                                    } else if (h < 10) {
                                        return this.A[1];   // সকাল
                                    } else if (h < 17) {
                                        return this.A[2];   // দুপুর
                                    } else if (h < 20) {
                                        return this.A[3];   // বিকাল
                                    }
                                    return this.A[0];       // রাত
                                }
                            },
                            parser: {
                                h: function (h, a) {
                                    if (a < 1) {
                                        return h < 4 || h > 11 ? h : h + 12;    // রাত
                                    } else if (a < 2) {
                                        return h;                               // সকাল
                                    } else if (a < 3) {
                                        return h > 9 ? h : h + 12;              // দুপুর
                                    }
                                    return h + 12;                              // বিকাল
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 69 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Czech (cs)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('cs', {
                            MMMM: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
                            MMM: ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
                            dddd: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
                            ddd: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
                            dd: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so']
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 70 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve German (de)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('de', {
                            MMMM: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                            MMM: ['Jan.', 'Febr.', 'Mrz.', 'Apr.', 'Mai', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'],
                            dddd: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                            ddd: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
                            dd: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                            A: ['Uhr nachmittags', 'Uhr morgens']
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 71 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Greek (el)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('el', {
                            MMMM: {
                                nominative: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
                                genitive: ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου']
                            },
                            MMM: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'],
                            dddd: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
                            ddd: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'],
                            dd: ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σα'],
                            A: ['πμ', 'μμ'],
                            formatter: {
                                MMMM: function (d, formatString) {
                                    return this.MMMM[/D.*MMMM/.test(formatString) ? 'genitive' : 'nominative'][d.getMonth()];
                                },
                                hh: function (d) {
                                    return ('0' + d.getHours() % 12).slice(-2);
                                },
                                h: function (d) {
                                    return d.getHours() % 12;
                                }
                            },
                            parser: {
                                MMMM: function (str, formatString) {
                                    return this.parser.find(this.MMMM[/D.*MMMM/.test(formatString) ? 'genitive' : 'nominative'], str);
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 72 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Spanish (es)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('es', {
                            MMMM: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                            MMM: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
                            dddd: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                            ddd: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
                            dd: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
                            A: ['de la mañana', 'de la tarde', 'de la noche'],
                            formatter: {
                                A: function (d) {
                                    var h = d.getHours();
                                    if (h < 12) {
                                        return this.A[0];   // de la mañana
                                    } else if (h < 19) {
                                        return this.A[1];   // de la tarde
                                    }
                                    return this.A[2];       // de la noche
                                }
                            },
                            parser: {
                                h: function (h, a) {
                                    if (a < 1) {
                                        return h;   // de la mañana
                                    }
                                    return h > 11 ? h : h + 12; // de la tarde, de la noche
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 73 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Persian (fa)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        var num = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
                            map = {'۰': 0, '۱': 1, '۲': 2, '۳': 3, '۴': 4, '۵': 5, '۶': 6, '۷': 7, '۸': 8, '۹': 9};

                        date.setLocales('fa', {
                            MMMM: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
                            MMM: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
                            dddd: ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
                            ddd: ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
                            dd: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
                            A: ['قبل از ظهر', 'بعد از ظهر'],
                            formatter: {
                                post: function (str) {
                                    return str.replace(/\d/g, function (i) {
                                        return num[i | 0];
                                    });
                                }
                            },
                            parser: {
                                pre: function (str) {
                                    return str.replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (i) {
                                        return '' + map[i];
                                    });
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 74 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve French (fr)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('fr', {
                            MMMM: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
                            MMM: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
                            dddd: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
                            ddd: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
                            dd: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
                            A: ['matin', 'l\'après-midi']
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 75 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Hindi (hi)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('hi', {
                            MMMM: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर'],
                            MMM: ['जन.', 'फ़र.', 'मार्च', 'अप्रै.', 'मई', 'जून', 'जुल.', 'अग.', 'सित.', 'अक्टू.', 'नव.', 'दिस.'],
                            dddd: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरूवार', 'शुक्रवार', 'शनिवार'],
                            ddd: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरू', 'शुक्र', 'शनि'],
                            dd: ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'],
                            A: ['रात', 'सुबह', 'दोपहर', 'शाम'],
                            formatter: {
                                A: function (d) {
                                    var h = d.getHours();
                                    if (h < 4) {
                                        return this.A[0];   // रात
                                    } else if (h < 10) {
                                        return this.A[1];   // सुबह
                                    } else if (h < 17) {
                                        return this.A[2];   // दोपहर
                                    } else if (h < 20) {
                                        return this.A[3];   // शाम
                                    }
                                    return this.A[0];       // रात
                                }
                            },
                            parser: {
                                h: function (h, a) {
                                    if (a < 1) {
                                        return h < 4 || h > 11 ? h : h + 12;    // रात
                                    } else if (a < 2) {
                                        return h;                               // सुबह
                                    } else if (a < 3) {
                                        return h > 9 ? h : h + 12;              // दोपहर
                                    }
                                    return h + 12;                              // शाम
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 76 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Hungarian (hu)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('hu', {
                            MMMM: ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'],
                            MMM: ['jan', 'feb', 'márc', 'ápr', 'máj', 'jún', 'júl', 'aug', 'szept', 'okt', 'nov', 'dec'],
                            dddd: ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat'],
                            ddd: ['vas', 'hét', 'kedd', 'sze', 'csüt', 'pén', 'szo'],
                            dd: ['v', 'h', 'k', 'sze', 'cs', 'p', 'szo'],
                            A: ['de', 'du']
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 77 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Indonesian (id)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('id', {
                            MMMM: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
                            MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
                            dddd: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
                            ddd: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
                            dd: ['Mg', 'Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb'],
                            A: ['pagi', 'siang', 'sore', 'malam'],
                            formatter: {
                                A: function (d) {
                                    var h = d.getHours();
                                    if (h < 11) {
                                        return this.A[0];   // pagi
                                    } else if (h < 15) {
                                        return this.A[1];   // siang
                                    } else if (h < 19) {
                                        return this.A[2];   // sore
                                    }
                                    return this.A[3];       // malam
                                }
                            },
                            parser: {
                                h: function (h, a) {
                                    if (a < 1) {
                                        return h;                       // pagi
                                    } else if (a < 2) {
                                        return h >= 11 ? h : h + 12;    // siang
                                    }
                                    return h + 12;                      // sore, malam
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 78 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Italian (it)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('it', {
                            MMMM: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
                            MMM: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
                            dddd: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
                            ddd: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
                            dd: ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'],
                            A: ['di mattina', 'di pomerrigio']
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 79 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Japanese (ja)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('ja', {
                            MMMM: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            MMM: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            dddd: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
                            ddd: ['日', '月', '火', '水', '木', '金', '土'],
                            dd: ['日', '月', '火', '水', '木', '金', '土'],
                            A: ['午前', '午後'],
                            formatter: {
                                hh: function (d) {
                                    return ('0' + d.getHours() % 12).slice(-2);
                                },
                                h: function (d) {
                                    return d.getHours() % 12;
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 80 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Javanese (jv)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('jv', {
                            MMMM: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Nopember', 'Desember'],
                            MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nop', 'Des'],
                            dddd: ['Minggu', 'Senen', 'Seloso', 'Rebu', 'Kemis', 'Jemuwah', 'Septu'],
                            ddd: ['Min', 'Sen', 'Sel', 'Reb', 'Kem', 'Jem', 'Sep'],
                            dd: ['Mg', 'Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sp'],
                            A: ['enjing', 'siyang', 'sonten', 'ndalu'],
                            formatter: {
                                A: function (d) {
                                    var h = d.getHours();
                                    if (h < 11) {
                                        return this.A[0];   // enjing
                                    } else if (h < 15) {
                                        return this.A[1];   // siyang
                                    } else if (h < 19) {
                                        return this.A[2];   // sonten
                                    }
                                    return this.A[3];       // ndalu
                                }
                            },
                            parser: {
                                h: function (h, a) {
                                    if (a < 1) {
                                        return h;                       // enjing
                                    } else if (a < 2) {
                                        return h >= 11 ? h : h + 12;    // siyang
                                    }
                                    return h + 12;                      // sonten, ndalu
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 81 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Korean (ko)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('ko', {
                            MMMM: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                            MMM: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                            dddd: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
                            ddd: ['일', '월', '화', '수', '목', '금', '토'],
                            dd: ['일', '월', '화', '수', '목', '금', '토'],
                            A: ['오전', '오후']
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 82 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Burmese (my)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        var num = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'],
                            map = {'၀': 0, '၁': 1, '၂': 2, '၃': 3, '၄': 4, '၅': 5, '၆': 6, '၇': 7, '၈': 8, '၉': 9};

                        date.setLocales('my', {
                            MMMM: ['ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်', 'ဇူလိုင်', 'သြဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ'],
                            MMM: ['ဇန်', 'ဖေ', 'မတ်', 'ပြီ', 'မေ', 'ဇွန်', 'လိုင်', 'သြ', 'စက်', 'အောက်', 'နို', 'ဒီ'],
                            dddd: ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'],
                            ddd: ['နွေ', 'လာ', 'ဂါ', 'ဟူး', 'ကြာ', 'သော', 'နေ'],
                            dd: ['နွေ', 'လာ', 'ဂါ', 'ဟူး', 'ကြာ', 'သော', 'နေ'],
                            formatter: {
                                post: function (str) {
                                    return str.replace(/\d/g, function (i) {
                                        return num[i | 0];
                                    });
                                }
                            },
                            parser: {
                                pre: function (str) {
                                    return str.replace(/[၀၁၂၃၄၅၆၇၈၉]/g, function (i) {
                                        return '' + map[i];
                                    });
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 83 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Dutch (nl)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('nl', {
                            MMMM: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
                            MMM: {
                                withdots: ['jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
                                withoutdots: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
                            },
                            dddd: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
                            ddd: ['zo.', 'ma.', 'di.', 'wo.', 'do.', 'vr.', 'za.'],
                            dd: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
                            formatter: {
                                MMM: function (d, formatString) {
                                    return this.MMM[/-MMM-/.test(formatString) ? 'withoutdots' : 'withdots'][d.getMonth()];
                                }
                            },
                            parser: {
                                MMM: function (str, formatString) {
                                    return this.parser.find(this.MMM[/-MMM-/.test(formatString) ? 'withoutdots' : 'withdots'], str);
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 84 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Punjabi (pa-in)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        var num = ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'],
                            map = {'੦': 0, '੧': 1, '੨': 2, '੩': 3, '੪': 4, '੫': 5, '੬': 6, '੭': 7, '੮': 8, '੯': 9};

                        date.setLocales('pa-in', {
                            MMMM: ['ਜਨਵਰੀ', 'ਫ਼ਰਵਰੀ', 'ਮਾਰਚ', 'ਅਪ੍ਰੈਲ', 'ਮਈ', 'ਜੂਨ', 'ਜੁਲਾਈ', 'ਅਗਸਤ', 'ਸਤੰਬਰ', 'ਅਕਤੂਬਰ', 'ਨਵੰਬਰ', 'ਦਸੰਬਰ'],
                            MMM: ['ਜਨਵਰੀ', 'ਫ਼ਰਵਰੀ', 'ਮਾਰਚ', 'ਅਪ੍ਰੈਲ', 'ਮਈ', 'ਜੂਨ', 'ਜੁਲਾਈ', 'ਅਗਸਤ', 'ਸਤੰਬਰ', 'ਅਕਤੂਬਰ', 'ਨਵੰਬਰ', 'ਦਸੰਬਰ'],
                            dddd: ['ਐਤਵਾਰ', 'ਸੋਮਵਾਰ', 'ਮੰਗਲਵਾਰ', 'ਬੁਧਵਾਰ', 'ਵੀਰਵਾਰ', 'ਸ਼ੁੱਕਰਵਾਰ', 'ਸ਼ਨੀਚਰਵਾਰ'],
                            ddd: ['ਐਤ', 'ਸੋਮ', 'ਮੰਗਲ', 'ਬੁਧ', 'ਵੀਰ', 'ਸ਼ੁਕਰ', 'ਸ਼ਨੀ'],
                            dd: ['ਐਤ', 'ਸੋਮ', 'ਮੰਗਲ', 'ਬੁਧ', 'ਵੀਰ', 'ਸ਼ੁਕਰ', 'ਸ਼ਨੀ'],
                            A: ['ਰਾਤ', 'ਸਵੇਰ', 'ਦੁਪਹਿਰ', 'ਸ਼ਾਮ'],
                            formatter: {
                                A: function (d) {
                                    var h = d.getHours();
                                    if (h < 4) {
                                        return this.A[0];   // ਰਾਤ
                                    } else if (h < 10) {
                                        return this.A[1];   // ਸਵੇਰ
                                    } else if (h < 17) {
                                        return this.A[2];   // ਦੁਪਹਿਰ
                                    } else if (h < 20) {
                                        return this.A[3];   // ਸ਼ਾਮ
                                    }
                                    return this.A[0];       // ਰਾਤ
                                },
                                post: function (str) {
                                    return str.replace(/\d/g, function (i) {
                                        return num[i | 0];
                                    });
                                }
                            },
                            parser: {
                                h: function (h, a) {
                                    if (a < 1) {
                                        return h < 4 || h > 11 ? h : h + 12;    // ਰਾਤ
                                    } else if (a < 2) {
                                        return h;                               // ਸਵੇਰ
                                    } else if (a < 3) {
                                        return h >= 10 ? h : h + 12;            // ਦੁਪਹਿਰ
                                    }
                                    return h + 12;                              // ਸ਼ਾਮ
                                },
                                pre: function (str) {
                                    return str.replace(/[੦੧੨੩੪੫੬੭੮੯]/g, function (i) {
                                        return '' + map[i];
                                    });
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 85 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Polish (pl)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('pl', {
                            MMMM: {
                                nominative: ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'],
                                subjective: ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']
                            },
                            MMM: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
                            dddd: ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'],
                            ddd: ['nie', 'pon', 'wt', 'śr', 'czw', 'pt', 'sb'],
                            dd: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
                            formatter: {
                                MMMM: function (d, formatString) {
                                    return this.MMMM[/D MMMM/.test(formatString) ? 'subjective' : 'nominative'][d.getMonth()];
                                }
                            },
                            parser: {
                                MMMM: function (str, formatString) {
                                    return this.parser.find(this.MMMM[/D MMMM/.test(formatString) ? 'subjective' : 'nominative'], str);
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 86 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Portuguese (pt)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('pt', {
                            MMMM: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                            MMM: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                            dddd: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
                            ddd: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
                            dd: ['Dom', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sáb'],
                            A: ['da madrugada', 'da manhã', 'da tarde', 'da noite'],
                            formatter: {
                                A: function (d) {
                                    var h = d.getHours();
                                    if (h < 5) {
                                        return this.A[0];   // da madrugada
                                    } else if (h < 12) {
                                        return this.A[1];   // da manhã
                                    } else if (h < 19) {
                                        return this.A[2];   // da tarde
                                    }
                                    return this.A[3];       // da noite
                                }
                            },
                            parser: {
                                h: function (h, a) {
                                    if (a < 2) {
                                        return h;   // da madrugada, da manhã
                                    }
                                    return h > 11 ? h : h + 12; // da tarde, da noite
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 87 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Romanian (ro)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('ro', {
                            MMMM: ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'],
                            MMM: ['ian.', 'febr.', 'mart.', 'apr.', 'mai', 'iun.', 'iul.', 'aug.', 'sept.', 'oct.', 'nov.', 'dec.'],
                            dddd: ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'],
                            ddd: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
                            dd: ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ']
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 88 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Russian (ru)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('ru', {
                            MMMM: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
                            MMM: ['янв', 'фев', 'мар', 'апр', 'мая', 'июня', 'июля', 'авг', 'сен', 'окт', 'ноя', 'дек'],
                            dddd: ['Воскресенье', 'Понедельник', 'Вторник', 'Среду', 'Четверг', 'Пятницу', 'Субботу'],
                            ddd: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                            dd: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                            A: ['ночи', 'утра', 'дня', 'вечера'],
                            formatter: {
                                A: function (d) {
                                    var h = d.getHours();
                                    if (h < 4) {
                                        return this.A[0];   // ночи
                                    } else if (h < 12) {
                                        return this.A[1];   // утра
                                    } else if (h < 17) {
                                        return this.A[2];   // дня
                                    }
                                    return this.A[3];       // вечера
                                }
                            },
                            parser: {
                                h: function (h, a) {
                                    if (a < 2) {
                                        return h;   // ночи, утра
                                    }
                                    return h > 11 ? h : h + 12; // дня, вечера
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 89 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Serbian (sr)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('sr', {
                            MMMM: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'],
                            MMM: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun', 'jul', 'avg.', 'sep.', 'okt.', 'nov.', 'dec.'],
                            dddd: ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota'],
                            ddd: ['ned.', 'pon.', 'uto.', 'sre.', 'čet.', 'pet.', 'sub.'],
                            dd: ['ne', 'po', 'ut', 'sr', 'če', 'pe', 'su']
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 90 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Thai (th)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('th', {
                            MMMM: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
                            MMM: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
                            dddd: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
                            ddd: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์'],
                            dd: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
                            A: ['ก่อนเที่ยง', 'หลังเที่ยง']
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 91 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Turkish (tr)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('tr', {
                            MMMM: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
                            MMM: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
                            dddd: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
                            ddd: ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'],
                            dd: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct']
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 92 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Ukrainian (uk)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('uk', {
                            MMMM: ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'],
                            MMM: ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'],
                            dddd: {
                                nominative: ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п’ятниця', 'субота'],
                                accusative: ['неділю', 'понеділок', 'вівторок', 'середу', 'четвер', 'п’ятницю', 'суботу'],
                                genitive: ['неділі', 'понеділка', 'вівторка', 'середи', 'четверга', 'п’ятниці', 'суботи']
                            },
                            ddd: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
                            dd: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
                            A: ['ночі', 'ранку', 'дня', 'вечора'],
                            formatter: {
                                A: function (d) {
                                    var h = d.getHours();
                                    if (h < 4) {
                                        return this.A[0];   // ночі
                                    } else if (h < 12) {
                                        return this.A[1];   // ранку
                                    } else if (h < 17) {
                                        return this.A[2];   // дня
                                    }
                                    return this.A[3];       // вечора
                                },
                                dddd: function (d, formatString) {
                                    var type = 'nominative';
                                    if (/(\[[ВвУу]\]) ?dddd/.test(formatString)) {
                                        type = 'accusative';
                                    } else if (/\[?(?:минулої|наступної)? ?\] ?dddd/.test(formatString)) {
                                        type = 'genitive';
                                    }
                                    return this.dddd[type][d.getDay()];
                                }
                            },
                            parser: {
                                h: function (h, a) {
                                    if (a < 2) {
                                        return h;   // ночі, ранку
                                    }
                                    return h > 11 ? h : h + 12; // дня, вечора
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 93 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Uzbek (uz)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('uz', {
                            MMMM: ['январ', 'феврал', 'март', 'апрел', 'май', 'июн', 'июл', 'август', 'сентябр', 'октябр', 'ноябр', 'декабр'],
                            MMM: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
                            dddd: ['Якшанба', 'Душанба', 'Сешанба', 'Чоршанба', 'Пайшанба', 'Жума', 'Шанба'],
                            ddd: ['Якш', 'Душ', 'Сеш', 'Чор', 'Пай', 'Жум', 'Шан'],
                            dd: ['Як', 'Ду', 'Се', 'Чо', 'Па', 'Жу', 'Ша']
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 94 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Vietnamese (vi)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('vi', {
                            MMMM: ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6', 'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'],
                            MMM: ['Th01', 'Th02', 'Th03', 'Th04', 'Th05', 'Th06', 'Th07', 'Th08', 'Th09', 'Th10', 'Th11', 'Th12'],
                            dddd: ['chủ nhật', 'thứ hai', 'thứ ba', 'thứ tư', 'thứ năm', 'thứ sáu', 'thứ bảy'],
                            ddd: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                            dd: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                            A: ['sa', 'ch']
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 95 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Chinese (zh-cn)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('zh-cn', {
                            MMMM: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                            MMM: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            dddd: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                            ddd: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                            dd: ['日', '一', '二', '三', '四', '五', '六'],
                            A: ['凌晨', '早上', '上午', '中午', '下午', '晚上'],
                            formatter: {
                                A: function (d) {
                                    var hm = d.getHours() * 100 + d.getMinutes();
                                    if (hm < 600) {
                                        return this.A[0];   // 凌晨
                                    } else if (hm < 900) {
                                        return this.A[1];   // 早上
                                    } else if (hm < 1130) {
                                        return this.A[2];   // 上午
                                    } else if (hm < 1230) {
                                        return this.A[3];   // 中午
                                    } else if (hm < 1800) {
                                        return this.A[4];   // 下午
                                    }
                                    return this.A[5];       // 晚上
                                }
                            },
                            parser: {
                                h: function (h, a) {
                                    if (a < 4) {
                                        return h;   // 凌晨, 早上, 上午, 中午
                                    }
                                    return h > 11 ? h : h + 12; // 下午, 晚上
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 96 */
            /***/ (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * @preserve date-and-time.js locale configuration
                 * @preserve Chinese (zh-tw)
                 * @preserve It is using moment.js locale configuration as a reference.
                 */
                (function (global) {
                    'use strict';

                    var locale = function (date) {
                        date.setLocales('zh-tw', {
                            MMMM: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                            MMM: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            dddd: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                            ddd: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                            dd: ['日', '一', '二', '三', '四', '五', '六'],
                            A: ['早上', '上午', '中午', '下午', '晚上'],
                            formatter: {
                                A: function (d) {
                                    var hm = d.getHours() * 100 + d.getMinutes();
                                    if (hm < 900) {
                                        return this.A[0];   // 早上
                                    } else if (hm < 1130) {
                                        return this.A[1];   // 上午
                                    } else if (hm < 1230) {
                                        return this.A[2];   // 中午
                                    } else if (hm < 1800) {
                                        return this.A[3];   // 下午
                                    }
                                    return this.A[4];       // 晚上
                                }
                            },
                            parser: {
                                h: function (h, a) {
                                    if (a < 3) {
                                        return h;   // 早上, 上午, 中午
                                    }
                                    return h > 11 ? h : h + 12; // 下午, 晚上
                                }
                            }
                        });
                    };

                    if (typeof module === 'object' && typeof module.exports === 'object') {
                        locale(__webpack_require__(1));
                    } else if (true) {
                        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (locale),
                            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                                (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                        locale(global.date);
                    }

                }(this));


                /***/
            }),
            /* 97 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'أقل من ثانية واحدة',
                            other: 'أقل من {{count}} ثواني'
                        },

                        xSeconds: {
                            one: 'ثانية واحدة',
                            other: '{{count}} ثواني'
                        },

                        halfAMinute: 'نصف دقيقة',

                        lessThanXMinutes: {
                            one: 'أقل من دقيقة',
                            other: 'أقل من {{count}} دقيقة'
                        },

                        xMinutes: {
                            one: 'دقيقة واحدة',
                            other: '{{count}} دقائق'
                        },

                        aboutXHours: {
                            one: 'ساعة واحدة تقريباً',
                            other: '{{count}} ساعات تقريباً'
                        },

                        xHours: {
                            one: 'ساعة واحدة',
                            other: '{{count}} ساعات'
                        },

                        xDays: {
                            one: 'يوم واحد',
                            other: '{{count}} أيام'
                        },

                        aboutXMonths: {
                            one: 'شهر واحد تقريباً',
                            other: '{{count}} أشهر تقريباً'
                        },

                        xMonths: {
                            one: 'شهر واحد',
                            other: '{{count}} أشهر'
                        },

                        aboutXYears: {
                            one: 'عام واحد تقريباً',
                            other: '{{count}} أعوام تقريباً'
                        },

                        xYears: {
                            one: 'عام واحد',
                            other: '{{count}} أعوام'
                        },

                        overXYears: {
                            one: 'أكثر من عام',
                            other: 'أكثر من {{count}} أعوام'
                        },

                        almostXYears: {
                            one: 'عام واحد تقريباً',
                            other: '{{count}} أعوام تقريباً'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'في خلال ' + result
                            } else {
                                return 'منذ ' + result
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 98 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
                    var monthsFull = ['كانون الثاني يناير', 'شباط فبراير', 'آذار مارس', 'نيسان أبريل', 'أيار مايو', 'حزيران يونيو', 'تموز يوليو', 'آب أغسطس', 'أيلول سبتمبر', 'تشرين الأول أكتوبر', 'تشرين الثاني نوفمبر', 'كانون الأول ديسمبر']
                    var weekdays2char = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س']
                    var weekdays3char = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
                    var weekdaysFull = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
                    var meridiemUppercase = ['صباح', 'مساء']
                    var meridiemLowercase = ['ص', 'م']
                    var meridiemFull = ['صباحاً', 'مساءاً']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return String(number)
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 99 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'по-малко от секунда',
                            other: 'по-малко от {{count}} секунди'
                        },

                        xSeconds: {
                            one: '1 секунда',
                            other: '{{count}} секунди'
                        },

                        halfAMinute: 'половин минута',

                        lessThanXMinutes: {
                            one: 'по-малко от минута',
                            other: 'по-малко от {{count}} минути'
                        },

                        xMinutes: {
                            one: '1 минута',
                            other: '{{count}} минути'
                        },

                        aboutXHours: {
                            one: 'около час',
                            other: 'около {{count}} часа'
                        },

                        xHours: {
                            one: '1 час',
                            other: '{{count}} часа'
                        },

                        xDays: {
                            one: '1 ден',
                            other: '{{count}} дни'
                        },

                        aboutXMonths: {
                            one: 'около месец',
                            other: 'около {{count}} месеца'
                        },

                        xMonths: {
                            one: '1 месец',
                            other: '{{count}} месеца'
                        },

                        aboutXYears: {
                            one: 'около година',
                            other: 'около {{count}} години'
                        },

                        xYears: {
                            one: '1 година',
                            other: '{{count}} години'
                        },

                        overXYears: {
                            one: 'над година',
                            other: 'над {{count}} години'
                        },

                        almostXYears: {
                            one: 'почти година',
                            other: 'почти {{count}} години'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'след ' + result
                            } else {
                                return 'преди ' + result
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 100 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['яну', 'фев', 'мар', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек']
                    var monthsFull = ['януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври', 'ноември', 'декември']
                    var weekdays2char = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
                    var weekdays3char = ['нед', 'пон', 'вто', 'сря', 'чет', 'пет', 'съб']
                    var weekdaysFull = ['неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък', 'петък', 'събота']
                    var meridiem = ['сутринта', 'на обяд', 'следобед', 'вечерта']

                    var timeOfDay = function (date) {
                        var hours = date.getHours()
                        if (hours >= 4 && hours < 12) {
                            return meridiem[0]
                        } else if (hours >= 12 && hours < 14) {
                            return meridiem[1]
                        } else if (hours >= 14 && hours < 17) {
                            return meridiem[2]
                        } else {
                            return meridiem[3]
                        }
                    }

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': timeOfDay,

                        // am, pm
                        'a': timeOfDay,

                        // a.m., p.m.
                        'aa': timeOfDay
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    var rem100 = number % 100
                    if (rem100 > 20 || rem100 < 10) {
                        switch (rem100 % 10) {
                            case 1:
                                return number + '-ви'
                            case 2:
                                return number + '-ри'
                        }
                    }
                    return number + '-и'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 101 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: "menys d'un segon",
                            other: 'menys de {{count}} segons'
                        },

                        xSeconds: {
                            one: '1 segon',
                            other: '{{count}} segons'
                        },

                        halfAMinute: 'mig minut',

                        lessThanXMinutes: {
                            one: "menys d'un minut",
                            other: 'menys de {{count}} minuts'
                        },

                        xMinutes: {
                            one: '1 minut',
                            other: '{{count}} minuts'
                        },

                        aboutXHours: {
                            one: 'aproximadament una hora',
                            other: 'aproximadament {{count}} hores'
                        },

                        xHours: {
                            one: '1 hora',
                            other: '{{count}} hores'
                        },

                        xDays: {
                            one: '1 dia',
                            other: '{{count}} dies'
                        },

                        aboutXMonths: {
                            one: 'aproximadament un mes',
                            other: 'aproximadament {{count}} mesos'
                        },

                        xMonths: {
                            one: '1 mes',
                            other: '{{count}} mesos'
                        },

                        aboutXYears: {
                            one: 'aproximadament un any',
                            other: 'aproximadament {{count}} anys'
                        },

                        xYears: {
                            one: '1 any',
                            other: '{{count}} anys'
                        },

                        overXYears: {
                            one: "més d'un any",
                            other: 'més de {{count}} anys'
                        },

                        almostXYears: {
                            one: 'gairebé un any',
                            other: 'gairebé {{count}} anys'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'en ' + result
                            } else {
                                return 'fa ' + result
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 102 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['gen', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'des']
                    var monthsFull = ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octobre', 'novembre', 'desembre']
                    var weekdays2char = ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds']
                    var weekdays3char = ['dge', 'dls', 'dts', 'dcs', 'djs', 'dvs', 'dss']
                    var weekdaysFull = ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    switch (number) {
                        case 1:
                            return '1r'
                        case 2:
                            return '2n'
                        case 3:
                            return '3r'
                        case 4:
                            return '4t'
                        default:
                            return number + 'è'
                    }
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 103 */
            /***/ (function (module, exports) {

                function declensionGroup(scheme, count) {
                    if (count === 1) {
                        return scheme.one
                    }

                    if (count >= 2 && count <= 4) {
                        return scheme.twoFour
                    }

                    // if count === null || count === 0 || count >= 5
                    return scheme.other
                }

                function declension(scheme, count, time) {
                    var group = declensionGroup(scheme, count)
                    var finalText = group[time] || group
                    return finalText.replace('{{count}}', count)
                }

                function extractPreposition(token) {
                    var result = ['lessThan', 'about', 'over', 'almost'].filter(function (preposition) {
                        return !!token.match(new RegExp('^' + preposition))
                    })

                    return result[0]
                }

                function prefixPreposition(preposition) {
                    var translation = ''

                    if (preposition === 'almost') {
                        translation = 'skoro'
                    }

                    if (preposition === 'about') {
                        translation = 'přibližně'
                    }

                    return translation.length > 0 ? translation + ' ' : ''
                }

                function suffixPreposition(preposition) {
                    var translation = ''

                    if (preposition === 'lessThan') {
                        translation = 'méně než'
                    }

                    if (preposition === 'over') {
                        translation = 'více než'
                    }

                    return translation.length > 0 ? translation + ' ' : ''
                }

                function lowercaseFirstLetter(string) {
                    return string.charAt(0).toLowerCase() + string.slice(1)
                }

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        xSeconds: {
                            one: {
                                regular: 'vteřina',
                                past: 'vteřinou',
                                future: 'vteřinu'
                            },
                            twoFour: {
                                regular: '{{count}} vteřiny',
                                past: '{{count}} vteřinami',
                                future: '{{count}} vteřiny'
                            },
                            other: {
                                regular: '{{count}} vteřin',
                                past: '{{count}} vteřinami',
                                future: '{{count}} vteřin'
                            }
                        },

                        halfAMinute: {
                            other: {
                                regular: 'půl minuty',
                                past: 'půl minutou',
                                future: 'půl minuty'
                            }
                        },

                        xMinutes: {
                            one: {
                                regular: 'minuta',
                                past: 'minutou',
                                future: 'minutu'
                            },
                            twoFour: {
                                regular: '{{count}} minuty',
                                past: '{{count}} minutami',
                                future: '{{count}} minuty'
                            },
                            other: {
                                regular: '{{count}} minut',
                                past: '{{count}} minutami',
                                future: '{{count}} minut'
                            }
                        },

                        xHours: {
                            one: {
                                regular: 'hodina',
                                past: 'hodinou',
                                future: 'hodinu'
                            },
                            twoFour: {
                                regular: '{{count}} hodiny',
                                past: '{{count}} hodinami',
                                future: '{{count}} hodiny'
                            },
                            other: {
                                regular: '{{count}} hodin',
                                past: '{{count}} hodinami',
                                future: '{{count}} hodin'
                            }
                        },

                        xDays: {
                            one: {
                                regular: 'den',
                                past: 'dnem',
                                future: 'den'
                            },
                            twoFour: {
                                regular: '{{count}} dni',
                                past: '{{count}} dny',
                                future: '{{count}} dni'
                            },
                            other: {
                                regular: '{{count}} dní',
                                past: '{{count}} dny',
                                future: '{{count}} dní'
                            }
                        },

                        xMonths: {
                            one: {
                                regular: 'měsíc',
                                past: 'měsícem',
                                future: 'měsíc'
                            },
                            twoFour: {
                                regular: '{{count}} měsíce',
                                past: '{{count}} měsíci',
                                future: '{{count}} měsíce'
                            },
                            other: {
                                regular: '{{count}} měsíců',
                                past: '{{count}} měsíci',
                                future: '{{count}} měsíců'
                            }
                        },

                        xYears: {
                            one: {
                                regular: 'rok',
                                past: 'rokem',
                                future: 'rok'
                            },
                            twoFour: {
                                regular: '{{count}} roky',
                                past: '{{count}} roky',
                                future: '{{count}} roky'
                            },
                            other: {
                                regular: '{{count}} roků',
                                past: '{{count}} roky',
                                future: '{{count}} roků'
                            }
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var preposition = extractPreposition(token) || ''
                        var key = lowercaseFirstLetter(token.substring(preposition.length))
                        var scheme = distanceInWordsLocale[key]

                        if (!options.addSuffix) {
                            return prefixPreposition(preposition) + suffixPreposition(preposition) + declension(scheme, count, 'regular')
                        }

                        if (options.comparison > 0) {
                            return prefixPreposition(preposition) + 'za ' + suffixPreposition(preposition) + declension(scheme, count, 'future')
                        } else {
                            return prefixPreposition(preposition) + 'před ' + suffixPreposition(preposition) + declension(scheme, count, 'past')
                        }
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 104 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro']
                    var monthsFull = ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec']
                    var weekdays2char = ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so']
                    var weekdays3char = ['ned', 'pon', 'úte', 'stř', 'čtv', 'pát', 'sob']
                    var weekdaysFull = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota']
                    var meridiemUppercase = ['DOP.', 'ODP.']
                    var meridiemLowercase = ['dop.', 'odp.']
                    var meridiemFull = ['dopoledne', 'odpoledne']

                    var formatters = {
                        // Month: led, úno, ..., pro
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: leden, únor, ..., prosinec
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: ne, po, ..., so
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: ned, pon, ..., sob
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: neděle, pondělí, ..., sobota
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // DOP., ODP.
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // dop., odp.
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // dopoledne, odpoledne
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + '.'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 105 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'mindre end et sekund',
                            other: 'mindre end {{count}} sekunder'
                        },

                        xSeconds: {
                            one: '1 sekund',
                            other: '{{count}} sekunder'
                        },

                        halfAMinute: 'et halvt minut',

                        lessThanXMinutes: {
                            one: 'mindre end et minut',
                            other: 'mindre end {{count}} minutter'
                        },

                        xMinutes: {
                            one: '1 minut',
                            other: '{{count}} minutter'
                        },

                        aboutXHours: {
                            one: 'cirka 1 time',
                            other: 'cirka {{count}} timer'
                        },

                        xHours: {
                            one: '1 time',
                            other: '{{count}} timer'
                        },

                        xDays: {
                            one: '1 dag',
                            other: '{{count}} dage'
                        },

                        aboutXMonths: {
                            one: 'cirka 1 måned',
                            other: 'cirka {{count}} måneder'
                        },

                        xMonths: {
                            one: '1 måned',
                            other: '{{count}} måneder'
                        },

                        aboutXYears: {
                            one: 'cirka 1 år',
                            other: 'cirka {{count}} år'
                        },

                        xYears: {
                            one: '1 år',
                            other: '{{count}} år'
                        },

                        overXYears: {
                            one: 'over 1 år',
                            other: 'over {{count}} år'
                        },

                        almostXYears: {
                            one: 'næsten 1 år',
                            other: 'næsten {{count}} år'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'om ' + result
                            } else {
                                return result + ' siden'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 106 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
                    var monthsFull = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december']
                    var weekdays2char = ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø']
                    var weekdays3char = ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør']
                    var weekdaysFull = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + '.'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 107 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            standalone: {
                                one: 'weniger als eine Sekunde',
                                other: 'weniger als {{count}} Sekunden'
                            },
                            withPreposition: {
                                one: 'weniger als einer Sekunde',
                                other: 'weniger als {{count}} Sekunden'
                            }
                        },

                        xSeconds: {
                            standalone: {
                                one: 'eine Sekunde',
                                other: '{{count}} Sekunden'
                            },
                            withPreposition: {
                                one: 'einer Sekunde',
                                other: '{{count}} Sekunden'
                            }
                        },

                        halfAMinute: {
                            standalone: 'eine halbe Minute',
                            withPreposition: 'einer halben Minute'
                        },

                        lessThanXMinutes: {
                            standalone: {
                                one: 'weniger als eine Minute',
                                other: 'weniger als {{count}} Minuten'
                            },
                            withPreposition: {
                                one: 'weniger als einer Minute',
                                other: 'weniger als {{count}} Minuten'
                            }
                        },

                        xMinutes: {
                            standalone: {
                                one: 'eine Minute',
                                other: '{{count}} Minuten'
                            },
                            withPreposition: {
                                one: 'einer Minute',
                                other: '{{count}} Minuten'
                            }
                        },

                        aboutXHours: {
                            standalone: {
                                one: 'etwa eine Stunde',
                                other: 'etwa {{count}} Stunden'
                            },
                            withPreposition: {
                                one: 'etwa einer Stunde',
                                other: 'etwa {{count}} Stunden'
                            }
                        },

                        xHours: {
                            standalone: {
                                one: 'eine Stunde',
                                other: '{{count}} Stunden'
                            },
                            withPreposition: {
                                one: 'einer Stunde',
                                other: '{{count}} Stunden'
                            }
                        },

                        xDays: {
                            standalone: {
                                one: 'ein Tag',
                                other: '{{count}} Tage'
                            },
                            withPreposition: {
                                one: 'einem Tag',
                                other: '{{count}} Tagen'
                            }

                        },

                        aboutXMonths: {
                            standalone: {
                                one: 'etwa ein Monat',
                                other: 'etwa {{count}} Monate'
                            },
                            withPreposition: {
                                one: 'etwa einem Monat',
                                other: 'etwa {{count}} Monaten'
                            }
                        },

                        xMonths: {
                            standalone: {
                                one: 'ein Monat',
                                other: '{{count}} Monate'
                            },
                            withPreposition: {
                                one: 'einem Monat',
                                other: '{{count}} Monaten'
                            }
                        },

                        aboutXYears: {
                            standalone: {
                                one: 'etwa ein Jahr',
                                other: 'etwa {{count}} Jahre'
                            },
                            withPreposition: {
                                one: 'etwa einem Jahr',
                                other: 'etwa {{count}} Jahren'
                            }
                        },

                        xYears: {
                            standalone: {
                                one: 'ein Jahr',
                                other: '{{count}} Jahre'
                            },
                            withPreposition: {
                                one: 'einem Jahr',
                                other: '{{count}} Jahren'
                            }
                        },

                        overXYears: {
                            standalone: {
                                one: 'mehr als ein Jahr',
                                other: 'mehr als {{count}} Jahre'
                            },
                            withPreposition: {
                                one: 'mehr als einem Jahr',
                                other: 'mehr als {{count}} Jahren'
                            }
                        },

                        almostXYears: {
                            standalone: {
                                one: 'fast ein Jahr',
                                other: 'fast {{count}} Jahre'
                            },
                            withPreposition: {
                                one: 'fast einem Jahr',
                                other: 'fast {{count}} Jahren'
                            }
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var usageGroup = options.addSuffix
                            ? distanceInWordsLocale[token].withPreposition
                            : distanceInWordsLocale[token].standalone

                        var result
                        if (typeof usageGroup === 'string') {
                            result = usageGroup
                        } else if (count === 1) {
                            result = usageGroup.one
                        } else {
                            result = usageGroup.other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'in ' + result
                            } else {
                                return 'vor ' + result
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 108 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    // Note: in German, the names of days of the week and months are capitalized.
                    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
                    // Generally, formatted dates should look like they are in the middle of a sentence,
                    // e.g. in Spanish language the weekdays and months should be in the lowercase.
                    var months3char = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
                    var monthsFull = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
                    var weekdays2char = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
                    var weekdays3char = ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam']
                    var weekdaysFull = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + '.'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 109 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'λιγότερο από ένα δευτερόλεπτο',
                            other: 'λιγότερο από {{count}} δευτερόλεπτα'
                        },

                        xSeconds: {
                            one: '1 δευτερόλεπτο',
                            other: '{{count}} δευτερόλεπτα'
                        },

                        halfAMinute: 'μισό λεπτό',

                        lessThanXMinutes: {
                            one: 'λιγότερο από ένα λεπτό',
                            other: 'λιγότερο από {{count}} λεπτά'
                        },

                        xMinutes: {
                            one: '1 λεπτό',
                            other: '{{count}} λεπτά'
                        },

                        aboutXHours: {
                            one: 'περίπου 1 ώρα',
                            other: 'περίπου {{count}} ώρες'
                        },

                        xHours: {
                            one: '1 ώρα',
                            other: '{{count}} ώρες'
                        },

                        xDays: {
                            one: '1 ημέρα',
                            other: '{{count}} ημέρες'
                        },

                        aboutXMonths: {
                            one: 'περίπου 1 μήνας',
                            other: 'περίπου {{count}} μήνες'
                        },

                        xMonths: {
                            one: '1 μήνας',
                            other: '{{count}} μήνες'
                        },

                        aboutXYears: {
                            one: 'περίπου 1 χρόνο',
                            other: 'περίπου {{count}} χρόνια'
                        },

                        xYears: {
                            one: '1 χρόνο',
                            other: '{{count}} χρόνια'
                        },

                        overXYears: {
                            one: 'πάνω από 1 χρόνο',
                            other: 'πάνω από {{count}} χρόνια'
                        },

                        almostXYears: {
                            one: 'περίπου 1 χρόνο',
                            other: 'περίπου {{count}} χρόνια'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'σε ' + result
                            } else {
                                return result + ' πρίν'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 110 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ']
                    var monthsFull = ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος']
                    var monthsGenitive = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου']
                    var weekdays2char = ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πέ', 'Πα', 'Σά']
                    var weekdays3char = ['Κυρ', 'Δευ', 'Τρί', 'Τετ', 'Πέμ', 'Παρ', 'Σάβ']
                    var weekdaysFull = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο']
                    var meridiemUppercase = ['ΠΜ', 'ΜΜ']
                    var meridiemLowercase = ['πμ', 'μμ']
                    var meridiemFull = ['π.μ.', 'μ.μ.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalGenders = {
                        'M': 'ος',
                        'D': 'η',
                        'DDD': 'η',
                        'd': 'η',
                        'Q': 'ο',
                        'W': 'η'
                    }
                    var ordinalKeys = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalKeys.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return formatters[formatterToken](date) + ordinalGenders[formatterToken]
                        }
                    })

                    // Generate genitive variant of full months
                    var formatsWithGenitive = ['D', 'Do', 'DD']
                    formatsWithGenitive.forEach(function (formatterToken) {
                        formatters[formatterToken + ' MMMM'] = function (date, commonFormatters) {
                            var formatter = formatters[formatterToken] || commonFormatters[formatterToken]
                            return formatter(date, commonFormatters) + ' ' + monthsGenitive[date.getMonth()]
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 111 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'malpli ol sekundo',
                            other: 'malpli ol {{count}} sekundoj'
                        },

                        xSeconds: {
                            one: '1 sekundo',
                            other: '{{count}} sekundoj'
                        },

                        halfAMinute: 'duonminuto',

                        lessThanXMinutes: {
                            one: 'malpli ol minuto',
                            other: 'malpli ol {{count}} minutoj'
                        },

                        xMinutes: {
                            one: '1 minuto',
                            other: '{{count}} minutoj'
                        },

                        aboutXHours: {
                            one: 'proksimume 1 horo',
                            other: 'proksimume {{count}} horoj'
                        },

                        xHours: {
                            one: '1 horo',
                            other: '{{count}} horoj'
                        },

                        xDays: {
                            one: '1 tago',
                            other: '{{count}} tagoj'
                        },

                        aboutXMonths: {
                            one: 'proksimume 1 monato',
                            other: 'proksimume {{count}} monatoj'
                        },

                        xMonths: {
                            one: '1 monato',
                            other: '{{count}} monatoj'
                        },

                        aboutXYears: {
                            one: 'proksimume 1 jaro',
                            other: 'proksimume {{count}} jaroj'
                        },

                        xYears: {
                            one: '1 jaro',
                            other: '{{count}} jaroj'
                        },

                        overXYears: {
                            one: 'pli ol 1 jaro',
                            other: 'pli ol {{count}} jaroj'
                        },

                        almostXYears: {
                            one: 'preskaŭ 1 jaro',
                            other: 'preskaŭ {{count}} jaroj'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'post ' + result
                            } else {
                                return 'antaŭ ' + result
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 112 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aŭg', 'sep', 'okt', 'nov', 'dec']
                    var monthsFull = ['januaro', 'februaro', 'marto', 'aprilo', 'majo', 'junio', 'julio', 'aŭgusto', 'septembro', 'oktobro', 'novembro', 'decembro']
                    var weekdays2char = ['di', 'lu', 'ma', 'me', 'ĵa', 've', 'sa']
                    var weekdays3char = ['dim', 'lun', 'mar', 'mer', 'ĵaŭ', 'ven', 'sab']
                    var weekdaysFull = ['dimanĉo', 'lundo', 'mardo', 'merkredo', 'ĵaŭdo', 'vendredo', 'sabato']
                    var meridiemUppercase = ['A.T.M.', 'P.T.M.']
                    var meridiemLowercase = ['a.t.m.', 'p.t.m.']
                    var meridiemFull = ['antaŭtagmeze', 'posttagmeze']

                    var formatters = {
                        // Month: jan, feb, ..., deс
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: januaro, februaro, ..., decembro
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: di, lu, ..., sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: dim, lun, ..., sab
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: dimanĉo, lundo, ..., sabato
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // A.T.M., P.T.M.
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // a.t.m., p.t.m.
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // antaŭtagmeze, posttagmeze
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return formatters[formatterToken](date) + '-a'
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 113 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'menos de un segundo',
                            other: 'menos de {{count}} segundos'
                        },

                        xSeconds: {
                            one: '1 segundo',
                            other: '{{count}} segundos'
                        },

                        halfAMinute: 'medio minuto',

                        lessThanXMinutes: {
                            one: 'menos de un minuto',
                            other: 'menos de {{count}} minutos'
                        },

                        xMinutes: {
                            one: '1 minuto',
                            other: '{{count}} minutos'
                        },

                        aboutXHours: {
                            one: 'alrededor de 1 hora',
                            other: 'alrededor de {{count}} horas'
                        },

                        xHours: {
                            one: '1 hora',
                            other: '{{count}} horas'
                        },

                        xDays: {
                            one: '1 día',
                            other: '{{count}} días'
                        },

                        aboutXMonths: {
                            one: 'alrededor de 1 mes',
                            other: 'alrededor de {{count}} meses'
                        },

                        xMonths: {
                            one: '1 mes',
                            other: '{{count}} meses'
                        },

                        aboutXYears: {
                            one: 'alrededor de 1 año',
                            other: 'alrededor de {{count}} años'
                        },

                        xYears: {
                            one: '1 año',
                            other: '{{count}} años'
                        },

                        overXYears: {
                            one: 'más de 1 año',
                            other: 'más de {{count}} años'
                        },

                        almostXYears: {
                            one: 'casi 1 año',
                            other: 'casi {{count}} años'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'en ' + result
                            } else {
                                return 'hace ' + result
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 114 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
                    var monthsFull = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
                    var weekdays2char = ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sa']
                    var weekdays3char = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
                    var weekdaysFull = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + 'º'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 115 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    function futureSeconds(text) {
                        return text.replace(/sekuntia?/, 'sekunnin')
                    }

                    function futureMinutes(text) {
                        return text.replace(/minuuttia?/, 'minuutin')
                    }

                    function futureHours(text) {
                        return text.replace(/tuntia?/, 'tunnin')
                    }

                    function futureDays(text) {
                        return text.replace(/päivää?/, 'päivän')
                    }

                    function futureMonths(text) {
                        return text.replace(/(kuukausi|kuukautta)/, 'kuukauden')
                    }

                    function futureYears(text) {
                        return text.replace(/(vuosi|vuotta)/, 'vuoden')
                    }

                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'alle sekunti',
                            other: 'alle {{count}} sekuntia',
                            futureTense: futureSeconds
                        },

                        xSeconds: {
                            one: 'sekunti',
                            other: '{{count}} sekuntia',
                            futureTense: futureSeconds
                        },

                        halfAMinute: {
                            one: 'puoli minuuttia',
                            other: 'puoli minuuttia',
                            futureTense: function (text) {
                                return 'puolen minuutin'
                            }
                        },

                        lessThanXMinutes: {
                            one: 'alle minuutti',
                            other: 'alle {{count}} minuuttia',
                            futureTense: futureMinutes
                        },

                        xMinutes: {
                            one: 'minuutti',
                            other: '{{count}} minuuttia',
                            futureTense: futureMinutes
                        },

                        aboutXHours: {
                            one: 'noin tunti',
                            other: 'noin {{count}} tuntia',
                            futureTense: futureHours
                        },

                        xHours: {
                            one: 'tunti',
                            other: '{{count}} tuntia',
                            futureTense: futureHours
                        },

                        xDays: {
                            one: 'päivä',
                            other: '{{count}} päivää',
                            futureTense: futureDays
                        },

                        aboutXMonths: {
                            one: 'noin kuukausi',
                            other: 'noin {{count}} kuukautta',
                            futureTense: futureMonths
                        },

                        xMonths: {
                            one: 'kuukausi',
                            other: '{{count}} kuukautta',
                            futureTense: futureMonths
                        },

                        aboutXYears: {
                            one: 'noin vuosi',
                            other: 'noin {{count}} vuotta',
                            futureTense: futureYears
                        },

                        xYears: {
                            one: 'vuosi',
                            other: '{{count}} vuotta',
                            futureTense: futureYears
                        },

                        overXYears: {
                            one: 'yli vuosi',
                            other: 'yli {{count}} vuotta',
                            futureTense: futureYears
                        },

                        almostXYears: {
                            one: 'lähes vuosi',
                            other: 'lähes {{count}} vuotta',
                            futureTense: futureYears
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var distance = distanceInWordsLocale[token]
                        var result = count === 1 ? distance.one : distance.other.replace('{{count}}', count)

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return distance.futureTense(result) + ' kuluttua'
                            } else {
                                return result + ' sitten'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 116 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['tammi', 'helmi', 'maalis', 'huhti', 'touko', 'kesä', 'heinä', 'elo', 'syys', 'loka', 'marras', 'joulu']
                    var monthsFull = ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu']
                    var weekdays2char = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la']
                    var weekdaysFull = ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai']

                    // In Finnish `a.m.` / `p.m.` are virtually never used, but it seems `AP` (aamupäivä) / `IP` (iltapäivä) are acknowleded terms:
                    // https://fi.wikipedia.org/wiki/24_tunnin_kello
                    function meridiem(date) {
                        return date.getHours() < 12 ? 'AP' : 'IP'
                    }

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            // Finnish doesn't use two-char weekdays
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': meridiem,

                        // am, pm
                        'a': meridiem,

                        // a.m., p.m.
                        'aa': meridiem
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return formatters[formatterToken](date).toString() + '.'
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 117 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'mas maliit sa isang segundo',
                            other: 'mas maliit sa {{count}} segundo'
                        },

                        xSeconds: {
                            one: '1 segundo',
                            other: '{{count}} segundo'
                        },

                        halfAMinute: 'kalahating minuto',

                        lessThanXMinutes: {
                            one: 'mas maliit sa isang minuto',
                            other: 'mas maliit sa {{count}} minuto'
                        },

                        xMinutes: {
                            one: '1 minuto',
                            other: '{{count}} minuto'
                        },

                        aboutXHours: {
                            one: 'mga 1 oras',
                            other: 'mga {{count}} oras'
                        },

                        xHours: {
                            one: '1 oras',
                            other: '{{count}} oras'
                        },

                        xDays: {
                            one: '1 araw',
                            other: '{{count}} araw'
                        },

                        aboutXMonths: {
                            one: 'mga 1 buwan',
                            other: 'mga {{count}} buwan'
                        },

                        xMonths: {
                            one: '1 buwan',
                            other: '{{count}} buwan'
                        },

                        aboutXYears: {
                            one: 'mga 1 taon',
                            other: 'mga {{count}} taon'
                        },

                        xYears: {
                            one: '1 taon',
                            other: '{{count}} taon'
                        },

                        overXYears: {
                            one: 'higit sa 1 taon',
                            other: 'higit sa {{count}} taon'
                        },

                        almostXYears: {
                            one: 'halos 1 taon',
                            other: 'halos {{count}} taon'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'sa loob ng ' + result
                            } else {
                                return result + ' ang nakalipas'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 118 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['Ene', 'Peb', 'Mar', 'Abr', 'May', 'Hun', 'Hul', 'Ago', 'Set', 'Okt', 'Nob', 'Dis']
                    var monthsFull = ['Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo', 'Hulyo', 'Agosto', 'Setyembre', 'Oktubre', 'Nobyembre', 'Disyembre']
                    var weekdays2char = ['Li', 'Lu', 'Ma', 'Mi', 'Hu', 'Bi', 'Sa']
                    var weekdays3char = ['Lin', 'Lun', 'Mar', 'Miy', 'Huw', 'Biy', 'Sab']
                    var weekdaysFull = ['Linggo', 'Lunes', 'Martes', 'Miyerkules', 'Huwebes', 'Biyernes', 'Sabado']
                    var meridiemUppercase = ['NU', 'NT', 'NH', 'NG']
                    var meridiemLowercase = ['nu', 'nt', 'nh', 'ng']
                    var meridiemFull = ['ng umaga', 'ng tanghali', 'ng hapon', 'ng gabi']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            if (date.getHours() > 12) {
                                var modulo = date.getHours() % 12
                                if (modulo < 6) {
                                    return meridiemUppercase[2]
                                } else {
                                    return meridiemUppercase[3]
                                }
                            } else if (date.getHours() < 12) {
                                return meridiemUppercase[0]
                            } else {
                                return meridiemUppercase[1]
                            }
                        },

                        // am, pm
                        'a': function (date) {
                            if (date.getHours() > 12) {
                                var modulo = date.getHours() % 12
                                if (modulo < 6) {
                                    return meridiemLowercase[2]
                                } else {
                                    return meridiemLowercase[3]
                                }
                            } else if (date.getHours() < 12) {
                                return meridiemLowercase[0]
                            } else {
                                return meridiemLowercase[1]
                            }
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            if (date.getHours() > 12) {
                                var modulo = date.getHours() % 12
                                if (modulo < 6) {
                                    return meridiemFull[2]
                                } else {
                                    return meridiemFull[3]
                                }
                            } else if (date.getHours() < 12) {
                                return meridiemFull[0]
                            } else {
                                return meridiemFull[1]
                            }
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return 'ika-' + number
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 119 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'moins d’une seconde',
                            other: 'moins de {{count}} secondes'
                        },

                        xSeconds: {
                            one: '1 seconde',
                            other: '{{count}} secondes'
                        },

                        halfAMinute: '30 secondes',

                        lessThanXMinutes: {
                            one: 'moins d’une minute',
                            other: 'moins de {{count}} minutes'
                        },

                        xMinutes: {
                            one: '1 minute',
                            other: '{{count}} minutes'
                        },

                        aboutXHours: {
                            one: 'environ 1 heure',
                            other: 'environ {{count}} heures'
                        },

                        xHours: {
                            one: '1 heure',
                            other: '{{count}} heures'
                        },

                        xDays: {
                            one: '1 jour',
                            other: '{{count}} jours'
                        },

                        aboutXMonths: {
                            one: 'environ 1 mois',
                            other: 'environ {{count}} mois'
                        },

                        xMonths: {
                            one: '1 mois',
                            other: '{{count}} mois'
                        },

                        aboutXYears: {
                            one: 'environ 1 an',
                            other: 'environ {{count}} ans'
                        },

                        xYears: {
                            one: '1 an',
                            other: '{{count}} ans'
                        },

                        overXYears: {
                            one: 'plus d’un an',
                            other: 'plus de {{count}} ans'
                        },

                        almostXYears: {
                            one: 'presqu’un an',
                            other: 'presque {{count}} ans'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'dans ' + result
                            } else {
                                return 'il y a ' + result
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 120 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juill.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
                    var monthsFull = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
                    var weekdays2char = ['di', 'lu', 'ma', 'me', 'je', 've', 'sa']
                    var weekdays3char = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.']
                    var weekdaysFull = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['du matin', 'de l’après-midi', 'du soir']

                    var formatters = {
                        // Month: Jan, Feb, …, Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, …, December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, …, Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, …, Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, …, Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            var hours = date.getHours()

                            if (hours <= 12) {
                                return meridiemFull[0]
                            }

                            if (hours <= 16) {
                                return meridiemFull[1]
                            }

                            return meridiemFull[2]
                        },

                        // ISO week, ordinal version: 1st, 2nd, …, 53rd
                        // NOTE: Week has feminine grammatical gender in French: semaine
                        'Wo': function (date, formatters) {
                            return feminineOrdinal(formatters.W(date))
                        }
                    }

                    // Generate ordinal version of formatters: M → Mo, D → Do, etc.
                    // NOTE: For words with masculine grammatical gender in French: mois, jour, trimestre
                    var formatterTokens = ['M', 'D', 'DDD', 'd', 'Q']
                    formatterTokens.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return masculineOrdinal(formatters[formatterToken](date))
                        }
                    })

                    // Special case for day of month ordinals in long date format context:
                    // 1er mars, 2 mars, 3 mars, …
                    // See https://github.com/date-fns/date-fns/issues/437
                    //
                    // NOTE: The below implementation works because parsing of tokens inside a
                    // format string is done by a greedy regular expression, i.e. longer tokens
                    // have priority. E.g. formatter for "Do MMMM" has priority over individual
                    // formatters for "Do" and "MMMM".
                    var monthsTokens = ['MMM', 'MMMM']
                    monthsTokens.forEach(function (monthToken) {
                        formatters['Do ' + monthToken] = function (date, commonFormatters) {
                            var dayOfMonthToken = date.getDate() === 1
                                ? 'Do'
                                : 'D'
                            var dayOfMonthFormatter = formatters[dayOfMonthToken] || commonFormatters[dayOfMonthToken]

                            return dayOfMonthFormatter(date, commonFormatters) + ' ' + formatters[monthToken](date)
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function masculineOrdinal(number) {
                    if (number === 1) {
                        return '1er'
                    }

                    return number + 'e'
                }

                function feminineOrdinal(number) {
                    if (number === 1) {
                        return '1re'
                    }

                    return number + 'e'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 121 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: {
                                standalone: 'manje od 1 sekunde',
                                withPrepositionAgo: 'manje od 1 sekunde',
                                withPrepositionIn: 'manje od 1 sekundu'
                            },
                            dual: 'manje od {{count}} sekunde',
                            other: 'manje od {{count}} sekundi'
                        },

                        xSeconds: {
                            one: {
                                standalone: '1 sekunda',
                                withPrepositionAgo: '1 sekunde',
                                withPrepositionIn: '1 sekundu'
                            },
                            dual: '{{count}} sekunde',
                            other: '{{count}} sekundi'
                        },

                        halfAMinute: 'pola minute',

                        lessThanXMinutes: {
                            one: {
                                standalone: 'manje od 1 minute',
                                withPrepositionAgo: 'manje od 1 minute',
                                withPrepositionIn: 'manje od 1 minutu'
                            },
                            dual: 'manje od {{count}} minute',
                            other: 'manje od {{count}} minuta'
                        },

                        xMinutes: {
                            one: {
                                standalone: '1 minuta',
                                withPrepositionAgo: '1 minute',
                                withPrepositionIn: '1 minutu'
                            },
                            dual: '{{count}} minute',
                            other: '{{count}} minuta'
                        },

                        aboutXHours: {
                            one: {
                                standalone: 'oko 1 sat',
                                withPrepositionAgo: 'oko 1 sat',
                                withPrepositionIn: 'oko 1 sat'
                            },
                            dual: 'oko {{count}} sata',
                            other: 'oko {{count}} sati'
                        },

                        xHours: {
                            one: {
                                standalone: '1 sat',
                                withPrepositionAgo: '1 sat',
                                withPrepositionIn: '1 sat'
                            },
                            dual: '{{count}} sata',
                            other: '{{count}} sati'
                        },

                        xDays: {
                            one: {
                                standalone: '1 dan',
                                withPrepositionAgo: '1 dan',
                                withPrepositionIn: '1 dan'
                            },
                            dual: '{{count}} dana',
                            other: '{{count}} dana'
                        },

                        aboutXMonths: {
                            one: {
                                standalone: 'oko 1 mjesec',
                                withPrepositionAgo: 'oko 1 mjesec',
                                withPrepositionIn: 'oko 1 mjesec'
                            },
                            dual: 'oko {{count}} mjeseca',
                            other: 'oko {{count}} mjeseci'
                        },

                        xMonths: {
                            one: {
                                standalone: '1 mjesec',
                                withPrepositionAgo: '1 mjesec',
                                withPrepositionIn: '1 mjesec'
                            },
                            dual: '{{count}} mjeseca',
                            other: '{{count}} mjeseci'
                        },

                        aboutXYears: {
                            one: {
                                standalone: 'oko 1 godinu',
                                withPrepositionAgo: 'oko 1 godinu',
                                withPrepositionIn: 'oko 1 godinu'
                            },
                            dual: 'oko {{count}} godine',
                            other: 'oko {{count}} godina'
                        },

                        xYears: {
                            one: {
                                standalone: '1 godina',
                                withPrepositionAgo: '1 godine',
                                withPrepositionIn: '1 godinu'
                            },
                            dual: '{{count}} godine',
                            other: '{{count}} godina'
                        },

                        overXYears: {
                            one: {
                                standalone: 'preko 1 godinu',
                                withPrepositionAgo: 'preko 1 godinu',
                                withPrepositionIn: 'preko 1 godinu'
                            },
                            dual: 'preko {{count}} godine',
                            other: 'preko {{count}} godina'
                        },

                        almostXYears: {
                            one: {
                                standalone: 'gotovo 1 godinu',
                                withPrepositionAgo: 'gotovo 1 godinu',
                                withPrepositionIn: 'gotovo 1 godinu'
                            },
                            dual: 'gotovo {{count}} godine',
                            other: 'gotovo {{count}} godina'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result

                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            if (options.addSuffix) {
                                if (options.comparison > 0) {
                                    result = distanceInWordsLocale[token].one.withPrepositionIn
                                } else {
                                    result = distanceInWordsLocale[token].one.withPrepositionAgo
                                }
                            } else {
                                result = distanceInWordsLocale[token].one.standalone
                            }
                        } else if (
                            count % 10 > 1 && count % 10 < 5 && // if last digit is between 2 and 4
                            String(count).substr(-2, 1) !== '1' // unless the 2nd to last digit is "1"
                        ) {
                            result = distanceInWordsLocale[token].dual.replace('{{count}}', count)
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'za ' + result
                            } else {
                                return 'prije ' + result
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 122 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['sij', 'velj', 'ožu', 'tra', 'svi', 'lip', 'srp', 'kol', 'ruj', 'lis', 'stu', 'pro']
                    var monthsFull = ['siječanj', 'veljača', 'ožujak', 'travanj', 'svibanj', 'lipanj', 'srpanj', 'kolovoz', 'rujan', 'listopad', 'studeni', 'prosinac']
                    var monthsGenitive = ['siječnja', 'veljače', 'ožujka', 'travnja', 'svibnja', 'lipnja', 'srpnja', 'kolovoza', 'rujna', 'listopada', 'studenog', 'prosinca']
                    var weekdays2char = ['ne', 'po', 'ut', 'sr', 'če', 'pe', 'su']
                    var weekdays3char = ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub']
                    var weekdaysFull = ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota']
                    var meridiemUppercase = ['ujutro', 'popodne']
                    var meridiemLowercase = ['ujutro', 'popodne']
                    var meridiemFull = ['ujutro', 'popodne']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    // Generate formatters like 'D MMMM', where the month is in the genitive case
                    var monthsGenitiveFormatters = ['D', 'Do', 'DD']
                    monthsGenitiveFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + ' MMM'] = function (date, commonFormatters) {
                            var formatter = formatters[formatterToken] || commonFormatters[formatterToken]
                            return formatter(date, commonFormatters) + ' ' + monthsGenitive[date.getMonth()]
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + '.'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 123 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'kevesebb, mint egy másodperce',
                            other: 'kevesebb, mint {{count}} másodperce'
                        },

                        xSeconds: {
                            one: '1 másodperce',
                            other: '{{count}} másodperce'
                        },

                        halfAMinute: 'fél perce',

                        lessThanXMinutes: {
                            one: 'kevesebb, mint egy perce',
                            other: 'kevesebb, mint {{count}} perce'
                        },

                        xMinutes: {
                            one: '1 perce',
                            other: '{{count}} perce'
                        },

                        aboutXHours: {
                            one: 'közel 1 órája',
                            other: 'közel {{count}} órája'
                        },

                        xHours: {
                            one: '1 órája',
                            other: '{{count}} órája'
                        },

                        xDays: {
                            one: '1 napja',
                            other: '{{count}} napja'
                        },

                        aboutXMonths: {
                            one: 'közel 1 hónapja',
                            other: 'közel {{count}} hónapja'
                        },

                        xMonths: {
                            one: '1 hónapja',
                            other: '{{count}} hónapja'
                        },

                        aboutXYears: {
                            one: 'közel 1 éve',
                            other: 'közel {{count}} éve'
                        },

                        xYears: {
                            one: '1 éve',
                            other: '{{count}} éve'
                        },

                        overXYears: {
                            one: 'több, mint 1 éve',
                            other: 'több, mint {{count}} éve'
                        },

                        almostXYears: {
                            one: 'majdnem 1 éve',
                            other: 'majdnem {{count}} éve'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return '' + result
                            } else {
                                return result + ''
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 124 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    // Note: in English, the names of days of the week and months are capitalized.
                    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
                    // Generally, formatted dates should look like they are in the middle of a sentence,
                    // e.g. in Spanish language the weekdays and months should be in the lowercase.
                    var months3char = ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Sze', 'Okt', 'Nov', 'Dec']
                    var monthsFull = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December']
                    var weekdays2char = ['Va', 'Hé', 'Ke', 'Sze', 'Cs', 'Pé', 'Szo']
                    var weekdays3char = ['Vas', 'Hét', 'Ked', 'Sze', 'Csü', 'Pén', 'Szo']
                    var weekdaysFull = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat']
                    var meridiemUppercase = ['DE', 'DU']
                    var meridiemLowercase = ['de', 'du']
                    var meridiemFull = ['délelőtt', 'délután']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    var rem100 = number % 100
                    if (rem100 > 20 || rem100 < 10) {
                        switch (rem100 % 10) {
                            case 1:
                                return number + 'st'
                            case 2:
                                return number + 'nd'
                            case 3:
                                return number + 'rd'
                        }
                    }
                    return number + 'th'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 125 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'kurang dari 1 detik',
                            other: 'kurang dari {{count}} detik'
                        },

                        xSeconds: {
                            one: '1 detik',
                            other: '{{count}} detik'
                        },

                        halfAMinute: 'setengah menit',

                        lessThanXMinutes: {
                            one: 'kurang dari 1 menit',
                            other: 'kurang dari {{count}} menit'
                        },

                        xMinutes: {
                            one: '1 menit',
                            other: '{{count}} menit'
                        },

                        aboutXHours: {
                            one: 'sekitar 1 jam',
                            other: 'sekitar {{count}} jam'
                        },

                        xHours: {
                            one: '1 jam',
                            other: '{{count}} jam'
                        },

                        xDays: {
                            one: '1 hari',
                            other: '{{count}} hari'
                        },

                        aboutXMonths: {
                            one: 'sekitar 1 bulan',
                            other: 'sekitar {{count}} bulan'
                        },

                        xMonths: {
                            one: '1 bulan',
                            other: '{{count}} bulan'
                        },

                        aboutXYears: {
                            one: 'sekitar 1 tahun',
                            other: 'sekitar {{count}} tahun'
                        },

                        xYears: {
                            one: '1 tahun',
                            other: '{{count}} tahun'
                        },

                        overXYears: {
                            one: 'lebih dari 1 tahun',
                            other: 'lebih dari {{count}} tahun'
                        },

                        almostXYears: {
                            one: 'hampir 1 tahun',
                            other: 'hampir {{count}} tahun'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'dalam waktu ' + result
                            } else {
                                return result + ' yang lalu'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 126 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    // Note: in Indonesian, the names of days of the week and months are capitalized.
                    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
                    // Generally, formatted dates should look like they are in the middle of a sentence,
                    // e.g. in Spanish language the weekdays and months should be in the lowercase.
                    var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
                    var monthsFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
                    var weekdays2char = ['Mi', 'Sn', 'Sl', 'Ra', 'Ka', 'Ju', 'Sa']
                    var weekdays3char = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
                    var weekdaysFull = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    switch (number) {
                        case 1:
                            return 'pertama'
                        case 2:
                            return 'kedua'
                        case 3:
                            return 'ketiga'
                        default:
                            return 'ke-' + number
                    }
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 127 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'minna en 1 sekúnda',
                            other: 'minna en {{count}} sekúndur'
                        },

                        xSeconds: {
                            one: '1 sekúnda',
                            other: '{{count}} sekúndur'
                        },

                        halfAMinute: 'hálf mínúta',

                        lessThanXMinutes: {
                            one: 'minna en 1 mínúta',
                            other: 'minna en {{count}} mínútur'
                        },

                        xMinutes: {
                            one: '1 mínúta',
                            other: '{{count}} mínútur'
                        },

                        aboutXHours: {
                            one: 'u.þ.b. 1 klukkustund',
                            other: 'u.þ.b. {{count}} klukkustundir'
                        },

                        xHours: {
                            one: '1 klukkustund',
                            other: '{{count}} klukkustundir'
                        },

                        xDays: {
                            one: '1 dagur',
                            other: '{{count}} dagar'
                        },

                        aboutXMonths: {
                            one: 'u.þ.b. 1 mánuður',
                            other: 'u.þ.b. {{count}} mánuðir'
                        },

                        xMonths: {
                            one: '1 mánuður',
                            other: '{{count}} mánuðir'
                        },

                        aboutXYears: {
                            one: 'u.þ.b. 1 ár',
                            other: 'u.þ.b. {{count}} ár'
                        },

                        xYears: {
                            one: '1 ár',
                            other: '{{count}} ár'
                        },

                        overXYears: {
                            one: 'meira en 1 ár',
                            other: 'meira en {{count}} ár'
                        },

                        almostXYears: {
                            one: 'næstum 1 ár',
                            other: 'næstum {{count}} ár'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'í ' + result
                            } else {
                                return result + ' síðan'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 128 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['jan', 'feb', 'mar', 'apr', 'maí', 'jún', 'júl', 'ágú', 'sep', 'okt', 'nóv', 'des']
                    var monthsFull = ['janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní', 'júlí', 'ágúst', 'september', 'október', 'nóvember', 'desember']
                    var weekdays2char = ['su', 'má', 'þr', 'mi', 'fi', 'fö', 'la']
                    var weekdays3char = ['sun', 'mán', 'þri', 'mið', 'fim', 'fös', 'lau']
                    var weekdaysFull = ['sunnudaginn', 'mánudaginn', 'þriðjudaginn', 'miðvikudaginn', 'fimmtudaginn', 'föstudaginn', 'laugardaginn']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return '' + number
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 129 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'meno di un secondo',
                            other: 'meno di {{count}} secondi'
                        },

                        xSeconds: {
                            one: 'un secondo',
                            other: '{{count}} secondi'
                        },

                        halfAMinute: 'alcuni secondi',

                        lessThanXMinutes: {
                            one: 'meno di un minuto',
                            other: 'meno di {{count}} minuti'
                        },

                        xMinutes: {
                            one: 'un minuto',
                            other: '{{count}} minuti'
                        },

                        aboutXHours: {
                            one: 'circa un\'ora',
                            other: 'circa {{count}} ore'
                        },

                        xHours: {
                            one: 'un\'ora',
                            other: '{{count}} ore'
                        },

                        xDays: {
                            one: 'un giorno',
                            other: '{{count}} giorni'
                        },

                        aboutXMonths: {
                            one: 'circa un mese',
                            other: 'circa {{count}} mesi'
                        },

                        xMonths: {
                            one: 'un mese',
                            other: '{{count}} mesi'
                        },

                        aboutXYears: {
                            one: 'circa un anno',
                            other: 'circa {{count}} anni'
                        },

                        xYears: {
                            one: 'un anno',
                            other: '{{count}} anni'
                        },

                        overXYears: {
                            one: 'più di un anno',
                            other: 'più di {{count}} anni'
                        },

                        almostXYears: {
                            one: 'quasi un anno',
                            other: 'quasi {{count}} anni'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'tra ' + result
                            } else {
                                return result + ' fa'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 130 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic']
                    var monthsFull = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
                    var weekdays2char = ['do', 'lu', 'ma', 'me', 'gi', 've', 'sa']
                    var weekdays3char = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab']
                    var weekdaysFull = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + 'º'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 131 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: '1秒以下',
                            other: '{{count}}秒以下'
                        },

                        xSeconds: {
                            one: '1秒',
                            other: '{{count}}秒'
                        },

                        halfAMinute: '30秒ぐらい',

                        lessThanXMinutes: {
                            one: '1分以下',
                            other: '{{count}}分以下'
                        },

                        xMinutes: {
                            one: '1分',
                            other: '{{count}}分'
                        },

                        aboutXHours: {
                            one: '1時間ぐらい',
                            other: '{{count}}時間ぐらい'
                        },

                        xHours: {
                            one: '1時間',
                            other: '{{count}}時間'
                        },

                        xDays: {
                            one: '1日',
                            other: '{{count}}日'
                        },

                        aboutXMonths: {
                            one: '1ヶ月ぐらい',
                            other: '{{count}}ヶ月ぐらい'
                        },

                        xMonths: {
                            one: '1ヶ月',
                            other: '{{count}}ヶ月'
                        },

                        aboutXYears: {
                            one: '1年ぐらい',
                            other: '{{count}}年ぐらい'
                        },

                        xYears: {
                            one: '1年',
                            other: '{{count}}年'
                        },

                        overXYears: {
                            one: '1年以上',
                            other: '{{count}}年以上'
                        },

                        almostXYears: {
                            one: '1年以下',
                            other: '{{count}}年以下'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return result + '後'
                            } else {
                                return result + '前'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 132 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    var monthsFull = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                    var weekdays2char = ['日', '月', '火', '水', '木', '金', '土']
                    var weekdays3char = ['日曜', '月曜', '火曜', '水曜', '木曜', '金曜', '土曜']
                    var weekdaysFull = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
                    var meridiemUppercase = ['午前', '午後']
                    var meridiemLowercase = ['午前', '午後']
                    var meridiemFull = ['午前', '午後']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + '日'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 133 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: '1초 미만',
                            other: '{{count}}초 미만'
                        },

                        xSeconds: {
                            one: '1초',
                            other: '{{count}}초'
                        },

                        halfAMinute: '30초',

                        lessThanXMinutes: {
                            one: '1분 미만',
                            other: '{{count}}분 미만'
                        },

                        xMinutes: {
                            one: '1분',
                            other: '{{count}}분'
                        },

                        aboutXHours: {
                            one: '약 1시간',
                            other: '약 {{count}}시간'
                        },

                        xHours: {
                            one: '1시간',
                            other: '{{count}}시간'
                        },

                        xDays: {
                            one: '1일',
                            other: '{{count}}일'
                        },

                        aboutXMonths: {
                            one: '약 1개월',
                            other: '약 {{count}}개월'
                        },

                        xMonths: {
                            one: '1개월',
                            other: '{{count}}개월'
                        },

                        aboutXYears: {
                            one: '약 1년',
                            other: '약 {{count}}년'
                        },

                        xYears: {
                            one: '1년',
                            other: '{{count}}년'
                        },

                        overXYears: {
                            one: '1년 이상',
                            other: '{{count}}년 이상'
                        },

                        almostXYears: {
                            one: '거의 1년',
                            other: '거의 {{count}}년'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return result + ' 후'
                            } else {
                                return result + ' 전'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 134 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
                    var monthsFull = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
                    var weekdays2char = ['일', '월', '화', '수', '목', '금', '토']
                    var weekdays3char = ['일', '월', '화', '수', '목', '금', '토']
                    var weekdaysFull = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
                    var meridiemUppercase = ['오전', '오후']
                    var meridiemLowercase = ['오전', '오후']
                    var meridiemFull = ['오전', '오후']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + '일'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 135 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'помалку од секунда',
                            other: 'помалку од {{count}} секунди'
                        },

                        xSeconds: {
                            one: '1 секунда',
                            other: '{{count}} секунди'
                        },

                        halfAMinute: 'половина минута',

                        lessThanXMinutes: {
                            one: 'помалку од минута',
                            other: 'помалку од {{count}} минути'
                        },

                        xMinutes: {
                            one: '1 минута',
                            other: '{{count}} минути'
                        },

                        aboutXHours: {
                            one: 'околу 1 час',
                            other: 'околу {{count}} часа'
                        },

                        xHours: {
                            one: '1 час',
                            other: '{{count}} часа'
                        },

                        xDays: {
                            one: '1 ден',
                            other: '{{count}} дена'
                        },

                        aboutXMonths: {
                            one: 'околу 1 месец',
                            other: 'околу {{count}} месеци'
                        },

                        xMonths: {
                            one: '1 месец',
                            other: '{{count}} месеци'
                        },

                        aboutXYears: {
                            one: 'околу 1 година',
                            other: 'околу {{count}} години'
                        },

                        xYears: {
                            one: '1 година',
                            other: '{{count}} години'
                        },

                        overXYears: {
                            one: 'повеќе од 1 година',
                            other: 'повеќе од {{count}} години'
                        },

                        almostXYears: {
                            one: 'безмалку 1 година',
                            other: 'безмалку {{count}} години'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'за ' + result
                            } else {
                                return 'пред ' + result
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 136 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['јан', 'фев', 'мар', 'апр', 'мај', 'јун', 'јул', 'авг', 'сеп', 'окт', 'ное', 'дек']
                    var monthsFull = ['јануари', 'февруари', 'март', 'април', 'мај', 'јуни', 'јули', 'август', 'септември', 'октомври', 'ноември', 'декември']
                    var weekdays2char = ['не', 'по', 'вт', 'ср', 'че', 'пе', 'са']
                    var weekdays3char = ['нед', 'пон', 'вто', 'сре', 'чет', 'пет', 'саб']
                    var weekdaysFull = ['недела', 'понеделник', 'вторник', 'среда', 'четврток', 'петок', 'сабота']
                    var meridiem = ['претпладне', 'попладне']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiem[1] : meridiem[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiem[1] : meridiem[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiem[1] : meridiem[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    var rem100 = number % 100
                    if (rem100 > 20 || rem100 < 10) {
                        switch (rem100 % 10) {
                            case 1:
                                return number + '-ви'
                            case 2:
                                return number + '-ри'
                            case 7:
                            case 8:
                                return number + '-ми'
                        }
                    }
                    return number + '-ти'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 137 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'mindre enn ett sekund',
                            other: 'mindre enn {{count}} sekunder'
                        },

                        xSeconds: {
                            one: 'ett sekund',
                            other: '{{count}} sekunder'
                        },

                        halfAMinute: 'et halvt minutt',

                        lessThanXMinutes: {
                            one: 'mindre enn ett minutt',
                            other: 'mindre enn {{count}} minutter'
                        },

                        xMinutes: {
                            one: 'ett minutt',
                            other: '{{count}} minutter'
                        },

                        aboutXHours: {
                            one: 'rundt en time',
                            other: 'rundt {{count}} timer'
                        },

                        xHours: {
                            one: 'en time',
                            other: '{{count}} timer'
                        },

                        xDays: {
                            one: 'en dag',
                            other: '{{count}} dager'
                        },

                        aboutXMonths: {
                            one: 'rundt en måned',
                            other: 'rundt {{count}} måneder'
                        },

                        xMonths: {
                            one: 'en måned',
                            other: '{{count}} måneder'
                        },

                        aboutXYears: {
                            one: 'rundt ett år',
                            other: 'rundt {{count}} år'
                        },

                        xYears: {
                            one: 'ett år',
                            other: '{{count}} år'
                        },

                        overXYears: {
                            one: 'over ett år',
                            other: 'over {{count}} år'
                        },

                        almostXYears: {
                            one: 'nesten ett år',
                            other: 'nesten {{count}} år'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'om ' + result
                            } else {
                                return result + ' siden'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 138 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['jan.', 'feb.', 'mars', 'april', 'mai', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'des.']
                    var monthsFull = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']
                    var weekdays2char = ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø']
                    var weekdays3char = ['sø.', 'ma.', 'ti.', 'on.', 'to.', 'fr.', 'lø.']
                    var weekdaysFull = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + '.'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 139 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'minder dan een seconde',
                            other: 'minder dan {{count}} seconden'
                        },

                        xSeconds: {
                            one: '1 seconde',
                            other: '{{count}} seconden'
                        },

                        halfAMinute: 'een halve minuut',

                        lessThanXMinutes: {
                            one: 'minder dan een minuut',
                            other: 'minder dan {{count}} minuten'
                        },

                        xMinutes: {
                            one: 'een minuut',
                            other: '{{count}} minuten'
                        },

                        aboutXHours: {
                            one: 'ongeveer 1 uur',
                            other: 'ongeveer {{count}} uur'
                        },

                        xHours: {
                            one: '1 uur',
                            other: '{{count}} uur'
                        },

                        xDays: {
                            one: '1 dag',
                            other: '{{count}} dagen'
                        },

                        aboutXMonths: {
                            one: 'ongeveer 1 maand',
                            other: 'ongeveer {{count}} maanden'
                        },

                        xMonths: {
                            one: '1 maand',
                            other: '{{count}} maanden'
                        },

                        aboutXYears: {
                            one: 'ongeveer 1 jaar',
                            other: 'ongeveer {{count}} jaar'
                        },

                        xYears: {
                            one: '1 jaar',
                            other: '{{count}} jaar'
                        },

                        overXYears: {
                            one: 'meer dan 1 jaar',
                            other: 'meer dan {{count}} jaar'
                        },

                        almostXYears: {
                            one: 'bijna 1 jaar',
                            other: 'bijna {{count}} jaar'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'over ' + result
                            } else {
                                return result + ' geleden'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 140 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
                    var monthsFull = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
                    var weekdays2char = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za']
                    var weekdays3char = ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat']
                    var weekdaysFull = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + 'e'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 141 */
            /***/ (function (module, exports) {

                function declensionGroup(scheme, count) {
                    if (count === 1) {
                        return scheme.one
                    }

                    var rem100 = count % 100

                    // ends with 11-20
                    if (rem100 <= 20 && rem100 > 10) {
                        return scheme.other
                    }

                    var rem10 = rem100 % 10

                    // ends with 2, 3, 4
                    if (rem10 >= 2 && rem10 <= 4) {
                        return scheme.twoFour
                    }

                    return scheme.other
                }

                function declension(scheme, count, time) {
                    time = time || 'regular'
                    var group = declensionGroup(scheme, count)
                    var finalText = group[time] || group
                    return finalText.replace('{{count}}', count)
                }

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: {
                                regular: 'mniej niż sekunda',
                                past: 'mniej niż sekundę',
                                future: 'mniej niż sekundę'
                            },
                            twoFour: 'mniej niż {{count}} sekundy',
                            other: 'mniej niż {{count}} sekund'
                        },

                        xSeconds: {
                            one: {
                                regular: 'sekunda',
                                past: 'sekundę',
                                future: 'sekundę'
                            },
                            twoFour: '{{count}} sekundy',
                            other: '{{count}} sekund'
                        },

                        halfAMinute: {
                            one: 'pół minuty',
                            twoFour: 'pół minuty',
                            other: 'pół minuty'
                        },

                        lessThanXMinutes: {
                            one: {
                                regular: 'mniej niż minuta',
                                past: 'mniej niż minutę',
                                future: 'mniej niż minutę'
                            },
                            twoFour: 'mniej niż {{count}} minuty',
                            other: 'mniej niż {{count}} minut'
                        },

                        xMinutes: {
                            one: {
                                regular: 'minuta',
                                past: 'minutę',
                                future: 'minutę'
                            },
                            twoFour: '{{count}} minuty',
                            other: '{{count}} minut'
                        },

                        aboutXHours: {
                            one: {
                                regular: 'około godzina',
                                past: 'około godziny',
                                future: 'około godzinę'
                            },
                            twoFour: 'około {{count}} godziny',
                            other: 'około {{count}} godzin'
                        },

                        xHours: {
                            one: {
                                regular: 'godzina',
                                past: 'godzinę',
                                future: 'godzinę'
                            },
                            twoFour: '{{count}} godziny',
                            other: '{{count}} godzin'
                        },

                        xDays: {
                            one: {
                                regular: 'dzień',
                                past: 'dzień',
                                future: '1 dzień'
                            },
                            twoFour: '{{count}} dni',
                            other: '{{count}} dni'
                        },

                        aboutXMonths: {
                            one: 'około miesiąc',
                            twoFour: 'około {{count}} miesiące',
                            other: 'około {{count}} miesięcy'
                        },

                        xMonths: {
                            one: 'miesiąc',
                            twoFour: '{{count}} miesiące',
                            other: '{{count}} miesięcy'
                        },

                        aboutXYears: {
                            one: 'około rok',
                            twoFour: 'około {{count}} lata',
                            other: 'około {{count}} lat'
                        },

                        xYears: {
                            one: 'rok',
                            twoFour: '{{count}} lata',
                            other: '{{count}} lat'
                        },

                        overXYears: {
                            one: 'ponad rok',
                            twoFour: 'ponad {{count}} lata',
                            other: 'ponad {{count}} lat'
                        },

                        almostXYears: {
                            one: 'prawie rok',
                            twoFour: 'prawie {{count}} lata',
                            other: 'prawie {{count}} lat'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var scheme = distanceInWordsLocale[token]
                        if (!options.addSuffix) {
                            return declension(scheme, count)
                        }

                        if (options.comparison > 0) {
                            return 'za ' + declension(scheme, count, 'future')
                        } else {
                            return declension(scheme, count, 'past') + ' temu'
                        }
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 142 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru']
                    var monthsFull = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień']
                    var weekdays2char = ['nd', 'pn', 'wt', 'śr', 'cz', 'pt', 'sb']
                    var weekdays3char = ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'piąt.', 'sob.']
                    var weekdaysFull = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota']
                    var meridiem = ['w nocy', 'rano', 'po południu', 'wieczorem']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // Time of day
                        'A': function (date) {
                            var hours = date.getHours()
                            if (hours >= 17) {
                                return meridiem[3]
                            } else if (hours >= 12) {
                                return meridiem[2]
                            } else if (hours >= 4) {
                                return meridiem[1]
                            } else {
                                return meridiem[0]
                            }
                        }
                    }

                    formatters.a = formatters.A
                    formatters.aa = formatters.A

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            // Well, it should be just a number without any suffix
                            return formatters[formatterToken](date).toString()
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 143 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'menos de um segundo',
                            other: 'menos de {{count}} segundos'
                        },

                        xSeconds: {
                            one: '1 segundo',
                            other: '{{count}} segundos'
                        },

                        halfAMinute: 'meio minuto',

                        lessThanXMinutes: {
                            one: 'menos de um minuto',
                            other: 'menos de {{count}} minutos'
                        },

                        xMinutes: {
                            one: '1 minuto',
                            other: '{{count}} minutos'
                        },

                        aboutXHours: {
                            one: 'aproximadamente 1 hora',
                            other: 'aproximadamente {{count}} horas'
                        },

                        xHours: {
                            one: '1 hora',
                            other: '{{count}} horas'
                        },

                        xDays: {
                            one: '1 dia',
                            other: '{{count}} dias'
                        },

                        aboutXMonths: {
                            one: 'aproximadamente 1 mês',
                            other: 'aproximadamente {{count}} meses'
                        },

                        xMonths: {
                            one: '1 mês',
                            other: '{{count}} meses'
                        },

                        aboutXYears: {
                            one: 'aproximadamente 1 ano',
                            other: 'aproximadamente {{count}} anos'
                        },

                        xYears: {
                            one: '1 ano',
                            other: '{{count}} anos'
                        },

                        overXYears: {
                            one: 'mais de 1 ano',
                            other: 'mais de {{count}} anos'
                        },

                        almostXYears: {
                            one: 'quase 1 ano',
                            other: 'quase {{count}} anos'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'daqui a ' + result
                            } else {
                                return 'há ' + result
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 144 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
                    var monthsFull = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
                    var weekdays2char = ['do', 'se', 'te', 'qa', 'qi', 'se', 'sa']
                    var weekdays3char = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
                    var weekdaysFull = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + 'º'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 145 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'mai puțin de o secundă',
                            other: 'mai puțin de {{count}} secunde'
                        },

                        xSeconds: {
                            one: '1 secundă',
                            other: '{{count}} secunde'
                        },

                        halfAMinute: 'jumătate de minut',

                        lessThanXMinutes: {
                            one: 'mai puțin de un minut',
                            other: 'mai puțin de {{count}} minute'
                        },

                        xMinutes: {
                            one: '1 minut',
                            other: '{{count}} minute'
                        },

                        aboutXHours: {
                            one: 'circa 1 oră',
                            other: 'circa {{count}} ore'
                        },

                        xHours: {
                            one: '1 oră',
                            other: '{{count}} ore'
                        },

                        xDays: {
                            one: '1 zi',
                            other: '{{count}} zile'
                        },

                        aboutXMonths: {
                            one: 'circa 1 lună',
                            other: 'circa {{count}} luni'
                        },

                        xMonths: {
                            one: '1 lună',
                            other: '{{count}} luni'
                        },

                        aboutXYears: {
                            one: 'circa 1 an',
                            other: 'circa {{count}} ani'
                        },

                        xYears: {
                            one: '1 an',
                            other: '{{count}} ani'
                        },

                        overXYears: {
                            one: 'peste 1 an',
                            other: 'peste {{count}} ani'
                        },

                        almostXYears: {
                            one: 'aproape 1 an',
                            other: 'aproape {{count}} ani'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'în ' + result
                            } else {
                                return result + ' în urmă'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 146 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    // Note: in Romanian language the weekdays and months should be in the lowercase.
                    var months3char = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec']
                    var monthsFull = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie']
                    var weekdays2char = ['du', 'lu', 'ma', 'mi', 'jo', 'vi', 'sâ']
                    var weekdays3char = ['dum', 'lun', 'mar', 'mie', 'joi', 'vin', 'sâm']
                    var weekdaysFull = ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbăta']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number.toString()
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 147 */
            /***/ (function (module, exports) {

                function declension(scheme, count) {
                    // scheme for count=1 exists
                    if (scheme.one !== undefined && count === 1) {
                        return scheme.one
                    }

                    var rem10 = count % 10
                    var rem100 = count % 100

                    // 1, 21, 31, ...
                    if (rem10 === 1 && rem100 !== 11) {
                        return scheme.singularNominative.replace('{{count}}', count)

                        // 2, 3, 4, 22, 23, 24, 32 ...
                    } else if ((rem10 >= 2 && rem10 <= 4) && (rem100 < 10 || rem100 > 20)) {
                        return scheme.singularGenitive.replace('{{count}}', count)

                        // 5, 6, 7, 8, 9, 10, 11, ...
                    } else {
                        return scheme.pluralGenitive.replace('{{count}}', count)
                    }
                }

                function buildLocalizeTokenFn(scheme) {
                    return function (count, options) {
                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                if (scheme.future) {
                                    return declension(scheme.future, count)
                                } else {
                                    return 'через ' + declension(scheme.regular, count)
                                }
                            } else {
                                if (scheme.past) {
                                    return declension(scheme.past, count)
                                } else {
                                    return declension(scheme.regular, count) + ' назад'
                                }
                            }
                        } else {
                            return declension(scheme.regular, count)
                        }
                    }
                }

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: buildLocalizeTokenFn({
                            regular: {
                                one: 'меньше секунды',
                                singularNominative: 'меньше {{count}} секунды',
                                singularGenitive: 'меньше {{count}} секунд',
                                pluralGenitive: 'меньше {{count}} секунд'
                            },
                            future: {
                                one: 'меньше, чем через секунду',
                                singularNominative: 'меньше, чем через {{count}} секунду',
                                singularGenitive: 'меньше, чем через {{count}} секунды',
                                pluralGenitive: 'меньше, чем через {{count}} секунд'
                            }
                        }),

                        xSeconds: buildLocalizeTokenFn({
                            regular: {
                                singularNominative: '{{count}} секунда',
                                singularGenitive: '{{count}} секунды',
                                pluralGenitive: '{{count}} секунд'
                            },
                            past: {
                                singularNominative: '{{count}} секунду назад',
                                singularGenitive: '{{count}} секунды назад',
                                pluralGenitive: '{{count}} секунд назад'
                            },
                            future: {
                                singularNominative: 'через {{count}} секунду',
                                singularGenitive: 'через {{count}} секунды',
                                pluralGenitive: 'через {{count}} секунд'
                            }
                        }),

                        halfAMinute: function (_, options) {
                            if (options.addSuffix) {
                                if (options.comparison > 0) {
                                    return 'через полминуты'
                                } else {
                                    return 'полминуты назад'
                                }
                            }

                            return 'полминуты'
                        },

                        lessThanXMinutes: buildLocalizeTokenFn({
                            regular: {
                                one: 'меньше минуты',
                                singularNominative: 'меньше {{count}} минуты',
                                singularGenitive: 'меньше {{count}} минут',
                                pluralGenitive: 'меньше {{count}} минут'
                            },
                            future: {
                                one: 'меньше, чем через минуту',
                                singularNominative: 'меньше, чем через {{count}} минуту',
                                singularGenitive: 'меньше, чем через {{count}} минуты',
                                pluralGenitive: 'меньше, чем через {{count}} минут'
                            }
                        }),

                        xMinutes: buildLocalizeTokenFn({
                            regular: {
                                singularNominative: '{{count}} минута',
                                singularGenitive: '{{count}} минуты',
                                pluralGenitive: '{{count}} минут'
                            },
                            past: {
                                singularNominative: '{{count}} минуту назад',
                                singularGenitive: '{{count}} минуты назад',
                                pluralGenitive: '{{count}} минут назад'
                            },
                            future: {
                                singularNominative: 'через {{count}} минуту',
                                singularGenitive: 'через {{count}} минуты',
                                pluralGenitive: 'через {{count}} минут'
                            }
                        }),

                        aboutXHours: buildLocalizeTokenFn({
                            regular: {
                                singularNominative: 'около {{count}} часа',
                                singularGenitive: 'около {{count}} часов',
                                pluralGenitive: 'около {{count}} часов'
                            },
                            future: {
                                singularNominative: 'приблизительно через {{count}} час',
                                singularGenitive: 'приблизительно через {{count}} часа',
                                pluralGenitive: 'приблизительно через {{count}} часов'
                            }
                        }),

                        xHours: buildLocalizeTokenFn({
                            regular: {
                                singularNominative: '{{count}} час',
                                singularGenitive: '{{count}} часа',
                                pluralGenitive: '{{count}} часов'
                            }
                        }),

                        xDays: buildLocalizeTokenFn({
                            regular: {
                                singularNominative: '{{count}} день',
                                singularGenitive: '{{count}} дня',
                                pluralGenitive: '{{count}} дней'
                            }
                        }),

                        aboutXMonths: buildLocalizeTokenFn({
                            regular: {
                                singularNominative: 'около {{count}} месяца',
                                singularGenitive: 'около {{count}} месяцев',
                                pluralGenitive: 'около {{count}} месяцев'
                            },
                            future: {
                                singularNominative: 'приблизительно через {{count}} месяц',
                                singularGenitive: 'приблизительно через {{count}} месяца',
                                pluralGenitive: 'приблизительно через {{count}} месяцев'
                            }
                        }),

                        xMonths: buildLocalizeTokenFn({
                            regular: {
                                singularNominative: '{{count}} месяц',
                                singularGenitive: '{{count}} месяца',
                                pluralGenitive: '{{count}} месяцев'
                            }
                        }),

                        aboutXYears: buildLocalizeTokenFn({
                            regular: {
                                singularNominative: 'около {{count}} года',
                                singularGenitive: 'около {{count}} лет',
                                pluralGenitive: 'около {{count}} лет'
                            },
                            future: {
                                singularNominative: 'приблизительно через {{count}} год',
                                singularGenitive: 'приблизительно через {{count}} года',
                                pluralGenitive: 'приблизительно через {{count}} лет'
                            }
                        }),

                        xYears: buildLocalizeTokenFn({
                            regular: {
                                singularNominative: '{{count}} год',
                                singularGenitive: '{{count}} года',
                                pluralGenitive: '{{count}} лет'
                            }
                        }),

                        overXYears: buildLocalizeTokenFn({
                            regular: {
                                singularNominative: 'больше {{count}} года',
                                singularGenitive: 'больше {{count}} лет',
                                pluralGenitive: 'больше {{count}} лет'
                            },
                            future: {
                                singularNominative: 'больше, чем через {{count}} год',
                                singularGenitive: 'больше, чем через {{count}} года',
                                pluralGenitive: 'больше, чем через {{count}} лет'
                            }
                        }),

                        almostXYears: buildLocalizeTokenFn({
                            regular: {
                                singularNominative: 'почти {{count}} год',
                                singularGenitive: 'почти {{count}} года',
                                pluralGenitive: 'почти {{count}} лет'
                            },
                            future: {
                                singularNominative: 'почти через {{count}} год',
                                singularGenitive: 'почти через {{count}} года',
                                pluralGenitive: 'почти через {{count}} лет'
                            }
                        })
                    }

                    function localize(token, count, options) {
                        options = options || {}
                        return distanceInWordsLocale[token](count, options)
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 148 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    // http://new.gramota.ru/spravka/buro/search-answer?s=242637
                    var monthsShort = ['янв.', 'фев.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.']
                    var monthsFull = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
                    var monthsGenitive = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
                    var weekdays2char = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
                    var weekdays3char = ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'суб']
                    var weekdaysFull = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
                    var meridiem = ['ночи', 'утра', 'дня', 'вечера']

                    var formatters = {
                        // Month: янв., фев., ..., дек.
                        'MMM': function (date) {
                            return monthsShort[date.getMonth()]
                        },

                        // Month: январь, февраль, ..., декабрь
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: вс, пн, ..., сб
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: вск, пнд, ..., суб
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: воскресенье, понедельник, ..., суббота
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // Time of day: ночи, утра, дня, вечера
                        'A': function (date) {
                            var hours = date.getHours()
                            if (hours >= 17) {
                                return meridiem[3]
                            } else if (hours >= 12) {
                                return meridiem[2]
                            } else if (hours >= 4) {
                                return meridiem[1]
                            } else {
                                return meridiem[0]
                            }
                        },

                        'Do': function (date, formatters) {
                            return formatters.D(date) + '-е'
                        },

                        'Wo': function (date, formatters) {
                            return formatters.W(date) + '-я'
                        }
                    }

                    formatters.a = formatters.A
                    formatters.aa = formatters.A

                    // Generate ordinal version of formatters: M -> Mo, DDD -> DDDo, etc.
                    var ordinalFormatters = ['M', 'DDD', 'd', 'Q']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return formatters[formatterToken](date) + '-й'
                        }
                    })

                    // Generate formatters like 'D MMMM',
                    // where month is in the genitive case: января, февраля, ..., декабря
                    var monthsGenitiveFormatters = ['D', 'Do', 'DD']
                    monthsGenitiveFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + ' MMMM'] = function (date, commonFormatters) {
                            var formatter = formatters[formatterToken] || commonFormatters[formatterToken]
                            return formatter(date, commonFormatters) + ' ' + monthsGenitive[date.getMonth()]
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 149 */
            /***/ (function (module, exports) {

                function declensionGroup(scheme, count) {
                    if (count === 1) {
                        return scheme.one
                    }

                    if (count >= 2 && count <= 4) {
                        return scheme.twoFour
                    }

                    // if count === null || count === 0 || count >= 5
                    return scheme.other
                }

                function declension(scheme, count, time) {
                    var group = declensionGroup(scheme, count)
                    var finalText = group[time] || group
                    return finalText.replace('{{count}}', count)
                }

                function extractPreposition(token) {
                    var result = ['lessThan', 'about', 'over', 'almost'].filter(function (preposition) {
                        return !!token.match(new RegExp('^' + preposition))
                    })

                    return result[0]
                }

                function prefixPreposition(preposition) {
                    var translation = ''

                    if (preposition === 'almost') {
                        translation = 'takmer'
                    }

                    if (preposition === 'about') {
                        translation = 'približne'
                    }

                    return translation.length > 0 ? translation + ' ' : ''
                }

                function suffixPreposition(preposition) {
                    var translation = ''

                    if (preposition === 'lessThan') {
                        translation = 'menej než'
                    }

                    if (preposition === 'over') {
                        translation = 'viac než'
                    }

                    return translation.length > 0 ? translation + ' ' : ''
                }

                function lowercaseFirstLetter(string) {
                    return string.charAt(0).toLowerCase() + string.slice(1)
                }

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        xSeconds: {
                            one: {
                                regular: 'sekunda',
                                past: 'sekundou',
                                future: 'sekundu'
                            },
                            twoFour: {
                                regular: '{{count}} sekundy',
                                past: '{{count}} sekundami',
                                future: '{{count}} sekundy'
                            },
                            other: {
                                regular: '{{count}} sekúnd',
                                past: '{{count}} sekundami',
                                future: '{{count}} sekúnd'
                            }
                        },

                        halfAMinute: {
                            other: {
                                regular: 'pol minúty',
                                past: 'pol minútou',
                                future: 'pol minúty'
                            }
                        },

                        xMinutes: {
                            one: {
                                regular: 'minúta',
                                past: 'minútou',
                                future: 'minútu'
                            },
                            twoFour: {
                                regular: '{{count}} minúty',
                                past: '{{count}} minútami',
                                future: '{{count}} minúty'
                            },
                            other: {
                                regular: '{{count}} minút',
                                past: '{{count}} minútami',
                                future: '{{count}} minút'
                            }
                        },

                        xHours: {
                            one: {
                                regular: 'hodina',
                                past: 'hodinou',
                                future: 'hodinu'
                            },
                            twoFour: {
                                regular: '{{count}} hodiny',
                                past: '{{count}} hodinami',
                                future: '{{count}} hodiny'
                            },
                            other: {
                                regular: '{{count}} hodín',
                                past: '{{count}} hodinami',
                                future: '{{count}} hodín'
                            }
                        },

                        xDays: {
                            one: {
                                regular: 'deň',
                                past: 'dňom',
                                future: 'deň'
                            },
                            twoFour: {
                                regular: '{{count}} dni',
                                past: '{{count}} dňami',
                                future: '{{count}} dni'
                            },
                            other: {
                                regular: '{{count}} dní',
                                past: '{{count}} dňami',
                                future: '{{count}} dní'
                            }
                        },

                        xMonths: {
                            one: {
                                regular: 'mesiac',
                                past: 'mesiacom',
                                future: 'mesiac'
                            },
                            twoFour: {
                                regular: '{{count}} mesiace',
                                past: '{{count}} mesiacmi',
                                future: '{{count}} mesiace'
                            },
                            other: {
                                regular: '{{count}} mesiacov',
                                past: '{{count}} mesiacmi',
                                future: '{{count}} mesiacov'
                            }
                        },

                        xYears: {
                            one: {
                                regular: 'rok',
                                past: 'rokom',
                                future: 'rok'
                            },
                            twoFour: {
                                regular: '{{count}} roky',
                                past: '{{count}} rokmi',
                                future: '{{count}} roky'
                            },
                            other: {
                                regular: '{{count}} rokov',
                                past: '{{count}} rokmi',
                                future: '{{count}} rokov'
                            }
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var preposition = extractPreposition(token) || ''
                        var key = lowercaseFirstLetter(token.substring(preposition.length))
                        var scheme = distanceInWordsLocale[key]

                        if (!options.addSuffix) {
                            return prefixPreposition(preposition) + suffixPreposition(preposition) + declension(scheme, count, 'regular')
                        }

                        if (options.comparison > 0) {
                            return prefixPreposition(preposition) + 'za ' + suffixPreposition(preposition) + declension(scheme, count, 'future')
                        } else {
                            return prefixPreposition(preposition) + 'pred ' + suffixPreposition(preposition) + declension(scheme, count, 'past')
                        }
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 150 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec']
                    var monthsFull = ['január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december']
                    var weekdays2char = ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so']
                    var weekdays3char = ['neď', 'pon', 'uto', 'str', 'štv', 'pia', 'sob']
                    var weekdaysFull = ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: jan, feb, ..., dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: január, február, ..., december
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: ne, po, ..., so
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: neď, pon, ..., sob
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: neďeľa, pondelok, ..., sobota
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + '.'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 151 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'manj kot sekunda',
                            two: 'manj kot 2 sekundi',
                            three: 'manj kot {{count}} sekunde',
                            other: 'manj kot {{count}} sekund'
                        },

                        xSeconds: {
                            one: '1 sekunda',
                            two: '2 sekundi',
                            three: '{{count}} sekunde',
                            other: '{{count}} sekund'
                        },

                        halfAMinute: 'pol minute',

                        lessThanXMinutes: {
                            one: 'manj kot minuta',
                            two: 'manj kot 2 minuti',
                            three: 'manj kot {{count}} minute',
                            other: 'manj kot {{count}} minut'
                        },

                        xMinutes: {
                            one: '1 minuta',
                            two: '2 minuti',
                            three: '{{count}} minute',
                            other: '{{count}} minut'
                        },

                        aboutXHours: {
                            one: 'približno 1 ura',
                            two: 'približno 2 uri',
                            three: 'približno {{count}} ure',
                            other: 'približno {{count}} ur'
                        },

                        xHours: {
                            one: '1 ura',
                            two: '2 uri',
                            three: '{{count}} ure',
                            other: '{{count}} ur'
                        },

                        xDays: {
                            one: '1 dan',
                            two: '2 dni',
                            three: '{{count}} dni',
                            other: '{{count}} dni'
                        },

                        aboutXMonths: {
                            one: 'približno 1 mesec',
                            two: 'približno 2 meseca',
                            three: 'približno {{count}} mesece',
                            other: 'približno {{count}} mesecev'
                        },

                        xMonths: {
                            one: '1 mesec',
                            two: '2 meseca',
                            three: '{{count}} meseci',
                            other: '{{count}} mesecev'
                        },

                        aboutXYears: {
                            one: 'približno 1 leto',
                            two: 'približno 2 leti',
                            three: 'približno {{count}} leta',
                            other: 'približno {{count}} let'
                        },

                        xYears: {
                            one: '1 leto',
                            two: '2 leti',
                            three: '{{count}} leta',
                            other: '{{count}} let'
                        },

                        overXYears: {
                            one: 'več kot 1 leto',
                            two: 'več kot 2 leti',
                            three: 'več kot {{count}} leta',
                            other: 'več kot {{count}} let'
                        },

                        almostXYears: {
                            one: 'skoraj 1 leto',
                            two: 'skoraj 2 leti',
                            three: 'skoraj {{count}} leta',
                            other: 'skoraj {{count}} let'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else if (count === 2) {
                            result = distanceInWordsLocale[token].two
                        } else if (count === 3 || count === 4) {
                            result = distanceInWordsLocale[token].three.replace('{{count}}', count)
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            result = result.replace(/(minut|sekund|ur)(a)/, '$1o')
                            if (token === 'xMonths') {
                                result = result.replace(/(mesec)(i)/, '$1e')
                            }
                            if (options.comparison > 0) {
                                return 'čez ' + result
                            } else {
                                return result + ' nazaj'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 152 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec']
                    var monthsFull = ['januar', 'februar', 'marec', 'april', 'maj', 'junij', 'julij', 'avgust', 'september', 'oktober', 'november', 'december']
                    var weekdays2char = ['ne', 'po', 'to', 'sr', 'če', 'pe', 'so']
                    var weekdays3char = ['ned', 'pon', 'tor', 'sre', 'čet', 'pet', 'sob']
                    var weekdaysFull = ['nedelja', 'ponedeljek', 'torek', 'sreda', 'četrtek', 'petek', 'sobota']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['a.m.', 'p.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number + '.'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 153 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            singular: 'mindre än en sekund',
                            plural: 'mindre än {{count}} sekunder'
                        },

                        xSeconds: {
                            singular: 'en sekund',
                            plural: '{{count}} sekunder'
                        },

                        halfAMinute: 'en halv minut',

                        lessThanXMinutes: {
                            singular: 'mindre än en minut',
                            plural: 'mindre än {{count}} minuter'
                        },

                        xMinutes: {
                            singular: 'en minut',
                            plural: '{{count}} minuter'
                        },

                        aboutXHours: {
                            singular: 'ungefär en timme',
                            plural: 'ungefär {{count}} timmar'
                        },

                        xHours: {
                            singular: 'en timme',
                            plural: '{{count}} timmar'
                        },

                        xDays: {
                            singular: 'en dag',
                            plural: '{{count}} dagar'
                        },

                        aboutXMonths: {
                            singular: 'ungefär en månad',
                            plural: 'ungefär {{count}} månader'
                        },

                        xMonths: {
                            singular: 'en månad',
                            plural: '{{count}} månader'
                        },

                        aboutXYears: {
                            singular: 'ungefär ett år',
                            plural: 'ungefär {{count}} år'
                        },

                        xYears: {
                            singular: 'ett år',
                            plural: '{{count}} år'
                        },

                        overXYears: {
                            singular: 'över ett år',
                            plural: 'över {{count}} år'
                        },

                        almostXYears: {
                            singular: 'nästan ett år',
                            plural: 'nästan {{count}} år'
                        }
                    }

                    var wordMapping = [
                        'noll',
                        'en',
                        'två',
                        'tre',
                        'fyra',
                        'fem',
                        'sex',
                        'sju',
                        'åtta',
                        'nio',
                        'tio',
                        'elva',
                        'tolv'
                    ]

                    function localize(token, count, options) {
                        options = options || {}

                        var translation = distanceInWordsLocale[token]
                        var result
                        if (typeof translation === 'string') {
                            result = translation
                        } else if (count === 0 || count > 1) {
                            result = translation.plural.replace('{{count}}', count < 13 ? wordMapping[count] : count)
                        } else {
                            result = translation.singular
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return 'om ' + result
                            } else {
                                return result + ' sedan'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 154 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
                    var monthsFull = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']
                    var weekdays2char = ['sö', 'må', 'ti', 'on', 'to', 'fr', 'lö']
                    var weekdays3char = ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör']
                    var weekdaysFull = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag']
                    var meridiemFull = ['f.m.', 'e.m.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    formatters.A = formatters.aa
                    formatters.a = formatters.aa

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    var rem100 = number % 100
                    if (rem100 > 20 || rem100 < 10) {
                        switch (rem100 % 10) {
                            case 1:
                            case 2:
                                return number + ':a'
                        }
                    }
                    return number + ':e'
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 155 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'น้อยกว่า 1 วินาที',
                            other: 'น้อยกว่า {{count}} วินาที'
                        },

                        xSeconds: {
                            one: '1 วินาที',
                            other: '{{count}} วินาที'
                        },

                        halfAMinute: 'ครึ่งนาที',

                        lessThanXMinutes: {
                            one: 'น้อยกว่า 1 นาที',
                            other: 'น้อยกว่า {{count}} นาที'
                        },

                        xMinutes: {
                            one: '1 นาที',
                            other: '{{count}} นาที'
                        },

                        aboutXHours: {
                            one: 'ประมาณ 1 ชั่วโมง',
                            other: 'ประมาณ {{count}} ชั่วโมง'
                        },

                        xHours: {
                            one: '1 ชั่วโมง',
                            other: '{{count}} ชั่วโมง'
                        },

                        xDays: {
                            one: '1 วัน',
                            other: '{{count}} วัน'
                        },

                        aboutXMonths: {
                            one: 'ประมาณ 1 เดือน',
                            other: 'ประมาณ {{count}} เดือน'
                        },

                        xMonths: {
                            one: '1 เดือน',
                            other: '{{count}} เดือน'
                        },

                        aboutXYears: {
                            one: 'ประมาณ 1 ปี',
                            other: 'ประมาณ {{count}} ปี'
                        },

                        xYears: {
                            one: '1 ปี',
                            other: '{{count}} ปี'
                        },

                        overXYears: {
                            one: 'มากกว่า 1 ปี',
                            other: 'มากกว่า {{count}} ปี'
                        },

                        almostXYears: {
                            one: 'เกือบ 1 ปี',
                            other: 'เกือบ {{count}} ปี'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                if (token === 'halfAMinute') {
                                    return 'ใน' + result
                                } else {
                                    return 'ใน ' + result
                                }
                            } else {
                                return result + 'ที่ผ่านมา'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 156 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
                    var monthsFull = ['มกราคาม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
                    var weekdays2char = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
                    var weekdays3char = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
                    var weekdaysFull = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
                    var meridiemUppercase = ['น.']
                    var meridiemLowercase = ['น.']
                    var meridiemFull = ['นาฬิกา']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return meridiemFull[0]
                        }
                    }

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 157 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: 'bir saniyeden az',
                            other: '{{count}} saniyeden az'
                        },

                        xSeconds: {
                            one: '1 saniye',
                            other: '{{count}} saniye'
                        },

                        halfAMinute: 'yarım dakika',

                        lessThanXMinutes: {
                            one: 'bir dakikadan az',
                            other: '{{count}} dakikadan az'
                        },

                        xMinutes: {
                            one: '1 dakika',
                            other: '{{count}} dakika'
                        },

                        aboutXHours: {
                            one: 'yaklaşık 1 saat',
                            other: 'yaklaşık {{count}} saat'
                        },

                        xHours: {
                            one: '1 saat',
                            other: '{{count}} saat'
                        },

                        xDays: {
                            one: '1 gün',
                            other: '{{count}} gün'
                        },

                        aboutXMonths: {
                            one: 'yaklaşık 1 ay',
                            other: 'yaklaşık {{count}} ay'
                        },

                        xMonths: {
                            one: '1 ay',
                            other: '{{count}} ay'
                        },

                        aboutXYears: {
                            one: 'yaklaşık 1 yıl',
                            other: 'yaklaşık {{count}} yıl'
                        },

                        xYears: {
                            one: '1 yıl',
                            other: '{{count}} yıl'
                        },

                        overXYears: {
                            one: '1 yıldan fazla',
                            other: '{{count}} yıldan fazla'
                        },

                        almostXYears: {
                            one: 'neredeyse 1 yıl',
                            other: 'neredeyse {{count}} yıl'
                        }
                    }

                    var extraWordTokens = [
                        'lessThanXSeconds',
                        'lessThanXMinutes',
                        'overXYears'
                    ]

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            var extraWord = ''
                            if (extraWordTokens.indexOf(token) > -1) {
                                extraWord = ' bir süre'
                            }

                            if (options.comparison > 0) {
                                return result + extraWord + ' içinde'
                            } else {
                                return result + extraWord + ' önce'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 158 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    // Note: in Turkish, the names of days of the week and months are capitalized.
                    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
                    // Generally, formatted dates should look like they are in the middle of a sentence,
                    // e.g. in Spanish language the weekdays and months should be in the lowercase.
                    var months3char = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
                    var monthsFull = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
                    var weekdays2char = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct']
                    var weekdays3char = ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts']
                    var weekdaysFull = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
                    var meridiemUppercase = ['ÖÖ', 'ÖS']
                    var meridiemLowercase = ['öö', 'ös']
                    var meridiemFull = ['ö.ö.', 'ö.s.']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    var suffixes = {
                        1: '\'inci',
                        2: '\'inci',
                        3: '\'üncü',
                        4: '\'üncü',
                        5: '\'inci',
                        6: '\'ıncı',
                        7: '\'inci',
                        8: '\'inci',
                        9: '\'uncu',
                        10: '\'uncu',
                        20: '\'inci',
                        30: '\'uncu',
                        50: '\'inci',
                        60: '\'ıncı',
                        70: '\'inci',
                        80: '\'inci',
                        90: '\'ıncı',
                        100: '\'üncü'
                    }

                    if (number === 0) {
                        return '0\'ıncı'
                    }

                    var x = number % 10
                    var y = number % 100 - x
                    var z = number >= 100 ? 100 : null

                    return number + (suffixes[x] || suffixes[y] || suffixes[z])
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 159 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: '不到 1 秒',
                            other: '不到 {{count}} 秒'
                        },

                        xSeconds: {
                            one: '1 秒',
                            other: '{{count}} 秒'
                        },

                        halfAMinute: '半分钟',

                        lessThanXMinutes: {
                            one: '不到 1 分钟',
                            other: '不到 {{count}} 分钟'
                        },

                        xMinutes: {
                            one: '1 分钟',
                            other: '{{count}} 分钟'
                        },

                        xHours: {
                            one: '1 小时',
                            other: '{{count}} 小时'
                        },

                        aboutXHours: {
                            one: '大约 1 小时',
                            other: '大约 {{count}} 小时'
                        },

                        xDays: {
                            one: '1 天',
                            other: '{{count}} 天'
                        },

                        aboutXMonths: {
                            one: '大约 1 个月',
                            other: '大约 {{count}} 个月'
                        },

                        xMonths: {
                            one: '1 个月',
                            other: '{{count}} 个月'
                        },

                        aboutXYears: {
                            one: '大约 1 年',
                            other: '大约 {{count}} 年'
                        },

                        xYears: {
                            one: '1 年',
                            other: '{{count}} 年'
                        },

                        overXYears: {
                            one: '超过 1 年',
                            other: '超过 {{count}} 年'
                        },

                        almostXYears: {
                            one: '将近 1 年',
                            other: '将近 {{count}} 年'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return result + '内'
                            } else {
                                return result + '前'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 160 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    var monthsFull = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                    var weekdays2char = ['日', '一', '二', '三', '四', '五', '六']
                    var weekdays3char = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
                    var weekdaysFull = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                    var meridiemFull = ['上午', '下午']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        }
                    }

                    // AM, PM / am, pm / a.m., p.m. all translates to 上午, 下午
                    formatters.a = formatters.aa = formatters.A = function (date) {
                        return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number.toString()
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 161 */
            /***/ (function (module, exports) {

                function buildDistanceInWordsLocale() {
                    var distanceInWordsLocale = {
                        lessThanXSeconds: {
                            one: '少於 1 秒',
                            other: '少於 {{count}} 秒'
                        },

                        xSeconds: {
                            one: '1 秒',
                            other: '{{count}} 秒'
                        },

                        halfAMinute: '半分鐘',

                        lessThanXMinutes: {
                            one: '少於 1 分鐘',
                            other: '少於 {{count}} 分鐘'
                        },

                        xMinutes: {
                            one: '1 分鐘',
                            other: '{{count}} 分鐘'
                        },

                        xHours: {
                            one: '1 小時',
                            other: '{{count}} 小時'
                        },

                        aboutXHours: {
                            one: '大約 1 小時',
                            other: '大約 {{count}} 小時'
                        },

                        xDays: {
                            one: '1 天',
                            other: '{{count}} 天'
                        },

                        aboutXMonths: {
                            one: '大約 1 個月',
                            other: '大約 {{count}} 個月'
                        },

                        xMonths: {
                            one: '1 個月',
                            other: '{{count}} 個月'
                        },

                        aboutXYears: {
                            one: '大約 1 年',
                            other: '大約 {{count}} 年'
                        },

                        xYears: {
                            one: '1 年',
                            other: '{{count}} 年'
                        },

                        overXYears: {
                            one: '超過 1 年',
                            other: '超過 {{count}} 年'
                        },

                        almostXYears: {
                            one: '將近 1 年',
                            other: '將近 {{count}} 年'
                        }
                    }

                    function localize(token, count, options) {
                        options = options || {}

                        var result
                        if (typeof distanceInWordsLocale[token] === 'string') {
                            result = distanceInWordsLocale[token]
                        } else if (count === 1) {
                            result = distanceInWordsLocale[token].one
                        } else {
                            result = distanceInWordsLocale[token].other.replace('{{count}}', count)
                        }

                        if (options.addSuffix) {
                            if (options.comparison > 0) {
                                return result + '內'
                            } else {
                                return result + '前'
                            }
                        }

                        return result
                    }

                    return {
                        localize: localize
                    }
                }

                module.exports = buildDistanceInWordsLocale


                /***/
            }),
            /* 162 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildFormattingTokensRegExp = __webpack_require__(2)

                function buildFormatLocale() {
                    var months3char = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    var monthsFull = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                    var weekdays2char = ['日', '一', '二', '三', '四', '五', '六']
                    var weekdays3char = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
                    var weekdaysFull = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                    var meridiemUppercase = ['AM', 'PM']
                    var meridiemLowercase = ['am', 'pm']
                    var meridiemFull = ['上午', '下午']

                    var formatters = {
                        // Month: Jan, Feb, ..., Dec
                        'MMM': function (date) {
                            return months3char[date.getMonth()]
                        },

                        // Month: January, February, ..., December
                        'MMMM': function (date) {
                            return monthsFull[date.getMonth()]
                        },

                        // Day of week: Su, Mo, ..., Sa
                        'dd': function (date) {
                            return weekdays2char[date.getDay()]
                        },

                        // Day of week: Sun, Mon, ..., Sat
                        'ddd': function (date) {
                            return weekdays3char[date.getDay()]
                        },

                        // Day of week: Sunday, Monday, ..., Saturday
                        'dddd': function (date) {
                            return weekdaysFull[date.getDay()]
                        },

                        // AM, PM
                        'A': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
                        },

                        // am, pm
                        'a': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
                        },

                        // a.m., p.m.
                        'aa': function (date) {
                            return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
                        }
                    }

                    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
                    var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
                    ordinalFormatters.forEach(function (formatterToken) {
                        formatters[formatterToken + 'o'] = function (date, formatters) {
                            return ordinal(formatters[formatterToken](date))
                        }
                    })

                    return {
                        formatters: formatters,
                        formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
                    }
                }

                function ordinal(number) {
                    return number.toString()
                }

                module.exports = buildFormatLocale


                /***/
            }),
            /* 163 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                Object.defineProperty(__webpack_exports__, "__esModule", {value: true});
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_0__utils_index__ = __webpack_require__(17);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_1__utils_type__ = __webpack_require__(18);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_2_date_fns__ = __webpack_require__(6);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_2_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_date_fns__);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_3_date_and_time__ = __webpack_require__(1);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_3_date_and_time___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_date_and_time__);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_4__utils_events__ = __webpack_require__(28);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_5__datePicker__ = __webpack_require__(263);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_6__timePicker__ = __webpack_require__(303);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_7__defaultOptions__ = __webpack_require__(306);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_8__templates__ = __webpack_require__(307);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_9__templates_header__ = __webpack_require__(308);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_10__templates_footer__ = __webpack_require__(309);
                var _slicedToArray = function () {
                    function sliceIterator(arr, i) {
                        var _arr = [];
                        var _n = true;
                        var _d = false;
                        var _e = undefined;
                        try {
                            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                                _arr.push(_s.value);
                                if (i && _arr.length === i) break;
                            }
                        } catch (err) {
                            _d = true;
                            _e = err;
                        } finally {
                            try {
                                if (!_n && _i["return"]) _i["return"]();
                            } finally {
                                if (_d) throw _e;
                            }
                        }
                        return _arr;
                    }

                    return function (arr, i) {
                        if (Array.isArray(arr)) {
                            return arr;
                        } else if (Symbol.iterator in Object(arr)) {
                            return sliceIterator(arr, i);
                        } else {
                            throw new TypeError("Invalid attempt to destructure non-iterable instance");
                        }
                    };
                }();

                var _extends = Object.assign || function (target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                };

                var _createClass = function () {
                    function defineProperties(target, props) {
                        for (var i = 0; i < props.length; i++) {
                            var descriptor = props[i];
                            descriptor.enumerable = descriptor.enumerable || false;
                            descriptor.configurable = true;
                            if ("value" in descriptor) descriptor.writable = true;
                            Object.defineProperty(target, descriptor.key, descriptor);
                        }
                    }

                    return function (Constructor, protoProps, staticProps) {
                        if (protoProps) defineProperties(Constructor.prototype, protoProps);
                        if (staticProps) defineProperties(Constructor, staticProps);
                        return Constructor;
                    };
                }();

                function _defineProperty(obj, key, value) {
                    if (key in obj) {
                        Object.defineProperty(obj, key, {
                            value: value,
                            enumerable: true,
                            configurable: true,
                            writable: true
                        });
                    } else {
                        obj[key] = value;
                    }
                    return obj;
                }

                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }

                function _possibleConstructorReturn(self, call) {
                    if (!self) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return call && (typeof call === "object" || typeof call === "function") ? call : self;
                }

                function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                    }
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
                }


                var bulmaCalendar = function (_EventEmitter) {
                    _inherits(bulmaCalendar, _EventEmitter);

                    function bulmaCalendar(selector) {
                        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                        _classCallCheck(this, bulmaCalendar);

                        var _this = _possibleConstructorReturn(this, (bulmaCalendar.__proto__ || Object.getPrototypeOf(bulmaCalendar)).call(this));

                        _this.element = __WEBPACK_IMPORTED_MODULE_1__utils_type__["e" /* isString */](selector) ? document.querySelector(selector) : selector;
                        // An invalid selector or non-DOM node has been provided.
                        if (!_this.element) {
                            throw new Error('An invalid selector or non-DOM node has been provided.');
                        }
                        _this._clickEvents = ['click', 'touch'];
                        _this._supportsPassive = __WEBPACK_IMPORTED_MODULE_0__utils_index__["a" /* detectSupportsPassive */]();

                        // Use Element dataset values to override options
                        var elementConfig = _this.element.dataset ? Object.keys(_this.element.dataset).filter(function (key) {
                            return Object.keys(__WEBPACK_IMPORTED_MODULE_7__defaultOptions__["a" /* default */]).includes(key);
                        }).reduce(function (obj, key) {
                            return _extends({}, obj, _defineProperty({}, key, _this.element.dataset[key]));
                        }, {}) : {};

                        // Set default options - dataset attributes are master
                        _this.options = _extends({}, __WEBPACK_IMPORTED_MODULE_7__defaultOptions__["a" /* default */], options, elementConfig);

                        if (_this.options.type === undefined) {
                            switch (_this.element.getAttribute('type')) {
                                case 'date':
                                    _this.options.type = 'date';
                                    break;
                                case 'time':
                                    _this.options.type = 'time';
                                    break;
                                default:
                                    _this.options.type = 'datetime';
                                    break;
                            }
                        }
                        _this._id = __WEBPACK_IMPORTED_MODULE_0__utils_index__["b" /* uuid */]('datetimePicker');

                        _this.onToggleDateTimePicker = _this.onToggleDateTimePicker.bind(_this);
                        _this.onCloseDateTimePicker = _this.onCloseDateTimePicker.bind(_this);
                        _this.onDocumentClickDateTimePicker = _this.onDocumentClickDateTimePicker.bind(_this);
                        _this.onValidateClickDateTimePicker = _this.onValidateClickDateTimePicker.bind(_this);
                        _this.onTodayClickDateTimePicker = _this.onTodayClickDateTimePicker.bind(_this);
                        _this.onClearClickDateTimePicker = _this.onClearClickDateTimePicker.bind(_this);
                        _this.onCancelClickDateTimePicker = _this.onCancelClickDateTimePicker.bind(_this);
                        _this.onSelectDateTimePicker = _this.onSelectDateTimePicker.bind(_this);
                        _this.onChangeStartHoursManually = _this.onChangeStartHoursManually.bind(_this);
                        _this.onChangeStartMinutesManually = _this.onChangeStartMinutesManually.bind(_this);
                        _this.onChangeEndHoursManually = _this.onChangeEndHoursManually.bind(_this);
                        _this.onChangeEndMinutesManually = _this.onChangeEndMinutesManually.bind(_this);
                        _this.changeTimeManually = _this.changeTimeManually.bind(_this);

                        // Initiate plugin
                        _this._init();
                        return _this;
                    }

                    /**
                     * Initiate all DOM element containing datePicker class
                     * @method
                     * @return {Array} Array of all datePicker instances
                     */


                    _createClass(bulmaCalendar, [{
                        key: 'onSelectDateTimePicker',


                        /****************************************************
                         *                                                  *
                         * EVENTS FUNCTIONS                                 *
                         *                                                  *
                         ****************************************************/
                        value: function onSelectDateTimePicker(e) {
                            if (e.type === 'select' && this.options.closeOnSelect === true && this.options.displayMode !== 'inline') {
                                this.refresh();
                                this.save();
                                this.hide();
                                this.emit(e.type, this);
                            }
                        }
                    }, {
                        key: 'onDocumentClickDateTimePicker',
                        value: function onDocumentClickDateTimePicker(e) {
                            // Check is e.target not within datepicker element
                            var target = e.target || e.srcElement;
                            if (!this._ui.wrapper.contains(target) && this.options.displayMode !== 'inline' && this._open) {
                                this.onCloseDateTimePicker(e);
                            }
                        }
                    }, {
                        key: 'onToggleDateTimePicker',
                        value: function onToggleDateTimePicker(e) {
                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            if (this._open) {
                                this.hide();
                            } else {
                                this.show();
                            }
                        }
                    }, {
                        key: 'onValidateClickDateTimePicker',
                        value: function onValidateClickDateTimePicker(e) {
                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            this.save();
                            this.emit('validate', this);

                            if (this.options.displayMode !== 'inline') {
                                this.onCloseDateTimePicker(e);
                            }
                        }
                    }, {
                        key: 'onTodayClickDateTimePicker',
                        value: function onTodayClickDateTimePicker(e) {
                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            this.datePicker.value(new Date());
                            this.datePicker.refresh();

                            this.timePicker.value(new Date());
                            this.timePicker.refresh();

                            if (this.options.closeOnSelect && this.options.displayMode !== 'inline') {
                                this.save();
                            }
                        }
                    }, {
                        key: 'onClearClickDateTimePicker',
                        value: function onClearClickDateTimePicker(e) {
                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            this.clear();

                            //this.emit('clear', this);
                        }
                    }, {
                        key: 'onCancelClickDateTimePicker',
                        value: function onCancelClickDateTimePicker(e) {
                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            if (this._snapshots.length) {
                                this.datePicker = this._snapshots[0].datePicker;
                                this.timePicker = this._snapshots[0].timePicker;
                            }
                            this.save();
                            if (this.options.displayMode !== 'inline') {
                                this.onCloseDateTimePicker(e);
                            }
                        }
                    }, {
                        key: 'onCloseDateTimePicker',
                        value: function onCloseDateTimePicker(e) {
                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            this.hide();
                        }
                    }, {
                        key: 'onClickTimeManuallyInput',
                        value: function onClickTimeManuallyInput(e) {
                            e.currentTarget.select();
                        }
                    }, {
                        key: 'onChangeStartHoursManually',
                        value: function onChangeStartHoursManually(e) {
                            var start = this.timePicker._time.start;
                            start.setHours(e.currentTarget.value);
                            this.timePicker.start = start;

                            this.changeTimeManually();
                        }
                    }, {
                        key: 'onChangeStartMinutesManually',
                        value: function onChangeStartMinutesManually(e) {
                            var start = this.timePicker._time.start;
                            start.setMinutes(e.currentTarget.value);
                            this.timePicker.start = start;

                            this.changeTimeManually();
                        }
                    }, {
                        key: 'onChangeEndHoursManually',
                        value: function onChangeEndHoursManually(e) {
                            var end = this.timePicker._time.end;
                            end.setHours(e.currentTarget.value);
                            this.timePicker.end = end;

                            this.changeTimeManually();
                        }
                    }, {
                        key: 'onChangeEndMinutesManually',
                        value: function onChangeEndMinutesManually(e) {
                            var end = this.timePicker._time.end;
                            end.setMinutes(e.currentTarget.value);
                            this.timePicker.end = end;

                            this.changeTimeManually();
                        }
                    }, {
                        key: 'changeTimeManually',
                        value: function changeTimeManually() {
                            this.refresh();
                            this.save();
                        }

                        /****************************************************
                         *                                                  *
                         * PUBLIC FUNCTIONS                                 *
                         *                                                  *
                         ****************************************************/

                    }, {
                        key: 'isRange',
                        value: function isRange() {
                            return this.options.isRange;
                        }

                        /**
                         * Returns true if datetime picker is open, otherwise false.
                         * @method isOpen
                         * @return {boolean}
                         */

                    }, {
                        key: 'isOpen',
                        value: function isOpen() {
                            return this._open;
                        }

                        /**
                         * Get / Set datetimePicker value
                         * @param {*} date
                         */

                    }, {
                        key: 'value',
                        value: function value() {
                            var _value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                            if (_value) {
                                this.datePicker.value(_value);
                                this.timePicker.value(_value);
                            } else {
                                var string = '';
                                switch (this.options.type) {
                                    case 'date':
                                        string = this.datePicker.value();
                                        break;
                                    case 'time':
                                        string = this.timePicker.value();
                                        break;
                                    case 'datetime':
                                        var start = this.datePicker.start ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["getTime"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["addMinutes"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["addHours"](this.datePicker.start, __WEBPACK_IMPORTED_MODULE_2_date_fns__["getHours"](this.timePicker.start)), __WEBPACK_IMPORTED_MODULE_2_date_fns__["getMinutes"](this.timePicker.start))) : undefined;
                                        var end = this.datePicker.end ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["getTime"](this.datePicker.end) : undefined;

                                        if (end && this.options.isRange) {
                                            // This options is not required - in other place i set eod on date
                                            //end = dateFns.getTime(dateFns.addMinutes(dateFns.addHours(this.datePicker.end, dateFns.getHours(this.timePicker.end)), dateFns.getMinutes(this.timePicker.end)));
                                        }

                                        string = start ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](new Date(start), this.format, {
                                            locale: this.locale
                                        }) : '';
                                        if (end) {
                                            string += ' - ' + (end ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](new Date(end), this.format, {locale: this.locale}) : '');
                                        }
                                        break;
                                }
                                return string;
                            }
                        }
                    }, {
                        key: 'refresh',
                        value: function refresh() {
                            this._ui.header.start.day.innerHTML = this.datePicker.start ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.datePicker.start, 'DD', {
                                locale: this.locale
                            }) : '--';
                            this._ui.header.start.month.innerHTML = this.datePicker.start ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.datePicker.start, this.options.headerMonthYearFromat, {
                                locale: this.locale
                            }) : '';
                            if (this.datePicker.start) {
                                this._ui.header.start.weekday.classList.remove('is-hidden');
                                this._ui.header.start.weekday.innerHTML = this.datePicker.start ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.datePicker.start, 'dddd', {
                                    locale: this.locale
                                }) : '';
                            } else {
                                this._ui.header.start.weekday.classList.add('is-hidden');
                            }

                            if (this._ui.header.start.hour) {
                                if (this.options.editTimeManually) {
                                    this._ui.header.start.inputHours.value = this.timePicker.start ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.timePicker.start, 'HH', {
                                        locale: this.locale
                                    }) : '--';
                                    this._ui.header.start.inputMinutes.value = this.timePicker.start ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.timePicker.start, 'mm', {
                                        locale: this.locale
                                    }) : '--';
                                } else {
                                    this._ui.header.start.hour.innerHTML = this.timePicker.start ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.timePicker.start, 'HH:mm', {
                                        locale: this.locale
                                    }) : '--:--';
                                }
                            }

                            if (this._ui.header.end) {
                                this._ui.header.end.day.innerHTML = this.options.isRange && this.datePicker.end ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.datePicker.end, 'DD', {
                                    locale: this.locale
                                }) : '--';
                                this._ui.header.end.month.innerHTML = this.options.isRange && this.datePicker.end ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.datePicker.end, this.options.headerMonthYearFromat, {
                                    locale: this.locale
                                }) : '';
                                if (this.datePicker.end) {
                                    this._ui.header.end.weekday.classList.remove('is-hidden');
                                    this._ui.header.end.weekday.innerHTML = this.datePicker.end ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.datePicker.end, 'dddd', {
                                        locale: this.locale
                                    }) : '';
                                } else {
                                    this._ui.header.end.weekday.classList.add('is-hidden');
                                }

                                if (this._ui.header.end && this._ui.header.end.hour) {
                                    if (this.options.editTimeManually) {
                                        this._ui.header.end.inputHours.value = this.timePicker.end ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.timePicker.end, 'HH', {
                                            locale: this.locale
                                        }) : '--';
                                        this._ui.header.end.inputMinutes.value = this.timePicker.end ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.timePicker.end, 'mm', {
                                            locale: this.locale
                                        }) : '--';
                                    } else {
                                        this._ui.header.end.hour.innerHTML = this.timePicker.end ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.timePicker.end, 'HH:mm', {
                                            locale: this.locale
                                        }) : '--:--';
                                    }
                                }
                            }
                            this.emit('refresh', this);
                        }
                    }, {
                        key: 'clear',
                        value: function clear() {
                            this.datePicker.clear();
                            this.timePicker.clear();

                            this.refresh();
                            this.element.value = '';
                            this._ui.dummy.dummy_1.value = '';
                            if (this._ui.dummy.dummy_2) {
                                this._ui.dummy.dummy_2.value = '';
                            }
                            this.emit('clear', this);
                        }

                        /**
                         * Show datePicker HTML Component
                         * @method show
                         * @return {void}
                         */

                    }, {
                        key: 'show',
                        value: function show() {
                            this._snapshots = [];
                            this.snapshot();

                            if (this.element.value) {
                                this.datePicker.value(this.element.value);
                                this.timePicker.value(this.element.value);
                            }

                            this.datePicker.show();
                            this.timePicker.hide();

                            if (this._ui.modal) {
                                this._ui.modal.classList.add('is-active');
                            }
                            this._ui.wrapper.classList.add('is-active');
                            this._open = true;
                            this.emit('show', this);
                        }

                        /**
                         * Hide datePicker HTML Component
                         * @method hide
                         * @return {void}
                         */

                    }, {
                        key: 'hide',
                        value: function hide() {
                            this._open = false;
                            this._focus = false;
                            if (this._ui.modal) {
                                this._ui.modal.classList.remove('is-active');
                            }
                            this._ui.wrapper.classList.remove('is-active');
                            this.emit('hide', this);
                        }

                        // Set element value to datetime selected based on format

                    }, {
                        key: 'save',
                        value: function save() {
                            var date = this.value();

                            var _date$split = date.split(' - '),
                                _date$split2 = _slicedToArray(_date$split, 2),
                                start = _date$split2[0],
                                end = _date$split2[1];

                            this.element.value = date;
                            this._ui.dummy.dummy_1.value = start ? start : '';
                            if (this._ui.dummy.dummy_2) {
                                this._ui.dummy.dummy_2.value = end ? end : '';
                            }
                        }
                    }, {
                        key: 'snapshot',
                        value: function snapshot() {
                        }
                        // this._snapshots.push([
                        //   ...this.datePicker,
                        //   ...this.timePicker
                        // ]);


                        /**
                         * Destroy datePicker
                         * @method destroy
                         * @return {[type]} [description]
                         */

                    }, {
                        key: 'destroy',
                        value: function destroy() {
                            this._ui.wrapper.remove();
                        }

                        /****************************************************
                         *                                                  *
                         * PRIVATE FUNCTIONS                                *
                         *                                                  *
                         ****************************************************/
                        /**
                         * Initiate plugin instance
                         * @method _init
                         * @return {datePicker} Current plugin instance
                         */

                    }, {
                        key: '_init',
                        value: function _init() {
                            this._open = false;
                            this._snapshots = []; // Use to revert selection
                            // Set component type (date / time / datetime)
                            // this.options.type = (['date', 'time', 'datetime'].indexOf(this.element.getAttribute('type').toLowerCase()) > -1) ? this.element.getAttribute('type').toLowerCase() : this.options.type;
                            this._type = ['date', 'time', 'datetime'].indexOf(this.options.type.toLowerCase()) > -1 ? this.options.type.toLowerCase() : 'date';
                            // Change element type to prevent browser default type="date" behavior
                            this.element.setAttribute('type', 'text');
                            this.datePicker = new __WEBPACK_IMPORTED_MODULE_5__datePicker__["a" /* default */](_extends({}, this.options, {
                                lang: this.lang
                            }));
                            this.timePicker = new __WEBPACK_IMPORTED_MODULE_6__timePicker__["a" /* default */](_extends({}, this.options, {
                                lang: this.lang
                            }));
                            console.log('原始值：',this.element.value);
                            if (this.element.value) {
                                this.datePicker.value(this.element.value);
                                this.timePicker.value(this.element.value);
                            }

                            this.lang = this.options.lang;
                            // Set export format based on component type
                            this.format = this._type === 'date' ? this.options.dateFormat : this._type === 'time' ? this.options.timeFormat : this.options.dateFormat + ' ' + this.options.timeFormat;

                            // Force dialog display mode on mobile devices
                            if (this.options.displayMode === 'default' && window.matchMedia('screen and (max-width: 768px)').matches) {
                                this.options.displayMode = 'dialog';
                            }
                            if (window.matchMedia('screen and (max-width: 768px)').matches) {
                                if (this.options.displayMode === 'default') {
                                    this.options.displayMode = 'dialog';
                                }
                                this.options.displayDual = false;
                            }

                            this._build();
                            this._bindEvents();
                            this.save();

                            if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["c" /* isFunction */](this.options.onReady)) {
                                this.on('ready', this.options.onReady);
                            }
                            this.emit('ready', this);
                        }

                        /**
                         * Build datePicker HTML component and append it to the DOM
                         * @method _build
                         * @return {datePicker} Current plugin instance
                         */

                    }, {
                        key: '_build',
                        value: function _build() {
                            var headerNode = document.createRange().createContextualFragment(Object(__WEBPACK_IMPORTED_MODULE_9__templates_header__["a" /* default */])(_extends({}, this.options, {
                                type: this._type,
                                datePicker: this.options.type !== 'time',
                                timePicker: this.options.type !== 'date'
                            })));
                            var footerNode = document.createRange().createContextualFragment(Object(__WEBPACK_IMPORTED_MODULE_10__templates_footer__["a" /* default */])(this.options));
                            var datetimePickerNode = document.createRange().createContextualFragment(Object(__WEBPACK_IMPORTED_MODULE_8__templates__["a" /* default */])(_extends({}, this.options, {
                                id: this.id
                            })));

                            // Save pointer to each datePicker element for later use
                            this._ui = {
                                modal: datetimePickerNode.querySelector('.modal'),
                                wrapper: datetimePickerNode.querySelector('.datetimepicker'),
                                container: datetimePickerNode.querySelector('.datetimepicker-container'),
                                dummy: {
                                    container: datetimePickerNode.querySelector('.datetimepicker-dummy'),
                                    wrapper: datetimePickerNode.querySelector('.datetimepicker-dummy-wrapper'),
                                    dummy_1: datetimePickerNode.querySelector('.datetimepicker-dummy .datetimepicker-dummy-input:nth-child(1)'),
                                    dummy_2: datetimePickerNode.querySelector('.datetimepicker-dummy .datetimepicker-dummy-input:nth-child(2)'),
                                    clear: datetimePickerNode.querySelector('.datetimepicker-dummy .datetimepicker-clear-button')
                                },
                                calendar: datetimePickerNode.querySelector('.datetimepicker'),
                                overlay: this.options.displayMode === 'dialog' ? {
                                    background: datetimePickerNode.querySelector('.modal-background'),
                                    close: datetimePickerNode.querySelector('.modal-close')
                                } : undefined,
                                header: {
                                    container: headerNode.querySelector('.datetimepicker-header'),
                                    start: {
                                        container: headerNode.querySelector('.datetimepicker-selection-start'),
                                        day: headerNode.querySelector('.datetimepicker-selection-start .datetimepicker-selection-day'),
                                        month: headerNode.querySelector('.datetimepicker-selection-start .datetimepicker-selection-month'),
                                        weekday: headerNode.querySelector('.datetimepicker-selection-start .datetimepicker-selection-weekday'),
                                        hour: headerNode.querySelector('.datetimepicker-selection-start .datetimepicker-selection-hour'),
                                        inputHours: headerNode.querySelector('.datetimepicker-selection-start .datetimepicker-selection-hour.editable .datetimepicker-selection-input-hours'),
                                        inputMinutes: headerNode.querySelector('.datetimepicker-selection-start .datetimepicker-selection-hour.editable .datetimepicker-selection-input-minutes'),
                                        empty: headerNode.querySelector('.datetimepicker-selection-start .empty')
                                    },
                                    end: this.options.isRange ? {
                                        container: headerNode.querySelector('.datetimepicker-selection-end'),
                                        day: headerNode.querySelector('.datetimepicker-selection-end .datetimepicker-selection-day'),
                                        month: headerNode.querySelector('.datetimepicker-selection-end .datetimepicker-selection-month'),
                                        weekday: headerNode.querySelector('.datetimepicker-selection-end .datetimepicker-selection-weekday'),
                                        hour: headerNode.querySelector('.datetimepicker-selection-end .datetimepicker-selection-hour'),
                                        inputHours: headerNode.querySelector('.datetimepicker-selection-end .datetimepicker-selection-hour.editable .datetimepicker-selection-input-hours'),
                                        inputMinutes: headerNode.querySelector('.datetimepicker-selection-end .datetimepicker-selection-hour.editable .datetimepicker-selection-input-minutes'),
                                        empty: headerNode.querySelector('.datetimepicker-selection-start .empty')
                                    } : undefined
                                },
                                footer: {
                                    container: footerNode.querySelector('.datetimepicker-footer'),
                                    validate: footerNode.querySelector('.datetimepicker-footer-validate'),
                                    today: footerNode.querySelector('.datetimepicker-footer-today'),
                                    clear: footerNode.querySelector('.datetimepicker-footer-clear'),
                                    cancel: footerNode.querySelector('.datetimepicker-footer-cancel')
                                }
                            };

                            if (!__WEBPACK_IMPORTED_MODULE_1__utils_type__["a" /* BooleanParse */](this.options.showHeader)) {
                                this._ui.header.container.classList.add('is-hidden');
                            }
                            if (!__WEBPACK_IMPORTED_MODULE_1__utils_type__["a" /* BooleanParse */](this.options.showFooter)) {
                                this._ui.footer.container.classList.add('is-hidden');
                            }
                            if (!__WEBPACK_IMPORTED_MODULE_1__utils_type__["a" /* BooleanParse */](this.options.showTodayButton)) {
                                this._ui.footer.today.classList.add('is-hidden');
                            }
                            if (!__WEBPACK_IMPORTED_MODULE_1__utils_type__["a" /* BooleanParse */](this.options.showClearButton)) {
                                this._ui.footer.clear.classList.add('is-hidden');
                            }

                            if (this.options.closeOnSelect && this._ui.footer.validate) {
                                this._ui.footer.validate.classList.add('is-hidden');
                            }

                            this._ui.container.appendChild(headerNode);
                            switch (this._type) {
                                case 'date':
                                    this._ui.container.appendChild(this.datePicker.render());
                                    break;
                                case 'time':
                                    this._ui.container.appendChild(this.timePicker.render());
                                    if (this._ui.footer.validate) {
                                        this._ui.footer.validate.classList.remove('is-hidden');
                                    }
                                    if (this._ui.footer.today) {
                                        this._ui.footer.today.classList.add('is-hidden');
                                    }
                                    break;
                                case 'datetime':
                                    this.options.closeOnSelect = false;
                                    if (this._ui.footer.validate) {
                                        this._ui.footer.validate.classList.remove('is-hidden');
                                    }
                                    this._ui.container.appendChild(this.datePicker.render());
                                    this._ui.container.appendChild(this.timePicker.render());
                                    break;
                            }

                            this._ui.wrapper.appendChild(footerNode);
                            this._ui.wrapper.classList.add('is-' + this.options.color);
                            this._ui.dummy.container.classList.add('is-' + this.options.color);
                            // Add datepicker HTML element to Document Body
                            this.element.parentNode.insertBefore(datetimePickerNode, this.element.nextSibling);
                            this._ui.dummy.wrapper.appendChild(this.element);
                            this.element.classList.add('is-hidden');
                            // this.element.style.visibility = 'hidden';
                            // this.element.style.position = 'absolute';

                            if (this.options.displayMode === 'inline') {
                                this._ui.wrapper.classList.add('is-active');
                            } else {
                                this._ui.dummy.container.classList.remove('is-hidden');
                                this._ui.wrapper.style.position = 'absolute';
                                this._ui.wrapper.classList.add('is-datetimepicker-default');
                            }
                            this.refresh();
                        }

                        /**
                         * Bind all events
                         * @method _bindEvents
                         * @return {void}
                         */

                    }, {
                        key: '_bindEvents',
                        value: function _bindEvents() {
                            var _this2 = this;

                            this._clickEvents.forEach(function (clickEvent) {
                                document.body.addEventListener(clickEvent, _this2.onDocumentClickDateTimePicker);
                            });

                            this.datePicker.on('select', this.onSelectDateTimePicker);
                            this.datePicker.on('select:start', this.onSelectDateTimePicker);
                            this.datePicker.on('select:end', this.onSelectDateTimePicker);
                            this.timePicker.on('select', this.onSelectDateTimePicker);
                            this.timePicker.on('select:start', this.onSelectDateTimePicker);
                            this.timePicker.on('select:end', this.onSelectDateTimePicker);

                            // Bind event to element in order to display/hide datePicker on click
                            if (this.options.toggleOnInputClick === true) {
                                this._clickEvents.forEach(function (clickEvent) {
                                    _this2._ui.dummy.wrapper.addEventListener(clickEvent, _this2.onToggleDateTimePicker);
                                    _this2.element.addEventListener(clickEvent, _this2.onToggleDateTimePicker);
                                });
                            }

                            // Bind change time events for header inputs
                            if (this.options.type !== 'date' && this.options.editTimeManually) {
                                // Bind event for start hours change
                                this._ui.header.start.inputHours.addEventListener('change', this.onChangeStartHoursManually);
                                this._ui.header.start.inputHours.addEventListener('click', this.onClickTimeManuallyInput);
                                // Bind event for start minutes change
                                this._ui.header.start.inputMinutes.addEventListener('change', this.onChangeStartMinutesManually);
                                this._ui.header.start.inputMinutes.addEventListener('click', this.onClickTimeManuallyInput);
                                if (this.options.isRange) {
                                    // Bind event for end hours change
                                    this._ui.header.end.inputHours.addEventListener('change', this.onChangeEndHoursManually);
                                    this._ui.header.end.inputHours.addEventListener('click', this.onClickTimeManuallyInput);
                                    // Bind event for end minutes change
                                    this._ui.header.end.inputMinutes.addEventListener('change', this.onChangeEndMinutesManually);
                                    this._ui.header.end.inputMinutes.addEventListener('click', this.onClickTimeManuallyInput);
                                }
                            }

                            if (this.options.displayMode === 'dialog' && this._ui.overlay) {
                                // Bind close event on Close button
                                if (this._ui.overlay.close) {
                                    this._clickEvents.forEach(function (clickEvent) {
                                        _this2.this._ui.overlay.close.addEventListener(clickEvent, _this2.onCloseDateTimePicker);
                                    });
                                }
                                // Bind close event on overlay based on options
                                if (this.options.closeOnOverlayClick && this._ui.overlay.background) {
                                    this._clickEvents.forEach(function (clickEvent) {
                                        _this2._ui.overlay.background.addEventListener(clickEvent, _this2.onCloseDateTimePicker);
                                    });
                                }
                            }

                            if (this._ui.footer.validate) {
                                this._clickEvents.forEach(function (clickEvent) {
                                    _this2._ui.footer.validate.addEventListener(clickEvent, _this2.onValidateClickDateTimePicker);
                                });
                            }
                            if (this._ui.footer.today) {
                                this._clickEvents.forEach(function (clickEvent) {
                                    _this2._ui.footer.today.addEventListener(clickEvent, _this2.onTodayClickDateTimePicker);
                                });
                            }
                            if (this._ui.footer.clear) {
                                this._clickEvents.forEach(function (clickEvent) {
                                    _this2._ui.footer.clear.addEventListener(clickEvent, _this2.onClearClickDateTimePicker);
                                });
                            }
                            this._clickEvents.forEach(function (clickEvent) {
                                _this2._ui.dummy.clear.addEventListener(clickEvent, _this2.onClearClickDateTimePicker);
                            });
                            if (this._ui.footer.cancel) {
                                this._clickEvents.forEach(function (clickEvent) {
                                    _this2._ui.footer.cancel.addEventListener(clickEvent, _this2.onCancelClickDateTimePicker);
                                });
                            }
                        }
                    }, {
                        key: 'id',


                        /****************************************************
                         *                                                  *
                         * GETTERS and SETTERS                              *
                         *                                                  *
                         ****************************************************/

                        /**
                         * Get id of current instance
                         */
                        get: function get() {
                            return this._id;
                        }

                        // Set language

                    }, {
                        key: 'lang',
                        set: function set() {
                            var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';

                            try {
                                this._locale = __webpack_require__(16)("./" + lang + '/index.js');
                            } catch (e) {
                                lang = 'en';
                                this._locale = __webpack_require__(16)("./" + lang + '/index.js');
                            } finally {
                                this._lang = lang;
                                this.datePicker.lang = lang;
                                this.timePicker.lang = lang;
                                return this;
                            }
                        }
                        // Get current language
                        ,
                        get: function get() {
                            return this._lang;
                        }
                    }, {
                        key: 'locale',
                        get: function get() {
                            return this._locale;
                        }

                        // Set format (set to yyyy-mm-dd HH:mm:ss by default)

                    }, {
                        key: 'format',
                        set: function set(format) {
                            this._format = format;
                            return this;
                        }
                        // Get format
                        ,
                        get: function get() {
                            return this._format;
                        }

                        /**
                         * * Date setter and getter
                         */

                    }, {
                        key: 'date',
                        set: function set() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                            this.datePicker.date = date;
                            return this;
                        }
                        // Get date object
                        ,
                        get: function get() {
                            return this.datePicker.date;
                        }
                    }, {
                        key: 'startDate',
                        set: function set() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            this.datePicker.start = __WEBPACK_IMPORTED_MODULE_3_date_and_time___default.a.parse(date, this.dateFormat);
                            return this;
                        },
                        get: function get() {
                            return this.datePicker.start;
                        }
                    }, {
                        key: 'endDate',
                        set: function set() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            this.datePicker.end = __WEBPACK_IMPORTED_MODULE_3_date_and_time___default.a.parse(date, this.dateFormat);
                            return this;
                        },
                        get: function get() {
                            return this.datePicker.end;
                        }

                        /**
                         * minDate getter and setters
                         */

                    }, {
                        key: 'minDate',
                        set: function set() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            this.datePicker.minDate = __WEBPACK_IMPORTED_MODULE_3_date_and_time___default.a.parse(date, this.dateFormat);
                            return this;
                        }
                        // Get minDate
                        ,
                        get: function get() {
                            return this.datePicker.minDate;
                        }

                        // Set maxDate

                    }, {
                        key: 'maxDate',
                        set: function set() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            this.datePicker.maxDate = __WEBPACK_IMPORTED_MODULE_3_date_and_time___default.a.parse(date, this.dateFormat);
                            return this;
                        }
                        // Get maxDate
                        ,
                        get: function get() {
                            return this.datePicker.maxDate;
                        }

                        // Set dateFormat (set to yyyy-mm-dd by default)

                    }, {
                        key: 'dateFormat',
                        set: function set(dateFormat) {
                            this.datePicker.dateFormat = dateFormat;
                            return this;
                        }
                        // Get dateFormat
                        ,
                        get: function get() {
                            return this.datePicker.dateFormat;
                        }

                        /**
                         * * Time setter and getter
                         */

                    }, {
                        key: 'time',
                        set: function set() {
                            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                            this.timePicker.time = time;
                            return this;
                        }
                        // Get time object
                        ,
                        get: function get() {
                            return this.timePicker.time;
                        }
                    }, {
                        key: 'startTime',
                        set: function set() {
                            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            this.timePicker.start = time;
                            return this;
                        },
                        get: function get() {
                            return this.timePicker.start;
                        }
                    }, {
                        key: 'endTime',
                        set: function set() {
                            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            this.timePicker.end = time;
                            return this;
                        },
                        get: function get() {
                            return this.timePicker.end;
                        }

                        /**
                         * minTime getter and setters
                         */

                    }, {
                        key: 'minTime',
                        set: function set() {
                            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            this.timePicker.minTime = time;
                            return this;
                        }
                        // Get minTime
                        ,
                        get: function get() {
                            return this.timePicker.minTime;
                        }

                        // Set maxTime

                    }, {
                        key: 'maxTime',
                        set: function set() {
                            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            this.timePicker.maxTime = time;
                            return this;
                        }
                        // Get maxTime
                        ,
                        get: function get() {
                            return this.timePicker.maxTime;
                        }

                        // Set timeFormat (set to HH:MM:SS by default)

                    }, {
                        key: 'timeFormat',
                        set: function set(timeFormat) {
                            this.timePicker.dateFormat = timeFormat;
                            return this;
                        }
                        // Get timeFormat
                        ,
                        get: function get() {
                            return this.timePicker.timeFormat;
                        }
                    }], [{
                        key: 'attach',
                        value: function attach() {
                            var _this3 = this;

                            var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'input[type="date"]';
                            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                            var instances = new Array();

                            var elements = __WEBPACK_IMPORTED_MODULE_1__utils_type__["e" /* isString */](selector) ? document.querySelectorAll(selector) : Array.isArray(selector) ? selector : [selector];
                            [].forEach.call(elements, function (element) {
                                if (typeof element[_this3.constructor.name] === 'undefined') {
                                    var instance = new bulmaCalendar(element, options);
                                    element.bulmaCalendar = instance;
                                    instances.push(instance);
                                } else {
                                    instances.push(element[_this3.constructor.name]);
                                }
                            });
                            if (instances.length === 1) {
                                var instance=instances[0];
                                instance.on('select', function (datepicker) {
                                    console.log(datepicker);
                                    console.log("select值："+datepicker.data.value());
                                    DotNet.invokeMethodAsync("BulmaRazor","SetCalendarValue",datepicker.data.element.id, datepicker.data.value());
                                });
                                instance.on('hide', function (datepicker) {
                                    console.log("hide值："+datepicker.data.value());
                                    console.log(datepicker);
                                    DotNet.invokeMethodAsync("BulmaRazor","SetCalendarValue",datepicker.data.element.id,datepicker.data.value());
                                });
                                
                                return instances[0];
                            }
                            return instances;
                        }
                    }]);

                    return bulmaCalendar;
                }(__WEBPACK_IMPORTED_MODULE_4__utils_events__["a" /* default */]);

                /* harmony default export */
                __webpack_exports__["default"] = (bulmaCalendar);

                /***/
            }),
            /* 164 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Range Helpers
                 * @summary Is the given date range overlapping with another date range?
                 *
                 * @description
                 * Is the given date range overlapping with another date range?
                 *
                 * @param {Date|String|Number} initialRangeStartDate - the start of the initial range
                 * @param {Date|String|Number} initialRangeEndDate - the end of the initial range
                 * @param {Date|String|Number} comparedRangeStartDate - the start of the range to compare it with
                 * @param {Date|String|Number} comparedRangeEndDate - the end of the range to compare it with
                 * @returns {Boolean} whether the date ranges are overlapping
                 * @throws {Error} startDate of a date range cannot be after its endDate
                 *
                 * @example
                 * // For overlapping date ranges:
                 * areRangesOverlapping(
                 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 17), new Date(2014, 0, 21)
                 * )
                 * //=> true
                 *
                 * @example
                 * // For non-overlapping date ranges:
                 * areRangesOverlapping(
                 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 21), new Date(2014, 0, 22)
                 * )
                 * //=> false
                 */
                function areRangesOverlapping(dirtyInitialRangeStartDate, dirtyInitialRangeEndDate, dirtyComparedRangeStartDate, dirtyComparedRangeEndDate) {
                    var initialStartTime = parse(dirtyInitialRangeStartDate).getTime()
                    var initialEndTime = parse(dirtyInitialRangeEndDate).getTime()
                    var comparedStartTime = parse(dirtyComparedRangeStartDate).getTime()
                    var comparedEndTime = parse(dirtyComparedRangeEndDate).getTime()

                    if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {
                        throw new Error('The start of the range cannot be after the end of the range')
                    }

                    return initialStartTime < comparedEndTime && comparedStartTime < initialEndTime
                }

                module.exports = areRangesOverlapping


                /***/
            }),
            /* 165 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Common Helpers
                 * @summary Return an index of the closest date from the array comparing to the given date.
                 *
                 * @description
                 * Return an index of the closest date from the array comparing to the given date.
                 *
                 * @param {Date|String|Number} dateToCompare - the date to compare with
                 * @param {Date[]|String[]|Number[]} datesArray - the array to search
                 * @returns {Number} an index of the date closest to the given date
                 * @throws {TypeError} the second argument must be an instance of Array
                 *
                 * @example
                 * // Which date is closer to 6 September 2015?
                 * var dateToCompare = new Date(2015, 8, 6)
                 * var datesArray = [
                 *   new Date(2015, 0, 1),
                 *   new Date(2016, 0, 1),
                 *   new Date(2017, 0, 1)
                 * ]
                 * var result = closestIndexTo(dateToCompare, datesArray)
                 * //=> 1
                 */
                function closestIndexTo(dirtyDateToCompare, dirtyDatesArray) {
                    if (!(dirtyDatesArray instanceof Array)) {
                        throw new TypeError(toString.call(dirtyDatesArray) + ' is not an instance of Array')
                    }

                    var dateToCompare = parse(dirtyDateToCompare)
                    var timeToCompare = dateToCompare.getTime()

                    var result
                    var minDistance

                    dirtyDatesArray.forEach(function (dirtyDate, index) {
                        var currentDate = parse(dirtyDate)
                        var distance = Math.abs(timeToCompare - currentDate.getTime())
                        if (result === undefined || distance < minDistance) {
                            result = index
                            minDistance = distance
                        }
                    })

                    return result
                }

                module.exports = closestIndexTo


                /***/
            }),
            /* 166 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Common Helpers
                 * @summary Return a date from the array closest to the given date.
                 *
                 * @description
                 * Return a date from the array closest to the given date.
                 *
                 * @param {Date|String|Number} dateToCompare - the date to compare with
                 * @param {Date[]|String[]|Number[]} datesArray - the array to search
                 * @returns {Date} the date from the array closest to the given date
                 * @throws {TypeError} the second argument must be an instance of Array
                 *
                 * @example
                 * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
                 * var dateToCompare = new Date(2015, 8, 6)
                 * var result = closestTo(dateToCompare, [
                 *   new Date(2000, 0, 1),
                 *   new Date(2030, 0, 1)
                 * ])
                 * //=> Tue Jan 01 2030 00:00:00
                 */
                function closestTo(dirtyDateToCompare, dirtyDatesArray) {
                    if (!(dirtyDatesArray instanceof Array)) {
                        throw new TypeError(toString.call(dirtyDatesArray) + ' is not an instance of Array')
                    }

                    var dateToCompare = parse(dirtyDateToCompare)
                    var timeToCompare = dateToCompare.getTime()

                    var result
                    var minDistance

                    dirtyDatesArray.forEach(function (dirtyDate) {
                        var currentDate = parse(dirtyDate)
                        var distance = Math.abs(timeToCompare - currentDate.getTime())
                        if (result === undefined || distance < minDistance) {
                            result = currentDate
                            minDistance = distance
                        }
                    })

                    return result
                }

                module.exports = closestTo


                /***/
            }),
            /* 167 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfISOWeek = __webpack_require__(4)

                var MILLISECONDS_IN_MINUTE = 60000
                var MILLISECONDS_IN_WEEK = 604800000

                /**
                 * @category ISO Week Helpers
                 * @summary Get the number of calendar ISO weeks between the given dates.
                 *
                 * @description
                 * Get the number of calendar ISO weeks between the given dates.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of calendar ISO weeks
                 *
                 * @example
                 * // How many calendar ISO weeks are between 6 July 2014 and 21 July 2014?
                 * var result = differenceInCalendarISOWeeks(
                 *   new Date(2014, 6, 21),
                 *   new Date(2014, 6, 6)
                 * )
                 * //=> 3
                 */
                function differenceInCalendarISOWeeks(dirtyDateLeft, dirtyDateRight) {
                    var startOfISOWeekLeft = startOfISOWeek(dirtyDateLeft)
                    var startOfISOWeekRight = startOfISOWeek(dirtyDateRight)

                    var timestampLeft = startOfISOWeekLeft.getTime() -
                        startOfISOWeekLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE
                    var timestampRight = startOfISOWeekRight.getTime() -
                        startOfISOWeekRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE

                    // Round the number of days to the nearest integer
                    // because the number of milliseconds in a week is not constant
                    // (e.g. it's different in the week of the daylight saving time clock shift)
                    return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK)
                }

                module.exports = differenceInCalendarISOWeeks


                /***/
            }),
            /* 168 */
            /***/ (function (module, exports, __webpack_require__) {

                var getQuarter = __webpack_require__(38)
                var parse = __webpack_require__(0)

                /**
                 * @category Quarter Helpers
                 * @summary Get the number of calendar quarters between the given dates.
                 *
                 * @description
                 * Get the number of calendar quarters between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of calendar quarters
                 *
                 * @example
                 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
                 * var result = differenceInCalendarQuarters(
                 *   new Date(2014, 6, 2),
                 *   new Date(2013, 11, 31)
                 * )
                 * //=> 3
                 */
                function differenceInCalendarQuarters(dirtyDateLeft, dirtyDateRight) {
                    var dateLeft = parse(dirtyDateLeft)
                    var dateRight = parse(dirtyDateRight)

                    var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear()
                    var quarterDiff = getQuarter(dateLeft) - getQuarter(dateRight)

                    return yearDiff * 4 + quarterDiff
                }

                module.exports = differenceInCalendarQuarters


                /***/
            }),
            /* 169 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfWeek = __webpack_require__(11)

                var MILLISECONDS_IN_MINUTE = 60000
                var MILLISECONDS_IN_WEEK = 604800000

                /**
                 * @category Week Helpers
                 * @summary Get the number of calendar weeks between the given dates.
                 *
                 * @description
                 * Get the number of calendar weeks between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @param {Object} [options] - the object with options
                 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
                 * @returns {Number} the number of calendar weeks
                 *
                 * @example
                 * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
                 * var result = differenceInCalendarWeeks(
                 *   new Date(2014, 6, 20),
                 *   new Date(2014, 6, 5)
                 * )
                 * //=> 3
                 *
                 * @example
                 * // If the week starts on Monday,
                 * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
                 * var result = differenceInCalendarWeeks(
                 *   new Date(2014, 6, 20),
                 *   new Date(2014, 6, 5),
                 *   {weekStartsOn: 1}
                 * )
                 * //=> 2
                 */
                function differenceInCalendarWeeks(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
                    var startOfWeekLeft = startOfWeek(dirtyDateLeft, dirtyOptions)
                    var startOfWeekRight = startOfWeek(dirtyDateRight, dirtyOptions)

                    var timestampLeft = startOfWeekLeft.getTime() -
                        startOfWeekLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE
                    var timestampRight = startOfWeekRight.getTime() -
                        startOfWeekRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE

                    // Round the number of days to the nearest integer
                    // because the number of milliseconds in a week is not constant
                    // (e.g. it's different in the week of the daylight saving time clock shift)
                    return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK)
                }

                module.exports = differenceInCalendarWeeks


                /***/
            }),
            /* 170 */
            /***/ (function (module, exports, __webpack_require__) {

                var differenceInMilliseconds = __webpack_require__(14)

                var MILLISECONDS_IN_HOUR = 3600000

                /**
                 * @category Hour Helpers
                 * @summary Get the number of hours between the given dates.
                 *
                 * @description
                 * Get the number of hours between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of hours
                 *
                 * @example
                 * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
                 * var result = differenceInHours(
                 *   new Date(2014, 6, 2, 19, 0),
                 *   new Date(2014, 6, 2, 6, 50)
                 * )
                 * //=> 12
                 */
                function differenceInHours(dirtyDateLeft, dirtyDateRight) {
                    var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_HOUR
                    return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
                }

                module.exports = differenceInHours


                /***/
            }),
            /* 171 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var differenceInCalendarISOYears = __webpack_require__(36)
                var compareAsc = __webpack_require__(10)
                var subISOYears = __webpack_require__(41)

                /**
                 * @category ISO Week-Numbering Year Helpers
                 * @summary Get the number of full ISO week-numbering years between the given dates.
                 *
                 * @description
                 * Get the number of full ISO week-numbering years between the given dates.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of full ISO week-numbering years
                 *
                 * @example
                 * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?
                 * var result = differenceInISOYears(
                 *   new Date(2012, 0, 1),
                 *   new Date(2010, 0, 1)
                 * )
                 * //=> 1
                 */
                function differenceInISOYears(dirtyDateLeft, dirtyDateRight) {
                    var dateLeft = parse(dirtyDateLeft)
                    var dateRight = parse(dirtyDateRight)

                    var sign = compareAsc(dateLeft, dateRight)
                    var difference = Math.abs(differenceInCalendarISOYears(dateLeft, dateRight))
                    dateLeft = subISOYears(dateLeft, sign * difference)

                    // Math.abs(diff in full ISO years - diff in calendar ISO years) === 1
                    // if last calendar ISO year is not full
                    // If so, result must be decreased by 1 in absolute value
                    var isLastISOYearNotFull = compareAsc(dateLeft, dateRight) === -sign
                    return sign * (difference - isLastISOYearNotFull)
                }

                module.exports = differenceInISOYears


                /***/
            }),
            /* 172 */
            /***/ (function (module, exports, __webpack_require__) {

                var differenceInMilliseconds = __webpack_require__(14)

                var MILLISECONDS_IN_MINUTE = 60000

                /**
                 * @category Minute Helpers
                 * @summary Get the number of minutes between the given dates.
                 *
                 * @description
                 * Get the number of minutes between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of minutes
                 *
                 * @example
                 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
                 * var result = differenceInMinutes(
                 *   new Date(2014, 6, 2, 12, 20, 0),
                 *   new Date(2014, 6, 2, 12, 7, 59)
                 * )
                 * //=> 12
                 */
                function differenceInMinutes(dirtyDateLeft, dirtyDateRight) {
                    var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_MINUTE
                    return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
                }

                module.exports = differenceInMinutes


                /***/
            }),
            /* 173 */
            /***/ (function (module, exports, __webpack_require__) {

                var differenceInMonths = __webpack_require__(23)

                /**
                 * @category Quarter Helpers
                 * @summary Get the number of full quarters between the given dates.
                 *
                 * @description
                 * Get the number of full quarters between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of full quarters
                 *
                 * @example
                 * // How many full quarters are between 31 December 2013 and 2 July 2014?
                 * var result = differenceInQuarters(
                 *   new Date(2014, 6, 2),
                 *   new Date(2013, 11, 31)
                 * )
                 * //=> 2
                 */
                function differenceInQuarters(dirtyDateLeft, dirtyDateRight) {
                    var diff = differenceInMonths(dirtyDateLeft, dirtyDateRight) / 3
                    return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
                }

                module.exports = differenceInQuarters


                /***/
            }),
            /* 174 */
            /***/ (function (module, exports, __webpack_require__) {

                var differenceInDays = __webpack_require__(40)

                /**
                 * @category Week Helpers
                 * @summary Get the number of full weeks between the given dates.
                 *
                 * @description
                 * Get the number of full weeks between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of full weeks
                 *
                 * @example
                 * // How many full weeks are between 5 July 2014 and 20 July 2014?
                 * var result = differenceInWeeks(
                 *   new Date(2014, 6, 20),
                 *   new Date(2014, 6, 5)
                 * )
                 * //=> 2
                 */
                function differenceInWeeks(dirtyDateLeft, dirtyDateRight) {
                    var diff = differenceInDays(dirtyDateLeft, dirtyDateRight) / 7
                    return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
                }

                module.exports = differenceInWeeks


                /***/
            }),
            /* 175 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var differenceInCalendarYears = __webpack_require__(39)
                var compareAsc = __webpack_require__(10)

                /**
                 * @category Year Helpers
                 * @summary Get the number of full years between the given dates.
                 *
                 * @description
                 * Get the number of full years between the given dates.
                 *
                 * @param {Date|String|Number} dateLeft - the later date
                 * @param {Date|String|Number} dateRight - the earlier date
                 * @returns {Number} the number of full years
                 *
                 * @example
                 * // How many full years are between 31 December 2013 and 11 February 2015?
                 * var result = differenceInYears(
                 *   new Date(2015, 1, 11),
                 *   new Date(2013, 11, 31)
                 * )
                 * //=> 1
                 */
                function differenceInYears(dirtyDateLeft, dirtyDateRight) {
                    var dateLeft = parse(dirtyDateLeft)
                    var dateRight = parse(dirtyDateRight)

                    var sign = compareAsc(dateLeft, dateRight)
                    var difference = Math.abs(differenceInCalendarYears(dateLeft, dateRight))
                    dateLeft.setFullYear(dateLeft.getFullYear() - sign * difference)

                    // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
                    // If so, result must be decreased by 1 in absolute value
                    var isLastYearNotFull = compareAsc(dateLeft, dateRight) === -sign
                    return sign * (difference - isLastYearNotFull)
                }

                module.exports = differenceInYears


                /***/
            }),
            /* 176 */
            /***/ (function (module, exports, __webpack_require__) {

                var compareDesc = __webpack_require__(22)
                var parse = __webpack_require__(0)
                var differenceInSeconds = __webpack_require__(24)
                var enLocale = __webpack_require__(15)

                var MINUTES_IN_DAY = 1440
                var MINUTES_IN_MONTH = 43200
                var MINUTES_IN_YEAR = 525600

                /**
                 * @category Common Helpers
                 * @summary Return the distance between the given dates in words.
                 *
                 * @description
                 * Return the distance between the given dates in words, using strict units.
                 * This is like `distanceInWords`, but does not use helpers like 'almost', 'over',
                 * 'less than' and the like.
                 *
                 * | Distance between dates | Result              |
                 * |------------------------|---------------------|
                 * | 0 ... 59 secs          | [0..59] seconds     |
                 * | 1 ... 59 mins          | [1..59] minutes     |
                 * | 1 ... 23 hrs           | [1..23] hours       |
                 * | 1 ... 29 days          | [1..29] days        |
                 * | 1 ... 11 months        | [1..11] months      |
                 * | 1 ... N years          | [1..N]  years       |
                 *
                 * @param {Date|String|Number} dateToCompare - the date to compare with
                 * @param {Date|String|Number} date - the other date
                 * @param {Object} [options] - the object with options
                 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
                 * @param {'s'|'m'|'h'|'d'|'M'|'Y'} [options.unit] - if specified, will force a unit
                 * @param {'floor'|'ceil'|'round'} [options.partialMethod='floor'] - which way to round partial units
                 * @param {Object} [options.locale=enLocale] - the locale object
                 * @returns {String} the distance in words
                 *
                 * @example
                 * // What is the distance between 2 July 2014 and 1 January 2015?
                 * var result = distanceInWordsStrict(
                 *   new Date(2014, 6, 2),
                 *   new Date(2015, 0, 2)
                 * )
                 * //=> '6 months'
                 *
                 * @example
                 * // What is the distance between 1 January 2015 00:00:15
                 * // and 1 January 2015 00:00:00?
                 * var result = distanceInWordsStrict(
                 *   new Date(2015, 0, 1, 0, 0, 15),
                 *   new Date(2015, 0, 1, 0, 0, 0),
                 * )
                 * //=> '15 seconds'
                 *
                 * @example
                 * // What is the distance from 1 January 2016
                 * // to 1 January 2015, with a suffix?
                 * var result = distanceInWordsStrict(
                 *   new Date(2016, 0, 1),
                 *   new Date(2015, 0, 1),
                 *   {addSuffix: true}
                 * )
                 * //=> '1 year ago'
                 *
                 * @example
                 * // What is the distance from 1 January 2016
                 * // to 1 January 2015, in minutes?
                 * var result = distanceInWordsStrict(
                 *   new Date(2016, 0, 1),
                 *   new Date(2015, 0, 1),
                 *   {unit: 'm'}
                 * )
                 * //=> '525600 minutes'
                 *
                 * @example
                 * // What is the distance from 1 January 2016
                 * // to 28 January 2015, in months, rounded up?
                 * var result = distanceInWordsStrict(
                 *   new Date(2015, 0, 28),
                 *   new Date(2015, 0, 1),
                 *   {unit: 'M', partialMethod: 'ceil'}
                 * )
                 * //=> '1 month'
                 *
                 * @example
                 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
                 * var eoLocale = require('date-fns/locale/eo')
                 * var result = distanceInWordsStrict(
                 *   new Date(2016, 7, 1),
                 *   new Date(2015, 0, 1),
                 *   {locale: eoLocale}
                 * )
                 * //=> '1 jaro'
                 */
                function distanceInWordsStrict(dirtyDateToCompare, dirtyDate, dirtyOptions) {
                    var options = dirtyOptions || {}

                    var comparison = compareDesc(dirtyDateToCompare, dirtyDate)

                    var locale = options.locale
                    var localize = enLocale.distanceInWords.localize
                    if (locale && locale.distanceInWords && locale.distanceInWords.localize) {
                        localize = locale.distanceInWords.localize
                    }

                    var localizeOptions = {
                        addSuffix: Boolean(options.addSuffix),
                        comparison: comparison
                    }

                    var dateLeft, dateRight
                    if (comparison > 0) {
                        dateLeft = parse(dirtyDateToCompare)
                        dateRight = parse(dirtyDate)
                    } else {
                        dateLeft = parse(dirtyDate)
                        dateRight = parse(dirtyDateToCompare)
                    }

                    var unit
                    var mathPartial = Math[options.partialMethod ? String(options.partialMethod) : 'floor']
                    var seconds = differenceInSeconds(dateRight, dateLeft)
                    var offset = dateRight.getTimezoneOffset() - dateLeft.getTimezoneOffset()
                    var minutes = mathPartial(seconds / 60) - offset
                    var hours, days, months, years

                    if (options.unit) {
                        unit = String(options.unit)
                    } else {
                        if (minutes < 1) {
                            unit = 's'
                        } else if (minutes < 60) {
                            unit = 'm'
                        } else if (minutes < MINUTES_IN_DAY) {
                            unit = 'h'
                        } else if (minutes < MINUTES_IN_MONTH) {
                            unit = 'd'
                        } else if (minutes < MINUTES_IN_YEAR) {
                            unit = 'M'
                        } else {
                            unit = 'Y'
                        }
                    }

                    // 0 up to 60 seconds
                    if (unit === 's') {
                        return localize('xSeconds', seconds, localizeOptions)

                        // 1 up to 60 mins
                    } else if (unit === 'm') {
                        return localize('xMinutes', minutes, localizeOptions)

                        // 1 up to 24 hours
                    } else if (unit === 'h') {
                        hours = mathPartial(minutes / 60)
                        return localize('xHours', hours, localizeOptions)

                        // 1 up to 30 days
                    } else if (unit === 'd') {
                        days = mathPartial(minutes / MINUTES_IN_DAY)
                        return localize('xDays', days, localizeOptions)

                        // 1 up to 12 months
                    } else if (unit === 'M') {
                        months = mathPartial(minutes / MINUTES_IN_MONTH)
                        return localize('xMonths', months, localizeOptions)

                        // 1 year up to max Date
                    } else if (unit === 'Y') {
                        years = mathPartial(minutes / MINUTES_IN_YEAR)
                        return localize('xYears', years, localizeOptions)
                    }

                    throw new Error('Unknown unit: ' + unit)
                }

                module.exports = distanceInWordsStrict


                /***/
            }),
            /* 177 */
            /***/ (function (module, exports, __webpack_require__) {

                var distanceInWords = __webpack_require__(42)

                /**
                 * @category Common Helpers
                 * @summary Return the distance between the given date and now in words.
                 *
                 * @description
                 * Return the distance between the given date and now in words.
                 *
                 * | Distance to now                                                   | Result              |
                 * |-------------------------------------------------------------------|---------------------|
                 * | 0 ... 30 secs                                                     | less than a minute  |
                 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
                 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
                 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
                 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
                 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
                 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
                 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
                 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
                 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
                 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
                 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
                 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
                 * | N yrs ... N yrs 3 months                                          | about N years       |
                 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
                 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
                 *
                 * With `options.includeSeconds == true`:
                 * | Distance to now     | Result               |
                 * |---------------------|----------------------|
                 * | 0 secs ... 5 secs   | less than 5 seconds  |
                 * | 5 secs ... 10 secs  | less than 10 seconds |
                 * | 10 secs ... 20 secs | less than 20 seconds |
                 * | 20 secs ... 40 secs | half a minute        |
                 * | 40 secs ... 60 secs | less than a minute   |
                 * | 60 secs ... 90 secs | 1 minute             |
                 *
                 * @param {Date|String|Number} date - the given date
                 * @param {Object} [options] - the object with options
                 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
                 * @param {Boolean} [options.addSuffix=false] - result specifies if the second date is earlier or later than the first
                 * @param {Object} [options.locale=enLocale] - the locale object
                 * @returns {String} the distance in words
                 *
                 * @example
                 * // If today is 1 January 2015, what is the distance to 2 July 2014?
                 * var result = distanceInWordsToNow(
                 *   new Date(2014, 6, 2)
                 * )
                 * //=> '6 months'
                 *
                 * @example
                 * // If now is 1 January 2015 00:00:00,
                 * // what is the distance to 1 January 2015 00:00:15, including seconds?
                 * var result = distanceInWordsToNow(
                 *   new Date(2015, 0, 1, 0, 0, 15),
                 *   {includeSeconds: true}
                 * )
                 * //=> 'less than 20 seconds'
                 *
                 * @example
                 * // If today is 1 January 2015,
                 * // what is the distance to 1 January 2016, with a suffix?
                 * var result = distanceInWordsToNow(
                 *   new Date(2016, 0, 1),
                 *   {addSuffix: true}
                 * )
                 * //=> 'in about 1 year'
                 *
                 * @example
                 * // If today is 1 January 2015,
                 * // what is the distance to 1 August 2016 in Esperanto?
                 * var eoLocale = require('date-fns/locale/eo')
                 * var result = distanceInWordsToNow(
                 *   new Date(2016, 7, 1),
                 *   {locale: eoLocale}
                 * )
                 * //=> 'pli ol 1 jaro'
                 */
                function distanceInWordsToNow(dirtyDate, dirtyOptions) {
                    return distanceInWords(Date.now(), dirtyDate, dirtyOptions)
                }

                module.exports = distanceInWordsToNow


                /***/
            }),
            /* 178 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Day Helpers
                 * @summary Return the array of dates within the specified range.
                 *
                 * @description
                 * Return the array of dates within the specified range.
                 *
                 * @param {Date|String|Number} startDate - the first date
                 * @param {Date|String|Number} endDate - the last date
                 * @param {Number} [step=1] - the step between each day
                 * @returns {Date[]} the array with starts of days from the day of startDate to the day of endDate
                 * @throws {Error} startDate cannot be after endDate
                 *
                 * @example
                 * // Each day between 6 October 2014 and 10 October 2014:
                 * var result = eachDay(
                 *   new Date(2014, 9, 6),
                 *   new Date(2014, 9, 10)
                 * )
                 * //=> [
                 * //   Mon Oct 06 2014 00:00:00,
                 * //   Tue Oct 07 2014 00:00:00,
                 * //   Wed Oct 08 2014 00:00:00,
                 * //   Thu Oct 09 2014 00:00:00,
                 * //   Fri Oct 10 2014 00:00:00
                 * // ]
                 */
                function eachDay(dirtyStartDate, dirtyEndDate, dirtyStep) {
                    var startDate = parse(dirtyStartDate)
                    var endDate = parse(dirtyEndDate)
                    var step = dirtyStep !== undefined ? dirtyStep : 1

                    var endTime = endDate.getTime()

                    if (startDate.getTime() > endTime) {
                        throw new Error('The first date cannot be after the second date')
                    }

                    var dates = []

                    var currentDate = startDate
                    currentDate.setHours(0, 0, 0, 0)

                    while (currentDate.getTime() <= endTime) {
                        dates.push(parse(currentDate))
                        currentDate.setDate(currentDate.getDate() + step)
                    }

                    return dates
                }

                module.exports = eachDay


                /***/
            }),
            /* 179 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Hour Helpers
                 * @summary Return the end of an hour for the given date.
                 *
                 * @description
                 * Return the end of an hour for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the end of an hour
                 *
                 * @example
                 * // The end of an hour for 2 September 2014 11:55:00:
                 * var result = endOfHour(new Date(2014, 8, 2, 11, 55))
                 * //=> Tue Sep 02 2014 11:59:59.999
                 */
                function endOfHour(dirtyDate) {
                    var date = parse(dirtyDate)
                    date.setMinutes(59, 59, 999)
                    return date
                }

                module.exports = endOfHour


                /***/
            }),
            /* 180 */
            /***/ (function (module, exports, __webpack_require__) {

                var endOfWeek = __webpack_require__(45)

                /**
                 * @category ISO Week Helpers
                 * @summary Return the end of an ISO week for the given date.
                 *
                 * @description
                 * Return the end of an ISO week for the given date.
                 * The result will be in the local timezone.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the end of an ISO week
                 *
                 * @example
                 * // The end of an ISO week for 2 September 2014 11:55:00:
                 * var result = endOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Sun Sep 07 2014 23:59:59.999
                 */
                function endOfISOWeek(dirtyDate) {
                    return endOfWeek(dirtyDate, {weekStartsOn: 1})
                }

                module.exports = endOfISOWeek


                /***/
            }),
            /* 181 */
            /***/ (function (module, exports, __webpack_require__) {

                var getISOYear = __webpack_require__(3)
                var startOfISOWeek = __webpack_require__(4)

                /**
                 * @category ISO Week-Numbering Year Helpers
                 * @summary Return the end of an ISO week-numbering year for the given date.
                 *
                 * @description
                 * Return the end of an ISO week-numbering year,
                 * which always starts 3 days before the year's first Thursday.
                 * The result will be in the local timezone.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the end of an ISO week-numbering year
                 *
                 * @example
                 * // The end of an ISO week-numbering year for 2 July 2005:
                 * var result = endOfISOYear(new Date(2005, 6, 2))
                 * //=> Sun Jan 01 2006 23:59:59.999
                 */
                function endOfISOYear(dirtyDate) {
                    var year = getISOYear(dirtyDate)
                    var fourthOfJanuaryOfNextYear = new Date(0)
                    fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4)
                    fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0)
                    var date = startOfISOWeek(fourthOfJanuaryOfNextYear)
                    date.setMilliseconds(date.getMilliseconds() - 1)
                    return date
                }

                module.exports = endOfISOYear


                /***/
            }),
            /* 182 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Minute Helpers
                 * @summary Return the end of a minute for the given date.
                 *
                 * @description
                 * Return the end of a minute for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the end of a minute
                 *
                 * @example
                 * // The end of a minute for 1 December 2014 22:15:45.400:
                 * var result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
                 * //=> Mon Dec 01 2014 22:15:59.999
                 */
                function endOfMinute(dirtyDate) {
                    var date = parse(dirtyDate)
                    date.setSeconds(59, 999)
                    return date
                }

                module.exports = endOfMinute


                /***/
            }),
            /* 183 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Quarter Helpers
                 * @summary Return the end of a year quarter for the given date.
                 *
                 * @description
                 * Return the end of a year quarter for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the end of a quarter
                 *
                 * @example
                 * // The end of a quarter for 2 September 2014 11:55:00:
                 * var result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Tue Sep 30 2014 23:59:59.999
                 */
                function endOfQuarter(dirtyDate) {
                    var date = parse(dirtyDate)
                    var currentMonth = date.getMonth()
                    var month = currentMonth - currentMonth % 3 + 3
                    date.setMonth(month, 0)
                    date.setHours(23, 59, 59, 999)
                    return date
                }

                module.exports = endOfQuarter


                /***/
            }),
            /* 184 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Second Helpers
                 * @summary Return the end of a second for the given date.
                 *
                 * @description
                 * Return the end of a second for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the end of a second
                 *
                 * @example
                 * // The end of a second for 1 December 2014 22:15:45.400:
                 * var result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
                 * //=> Mon Dec 01 2014 22:15:45.999
                 */
                function endOfSecond(dirtyDate) {
                    var date = parse(dirtyDate)
                    date.setMilliseconds(999)
                    return date
                }

                module.exports = endOfSecond


                /***/
            }),
            /* 185 */
            /***/ (function (module, exports, __webpack_require__) {

                var endOfDay = __webpack_require__(25)

                /**
                 * @category Day Helpers
                 * @summary Return the end of today.
                 *
                 * @description
                 * Return the end of today.
                 *
                 * @returns {Date} the end of today
                 *
                 * @example
                 * // If today is 6 October 2014:
                 * var result = endOfToday()
                 * //=> Mon Oct 6 2014 23:59:59.999
                 */
                function endOfToday() {
                    return endOfDay(new Date())
                }

                module.exports = endOfToday


                /***/
            }),
            /* 186 */
            /***/ (function (module, exports) {

                /**
                 * @category Day Helpers
                 * @summary Return the end of tomorrow.
                 *
                 * @description
                 * Return the end of tomorrow.
                 *
                 * @returns {Date} the end of tomorrow
                 *
                 * @example
                 * // If today is 6 October 2014:
                 * var result = endOfTomorrow()
                 * //=> Tue Oct 7 2014 23:59:59.999
                 */
                function endOfTomorrow() {
                    var now = new Date()
                    var year = now.getFullYear()
                    var month = now.getMonth()
                    var day = now.getDate()

                    var date = new Date(0)
                    date.setFullYear(year, month, day + 1)
                    date.setHours(23, 59, 59, 999)
                    return date
                }

                module.exports = endOfTomorrow


                /***/
            }),
            /* 187 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Year Helpers
                 * @summary Return the end of a year for the given date.
                 *
                 * @description
                 * Return the end of a year for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the end of a year
                 *
                 * @example
                 * // The end of a year for 2 September 2014 11:55:00:
                 * var result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
                 * //=> Wed Dec 31 2014 23:59:59.999
                 */
                function endOfYear(dirtyDate) {
                    var date = parse(dirtyDate)
                    var year = date.getFullYear()
                    date.setFullYear(year + 1, 0, 0)
                    date.setHours(23, 59, 59, 999)
                    return date
                }

                module.exports = endOfYear


                /***/
            }),
            /* 188 */
            /***/ (function (module, exports) {

                /**
                 * @category Day Helpers
                 * @summary Return the end of yesterday.
                 *
                 * @description
                 * Return the end of yesterday.
                 *
                 * @returns {Date} the end of yesterday
                 *
                 * @example
                 * // If today is 6 October 2014:
                 * var result = endOfYesterday()
                 * //=> Sun Oct 5 2014 23:59:59.999
                 */
                function endOfYesterday() {
                    var now = new Date()
                    var year = now.getFullYear()
                    var month = now.getMonth()
                    var day = now.getDate()

                    var date = new Date(0)
                    date.setFullYear(year, month, day - 1)
                    date.setHours(23, 59, 59, 999)
                    return date
                }

                module.exports = endOfYesterday


                /***/
            }),
            /* 189 */
            /***/ (function (module, exports, __webpack_require__) {

                var getDayOfYear = __webpack_require__(47)
                var getISOWeek = __webpack_require__(26)
                var getISOYear = __webpack_require__(3)
                var parse = __webpack_require__(0)
                var isValid = __webpack_require__(49)
                var enLocale = __webpack_require__(15)

                /**
                 * @category Common Helpers
                 * @summary Format the date.
                 *
                 * @description
                 * Return the formatted date string in the given format.
                 *
                 * Accepted tokens:
                 * | Unit                    | Token | Result examples                  |
                 * |-------------------------|-------|----------------------------------|
                 * | Month                   | M     | 1, 2, ..., 12                    |
                 * |                         | Mo    | 1st, 2nd, ..., 12th              |
                 * |                         | MM    | 01, 02, ..., 12                  |
                 * |                         | MMM   | Jan, Feb, ..., Dec               |
                 * |                         | MMMM  | January, February, ..., December |
                 * | Quarter                 | Q     | 1, 2, 3, 4                       |
                 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
                 * | Day of month            | D     | 1, 2, ..., 31                    |
                 * |                         | Do    | 1st, 2nd, ..., 31st              |
                 * |                         | DD    | 01, 02, ..., 31                  |
                 * | Day of year             | DDD   | 1, 2, ..., 366                   |
                 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
                 * |                         | DDDD  | 001, 002, ..., 366               |
                 * | Day of week             | d     | 0, 1, ..., 6                     |
                 * |                         | do    | 0th, 1st, ..., 6th               |
                 * |                         | dd    | Su, Mo, ..., Sa                  |
                 * |                         | ddd   | Sun, Mon, ..., Sat               |
                 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
                 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
                 * | ISO week                | W     | 1, 2, ..., 53                    |
                 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
                 * |                         | WW    | 01, 02, ..., 53                  |
                 * | Year                    | YY    | 00, 01, ..., 99                  |
                 * |                         | YYYY  | 1900, 1901, ..., 2099            |
                 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
                 * |                         | GGGG  | 1900, 1901, ..., 2099            |
                 * | AM/PM                   | A     | AM, PM                           |
                 * |                         | a     | am, pm                           |
                 * |                         | aa    | a.m., p.m.                       |
                 * | Hour                    | H     | 0, 1, ... 23                     |
                 * |                         | HH    | 00, 01, ... 23                   |
                 * |                         | h     | 1, 2, ..., 12                    |
                 * |                         | hh    | 01, 02, ..., 12                  |
                 * | Minute                  | m     | 0, 1, ..., 59                    |
                 * |                         | mm    | 00, 01, ..., 59                  |
                 * | Second                  | s     | 0, 1, ..., 59                    |
                 * |                         | ss    | 00, 01, ..., 59                  |
                 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
                 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
                 * | Millisecond             | SSS   | 000, 001, ..., 999               |
                 * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
                 * |                         | ZZ    | -0100, +0000, ..., +1200         |
                 * | Seconds timestamp       | X     | 512969520                        |
                 * | Milliseconds timestamp  | x     | 512969520900                     |
                 *
                 * The characters wrapped in square brackets are escaped.
                 *
                 * The result may vary by locale.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @param {String} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - the string of tokens
                 * @param {Object} [options] - the object with options
                 * @param {Object} [options.locale=enLocale] - the locale object
                 * @returns {String} the formatted date string
                 *
                 * @example
                 * // Represent 11 February 2014 in middle-endian format:
                 * var result = format(
                 *   new Date(2014, 1, 11),
                 *   'MM/DD/YYYY'
                 * )
                 * //=> '02/11/2014'
                 *
                 * @example
                 * // Represent 2 July 2014 in Esperanto:
                 * var eoLocale = require('date-fns/locale/eo')
                 * var result = format(
                 *   new Date(2014, 6, 2),
                 *   'Do [de] MMMM YYYY',
                 *   {locale: eoLocale}
                 * )
                 * //=> '2-a de julio 2014'
                 */
                function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
                    var formatStr = dirtyFormatStr ? String(dirtyFormatStr) : 'YYYY-MM-DDTHH:mm:ss.SSSZ'
                    var options = dirtyOptions || {}

                    var locale = options.locale
                    var localeFormatters = enLocale.format.formatters
                    var formattingTokensRegExp = enLocale.format.formattingTokensRegExp
                    if (locale && locale.format && locale.format.formatters) {
                        localeFormatters = locale.format.formatters

                        if (locale.format.formattingTokensRegExp) {
                            formattingTokensRegExp = locale.format.formattingTokensRegExp
                        }
                    }

                    var date = parse(dirtyDate)

                    if (!isValid(date)) {
                        return 'Invalid Date'
                    }

                    var formatFn = buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp)

                    return formatFn(date)
                }

                var formatters = {
                    // Month: 1, 2, ..., 12
                    'M': function (date) {
                        return date.getMonth() + 1
                    },

                    // Month: 01, 02, ..., 12
                    'MM': function (date) {
                        return addLeadingZeros(date.getMonth() + 1, 2)
                    },

                    // Quarter: 1, 2, 3, 4
                    'Q': function (date) {
                        return Math.ceil((date.getMonth() + 1) / 3)
                    },

                    // Day of month: 1, 2, ..., 31
                    'D': function (date) {
                        return date.getDate()
                    },

                    // Day of month: 01, 02, ..., 31
                    'DD': function (date) {
                        return addLeadingZeros(date.getDate(), 2)
                    },

                    // Day of year: 1, 2, ..., 366
                    'DDD': function (date) {
                        return getDayOfYear(date)
                    },

                    // Day of year: 001, 002, ..., 366
                    'DDDD': function (date) {
                        return addLeadingZeros(getDayOfYear(date), 3)
                    },

                    // Day of week: 0, 1, ..., 6
                    'd': function (date) {
                        return date.getDay()
                    },

                    // Day of ISO week: 1, 2, ..., 7
                    'E': function (date) {
                        return date.getDay() || 7
                    },

                    // ISO week: 1, 2, ..., 53
                    'W': function (date) {
                        return getISOWeek(date)
                    },

                    // ISO week: 01, 02, ..., 53
                    'WW': function (date) {
                        return addLeadingZeros(getISOWeek(date), 2)
                    },

                    // Year: 00, 01, ..., 99
                    'YY': function (date) {
                        return addLeadingZeros(date.getFullYear(), 4).substr(2)
                    },

                    // Year: 1900, 1901, ..., 2099
                    'YYYY': function (date) {
                        return addLeadingZeros(date.getFullYear(), 4)
                    },

                    // ISO week-numbering year: 00, 01, ..., 99
                    'GG': function (date) {
                        return String(getISOYear(date)).substr(2)
                    },

                    // ISO week-numbering year: 1900, 1901, ..., 2099
                    'GGGG': function (date) {
                        return getISOYear(date)
                    },

                    // Hour: 0, 1, ... 23
                    'H': function (date) {
                        return date.getHours()
                    },

                    // Hour: 00, 01, ..., 23
                    'HH': function (date) {
                        return addLeadingZeros(date.getHours(), 2)
                    },

                    // Hour: 1, 2, ..., 12
                    'h': function (date) {
                        var hours = date.getHours()
                        if (hours === 0) {
                            return 12
                        } else if (hours > 12) {
                            return hours % 12
                        } else {
                            return hours
                        }
                    },

                    // Hour: 01, 02, ..., 12
                    'hh': function (date) {
                        return addLeadingZeros(formatters['h'](date), 2)
                    },

                    // Minute: 0, 1, ..., 59
                    'm': function (date) {
                        return date.getMinutes()
                    },

                    // Minute: 00, 01, ..., 59
                    'mm': function (date) {
                        return addLeadingZeros(date.getMinutes(), 2)
                    },

                    // Second: 0, 1, ..., 59
                    's': function (date) {
                        return date.getSeconds()
                    },

                    // Second: 00, 01, ..., 59
                    'ss': function (date) {
                        return addLeadingZeros(date.getSeconds(), 2)
                    },

                    // 1/10 of second: 0, 1, ..., 9
                    'S': function (date) {
                        return Math.floor(date.getMilliseconds() / 100)
                    },

                    // 1/100 of second: 00, 01, ..., 99
                    'SS': function (date) {
                        return addLeadingZeros(Math.floor(date.getMilliseconds() / 10), 2)
                    },

                    // Millisecond: 000, 001, ..., 999
                    'SSS': function (date) {
                        return addLeadingZeros(date.getMilliseconds(), 3)
                    },

                    // Timezone: -01:00, +00:00, ... +12:00
                    'Z': function (date) {
                        return formatTimezone(date.getTimezoneOffset(), ':')
                    },

                    // Timezone: -0100, +0000, ... +1200
                    'ZZ': function (date) {
                        return formatTimezone(date.getTimezoneOffset())
                    },

                    // Seconds timestamp: 512969520
                    'X': function (date) {
                        return Math.floor(date.getTime() / 1000)
                    },

                    // Milliseconds timestamp: 512969520900
                    'x': function (date) {
                        return date.getTime()
                    }
                }

                function buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp) {
                    var array = formatStr.match(formattingTokensRegExp)
                    var length = array.length

                    var i
                    var formatter
                    for (i = 0; i < length; i++) {
                        formatter = localeFormatters[array[i]] || formatters[array[i]]
                        if (formatter) {
                            array[i] = formatter
                        } else {
                            array[i] = removeFormattingTokens(array[i])
                        }
                    }

                    return function (date) {
                        var output = ''
                        for (var i = 0; i < length; i++) {
                            if (array[i] instanceof Function) {
                                output += array[i](date, formatters)
                            } else {
                                output += array[i]
                            }
                        }
                        return output
                    }
                }

                function removeFormattingTokens(input) {
                    if (input.match(/\[[\s\S]/)) {
                        return input.replace(/^\[|]$/g, '')
                    }
                    return input.replace(/\\/g, '')
                }

                function formatTimezone(offset, delimeter) {
                    delimeter = delimeter || ''
                    var sign = offset > 0 ? '-' : '+'
                    var absOffset = Math.abs(offset)
                    var hours = Math.floor(absOffset / 60)
                    var minutes = absOffset % 60
                    return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2)
                }

                function addLeadingZeros(number, targetLength) {
                    var output = Math.abs(number).toString()
                    while (output.length < targetLength) {
                        output = '0' + output
                    }
                    return output
                }

                module.exports = format


                /***/
            }),
            /* 190 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Day Helpers
                 * @summary Get the day of the month of the given date.
                 *
                 * @description
                 * Get the day of the month of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the day of month
                 *
                 * @example
                 * // Which day of the month is 29 February 2012?
                 * var result = getDate(new Date(2012, 1, 29))
                 * //=> 29
                 */
                function getDate(dirtyDate) {
                    var date = parse(dirtyDate)
                    var dayOfMonth = date.getDate()
                    return dayOfMonth
                }

                module.exports = getDate


                /***/
            }),
            /* 191 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Weekday Helpers
                 * @summary Get the day of the week of the given date.
                 *
                 * @description
                 * Get the day of the week of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the day of week
                 *
                 * @example
                 * // Which day of the week is 29 February 2012?
                 * var result = getDay(new Date(2012, 1, 29))
                 * //=> 3
                 */
                function getDay(dirtyDate) {
                    var date = parse(dirtyDate)
                    var day = date.getDay()
                    return day
                }

                module.exports = getDay


                /***/
            }),
            /* 192 */
            /***/ (function (module, exports, __webpack_require__) {

                var isLeapYear = __webpack_require__(50)

                /**
                 * @category Year Helpers
                 * @summary Get the number of days in a year of the given date.
                 *
                 * @description
                 * Get the number of days in a year of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the number of days in a year
                 *
                 * @example
                 * // How many days are in 2012?
                 * var result = getDaysInYear(new Date(2012, 0, 1))
                 * //=> 366
                 */
                function getDaysInYear(dirtyDate) {
                    return isLeapYear(dirtyDate) ? 366 : 365
                }

                module.exports = getDaysInYear


                /***/
            }),
            /* 193 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Hour Helpers
                 * @summary Get the hours of the given date.
                 *
                 * @description
                 * Get the hours of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the hours
                 *
                 * @example
                 * // Get the hours of 29 February 2012 11:45:00:
                 * var result = getHours(new Date(2012, 1, 29, 11, 45))
                 * //=> 11
                 */
                function getHours(dirtyDate) {
                    var date = parse(dirtyDate)
                    var hours = date.getHours()
                    return hours
                }

                module.exports = getHours


                /***/
            }),
            /* 194 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfISOYear = __webpack_require__(9)
                var addWeeks = __webpack_require__(21)

                var MILLISECONDS_IN_WEEK = 604800000

                /**
                 * @category ISO Week-Numbering Year Helpers
                 * @summary Get the number of weeks in an ISO week-numbering year of the given date.
                 *
                 * @description
                 * Get the number of weeks in an ISO week-numbering year of the given date.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the number of ISO weeks in a year
                 *
                 * @example
                 * // How many weeks are in ISO week-numbering year 2015?
                 * var result = getISOWeeksInYear(new Date(2015, 1, 11))
                 * //=> 53
                 */
                function getISOWeeksInYear(dirtyDate) {
                    var thisYear = startOfISOYear(dirtyDate)
                    var nextYear = startOfISOYear(addWeeks(thisYear, 60))
                    var diff = nextYear.valueOf() - thisYear.valueOf()
                    // Round the number of weeks to the nearest integer
                    // because the number of milliseconds in a week is not constant
                    // (e.g. it's different in the week of the daylight saving time clock shift)
                    return Math.round(diff / MILLISECONDS_IN_WEEK)
                }

                module.exports = getISOWeeksInYear


                /***/
            }),
            /* 195 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Millisecond Helpers
                 * @summary Get the milliseconds of the given date.
                 *
                 * @description
                 * Get the milliseconds of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the milliseconds
                 *
                 * @example
                 * // Get the milliseconds of 29 February 2012 11:45:05.123:
                 * var result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))
                 * //=> 123
                 */
                function getMilliseconds(dirtyDate) {
                    var date = parse(dirtyDate)
                    var milliseconds = date.getMilliseconds()
                    return milliseconds
                }

                module.exports = getMilliseconds


                /***/
            }),
            /* 196 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Minute Helpers
                 * @summary Get the minutes of the given date.
                 *
                 * @description
                 * Get the minutes of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the minutes
                 *
                 * @example
                 * // Get the minutes of 29 February 2012 11:45:05:
                 * var result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
                 * //=> 45
                 */
                function getMinutes(dirtyDate) {
                    var date = parse(dirtyDate)
                    var minutes = date.getMinutes()
                    return minutes
                }

                module.exports = getMinutes


                /***/
            }),
            /* 197 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Month Helpers
                 * @summary Get the month of the given date.
                 *
                 * @description
                 * Get the month of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the month
                 *
                 * @example
                 * // Which month is 29 February 2012?
                 * var result = getMonth(new Date(2012, 1, 29))
                 * //=> 1
                 */
                function getMonth(dirtyDate) {
                    var date = parse(dirtyDate)
                    var month = date.getMonth()
                    return month
                }

                module.exports = getMonth


                /***/
            }),
            /* 198 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                var MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000

                /**
                 * @category Range Helpers
                 * @summary Get the number of days that overlap in two date ranges
                 *
                 * @description
                 * Get the number of days that overlap in two date ranges
                 *
                 * @param {Date|String|Number} initialRangeStartDate - the start of the initial range
                 * @param {Date|String|Number} initialRangeEndDate - the end of the initial range
                 * @param {Date|String|Number} comparedRangeStartDate - the start of the range to compare it with
                 * @param {Date|String|Number} comparedRangeEndDate - the end of the range to compare it with
                 * @returns {Number} the number of days that overlap in two date ranges
                 * @throws {Error} startDate of a date range cannot be after its endDate
                 *
                 * @example
                 * // For overlapping date ranges adds 1 for each started overlapping day:
                 * getOverlappingDaysInRanges(
                 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 17), new Date(2014, 0, 21)
                 * )
                 * //=> 3
                 *
                 * @example
                 * // For non-overlapping date ranges returns 0:
                 * getOverlappingDaysInRanges(
                 *   new Date(2014, 0, 10), new Date(2014, 0, 20), new Date(2014, 0, 21), new Date(2014, 0, 22)
                 * )
                 * //=> 0
                 */
                function getOverlappingDaysInRanges(dirtyInitialRangeStartDate, dirtyInitialRangeEndDate, dirtyComparedRangeStartDate, dirtyComparedRangeEndDate) {
                    var initialStartTime = parse(dirtyInitialRangeStartDate).getTime()
                    var initialEndTime = parse(dirtyInitialRangeEndDate).getTime()
                    var comparedStartTime = parse(dirtyComparedRangeStartDate).getTime()
                    var comparedEndTime = parse(dirtyComparedRangeEndDate).getTime()

                    if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {
                        throw new Error('The start of the range cannot be after the end of the range')
                    }

                    var isOverlapping = initialStartTime < comparedEndTime && comparedStartTime < initialEndTime

                    if (!isOverlapping) {
                        return 0
                    }

                    var overlapStartDate = comparedStartTime < initialStartTime
                        ? initialStartTime
                        : comparedStartTime

                    var overlapEndDate = comparedEndTime > initialEndTime
                        ? initialEndTime
                        : comparedEndTime

                    var differenceInMs = overlapEndDate - overlapStartDate

                    return Math.ceil(differenceInMs / MILLISECONDS_IN_DAY)
                }

                module.exports = getOverlappingDaysInRanges


                /***/
            }),
            /* 199 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Second Helpers
                 * @summary Get the seconds of the given date.
                 *
                 * @description
                 * Get the seconds of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the seconds
                 *
                 * @example
                 * // Get the seconds of 29 February 2012 11:45:05.123:
                 * var result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
                 * //=> 5
                 */
                function getSeconds(dirtyDate) {
                    var date = parse(dirtyDate)
                    var seconds = date.getSeconds()
                    return seconds
                }

                module.exports = getSeconds


                /***/
            }),
            /* 200 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Timestamp Helpers
                 * @summary Get the milliseconds timestamp of the given date.
                 *
                 * @description
                 * Get the milliseconds timestamp of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the timestamp
                 *
                 * @example
                 * // Get the timestamp of 29 February 2012 11:45:05.123:
                 * var result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
                 * //=> 1330515905123
                 */
                function getTime(dirtyDate) {
                    var date = parse(dirtyDate)
                    var timestamp = date.getTime()
                    return timestamp
                }

                module.exports = getTime


                /***/
            }),
            /* 201 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Year Helpers
                 * @summary Get the year of the given date.
                 *
                 * @description
                 * Get the year of the given date.
                 *
                 * @param {Date|String|Number} date - the given date
                 * @returns {Number} the year
                 *
                 * @example
                 * // Which year is 2 July 2014?
                 * var result = getYear(new Date(2014, 6, 2))
                 * //=> 2014
                 */
                function getYear(dirtyDate) {
                    var date = parse(dirtyDate)
                    var year = date.getFullYear()
                    return year
                }

                module.exports = getYear


                /***/
            }),
            /* 202 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Common Helpers
                 * @summary Is the first date after the second one?
                 *
                 * @description
                 * Is the first date after the second one?
                 *
                 * @param {Date|String|Number} date - the date that should be after the other one to return true
                 * @param {Date|String|Number} dateToCompare - the date to compare with
                 * @returns {Boolean} the first date is after the second date
                 *
                 * @example
                 * // Is 10 July 1989 after 11 February 1987?
                 * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
                 * //=> true
                 */
                function isAfter(dirtyDate, dirtyDateToCompare) {
                    var date = parse(dirtyDate)
                    var dateToCompare = parse(dirtyDateToCompare)
                    return date.getTime() > dateToCompare.getTime()
                }

                module.exports = isAfter


                /***/
            }),
            /* 203 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Common Helpers
                 * @summary Is the first date before the second one?
                 *
                 * @description
                 * Is the first date before the second one?
                 *
                 * @param {Date|String|Number} date - the date that should be before the other one to return true
                 * @param {Date|String|Number} dateToCompare - the date to compare with
                 * @returns {Boolean} the first date is before the second date
                 *
                 * @example
                 * // Is 10 July 1989 before 11 February 1987?
                 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
                 * //=> false
                 */
                function isBefore(dirtyDate, dirtyDateToCompare) {
                    var date = parse(dirtyDate)
                    var dateToCompare = parse(dirtyDateToCompare)
                    return date.getTime() < dateToCompare.getTime()
                }

                module.exports = isBefore


                /***/
            }),
            /* 204 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Common Helpers
                 * @summary Are the given dates equal?
                 *
                 * @description
                 * Are the given dates equal?
                 *
                 * @param {Date|String|Number} dateLeft - the first date to compare
                 * @param {Date|String|Number} dateRight - the second date to compare
                 * @returns {Boolean} the dates are equal
                 *
                 * @example
                 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
                 * var result = isEqual(
                 *   new Date(2014, 6, 2, 6, 30, 45, 0)
                 *   new Date(2014, 6, 2, 6, 30, 45, 500)
                 * )
                 * //=> false
                 */
                function isEqual(dirtyLeftDate, dirtyRightDate) {
                    var dateLeft = parse(dirtyLeftDate)
                    var dateRight = parse(dirtyRightDate)
                    return dateLeft.getTime() === dateRight.getTime()
                }

                module.exports = isEqual


                /***/
            }),
            /* 205 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Month Helpers
                 * @summary Is the given date the first day of a month?
                 *
                 * @description
                 * Is the given date the first day of a month?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is the first day of a month
                 *
                 * @example
                 * // Is 1 September 2014 the first day of a month?
                 * var result = isFirstDayOfMonth(new Date(2014, 8, 1))
                 * //=> true
                 */
                function isFirstDayOfMonth(dirtyDate) {
                    return parse(dirtyDate).getDate() === 1
                }

                module.exports = isFirstDayOfMonth


                /***/
            }),
            /* 206 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Weekday Helpers
                 * @summary Is the given date Friday?
                 *
                 * @description
                 * Is the given date Friday?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is Friday
                 *
                 * @example
                 * // Is 26 September 2014 Friday?
                 * var result = isFriday(new Date(2014, 8, 26))
                 * //=> true
                 */
                function isFriday(dirtyDate) {
                    return parse(dirtyDate).getDay() === 5
                }

                module.exports = isFriday


                /***/
            }),
            /* 207 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Common Helpers
                 * @summary Is the given date in the future?
                 *
                 * @description
                 * Is the given date in the future?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is in the future
                 *
                 * @example
                 * // If today is 6 October 2014, is 31 December 2014 in the future?
                 * var result = isFuture(new Date(2014, 11, 31))
                 * //=> true
                 */
                function isFuture(dirtyDate) {
                    return parse(dirtyDate).getTime() > new Date().getTime()
                }

                module.exports = isFuture


                /***/
            }),
            /* 208 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var endOfDay = __webpack_require__(25)
                var endOfMonth = __webpack_require__(46)

                /**
                 * @category Month Helpers
                 * @summary Is the given date the last day of a month?
                 *
                 * @description
                 * Is the given date the last day of a month?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is the last day of a month
                 *
                 * @example
                 * // Is 28 February 2014 the last day of a month?
                 * var result = isLastDayOfMonth(new Date(2014, 1, 28))
                 * //=> true
                 */
                function isLastDayOfMonth(dirtyDate) {
                    var date = parse(dirtyDate)
                    return endOfDay(date).getTime() === endOfMonth(date).getTime()
                }

                module.exports = isLastDayOfMonth


                /***/
            }),
            /* 209 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Weekday Helpers
                 * @summary Is the given date Monday?
                 *
                 * @description
                 * Is the given date Monday?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is Monday
                 *
                 * @example
                 * // Is 22 September 2014 Monday?
                 * var result = isMonday(new Date(2014, 8, 22))
                 * //=> true
                 */
                function isMonday(dirtyDate) {
                    return parse(dirtyDate).getDay() === 1
                }

                module.exports = isMonday


                /***/
            }),
            /* 210 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Common Helpers
                 * @summary Is the given date in the past?
                 *
                 * @description
                 * Is the given date in the past?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is in the past
                 *
                 * @example
                 * // If today is 6 October 2014, is 2 July 2014 in the past?
                 * var result = isPast(new Date(2014, 6, 2))
                 * //=> true
                 */
                function isPast(dirtyDate) {
                    return parse(dirtyDate).getTime() < new Date().getTime()
                }

                module.exports = isPast


                /***/
            }),
            /* 211 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfDay = __webpack_require__(5)

                /**
                 * @category Day Helpers
                 * @summary Are the given dates in the same day?
                 *
                 * @description
                 * Are the given dates in the same day?
                 *
                 * @param {Date|String|Number} dateLeft - the first date to check
                 * @param {Date|String|Number} dateRight - the second date to check
                 * @returns {Boolean} the dates are in the same day
                 *
                 * @example
                 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
                 * var result = isSameDay(
                 *   new Date(2014, 8, 4, 6, 0),
                 *   new Date(2014, 8, 4, 18, 0)
                 * )
                 * //=> true
                 */
                function isSameDay(dirtyDateLeft, dirtyDateRight) {
                    var dateLeftStartOfDay = startOfDay(dirtyDateLeft)
                    var dateRightStartOfDay = startOfDay(dirtyDateRight)

                    return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()
                }

                module.exports = isSameDay


                /***/
            }),
            /* 212 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Weekday Helpers
                 * @summary Is the given date Saturday?
                 *
                 * @description
                 * Is the given date Saturday?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is Saturday
                 *
                 * @example
                 * // Is 27 September 2014 Saturday?
                 * var result = isSaturday(new Date(2014, 8, 27))
                 * //=> true
                 */
                function isSaturday(dirtyDate) {
                    return parse(dirtyDate).getDay() === 6
                }

                module.exports = isSaturday


                /***/
            }),
            /* 213 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Weekday Helpers
                 * @summary Is the given date Sunday?
                 *
                 * @description
                 * Is the given date Sunday?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is Sunday
                 *
                 * @example
                 * // Is 21 September 2014 Sunday?
                 * var result = isSunday(new Date(2014, 8, 21))
                 * //=> true
                 */
                function isSunday(dirtyDate) {
                    return parse(dirtyDate).getDay() === 0
                }

                module.exports = isSunday


                /***/
            }),
            /* 214 */
            /***/ (function (module, exports, __webpack_require__) {

                var isSameHour = __webpack_require__(52)

                /**
                 * @category Hour Helpers
                 * @summary Is the given date in the same hour as the current date?
                 *
                 * @description
                 * Is the given date in the same hour as the current date?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is in this hour
                 *
                 * @example
                 * // If now is 25 September 2014 18:30:15.500,
                 * // is 25 September 2014 18:00:00 in this hour?
                 * var result = isThisHour(new Date(2014, 8, 25, 18))
                 * //=> true
                 */
                function isThisHour(dirtyDate) {
                    return isSameHour(new Date(), dirtyDate)
                }

                module.exports = isThisHour


                /***/
            }),
            /* 215 */
            /***/ (function (module, exports, __webpack_require__) {

                var isSameISOWeek = __webpack_require__(54)

                /**
                 * @category ISO Week Helpers
                 * @summary Is the given date in the same ISO week as the current date?
                 *
                 * @description
                 * Is the given date in the same ISO week as the current date?
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is in this ISO week
                 *
                 * @example
                 * // If today is 25 September 2014, is 22 September 2014 in this ISO week?
                 * var result = isThisISOWeek(new Date(2014, 8, 22))
                 * //=> true
                 */
                function isThisISOWeek(dirtyDate) {
                    return isSameISOWeek(new Date(), dirtyDate)
                }

                module.exports = isThisISOWeek


                /***/
            }),
            /* 216 */
            /***/ (function (module, exports, __webpack_require__) {

                var isSameISOYear = __webpack_require__(55)

                /**
                 * @category ISO Week-Numbering Year Helpers
                 * @summary Is the given date in the same ISO week-numbering year as the current date?
                 *
                 * @description
                 * Is the given date in the same ISO week-numbering year as the current date?
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is in this ISO week-numbering year
                 *
                 * @example
                 * // If today is 25 September 2014,
                 * // is 30 December 2013 in this ISO week-numbering year?
                 * var result = isThisISOYear(new Date(2013, 11, 30))
                 * //=> true
                 */
                function isThisISOYear(dirtyDate) {
                    return isSameISOYear(new Date(), dirtyDate)
                }

                module.exports = isThisISOYear


                /***/
            }),
            /* 217 */
            /***/ (function (module, exports, __webpack_require__) {

                var isSameMinute = __webpack_require__(56)

                /**
                 * @category Minute Helpers
                 * @summary Is the given date in the same minute as the current date?
                 *
                 * @description
                 * Is the given date in the same minute as the current date?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is in this minute
                 *
                 * @example
                 * // If now is 25 September 2014 18:30:15.500,
                 * // is 25 September 2014 18:30:00 in this minute?
                 * var result = isThisMinute(new Date(2014, 8, 25, 18, 30))
                 * //=> true
                 */
                function isThisMinute(dirtyDate) {
                    return isSameMinute(new Date(), dirtyDate)
                }

                module.exports = isThisMinute


                /***/
            }),
            /* 218 */
            /***/ (function (module, exports, __webpack_require__) {

                var isSameMonth = __webpack_require__(58)

                /**
                 * @category Month Helpers
                 * @summary Is the given date in the same month as the current date?
                 *
                 * @description
                 * Is the given date in the same month as the current date?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is in this month
                 *
                 * @example
                 * // If today is 25 September 2014, is 15 September 2014 in this month?
                 * var result = isThisMonth(new Date(2014, 8, 15))
                 * //=> true
                 */
                function isThisMonth(dirtyDate) {
                    return isSameMonth(new Date(), dirtyDate)
                }

                module.exports = isThisMonth


                /***/
            }),
            /* 219 */
            /***/ (function (module, exports, __webpack_require__) {

                var isSameQuarter = __webpack_require__(59)

                /**
                 * @category Quarter Helpers
                 * @summary Is the given date in the same quarter as the current date?
                 *
                 * @description
                 * Is the given date in the same quarter as the current date?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is in this quarter
                 *
                 * @example
                 * // If today is 25 September 2014, is 2 July 2014 in this quarter?
                 * var result = isThisQuarter(new Date(2014, 6, 2))
                 * //=> true
                 */
                function isThisQuarter(dirtyDate) {
                    return isSameQuarter(new Date(), dirtyDate)
                }

                module.exports = isThisQuarter


                /***/
            }),
            /* 220 */
            /***/ (function (module, exports, __webpack_require__) {

                var isSameSecond = __webpack_require__(61)

                /**
                 * @category Second Helpers
                 * @summary Is the given date in the same second as the current date?
                 *
                 * @description
                 * Is the given date in the same second as the current date?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is in this second
                 *
                 * @example
                 * // If now is 25 September 2014 18:30:15.500,
                 * // is 25 September 2014 18:30:15.000 in this second?
                 * var result = isThisSecond(new Date(2014, 8, 25, 18, 30, 15))
                 * //=> true
                 */
                function isThisSecond(dirtyDate) {
                    return isSameSecond(new Date(), dirtyDate)
                }

                module.exports = isThisSecond


                /***/
            }),
            /* 221 */
            /***/ (function (module, exports, __webpack_require__) {

                var isSameWeek = __webpack_require__(27)

                /**
                 * @category Week Helpers
                 * @summary Is the given date in the same week as the current date?
                 *
                 * @description
                 * Is the given date in the same week as the current date?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @param {Object} [options] - the object with options
                 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
                 * @returns {Boolean} the date is in this week
                 *
                 * @example
                 * // If today is 25 September 2014, is 21 September 2014 in this week?
                 * var result = isThisWeek(new Date(2014, 8, 21))
                 * //=> true
                 *
                 * @example
                 * // If today is 25 September 2014 and week starts with Monday
                 * // is 21 September 2014 in this week?
                 * var result = isThisWeek(new Date(2014, 8, 21), {weekStartsOn: 1})
                 * //=> false
                 */
                function isThisWeek(dirtyDate, dirtyOptions) {
                    return isSameWeek(new Date(), dirtyDate, dirtyOptions)
                }

                module.exports = isThisWeek


                /***/
            }),
            /* 222 */
            /***/ (function (module, exports, __webpack_require__) {

                var isSameYear = __webpack_require__(63)

                /**
                 * @category Year Helpers
                 * @summary Is the given date in the same year as the current date?
                 *
                 * @description
                 * Is the given date in the same year as the current date?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is in this year
                 *
                 * @example
                 * // If today is 25 September 2014, is 2 July 2014 in this year?
                 * var result = isThisYear(new Date(2014, 6, 2))
                 * //=> true
                 */
                function isThisYear(dirtyDate) {
                    return isSameYear(new Date(), dirtyDate)
                }

                module.exports = isThisYear


                /***/
            }),
            /* 223 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Weekday Helpers
                 * @summary Is the given date Thursday?
                 *
                 * @description
                 * Is the given date Thursday?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is Thursday
                 *
                 * @example
                 * // Is 25 September 2014 Thursday?
                 * var result = isThursday(new Date(2014, 8, 25))
                 * //=> true
                 */
                function isThursday(dirtyDate) {
                    return parse(dirtyDate).getDay() === 4
                }

                module.exports = isThursday


                /***/
            }),
            /* 224 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfDay = __webpack_require__(5)

                /**
                 * @category Day Helpers
                 * @summary Is the given date today?
                 *
                 * @description
                 * Is the given date today?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is today
                 *
                 * @example
                 * // If today is 6 October 2014, is 6 October 14:00:00 today?
                 * var result = isToday(new Date(2014, 9, 6, 14, 0))
                 * //=> true
                 */
                function isToday(dirtyDate) {
                    return startOfDay(dirtyDate).getTime() === startOfDay(new Date()).getTime()
                }

                module.exports = isToday


                /***/
            }),
            /* 225 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfDay = __webpack_require__(5)

                /**
                 * @category Day Helpers
                 * @summary Is the given date tomorrow?
                 *
                 * @description
                 * Is the given date tomorrow?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is tomorrow
                 *
                 * @example
                 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
                 * var result = isTomorrow(new Date(2014, 9, 7, 14, 0))
                 * //=> true
                 */
                function isTomorrow(dirtyDate) {
                    var tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    return startOfDay(dirtyDate).getTime() === startOfDay(tomorrow).getTime()
                }

                module.exports = isTomorrow


                /***/
            }),
            /* 226 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Weekday Helpers
                 * @summary Is the given date Tuesday?
                 *
                 * @description
                 * Is the given date Tuesday?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is Tuesday
                 *
                 * @example
                 * // Is 23 September 2014 Tuesday?
                 * var result = isTuesday(new Date(2014, 8, 23))
                 * //=> true
                 */
                function isTuesday(dirtyDate) {
                    return parse(dirtyDate).getDay() === 2
                }

                module.exports = isTuesday


                /***/
            }),
            /* 227 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Weekday Helpers
                 * @summary Is the given date Wednesday?
                 *
                 * @description
                 * Is the given date Wednesday?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is Wednesday
                 *
                 * @example
                 * // Is 24 September 2014 Wednesday?
                 * var result = isWednesday(new Date(2014, 8, 24))
                 * //=> true
                 */
                function isWednesday(dirtyDate) {
                    return parse(dirtyDate).getDay() === 3
                }

                module.exports = isWednesday


                /***/
            }),
            /* 228 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Weekday Helpers
                 * @summary Does the given date fall on a weekend?
                 *
                 * @description
                 * Does the given date fall on a weekend?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date falls on a weekend
                 *
                 * @example
                 * // Does 5 October 2014 fall on a weekend?
                 * var result = isWeekend(new Date(2014, 9, 5))
                 * //=> true
                 */
                function isWeekend(dirtyDate) {
                    var date = parse(dirtyDate)
                    var day = date.getDay()
                    return day === 0 || day === 6
                }

                module.exports = isWeekend


                /***/
            }),
            /* 229 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Range Helpers
                 * @summary Is the given date within the range?
                 *
                 * @description
                 * Is the given date within the range?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @param {Date|String|Number} startDate - the start of range
                 * @param {Date|String|Number} endDate - the end of range
                 * @returns {Boolean} the date is within the range
                 * @throws {Error} startDate cannot be after endDate
                 *
                 * @example
                 * // For the date within the range:
                 * isWithinRange(
                 *   new Date(2014, 0, 3), new Date(2014, 0, 1), new Date(2014, 0, 7)
                 * )
                 * //=> true
                 *
                 * @example
                 * // For the date outside of the range:
                 * isWithinRange(
                 *   new Date(2014, 0, 10), new Date(2014, 0, 1), new Date(2014, 0, 7)
                 * )
                 * //=> false
                 */
                function isWithinRange(dirtyDate, dirtyStartDate, dirtyEndDate) {
                    var time = parse(dirtyDate).getTime()
                    var startTime = parse(dirtyStartDate).getTime()
                    var endTime = parse(dirtyEndDate).getTime()

                    if (startTime > endTime) {
                        throw new Error('The start of the range cannot be after the end of the range')
                    }

                    return time >= startTime && time <= endTime
                }

                module.exports = isWithinRange


                /***/
            }),
            /* 230 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfDay = __webpack_require__(5)

                /**
                 * @category Day Helpers
                 * @summary Is the given date yesterday?
                 *
                 * @description
                 * Is the given date yesterday?
                 *
                 * @param {Date|String|Number} date - the date to check
                 * @returns {Boolean} the date is yesterday
                 *
                 * @example
                 * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
                 * var result = isYesterday(new Date(2014, 9, 5, 14, 0))
                 * //=> true
                 */
                function isYesterday(dirtyDate) {
                    var yesterday = new Date()
                    yesterday.setDate(yesterday.getDate() - 1)
                    return startOfDay(dirtyDate).getTime() === startOfDay(yesterday).getTime()
                }

                module.exports = isYesterday


                /***/
            }),
            /* 231 */
            /***/ (function (module, exports, __webpack_require__) {

                var lastDayOfWeek = __webpack_require__(64)

                /**
                 * @category ISO Week Helpers
                 * @summary Return the last day of an ISO week for the given date.
                 *
                 * @description
                 * Return the last day of an ISO week for the given date.
                 * The result will be in the local timezone.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the last day of an ISO week
                 *
                 * @example
                 * // The last day of an ISO week for 2 September 2014 11:55:00:
                 * var result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Sun Sep 07 2014 00:00:00
                 */
                function lastDayOfISOWeek(dirtyDate) {
                    return lastDayOfWeek(dirtyDate, {weekStartsOn: 1})
                }

                module.exports = lastDayOfISOWeek


                /***/
            }),
            /* 232 */
            /***/ (function (module, exports, __webpack_require__) {

                var getISOYear = __webpack_require__(3)
                var startOfISOWeek = __webpack_require__(4)

                /**
                 * @category ISO Week-Numbering Year Helpers
                 * @summary Return the last day of an ISO week-numbering year for the given date.
                 *
                 * @description
                 * Return the last day of an ISO week-numbering year,
                 * which always starts 3 days before the year's first Thursday.
                 * The result will be in the local timezone.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the end of an ISO week-numbering year
                 *
                 * @example
                 * // The last day of an ISO week-numbering year for 2 July 2005:
                 * var result = lastDayOfISOYear(new Date(2005, 6, 2))
                 * //=> Sun Jan 01 2006 00:00:00
                 */
                function lastDayOfISOYear(dirtyDate) {
                    var year = getISOYear(dirtyDate)
                    var fourthOfJanuary = new Date(0)
                    fourthOfJanuary.setFullYear(year + 1, 0, 4)
                    fourthOfJanuary.setHours(0, 0, 0, 0)
                    var date = startOfISOWeek(fourthOfJanuary)
                    date.setDate(date.getDate() - 1)
                    return date
                }

                module.exports = lastDayOfISOYear


                /***/
            }),
            /* 233 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Month Helpers
                 * @summary Return the last day of a month for the given date.
                 *
                 * @description
                 * Return the last day of a month for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the last day of a month
                 *
                 * @example
                 * // The last day of a month for 2 September 2014 11:55:00:
                 * var result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Tue Sep 30 2014 00:00:00
                 */
                function lastDayOfMonth(dirtyDate) {
                    var date = parse(dirtyDate)
                    var month = date.getMonth()
                    date.setFullYear(date.getFullYear(), month + 1, 0)
                    date.setHours(0, 0, 0, 0)
                    return date
                }

                module.exports = lastDayOfMonth


                /***/
            }),
            /* 234 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Quarter Helpers
                 * @summary Return the last day of a year quarter for the given date.
                 *
                 * @description
                 * Return the last day of a year quarter for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the last day of a quarter
                 *
                 * @example
                 * // The last day of a quarter for 2 September 2014 11:55:00:
                 * var result = lastDayOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Tue Sep 30 2014 00:00:00
                 */
                function lastDayOfQuarter(dirtyDate) {
                    var date = parse(dirtyDate)
                    var currentMonth = date.getMonth()
                    var month = currentMonth - currentMonth % 3 + 3
                    date.setMonth(month, 0)
                    date.setHours(0, 0, 0, 0)
                    return date
                }

                module.exports = lastDayOfQuarter


                /***/
            }),
            /* 235 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Year Helpers
                 * @summary Return the last day of a year for the given date.
                 *
                 * @description
                 * Return the last day of a year for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the last day of a year
                 *
                 * @example
                 * // The last day of a year for 2 September 2014 11:55:00:
                 * var result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
                 * //=> Wed Dec 31 2014 00:00:00
                 */
                function lastDayOfYear(dirtyDate) {
                    var date = parse(dirtyDate)
                    var year = date.getFullYear()
                    date.setFullYear(year + 1, 0, 0)
                    date.setHours(0, 0, 0, 0)
                    return date
                }

                module.exports = lastDayOfYear


                /***/
            }),
            /* 236 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Common Helpers
                 * @summary Return the latest of the given dates.
                 *
                 * @description
                 * Return the latest of the given dates.
                 *
                 * @param {...(Date|String|Number)} dates - the dates to compare
                 * @returns {Date} the latest of the dates
                 *
                 * @example
                 * // Which of these dates is the latest?
                 * var result = max(
                 *   new Date(1989, 6, 10),
                 *   new Date(1987, 1, 11),
                 *   new Date(1995, 6, 2),
                 *   new Date(1990, 0, 1)
                 * )
                 * //=> Sun Jul 02 1995 00:00:00
                 */
                function max() {
                    var dirtyDates = Array.prototype.slice.call(arguments)
                    var dates = dirtyDates.map(function (dirtyDate) {
                        return parse(dirtyDate)
                    })
                    var latestTimestamp = Math.max.apply(null, dates)
                    return new Date(latestTimestamp)
                }

                module.exports = max


                /***/
            }),
            /* 237 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Common Helpers
                 * @summary Return the earliest of the given dates.
                 *
                 * @description
                 * Return the earliest of the given dates.
                 *
                 * @param {...(Date|String|Number)} dates - the dates to compare
                 * @returns {Date} the earliest of the dates
                 *
                 * @example
                 * // Which of these dates is the earliest?
                 * var result = min(
                 *   new Date(1989, 6, 10),
                 *   new Date(1987, 1, 11),
                 *   new Date(1995, 6, 2),
                 *   new Date(1990, 0, 1)
                 * )
                 * //=> Wed Feb 11 1987 00:00:00
                 */
                function min() {
                    var dirtyDates = Array.prototype.slice.call(arguments)
                    var dates = dirtyDates.map(function (dirtyDate) {
                        return parse(dirtyDate)
                    })
                    var earliestTimestamp = Math.min.apply(null, dates)
                    return new Date(earliestTimestamp)
                }

                module.exports = min


                /***/
            }),
            /* 238 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Day Helpers
                 * @summary Set the day of the month to the given date.
                 *
                 * @description
                 * Set the day of the month to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} dayOfMonth - the day of the month of the new date
                 * @returns {Date} the new date with the day of the month setted
                 *
                 * @example
                 * // Set the 30th day of the month to 1 September 2014:
                 * var result = setDate(new Date(2014, 8, 1), 30)
                 * //=> Tue Sep 30 2014 00:00:00
                 */
                function setDate(dirtyDate, dirtyDayOfMonth) {
                    var date = parse(dirtyDate)
                    var dayOfMonth = Number(dirtyDayOfMonth)
                    date.setDate(dayOfMonth)
                    return date
                }

                module.exports = setDate


                /***/
            }),
            /* 239 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var addDays = __webpack_require__(7)

                /**
                 * @category Weekday Helpers
                 * @summary Set the day of the week to the given date.
                 *
                 * @description
                 * Set the day of the week to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} day - the day of the week of the new date
                 * @param {Object} [options] - the object with options
                 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
                 * @returns {Date} the new date with the day of the week setted
                 *
                 * @example
                 * // Set Sunday to 1 September 2014:
                 * var result = setDay(new Date(2014, 8, 1), 0)
                 * //=> Sun Aug 31 2014 00:00:00
                 *
                 * @example
                 * // If week starts with Monday, set Sunday to 1 September 2014:
                 * var result = setDay(new Date(2014, 8, 1), 0, {weekStartsOn: 1})
                 * //=> Sun Sep 07 2014 00:00:00
                 */
                function setDay(dirtyDate, dirtyDay, dirtyOptions) {
                    var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0
                    var date = parse(dirtyDate)
                    var day = Number(dirtyDay)
                    var currentDay = date.getDay()

                    var remainder = day % 7
                    var dayIndex = (remainder + 7) % 7

                    var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay
                    return addDays(date, diff)
                }

                module.exports = setDay


                /***/
            }),
            /* 240 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Day Helpers
                 * @summary Set the day of the year to the given date.
                 *
                 * @description
                 * Set the day of the year to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} dayOfYear - the day of the year of the new date
                 * @returns {Date} the new date with the day of the year setted
                 *
                 * @example
                 * // Set the 2nd day of the year to 2 July 2014:
                 * var result = setDayOfYear(new Date(2014, 6, 2), 2)
                 * //=> Thu Jan 02 2014 00:00:00
                 */
                function setDayOfYear(dirtyDate, dirtyDayOfYear) {
                    var date = parse(dirtyDate)
                    var dayOfYear = Number(dirtyDayOfYear)
                    date.setMonth(0)
                    date.setDate(dayOfYear)
                    return date
                }

                module.exports = setDayOfYear


                /***/
            }),
            /* 241 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Hour Helpers
                 * @summary Set the hours to the given date.
                 *
                 * @description
                 * Set the hours to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} hours - the hours of the new date
                 * @returns {Date} the new date with the hours setted
                 *
                 * @example
                 * // Set 4 hours to 1 September 2014 11:30:00:
                 * var result = setHours(new Date(2014, 8, 1, 11, 30), 4)
                 * //=> Mon Sep 01 2014 04:30:00
                 */
                function setHours(dirtyDate, dirtyHours) {
                    var date = parse(dirtyDate)
                    var hours = Number(dirtyHours)
                    date.setHours(hours)
                    return date
                }

                module.exports = setHours


                /***/
            }),
            /* 242 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var addDays = __webpack_require__(7)
                var getISODay = __webpack_require__(51)

                /**
                 * @category Weekday Helpers
                 * @summary Set the day of the ISO week to the given date.
                 *
                 * @description
                 * Set the day of the ISO week to the given date.
                 * ISO week starts with Monday.
                 * 7 is the index of Sunday, 1 is the index of Monday etc.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} day - the day of the ISO week of the new date
                 * @returns {Date} the new date with the day of the ISO week setted
                 *
                 * @example
                 * // Set Sunday to 1 September 2014:
                 * var result = setISODay(new Date(2014, 8, 1), 7)
                 * //=> Sun Sep 07 2014 00:00:00
                 */
                function setISODay(dirtyDate, dirtyDay) {
                    var date = parse(dirtyDate)
                    var day = Number(dirtyDay)
                    var currentDay = getISODay(date)
                    var diff = day - currentDay
                    return addDays(date, diff)
                }

                module.exports = setISODay


                /***/
            }),
            /* 243 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var getISOWeek = __webpack_require__(26)

                /**
                 * @category ISO Week Helpers
                 * @summary Set the ISO week to the given date.
                 *
                 * @description
                 * Set the ISO week to the given date, saving the weekday number.
                 *
                 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} isoWeek - the ISO week of the new date
                 * @returns {Date} the new date with the ISO week setted
                 *
                 * @example
                 * // Set the 53rd ISO week to 7 August 2004:
                 * var result = setISOWeek(new Date(2004, 7, 7), 53)
                 * //=> Sat Jan 01 2005 00:00:00
                 */
                function setISOWeek(dirtyDate, dirtyISOWeek) {
                    var date = parse(dirtyDate)
                    var isoWeek = Number(dirtyISOWeek)
                    var diff = getISOWeek(date) - isoWeek
                    date.setDate(date.getDate() - diff * 7)
                    return date
                }

                module.exports = setISOWeek


                /***/
            }),
            /* 244 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Millisecond Helpers
                 * @summary Set the milliseconds to the given date.
                 *
                 * @description
                 * Set the milliseconds to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} milliseconds - the milliseconds of the new date
                 * @returns {Date} the new date with the milliseconds setted
                 *
                 * @example
                 * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
                 * var result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
                 * //=> Mon Sep 01 2014 11:30:40.300
                 */
                function setMilliseconds(dirtyDate, dirtyMilliseconds) {
                    var date = parse(dirtyDate)
                    var milliseconds = Number(dirtyMilliseconds)
                    date.setMilliseconds(milliseconds)
                    return date
                }

                module.exports = setMilliseconds


                /***/
            }),
            /* 245 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Minute Helpers
                 * @summary Set the minutes to the given date.
                 *
                 * @description
                 * Set the minutes to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} minutes - the minutes of the new date
                 * @returns {Date} the new date with the minutes setted
                 *
                 * @example
                 * // Set 45 minutes to 1 September 2014 11:30:40:
                 * var result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
                 * //=> Mon Sep 01 2014 11:45:40
                 */
                function setMinutes(dirtyDate, dirtyMinutes) {
                    var date = parse(dirtyDate)
                    var minutes = Number(dirtyMinutes)
                    date.setMinutes(minutes)
                    return date
                }

                module.exports = setMinutes


                /***/
            }),
            /* 246 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)
                var setMonth = __webpack_require__(65)

                /**
                 * @category Quarter Helpers
                 * @summary Set the year quarter to the given date.
                 *
                 * @description
                 * Set the year quarter to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} quarter - the quarter of the new date
                 * @returns {Date} the new date with the quarter setted
                 *
                 * @example
                 * // Set the 2nd quarter to 2 July 2014:
                 * var result = setQuarter(new Date(2014, 6, 2), 2)
                 * //=> Wed Apr 02 2014 00:00:00
                 */
                function setQuarter(dirtyDate, dirtyQuarter) {
                    var date = parse(dirtyDate)
                    var quarter = Number(dirtyQuarter)
                    var oldQuarter = Math.floor(date.getMonth() / 3) + 1
                    var diff = quarter - oldQuarter
                    return setMonth(date, date.getMonth() + diff * 3)
                }

                module.exports = setQuarter


                /***/
            }),
            /* 247 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Second Helpers
                 * @summary Set the seconds to the given date.
                 *
                 * @description
                 * Set the seconds to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} seconds - the seconds of the new date
                 * @returns {Date} the new date with the seconds setted
                 *
                 * @example
                 * // Set 45 seconds to 1 September 2014 11:30:40:
                 * var result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
                 * //=> Mon Sep 01 2014 11:30:45
                 */
                function setSeconds(dirtyDate, dirtySeconds) {
                    var date = parse(dirtyDate)
                    var seconds = Number(dirtySeconds)
                    date.setSeconds(seconds)
                    return date
                }

                module.exports = setSeconds


                /***/
            }),
            /* 248 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Year Helpers
                 * @summary Set the year to the given date.
                 *
                 * @description
                 * Set the year to the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} year - the year of the new date
                 * @returns {Date} the new date with the year setted
                 *
                 * @example
                 * // Set year 2013 to 1 September 2014:
                 * var result = setYear(new Date(2014, 8, 1), 2013)
                 * //=> Sun Sep 01 2013 00:00:00
                 */
                function setYear(dirtyDate, dirtyYear) {
                    var date = parse(dirtyDate)
                    var year = Number(dirtyYear)
                    date.setFullYear(year)
                    return date
                }

                module.exports = setYear


                /***/
            }),
            /* 249 */
            /***/ (function (module, exports, __webpack_require__) {

                var parse = __webpack_require__(0)

                /**
                 * @category Month Helpers
                 * @summary Return the start of a month for the given date.
                 *
                 * @description
                 * Return the start of a month for the given date.
                 * The result will be in the local timezone.
                 *
                 * @param {Date|String|Number} date - the original date
                 * @returns {Date} the start of a month
                 *
                 * @example
                 * // The start of a month for 2 September 2014 11:55:00:
                 * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
                 * //=> Mon Sep 01 2014 00:00:00
                 */
                function startOfMonth(dirtyDate) {
                    var date = parse(dirtyDate)
                    date.setDate(1)
                    date.setHours(0, 0, 0, 0)
                    return date
                }

                module.exports = startOfMonth


                /***/
            }),
            /* 250 */
            /***/ (function (module, exports, __webpack_require__) {

                var startOfDay = __webpack_require__(5)

                /**
                 * @category Day Helpers
                 * @summary Return the start of today.
                 *
                 * @description
                 * Return the start of today.
                 *
                 * @returns {Date} the start of today
                 *
                 * @example
                 * // If today is 6 October 2014:
                 * var result = startOfToday()
                 * //=> Mon Oct 6 2014 00:00:00
                 */
                function startOfToday() {
                    return startOfDay(new Date())
                }

                module.exports = startOfToday


                /***/
            }),
            /* 251 */
            /***/ (function (module, exports) {

                /**
                 * @category Day Helpers
                 * @summary Return the start of tomorrow.
                 *
                 * @description
                 * Return the start of tomorrow.
                 *
                 * @returns {Date} the start of tomorrow
                 *
                 * @example
                 * // If today is 6 October 2014:
                 * var result = startOfTomorrow()
                 * //=> Tue Oct 7 2014 00:00:00
                 */
                function startOfTomorrow() {
                    var now = new Date()
                    var year = now.getFullYear()
                    var month = now.getMonth()
                    var day = now.getDate()

                    var date = new Date(0)
                    date.setFullYear(year, month, day + 1)
                    date.setHours(0, 0, 0, 0)
                    return date
                }

                module.exports = startOfTomorrow


                /***/
            }),
            /* 252 */
            /***/ (function (module, exports) {

                /**
                 * @category Day Helpers
                 * @summary Return the start of yesterday.
                 *
                 * @description
                 * Return the start of yesterday.
                 *
                 * @returns {Date} the start of yesterday
                 *
                 * @example
                 * // If today is 6 October 2014:
                 * var result = startOfYesterday()
                 * //=> Sun Oct 5 2014 00:00:00
                 */
                function startOfYesterday() {
                    var now = new Date()
                    var year = now.getFullYear()
                    var month = now.getMonth()
                    var day = now.getDate()

                    var date = new Date(0)
                    date.setFullYear(year, month, day - 1)
                    date.setHours(0, 0, 0, 0)
                    return date
                }

                module.exports = startOfYesterday


                /***/
            }),
            /* 253 */
            /***/ (function (module, exports, __webpack_require__) {

                var addDays = __webpack_require__(7)

                /**
                 * @category Day Helpers
                 * @summary Subtract the specified number of days from the given date.
                 *
                 * @description
                 * Subtract the specified number of days from the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of days to be subtracted
                 * @returns {Date} the new date with the days subtracted
                 *
                 * @example
                 * // Subtract 10 days from 1 September 2014:
                 * var result = subDays(new Date(2014, 8, 1), 10)
                 * //=> Fri Aug 22 2014 00:00:00
                 */
                function subDays(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addDays(dirtyDate, -amount)
                }

                module.exports = subDays


                /***/
            }),
            /* 254 */
            /***/ (function (module, exports, __webpack_require__) {

                var addHours = __webpack_require__(29)

                /**
                 * @category Hour Helpers
                 * @summary Subtract the specified number of hours from the given date.
                 *
                 * @description
                 * Subtract the specified number of hours from the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of hours to be subtracted
                 * @returns {Date} the new date with the hours subtracted
                 *
                 * @example
                 * // Subtract 2 hours from 11 July 2014 01:00:00:
                 * var result = subHours(new Date(2014, 6, 11, 1, 0), 2)
                 * //=> Thu Jul 10 2014 23:00:00
                 */
                function subHours(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addHours(dirtyDate, -amount)
                }

                module.exports = subHours


                /***/
            }),
            /* 255 */
            /***/ (function (module, exports, __webpack_require__) {

                var addMilliseconds = __webpack_require__(8)

                /**
                 * @category Millisecond Helpers
                 * @summary Subtract the specified number of milliseconds from the given date.
                 *
                 * @description
                 * Subtract the specified number of milliseconds from the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of milliseconds to be subtracted
                 * @returns {Date} the new date with the milliseconds subtracted
                 *
                 * @example
                 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
                 * var result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
                 * //=> Thu Jul 10 2014 12:45:29.250
                 */
                function subMilliseconds(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addMilliseconds(dirtyDate, -amount)
                }

                module.exports = subMilliseconds


                /***/
            }),
            /* 256 */
            /***/ (function (module, exports, __webpack_require__) {

                var addMinutes = __webpack_require__(32)

                /**
                 * @category Minute Helpers
                 * @summary Subtract the specified number of minutes from the given date.
                 *
                 * @description
                 * Subtract the specified number of minutes from the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of minutes to be subtracted
                 * @returns {Date} the new date with the mintues subtracted
                 *
                 * @example
                 * // Subtract 30 minutes from 10 July 2014 12:00:00:
                 * var result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
                 * //=> Thu Jul 10 2014 11:30:00
                 */
                function subMinutes(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addMinutes(dirtyDate, -amount)
                }

                module.exports = subMinutes


                /***/
            }),
            /* 257 */
            /***/ (function (module, exports, __webpack_require__) {

                var addMonths = __webpack_require__(13)

                /**
                 * @category Month Helpers
                 * @summary Subtract the specified number of months from the given date.
                 *
                 * @description
                 * Subtract the specified number of months from the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of months to be subtracted
                 * @returns {Date} the new date with the months subtracted
                 *
                 * @example
                 * // Subtract 5 months from 1 February 2015:
                 * var result = subMonths(new Date(2015, 1, 1), 5)
                 * //=> Mon Sep 01 2014 00:00:00
                 */
                function subMonths(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addMonths(dirtyDate, -amount)
                }

                module.exports = subMonths


                /***/
            }),
            /* 258 */
            /***/ (function (module, exports, __webpack_require__) {

                var addQuarters = __webpack_require__(33)

                /**
                 * @category Quarter Helpers
                 * @summary Subtract the specified number of year quarters from the given date.
                 *
                 * @description
                 * Subtract the specified number of year quarters from the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of quarters to be subtracted
                 * @returns {Date} the new date with the quarters subtracted
                 *
                 * @example
                 * // Subtract 3 quarters from 1 September 2014:
                 * var result = subQuarters(new Date(2014, 8, 1), 3)
                 * //=> Sun Dec 01 2013 00:00:00
                 */
                function subQuarters(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addQuarters(dirtyDate, -amount)
                }

                module.exports = subQuarters


                /***/
            }),
            /* 259 */
            /***/ (function (module, exports, __webpack_require__) {

                var addSeconds = __webpack_require__(34)

                /**
                 * @category Second Helpers
                 * @summary Subtract the specified number of seconds from the given date.
                 *
                 * @description
                 * Subtract the specified number of seconds from the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of seconds to be subtracted
                 * @returns {Date} the new date with the seconds subtracted
                 *
                 * @example
                 * // Subtract 30 seconds from 10 July 2014 12:45:00:
                 * var result = subSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
                 * //=> Thu Jul 10 2014 12:44:30
                 */
                function subSeconds(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addSeconds(dirtyDate, -amount)
                }

                module.exports = subSeconds


                /***/
            }),
            /* 260 */
            /***/ (function (module, exports, __webpack_require__) {

                var addWeeks = __webpack_require__(21)

                /**
                 * @category Week Helpers
                 * @summary Subtract the specified number of weeks from the given date.
                 *
                 * @description
                 * Subtract the specified number of weeks from the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of weeks to be subtracted
                 * @returns {Date} the new date with the weeks subtracted
                 *
                 * @example
                 * // Subtract 4 weeks from 1 September 2014:
                 * var result = subWeeks(new Date(2014, 8, 1), 4)
                 * //=> Mon Aug 04 2014 00:00:00
                 */
                function subWeeks(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addWeeks(dirtyDate, -amount)
                }

                module.exports = subWeeks


                /***/
            }),
            /* 261 */
            /***/ (function (module, exports, __webpack_require__) {

                var addYears = __webpack_require__(35)

                /**
                 * @category Year Helpers
                 * @summary Subtract the specified number of years from the given date.
                 *
                 * @description
                 * Subtract the specified number of years from the given date.
                 *
                 * @param {Date|String|Number} date - the date to be changed
                 * @param {Number} amount - the amount of years to be subtracted
                 * @returns {Date} the new date with the years subtracted
                 *
                 * @example
                 * // Subtract 5 years from 1 September 2014:
                 * var result = subYears(new Date(2014, 8, 1), 5)
                 * //=> Tue Sep 01 2009 00:00:00
                 */
                function subYears(dirtyDate, dirtyAmount) {
                    var amount = Number(dirtyAmount)
                    return addYears(dirtyDate, -amount)
                }

                module.exports = subYears


                /***/
            }),
            /* 262 */
            /***/ (function (module, exports, __webpack_require__) {

                var map = {
                    "./ar": 66,
                    "./ar.js": 66,
                    "./az": 67,
                    "./az.js": 67,
                    "./bn": 68,
                    "./bn.js": 68,
                    "./cs": 69,
                    "./cs.js": 69,
                    "./de": 70,
                    "./de.js": 70,
                    "./el": 71,
                    "./el.js": 71,
                    "./es": 72,
                    "./es.js": 72,
                    "./fa": 73,
                    "./fa.js": 73,
                    "./fr": 74,
                    "./fr.js": 74,
                    "./hi": 75,
                    "./hi.js": 75,
                    "./hu": 76,
                    "./hu.js": 76,
                    "./id": 77,
                    "./id.js": 77,
                    "./it": 78,
                    "./it.js": 78,
                    "./ja": 79,
                    "./ja.js": 79,
                    "./jv": 80,
                    "./jv.js": 80,
                    "./ko": 81,
                    "./ko.js": 81,
                    "./my": 82,
                    "./my.js": 82,
                    "./nl": 83,
                    "./nl.js": 83,
                    "./pa-in": 84,
                    "./pa-in.js": 84,
                    "./pl": 85,
                    "./pl.js": 85,
                    "./pt": 86,
                    "./pt.js": 86,
                    "./ro": 87,
                    "./ro.js": 87,
                    "./ru": 88,
                    "./ru.js": 88,
                    "./sr": 89,
                    "./sr.js": 89,
                    "./th": 90,
                    "./th.js": 90,
                    "./tr": 91,
                    "./tr.js": 91,
                    "./uk": 92,
                    "./uk.js": 92,
                    "./uz": 93,
                    "./uz.js": 93,
                    "./vi": 94,
                    "./vi.js": 94,
                    "./zh-cn": 95,
                    "./zh-cn.js": 95,
                    "./zh-tw": 96,
                    "./zh-tw.js": 96
                };

                function webpackContext(req) {
                    return __webpack_require__(webpackContextResolve(req));
                };

                function webpackContextResolve(req) {
                    var id = map[req];
                    if (!(id + 1)) // check for number or string
                        throw new Error("Cannot find module '" + req + "'.");
                    return id;
                };
                webpackContext.keys = function webpackContextKeys() {
                    return Object.keys(map);
                };
                webpackContext.resolve = webpackContextResolve;
                module.exports = webpackContext;
                webpackContext.id = 262;

                /***/
            }),
            /* 263 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(17);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_1__utils_type__ = __webpack_require__(18);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_2_date_fns__ = __webpack_require__(6);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_2_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_date_fns__);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_3__utils_events__ = __webpack_require__(28);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_4__templates_datepicker__ = __webpack_require__(264);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_5__templates_days__ = __webpack_require__(265);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_6__templates_weekdays__ = __webpack_require__(266);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_7__templates_months__ = __webpack_require__(267);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_8__templates_years__ = __webpack_require__(268);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_9__defaultOptions__ = __webpack_require__(269);
                var _extends = Object.assign || function (target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                };

                var _createClass = function () {
                    function defineProperties(target, props) {
                        for (var i = 0; i < props.length; i++) {
                            var descriptor = props[i];
                            descriptor.enumerable = descriptor.enumerable || false;
                            descriptor.configurable = true;
                            if ("value" in descriptor) descriptor.writable = true;
                            Object.defineProperty(target, descriptor.key, descriptor);
                        }
                    }

                    return function (Constructor, protoProps, staticProps) {
                        if (protoProps) defineProperties(Constructor.prototype, protoProps);
                        if (staticProps) defineProperties(Constructor, staticProps);
                        return Constructor;
                    };
                }();

                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }

                function _possibleConstructorReturn(self, call) {
                    if (!self) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return call && (typeof call === "object" || typeof call === "function") ? call : self;
                }

                function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                    }
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
                }


                var datePicker = function (_EventEmitter) {
                    _inherits(datePicker, _EventEmitter);

                    function datePicker() {
                        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                        _classCallCheck(this, datePicker);

                        var _this = _possibleConstructorReturn(this, (datePicker.__proto__ || Object.getPrototypeOf(datePicker)).call(this));

                        _this.options = _extends({}, __WEBPACK_IMPORTED_MODULE_9__defaultOptions__["a" /* default */], options);

                        _this._clickEvents = ['click', 'touch'];
                        _this._supportsPassive = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* detectSupportsPassive */]();
                        _this._id = __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* uuid */]('datePicker');
                        _this.node = null;

                        _this.onPreviousDatePicker = _this.onPreviousDatePicker.bind(_this);
                        _this.onNextDatePicker = _this.onNextDatePicker.bind(_this);
                        _this.onSelectMonthDatePicker = _this.onSelectMonthDatePicker.bind(_this);
                        _this.onMonthClickDatePicker = _this.onMonthClickDatePicker.bind(_this);
                        _this.onSelectYearDatePicker = _this.onSelectYearDatePicker.bind(_this);
                        _this.onYearClickDatePicker = _this.onYearClickDatePicker.bind(_this);
                        _this.onDateClickDatePicker = _this.onDateClickDatePicker.bind(_this);

                        _this._init();
                        return _this;
                    }

                    /****************************************************
                     *                                                  *
                     * GETTERS and SETTERS                              *
                     *                                                  *
                     ****************************************************/
                    /**
                     * Get id of current datePicker
                     */


                    _createClass(datePicker, [{
                        key: 'onPreviousDatePicker',


                        /****************************************************
                         *                                                  *
                         * EVENTS FUNCTIONS                                 *
                         *                                                  *
                         ****************************************************/
                        value: function onPreviousDatePicker(e) {
                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            var prevMonth = __WEBPACK_IMPORTED_MODULE_2_date_fns__["lastDayOfMonth"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["subMonths"](new Date(__WEBPACK_IMPORTED_MODULE_2_date_fns__["getYear"](this._visibleDate), __WEBPACK_IMPORTED_MODULE_2_date_fns__["getMonth"](this._visibleDate)), 1));
                            var day = Math.min(__WEBPACK_IMPORTED_MODULE_2_date_fns__["getDaysInMonth"](prevMonth), __WEBPACK_IMPORTED_MODULE_2_date_fns__["getDate"](this._visibleDate));
                            this._visibleDate = this.min ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["max"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["setDate"](prevMonth, day), this.min) : __WEBPACK_IMPORTED_MODULE_2_date_fns__["setDate"](prevMonth, day);

                            this.refresh();
                        }
                    }, {
                        key: 'onNextDatePicker',
                        value: function onNextDatePicker(e) {
                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            var nextMonth = __WEBPACK_IMPORTED_MODULE_2_date_fns__["addMonths"](this._visibleDate, 1);
                            var day = Math.min(__WEBPACK_IMPORTED_MODULE_2_date_fns__["getDaysInMonth"](nextMonth), __WEBPACK_IMPORTED_MODULE_2_date_fns__["getDate"](this._visibleDate));
                            this._visibleDate = this.max ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["min"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["setDate"](nextMonth, day), this.max) : __WEBPACK_IMPORTED_MODULE_2_date_fns__["setDate"](nextMonth, day);

                            this.refresh();
                        }
                    }, {
                        key: 'onSelectMonthDatePicker',
                        value: function onSelectMonthDatePicker(e) {
                            e.stopPropagation();

                            if (this.options.enableMonthSwitch) {
                                this._ui.body.dates.classList.remove('is-active');
                                this._ui.body.years.classList.remove('is-active');
                                this._ui.body.months.classList.add('is-active');
                                this._ui.navigation.previous.setAttribute('disabled', 'disabled');
                                this._ui.navigation.next.setAttribute('disabled', 'disabled');
                            }
                        }
                    }, {
                        key: 'onSelectYearDatePicker',
                        value: function onSelectYearDatePicker(e) {
                            e.stopPropagation();

                            if (this.options.enableYearSwitch) {
                                this._ui.body.dates.classList.remove('is-active');
                                this._ui.body.months.classList.remove('is-active');
                                this._ui.body.years.classList.add('is-active');
                                this._ui.navigation.previous.setAttribute('disabled', 'disabled');
                                this._ui.navigation.next.setAttribute('disabled', 'disabled');

                                var currentYear = this._ui.body.years.querySelector('.calendar-year.is-active');
                                if (currentYear) {
                                    this._ui.body.years.scrollTop = currentYear.offsetTop - this._ui.body.years.offsetTop - this._ui.body.years.clientHeight / 2;
                                }
                            }
                        }
                    }, {
                        key: 'onMonthClickDatePicker',
                        value: function onMonthClickDatePicker(e) {
                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }

                            e.stopPropagation();
                            var newDate = __WEBPACK_IMPORTED_MODULE_2_date_fns__["setMonth"](this._visibleDate, parseInt(e.currentTarget.dataset.month) - 1);
                            this._visibleDate = this.min ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["max"](newDate, this.min) : newDate;
                            this._visibleDate = this.max ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["min"](this._visibleDate, this.max) : this._visibleDate;

                            this.refresh();
                        }
                    }, {
                        key: 'onYearClickDatePicker',
                        value: function onYearClickDatePicker(e) {
                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }

                            e.stopPropagation();
                            var newDate = __WEBPACK_IMPORTED_MODULE_2_date_fns__["setYear"](this._visibleDate, parseInt(e.currentTarget.dataset.year));
                            this._visibleDate = this.min ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["max"](newDate, this.min) : newDate;
                            this._visibleDate = this.max ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["min"](this._visibleDate, this.max) : this._visibleDate;

                            this.refresh();
                        }
                    }, {
                        key: 'onDateClickDatePicker',
                        value: function onDateClickDatePicker(e) {
                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            if (!e.currentTarget.classList.contains('is-disabled')) {
                                this._select(e.currentTarget.dataset.date);

                                this.refresh();
                            }
                        }

                        /****************************************************
                         *                                                  *
                         * PUBLIC FUNCTIONS                                 *
                         *                                                  *
                         ****************************************************/

                    }, {
                        key: 'isRange',
                        value: function isRange() {
                            return this.options.isRange;
                        }
                    }, {
                        key: 'enableDate',
                        value: function enableDate() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            var index = this.disabledDates.findIndex(function (disableDate) {
                                return __WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](disableDate, date);
                            });
                            if (index > -1) {
                                unset(this.disabledDates[index]);
                            }
                        }
                    }, {
                        key: 'disableDate',
                        value: function disableDate() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            var index = this.disabledDates.findIndex(function (disableDate) {
                                return __WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](disableDate, date);
                            });
                            if (index > -1) {
                                this.disabledDates.push(date);
                            }
                        }
                    }, {
                        key: 'highlightDate',
                        value: function highlightDate() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            var index = this.highlightedDates.findIndex(function (highlightDate) {
                                return __WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](highlightDate, date);
                            });
                            if (index > -1) {
                                unset(this.highlightedDates[index]);
                            }
                        }
                    }, {
                        key: 'unhighlightDate',
                        value: function unhighlightDate() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            var index = this.highlightedDates.findIndex(function (highlightDate) {
                                return __WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](highlightDate, date);
                            });
                            if (index > -1) {
                                this.highlightedDates.push(date);
                            }
                        }
                    }, {
                        key: 'enableWeekDay',
                        value: function enableWeekDay(day) {
                            var index = this.disabledWeekDays.findIndex(function (disabledWeekDay) {
                                return __WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](disabledWeekDay, day);
                            });
                            if (index > -1) {
                                unset(this.disabledWeekDays[index]);
                            }
                        }
                    }, {
                        key: 'disableWeekDay',
                        value: function disableWeekDay(day) {
                            var index = this.disabledWeekDays.findIndex(function (disabledWeekDay) {
                                return __WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](disabledWeekDay, date);
                            });
                            if (index > -1) {
                                this.disabledWeekDays.push(day);
                            }
                        }
                    }, {
                        key: 'show',
                        value: function show() {
                            if (!this._open) {
                                this._ui.body.dates.classList.add('is-active');
                                this._ui.body.months.classList.remove('is-active');
                                this._ui.body.years.classList.remove('is-active');
                                this._ui.navigation.previous.removeAttribute('disabled');
                                this._ui.navigation.next.removeAttribute('disabled');
                                this._ui.container.classList.add('is-active');
                                this._open = true;
                                this._focus = true;

                                this.emit('show', this);
                            }
                        }
                    }, {
                        key: 'hide',
                        value: function hide() {
                            if (this._open) {
                                this._open = false;
                                this._focus = false;
                                this._ui.container.classList.remove('is-active');
                                this.emit('hide', this);
                            }
                        }
                    }, {
                        key: 'toggle',
                        value: function toggle() {
                            if (!this._open) {
                                this.show();
                            } else {
                                this.hide();
                            }
                        }

                        /**
                         * Get / Set datePicker value
                         * @param {null|Date|Object|String} date optional if null then return the current date as String
                         */

                    }, {
                        key: 'value',
                        value: function value() {
                            var _value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                            if (_value) {
                                if (this.options.isRange) {
                                    if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["e" /* isString */](_value)) {
                                        var dates = _value.split(' - ');
                                        if (dates.length) {
                                            this.start = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](new Date(dates[0]), this.format, {
                                                locale: this.locale
                                            });
                                        }
                                        if (dates.length === 2) {
                                            this.end = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](new Date(dates[1]), this.format, {
                                                locale: this.locale
                                            });
                                        }
                                    }
                                    if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["d" /* isObject */](_value) || __WEBPACK_IMPORTED_MODULE_1__utils_type__["b" /* isDate */](_value)) {
                                        this._select(_value);
                                    }
                                } else {
                                    if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["e" /* isString */](_value)) {
                                        this.start = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](new Date(_value), this.format, {
                                            locale: this.locale
                                        });
                                        this.end = undefined;
                                    }

                                    if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["d" /* isObject */](_value) || __WEBPACK_IMPORTED_MODULE_1__utils_type__["b" /* isDate */](_value)) {
                                        this._select(_value);
                                    }
                                }
                            } else {
                                var string = this.start && this._isValidDate(this.start) ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.start, this.format, {
                                    locale: this.locale
                                }) : '';

                                if (this.options.isRange) {
                                    if (this.end && this._isValidDate(this.end)) {
                                        string += ' - ' + __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.end, this.format, {locale: this.locale});
                                    }
                                }
                                return string;
                            }
                        }

                        /**
                         * Refresh datepicker with new year/month days
                         * @method _refreshdatepicker
                         * @return {[type]}        [description]
                         */

                    }, {
                        key: 'refresh',
                        value: function refresh() {
                            var _this2 = this;

                            this._ui.body.dates.innerHTML = '';

                            // the 12 months of the year (Jan-SDecat)
                            var monthLabels = new Array(12).fill(__WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfYear"](this._visibleDate)).map(function (d, i) {
                                return __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["addMonths"](d, i), 'MM', {
                                    locale: _this2.locale
                                });
                            });
                            this._ui.body.months.innerHTML = '';
                            this._ui.body.months.appendChild(document.createRange().createContextualFragment(Object(__WEBPACK_IMPORTED_MODULE_7__templates_months__["a" /* default */])({
                                months: monthLabels,
                                locale: this.locale
                            })));
                            var months = this._ui.body.months.querySelectorAll('.datepicker-month') || [];
                            months.forEach(function (month) {
                                _this2._clickEvents.forEach(function (clickEvent) {
                                    month.addEventListener(clickEvent, _this2.onMonthClickDatePicker);
                                });
                                month.classList.remove('is-active');
                                if (month.dataset.month === __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this2._visibleDate, 'MM', {
                                    locale: _this2.locale
                                })) {
                                    month.classList.add('is-active');
                                }
                            });

                            var yearLabels = new Array(this.options.displayYearsCount * 2).fill(__WEBPACK_IMPORTED_MODULE_2_date_fns__["subYears"](this._visibleDate, this.options.displayYearsCount)).map(function (d, i) {
                                return __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["addYears"](d, i), 'YYYY', {
                                    locale: _this2.locale
                                });
                            });
                            this._ui.body.years.innerHTML = '';
                            this._ui.body.years.appendChild(document.createRange().createContextualFragment(Object(__WEBPACK_IMPORTED_MODULE_8__templates_years__["a" /* default */])({
                                visibleDate: this._visibleDate,
                                years: yearLabels
                            })));
                            var years = this._ui.body.years.querySelectorAll('.datepicker-year') || [];
                            years.forEach(function (year) {
                                _this2._clickEvents.forEach(function (clickEvent) {
                                    year.addEventListener(clickEvent, _this2.onYearClickDatePicker);
                                });
                                year.classList.remove('is-active');
                                if (year.dataset.year === __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this2._visibleDate, 'YYYY', {
                                    locale: _this2.locale
                                })) {
                                    year.classList.add('is-active');
                                }
                            });

                            // the 7 days of the week (Sun-Sat)
                            var weekdayLabels = new Array(7).fill(__WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfWeek"](this._visibleDate, {weekStartsOn: this.options.weekStart})).map(function (d, i) {
                                return __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["addDays"](d, i), 'ddd', {
                                    locale: _this2.locale
                                });
                            });
                            this._ui.body.dates.appendChild(document.createRange().createContextualFragment(Object(__WEBPACK_IMPORTED_MODULE_6__templates_weekdays__["a" /* default */])({
                                weekdays: weekdayLabels
                            })));

                            if (this.min && __WEBPACK_IMPORTED_MODULE_2_date_fns__["differenceInMonths"](this._visibleDate, this.min) === 0) {
                                this._togglePreviousButton(false);
                            } else {
                                this._togglePreviousButton();
                            }

                            if (this.max && __WEBPACK_IMPORTED_MODULE_2_date_fns__["differenceInMonths"](this._visibleDate, this.max) === 0) {
                                this._toggleNextButton(false);
                            } else {
                                this._toggleNextButton();
                            }

                            this._ui.navigation.month.innerHTML = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this._visibleDate, this.options.navigationMonthFormat, {
                                locale: this.locale
                            });
                            this._ui.navigation.year.innerHTML = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this._visibleDate, this.options.navigationYearFormat, {
                                locale: this.locale
                            });

                            this._renderDays();

                            this._ui.body.dates.classList.add('is-active');
                            this._ui.body.months.classList.remove('is-active');
                            this._ui.body.years.classList.remove('is-active');
                            this._ui.navigation.previous.removeAttribute('disabled');
                            this._ui.navigation.next.removeAttribute('disabled');

                            return this;
                        }
                    }, {
                        key: 'clear',
                        value: function clear() {
                            var today = new Date();
                            this._date = {
                                start: undefined,
                                end: undefined
                            };
                            this._visibleDate = this._isValidDate(today, this.min, this.max) ? today : this.min;
                            this.refresh();
                        }
                    }, {
                        key: 'snapshot',
                        value: function snapshot() {
                            this._snapshots.push(_extends({}, this._date));
                        }
                    }, {
                        key: 'render',
                        value: function render() {
                            this.refresh();
                            return this.node;
                        }

                        /****************************************************
                         *                                                  *
                         * PRIVATE FUNCTIONS                                *
                         *                                                  *
                         ****************************************************/

                    }, {
                        key: '_init',
                        value: function _init() {
                            var today = new Date();
                            console.log('初始化Options：', this.options);
                            this._open = false;
                            this._snapshots = [];
                            this.lang = this.options.lang;
                            this.format = this.options.dateFormat || 'MM/DD/YYYY';
                            this.disabledDates = Array.isArray(this.options.disabledDates) ? this.options.disabledDates : [];
                            for (var i = 0; i < this.disabledDates.length; i++) {
                                // this.disabledDates[i] = dateFns.format(this.disabledDates[i], this.format, {
                                // 	locale: this.locale
                                // });
                                var date = new Date(this.disabledDates[i]);// csharp 序列化过来是string
                                this.disabledDates[i] = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                            }

                            this.highlightedDates = Array.isArray(this.options.highlightedDates) ? this.options.highlightedDates : [];
                            for (var i = 0; i < this.highlightedDates.length; i++) {
                                this.highlightedDates[i] = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.highlightedDates[i], this.format, {
                                    locale: this.locale
                                });
                            }

                            this.disabledWeekDays = __WEBPACK_IMPORTED_MODULE_1__utils_type__["e" /* isString */](this.options.disabledWeekDays) ? this.options.disabledWeekDays.split(',') : Array.isArray(this.options.disabledWeekDays) ? this.options.disabledWeekDays : [];
                            this.min = this.options.minDate;
                            this.max = this.options.maxDate;
                            this._date = {
                                start: this.options.startDate,
                                end: this.options.isRange ? this.options.endDate : undefined
                            };
                            this._visibleDate = this._isValidDate(this.start) ? this.start : this._isValidDate(today, this.min, this.max) ? today : this.min;

                            this._build();
                            this._bindEvents();

                            this.emit('ready', this);
                        }
                    }, {
                        key: '_build',
                        value: function _build() {
                            this.node = document.createRange().createContextualFragment(Object(__WEBPACK_IMPORTED_MODULE_4__templates_datepicker__["a" /* default */])({
                                locale: this.locale,
                                visibleDate: this._visibleDate,
                                icons: this.options.icons
                            }));

                            this._ui = {
                                container: this.node.firstChild,
                                navigation: {
                                    container: this.node.querySelector('.datepicker-nav'),
                                    previous: this.node.querySelector('.datepicker-nav-previous'),
                                    next: this.node.querySelector('.datepicker-nav-next'),
                                    month: this.node.querySelector('.datepicker-nav-month'),
                                    year: this.node.querySelector('.datepicker-nav-year')
                                },
                                body: {
                                    dates: this.node.querySelector('.datepicker-dates'),
                                    days: this.node.querySelector('.datepicker-days'),
                                    weekdays: this.node.querySelector('.datepicker-weekdays'),
                                    months: this.node.querySelector('.datepicker-months'),
                                    years: this.node.querySelector('.datepicker-years')
                                }
                            };
                        }
                    }, {
                        key: '_bindEvents',
                        value: function _bindEvents() {
                            var _this3 = this;

                            document.addEventListener('keydown', function (e) {
                                if (_this3._focus) {
                                    switch (e.keyCode || e.which) {
                                        case 37:
                                            _this3.onPreviousDatePicker(e);
                                            break;
                                        case 39:
                                            _this3.onNextDatePicker(e);
                                            break;
                                    }
                                }
                            });

                            // Bind year navigation events
                            if (this._ui.navigation.previous) {
                                this._clickEvents.forEach(function (clickEvent) {
                                    _this3._ui.navigation.previous.addEventListener(clickEvent, _this3.onPreviousDatePicker);
                                });
                            }
                            if (this._ui.navigation.next) {
                                this._clickEvents.forEach(function (clickEvent) {
                                    _this3._ui.navigation.next.addEventListener(clickEvent, _this3.onNextDatePicker);
                                });
                            }

                            if (this._ui.navigation.month) {
                                this._clickEvents.forEach(function (clickEvent) {
                                    _this3._ui.navigation.month.addEventListener(clickEvent, _this3.onSelectMonthDatePicker);
                                });
                            }
                            if (this._ui.navigation.year) {
                                this._clickEvents.forEach(function (clickEvent) {
                                    _this3._ui.navigation.year.addEventListener(clickEvent, _this3.onSelectYearDatePicker);
                                });
                            }

                            var months = this._ui.body.months.querySelectorAll('.calendar-month') || [];
                            months.forEach(function (month) {
                                _this3._clickEvents.forEach(function (clickEvent) {
                                    month.addEventListener(clickEvent, _this3.onMonthClickDatePicker);
                                });
                            });

                            var years = this._ui.body.years.querySelectorAll('.calendar-year') || [];
                            years.forEach(function (year) {
                                _this3._clickEvents.forEach(function (clickEvent) {
                                    year.addEventListener(clickEvent, _this3.onYearClickDatePicker);
                                });
                            });
                        }

                        /**
                         * Bind events on each Day item
                         * @method _bindDaysEvents
                         * @return {void}
                         */

                    }, {
                        key: '_bindDaysEvents',
                        value: function _bindDaysEvents() {
                            var _this4 = this;

                            [].forEach.call(this._ui.days, function (day) {
                                _this4._clickEvents.forEach(function (clickEvent) {
                                    // if not in range, no click action
                                    // if in this month, select the date
                                    // if out of this month, jump to the date
                                    var onClick = !_this4._isValidDate(new Date(day.dataset.date), _this4.min, _this4.max) ? null : _this4.onDateClickDatePicker;
                                    day.addEventListener(clickEvent, onClick);
                                });

                                day.addEventListener('hover', function (e) {
                                    e.preventDEfault();
                                });
                            });
                        }
                    }, {
                        key: '_renderDays',
                        value: function _renderDays() {
                            var _this5 = this;

                            // first day of current month view
                            var start = __WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfWeek"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfMonth"](this._visibleDate), {weekStartsOn: this.options.weekStart});
                            // last day of current month view
                            var end = __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfWeek"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfMonth"](this._visibleDate), {weekStartsOn: this.options.weekStart});

                            // get all days and whether they are within the current month and range
                            var days = new Array(__WEBPACK_IMPORTED_MODULE_2_date_fns__["differenceInDays"](end, start) + 1).fill(start).map(function (s, i) {
                                var theDate = __WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfDay"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["addDays"](s, i));
                                var isThisMonth = __WEBPACK_IMPORTED_MODULE_2_date_fns__["isSameMonth"](_this5._visibleDate, theDate);
                                var isInRange = _this5.options.isRange && __WEBPACK_IMPORTED_MODULE_2_date_fns__["isWithinRange"](theDate, __WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfDay"](_this5.start), __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfDay"](_this5.end));
                                var isDisabled = _this5.max ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["isAfter"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfDay"](theDate), __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfDay"](_this5.max)) : false;
                                isDisabled = !isDisabled && _this5.min ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["isBefore"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfDay"](theDate), __WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfDay"](_this5.min)) : isDisabled;
                                var isHighlighted = false;

                                if (_this5.disabledDates) {
                                    for (var j = 0; j < _this5.disabledDates.length; j++) {
                                        var day = _this5.disabledDates[j];
                                        if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["c" /* isFunction */](day)) {
                                            day = day(_this5);
                                        }
                                        if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["getTime"](theDate) == __WEBPACK_IMPORTED_MODULE_2_date_fns__["getTime"](day)) {
                                            isDisabled = true;
                                        }
                                    }
                                }

                                if (_this5.highlightedDates) {
                                    for (var _j = 0; _j < _this5.highlightedDates.length; _j++) {
                                        var _day = _this5.highlightedDates[_j];
                                        if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["c" /* isFunction */](_day)) {
                                            _day = _day(_this5);
                                        }
                                        if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["getTime"](theDate) == __WEBPACK_IMPORTED_MODULE_2_date_fns__["getTime"](_day)) {
                                            isHighlighted = true;
                                        }
                                    }
                                }

                                if (_this5.disabledWeekDays) {
                                    _this5.disabledWeekDays.forEach(function (day) {
                                        if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["c" /* isFunction */](day)) {
                                            day = day(_this5);
                                        }
                                        if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["getDay"](theDate) == day) {
                                            isDisabled = true;
                                        }
                                    });
                                }

                                return {
                                    date: theDate,
                                    isRange: _this5.options.isRange,
                                    isToday: __WEBPACK_IMPORTED_MODULE_2_date_fns__["isToday"](theDate),
                                    isStartDate: __WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfDay"](_this5.start), theDate),
                                    isEndDate: __WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfDay"](_this5.end), theDate),
                                    isDisabled: isDisabled,
                                    isThisMonth: isThisMonth,
                                    isHighlighted: isHighlighted,
                                    isInRange: isInRange
                                };
                            });

                            this._ui.body.dates.appendChild(document.createRange().createContextualFragment(Object(__WEBPACK_IMPORTED_MODULE_5__templates_days__["a" /* default */])(days)));
                            this._ui.days = this._ui.body.dates.querySelectorAll('.datepicker-date');
                            this._bindDaysEvents();
                        }
                    }, {
                        key: '_select',
                        value: function _select() {
                            var _this6 = this;

                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            this.snapshot();
                            date = __WEBPACK_IMPORTED_MODULE_1__utils_type__["b" /* isDate */](date) ? date : new Date(date);
                            if (this.options.isRange && (!this._isValidDate(this.start) || this._isValidDate(this.start) && this._isValidDate(this.end))) {
                                this.start = date;
                                this.end = undefined;
                                this.emit('select:start', this);
                            } else if (this.options.isRange && !this._isValidDate(this.end)) {
                                if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["isBefore"](date, this.start)) {
                                    this.end = this.start;
                                    this.start = date;
                                    this.emit('select', this);
                                } else if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["isAfter"](date, this.start)) {
                                    this.end = date;
                                    this.emit('select', this);
                                } else if (this.options.allowSameDayRange) {
                                    this.end = date;
                                    this.emit('select', this);
                                } else {
                                    this.start = date;
                                    this.end = undefined;
                                    this.emit('select:start', this);
                                }
                            } else {
                                this.start = date;
                                this.end = undefined;
                                this.emit('select', this);
                            }
                            this._visibleDate = this._isValidDate(this.start) ? this.start : this._visibleDate;

                            if (this.options.isRange && this._isValidDate(this.start) && this._isValidDate(this.end)) {
                                new Array(__WEBPACK_IMPORTED_MODULE_2_date_fns__["differenceInDays"](this.end, this.start) + 1).fill(this.start).map(function (s, i) {
                                    var theDate = __WEBPACK_IMPORTED_MODULE_2_date_fns__["addDays"](s, i);
                                    var dateElement = _this6._ui.body.dates.querySelector('.datepicker-date[data-date="' + theDate.toString() + '"]');
                                    if (dateElement) {
                                        if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](_this6.start, theDate)) {
                                            dateElement.classList.add('datepicker-range-start');
                                        }
                                        if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](_this6.end, theDate)) {
                                            dateElement.classList.add('datepicker-range-end');
                                        }
                                        dateElement.classList.add('datepicker-range');
                                    }
                                });
                            }
                        }
                    }, {
                        key: '_isValidDate',
                        value: function _isValidDate(date, min, max) {
                            try {
                                if (!date) {
                                    return false;
                                }
                                if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["isValid"](date)) {
                                    if (!min && !max) {
                                        return true;
                                    }
                                    if (min && max) {
                                        return __WEBPACK_IMPORTED_MODULE_2_date_fns__["isWithinRange"](date, min, max);
                                    }
                                    if (max) {
                                        return __WEBPACK_IMPORTED_MODULE_2_date_fns__["isBefore"](date, max) || __WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](date, max);
                                    }
                                    return __WEBPACK_IMPORTED_MODULE_2_date_fns__["isAfter"](date, min) || __WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](date, min);
                                } else {
                                    return false;
                                }
                            } catch (e) {
                                return false;
                            }
                        }
                    }, {
                        key: '_togglePreviousButton',
                        value: function _togglePreviousButton() {
                            var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                            if (!active) {
                                this._ui.navigation.previous.setAttribute('disabled', 'disabled');
                            } else {
                                this._ui.navigation.previous.removeAttribute('disabled');
                            }
                        }
                    }, {
                        key: '_toggleNextButton',
                        value: function _toggleNextButton() {
                            var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                            if (!active) {
                                this._ui.navigation.next.setAttribute('disabled', 'disabled');
                            } else {
                                this._ui.navigation.next.removeAttribute('disabled');
                            }
                        }
                    }, {
                        key: 'id',
                        get: function get() {
                            return this._id;
                        }
                    }, {
                        key: 'date',
                        set: function set(date) {
                            if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["d" /* isObject */](date) && date.start && date.end) {
                                this._date = date;
                            }
                            return this;
                        },
                        get: function get() {
                            return this._date || {
                                start: undefined,
                                end: undefined
                            };
                        }

                        // Set datePicker language

                    }, {
                        key: 'lang',
                        set: function set() {
                            var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';

                            this._lang = lang;
                            this._locale = __webpack_require__(16)("./" + lang + '/index.js');
                            return this;
                        }
                        // Get current datePicker language
                        ,
                        get: function get() {
                            return this._lang;
                        }
                    }, {
                        key: 'locale',
                        get: function get() {
                            return this._locale;
                        }
                    }, {
                        key: 'start',
                        set: function set() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            if (date) {
                                if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["b" /* isDate */](date)) {
                                    this._date.start = this._isValidDate(date, this.min, this.max) ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfDay"](date) : this._date.start;
                                }
                                if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["e" /* isString */](date)) {
                                    this._date.start = this._isValidDate(__WEBPACK_IMPORTED_MODULE_2_date_fns__["parse"](date), this.min, this.max) ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfDay"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["parse"](date)) : this._date.start;
                                }
                            } else {
                                this._date.start = undefined;
                            }

                            return this;
                        },
                        get: function get() {
                            return this._date.start;
                        }
                    }, {
                        key: 'end',
                        set: function set() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            if (date) {
                                if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["b" /* isDate */](date)) {
                                    this._date.end = this._isValidDate(date, this.min, this.max) ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfDay"](date) : this._date.end;
                                }
                                if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["e" /* isString */](date)) {
                                    this._date.end = this._isValidDate(__WEBPACK_IMPORTED_MODULE_2_date_fns__["parse"](date), this.min, this.max) ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfDay"](__WEBPACK_IMPORTED_MODULE_2_date_fns__["parse"](date)) : this._date.end;
                                }
                            } else {
                                this._date.end = undefined;
                            }

                            return this;
                        },
                        get: function get() {
                            return this._date.end;
                        }

                        // Set min

                    }, {
                        key: 'min',
                        set: function set() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            if (date) {
                                if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["b" /* isDate */](date)) {
                                    this._min = this._isValidDate(date) ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfDay"](date) : this._min;
                                }
                                if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["e" /* isString */](date)) {
                                    this._min = this._isValidDate(__WEBPACK_IMPORTED_MODULE_2_date_fns__["parse"](date)) ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfDay"](date) : this._min;
                                }
                            }

                            return this;
                        }
                        // Get min
                        ,
                        get: function get() {
                            return this._min;
                        }

                        // Set max

                    }, {
                        key: 'max',
                        set: function set() {
                            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                            if (date) {
                                if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["b" /* isDate */](date)) {
                                    this._max = this._isValidDate(date) ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfDay"](date) : this._max;
                                }
                                if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["e" /* isString */](date)) {
                                    this._max = this._isValidDate(__WEBPACK_IMPORTED_MODULE_2_date_fns__["parse"](date)) ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfDay"](date) : this._max;
                                }
                            }

                            return this;
                        }
                        // Get max
                        ,
                        get: function get() {
                            return this._max;
                        }

                        // Set date format (set to MM/DD/YYYY by default)

                    }, {
                        key: 'format',
                        set: function set() {
                            var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'MM/DD/YYYY';

                            this._format = format;
                            return this;
                        }
                        // Get date format
                        ,
                        get: function get() {
                            return this._format;
                        }
                    }]);

                    return datePicker;
                }(__WEBPACK_IMPORTED_MODULE_3__utils_events__["a" /* default */]);

                /* harmony default export */
                __webpack_exports__["a"] = (datePicker);

                /***/
            }),
            /* 264 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony default export */
                __webpack_exports__["a"] = (function (data) {
                    return "<div class=\"datepicker\">\n    <div class=\"datepicker-nav\">\n        <button type=\"button\" class=\"datepicker-nav-previous button is-small is-text\">" + data.icons.previous + "</button>\n        <div class=\"datepicker-nav-month-year\">\n          <div class=\"datepicker-nav-month\"></div>\n          &nbsp;\n          <div class=\"datepicker-nav-year\"></div>\n        </div>\n        <button type=\"button\" class=\"datepicker-nav-next button is-small is-text\">" + data.icons.next + "</button>\n      </div>\n      <div class=\"datepicker-body\">\n        <div class=\"datepicker-dates is-active\"></div>\n        <div class=\"datepicker-months\"></div>\n        <div class=\"datepicker-years\"></div>\n      </div>\n    </div>";
                });

                /***/
            }),
            /* 265 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony default export */
                __webpack_exports__["a"] = (function (data) {
                    return '<div class="datepicker-days">' + data.map(function (theDate) {
                        return '<div data-date="' + theDate.date.toString() + '" class="datepicker-date' + (theDate.isThisMonth ? ' is-current-month' : '') + (theDate.isDisabled ? ' is-disabled' : '') + (theDate.isRange && theDate.isInRange ? ' datepicker-range' : '') + (theDate.isStartDate ? ' datepicker-range-start' : '') + (theDate.isEndDate ? ' datepicker-range-end' : '') + '">\n      <button class="date-item' + (theDate.isToday ? ' is-today' : '') + (theDate.isHighlighted ? ' is-highlighted' : '') + (theDate.isStartDate ? ' is-active' : '') + '" type="button">' + theDate.date.getDate() + '</button>\n  </div>';
                    }).join('') + '</div>';
                });

                /***/
            }),
            /* 266 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony default export */
                __webpack_exports__["a"] = (function (data) {
                    return '<div class="datepicker-weekdays">\n\t\t' + data.weekdays.map(function (day) {
                        return '<div class="datepicker-date">' + day + '</div>';
                    }).join('') + '\n\t</div>';
                });

                /***/
            }),
            /* 267 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_0_date_fns__ = __webpack_require__(6);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_0_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_date_fns__);


                /* harmony default export */
                __webpack_exports__["a"] = (function (data) {
                    return '' + data.months.map(function (d, i) {
                        return '<div class="datepicker-month" data-month="' + Object(__WEBPACK_IMPORTED_MODULE_0_date_fns__["format"])(Object(__WEBPACK_IMPORTED_MODULE_0_date_fns__["addMonths"])(d, i), 'MM', {
                            locale: data.locale
                        }) + '">' + Object(__WEBPACK_IMPORTED_MODULE_0_date_fns__["format"])(Object(__WEBPACK_IMPORTED_MODULE_0_date_fns__["addMonths"])(d, i), 'MMM', {
                            locale: data.locale
                        }) + '</div>';
                    }).join('');
                });

                /***/
            }),
            /* 268 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_0_date_fns__ = __webpack_require__(6);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_0_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_date_fns__);


                /* harmony default export */
                __webpack_exports__["a"] = (function (data) {
                    return '' + data.years.map(function (year) {
                        return '<div class="datepicker-year' + (year === Object(__WEBPACK_IMPORTED_MODULE_0_date_fns__["getMonth"])(data.visibleDate) ? ' is-active' : '') + '" data-year="' + year + '"><span class="item">' + year + '</span></div>';
                    }).join('');
                });

                /***/
            }),
            /* 269 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                var defaultOptions = {
                    color: 'primary',
                    isRange: false,
                    allowSameDayRange: true,
                    lang: 'en', // internationalization
                    startDate: undefined,
                    endDate: undefined,
                    minDate: null,
                    maxDate: null,
                    disabledDates: [],
                    disabledWeekDays: undefined,
                    highlightedDates: [],
                    weekStart: 0,
                    dateFormat: 'MM/DD/YYYY',
                    navigationMonthFormat: 'MMMM',
                    navigationYearFormat: 'YYYY',
                    enableMonthSwitch: true,
                    enableYearSwitch: true,
                    displayYearsCount: 50
                };

                /* harmony default export */
                __webpack_exports__["a"] = (defaultOptions);

                /***/
            }),
            /* 270 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(97)
                var buildFormatLocale = __webpack_require__(98)

                /**
                 * @category Locales
                 * @summary Arabic locale (Modern Standard Arabic - Al-fussha).
                 * @author Abdallah Hassan [@AbdallahAHO]{@link https://github.com/AbdallahAHO}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 271 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(99)
                var buildFormatLocale = __webpack_require__(100)

                /**
                 * @category Locales
                 * @summary Bulgarian locale.
                 * @author Nikolay Stoynov [@arvigeus]{@link https://github.com/arvigeus}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 272 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(101)
                var buildFormatLocale = __webpack_require__(102)

                /**
                 * @category Locales
                 * @summary Catalan locale.
                 * @author Guillermo Grau [@guigrpa]{@link https://github.com/guigrpa}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 273 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(103)
                var buildFormatLocale = __webpack_require__(104)

                /**
                 * @category Locales
                 * @summary Czech locale.
                 * @author David Rus [@davidrus]{@link https://github.com/davidrus}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 274 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(105)
                var buildFormatLocale = __webpack_require__(106)

                /**
                 * @category Locales
                 * @summary Danish locale.
                 * @author Anders B. Hansen [@Andersbiha]{@link https://github.com/Andersbiha}
                 * @author [@kgram]{@link https://github.com/kgram}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 275 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(107)
                var buildFormatLocale = __webpack_require__(108)

                /**
                 * @category Locales
                 * @summary German locale.
                 * @author Thomas Eilmsteiner [@DeMuu]{@link https://github.com/DeMuu}
                 * @author Asia [@asia-t]{@link https://github.com/asia-t}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 276 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(109)
                var buildFormatLocale = __webpack_require__(110)

                /**
                 * @category Locales
                 * @summary Greek locale.
                 * @author Theodoros Orfanidis [@teoulas]{@link https://github.com/teoulas}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 277 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(111)
                var buildFormatLocale = __webpack_require__(112)

                /**
                 * @category Locales
                 * @summary Esperanto locale.
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 278 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(113)
                var buildFormatLocale = __webpack_require__(114)

                /**
                 * @category Locales
                 * @summary Spanish locale.
                 * @author Juan Angosto [@juanangosto]{@link https://github.com/juanangosto}
                 * @author Guillermo Grau [@guigrpa]{@link https://github.com/guigrpa}
                 * @author Fernando Agüero [@fjaguero]{@link https://github.com/fjaguero}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 279 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(115)
                var buildFormatLocale = __webpack_require__(116)

                /**
                 * @category Locales
                 * @summary Finnish locale.
                 * @author Pyry-Samuli Lahti [@Pyppe]{@link https://github.com/Pyppe}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 280 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(117)
                var buildFormatLocale = __webpack_require__(118)

                /**
                 * @category Locales
                 * @summary Filipino locale.
                 * @author Ian De La Cruz [@RIanDeLaCruz]{@link https://github.com/RIanDeLaCruz}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 281 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(119)
                var buildFormatLocale = __webpack_require__(120)

                /**
                 * @category Locales
                 * @summary French locale.
                 * @author Jean Dupouy [@izeau]{@link https://github.com/izeau}
                 * @author François B [@fbonzon]{@link https://github.com/fbonzon}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 282 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(121)
                var buildFormatLocale = __webpack_require__(122)

                /**
                 * @category Locales
                 * @summary Croatian locale.
                 * @author Matija Marohnić [@silvenon]{@link https://github.com/silvenon}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 283 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(123)
                var buildFormatLocale = __webpack_require__(124)

                /**
                 * @category Locales
                 * @summary English locale.
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 284 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(125)
                var buildFormatLocale = __webpack_require__(126)

                /**
                 * @category Locales
                 * @summary Indonesian locale.
                 * @author Rahmat Budiharso [@rbudiharso]{@link https://github.com/rbudiharso}
                 * @author Benget Nata [@bentinata]{@link https://github.com/bentinata}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 285 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(127)
                var buildFormatLocale = __webpack_require__(128)

                /**
                 * @category Locales
                 * @summary Icelandic locale.
                 * @author Derek Blank [@derekblank]{@link https://github.com/derekblank}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 286 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(129)
                var buildFormatLocale = __webpack_require__(130)

                /**
                 * @category Locales
                 * @summary Italian locale.
                 * @author Alberto Restifo [@albertorestifo]{@link https://github.com/albertorestifo}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 287 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(131)
                var buildFormatLocale = __webpack_require__(132)

                /**
                 * @category Locales
                 * @summary Japanese locale.
                 * @author Thomas Eilmsteiner [@DeMuu]{@link https://github.com/DeMuu}
                 * @author Yamagishi Kazutoshi [@ykzts]{@link https://github.com/ykzts}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 288 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(133)
                var buildFormatLocale = __webpack_require__(134)

                /**
                 * @category Locales
                 * @summary Korean locale.
                 * @author Hong Chulju [@angdev]{@link https://github.com/angdev}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 289 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(135)
                var buildFormatLocale = __webpack_require__(136)

                /**
                 * @category Locales
                 * @summary Macedonian locale.
                 * @author Petar Vlahu [@vlahupetar]{@link https://github.com/vlahupetar}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 290 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(137)
                var buildFormatLocale = __webpack_require__(138)

                /**
                 * @category Locales
                 * @summary Norwegian Bokmål locale.
                 * @author Hans-Kristian Koren [@Hanse]{@link https://github.com/Hanse}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 291 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(139)
                var buildFormatLocale = __webpack_require__(140)

                /**
                 * @category Locales
                 * @summary Dutch locale.
                 * @author Jorik Tangelder [@jtangelder]{@link https://github.com/jtangelder}
                 * @author Ruben Stolk [@rubenstolk]{@link https://github.com/rubenstolk}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 292 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(141)
                var buildFormatLocale = __webpack_require__(142)

                /**
                 * @category Locales
                 * @summary Polish locale.
                 * @author Mateusz Derks [@ertrzyiks]{@link https://github.com/ertrzyiks}
                 * @author Just RAG [@justrag]{@link https://github.com/justrag}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 293 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(143)
                var buildFormatLocale = __webpack_require__(144)

                /**
                 * @category Locales
                 * @summary Portuguese locale.
                 * @author Dário Freire [@dfreire]{@link https://github.com/dfreire}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 294 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(145)
                var buildFormatLocale = __webpack_require__(146)

                /**
                 * @category Locales
                 * @summary Romanian locale.
                 * @author Sergiu Munteanu [@jsergiu]{@link https://github.com/jsergiu}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 295 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(147)
                var buildFormatLocale = __webpack_require__(148)

                /**
                 * @category Locales
                 * @summary Russian locale.
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 296 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(149)
                var buildFormatLocale = __webpack_require__(150)

                /**
                 * @category Locales
                 * @summary Slovak locale.
                 * @author Marek Suscak [@mareksuscak]{@link https://github.com/mareksuscak}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 297 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(151)
                var buildFormatLocale = __webpack_require__(152)

                /**
                 * @category Locales
                 * @summary Slovenian locale.
                 * @author Adam Stradovnik [@Neoglyph]{@link https://github.com/Neoglyph}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 298 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(153)
                var buildFormatLocale = __webpack_require__(154)

                /**
                 * @category Locales
                 * @summary Swedish locale.
                 * @author Johannes Ulén [@ejulen]{@link https://github.com/ejulen}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 299 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(155)
                var buildFormatLocale = __webpack_require__(156)

                /**
                 * @category Locales
                 * @summary Thai locale.
                 * @author Athiwat Hirunworawongkun [@athivvat]{@link https://github.com/athivvat}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 300 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(157)
                var buildFormatLocale = __webpack_require__(158)

                /**
                 * @category Locales
                 * @summary Turkish locale.
                 * @author Alpcan Aydın [@alpcanaydin]{@link https://github.com/alpcanaydin}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 301 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(159)
                var buildFormatLocale = __webpack_require__(160)

                /**
                 * @category Locales
                 * @summary Chinese Simplified locale.
                 * @author Changyu Geng [@KingMario]{@link https://github.com/KingMario}
                 * @author Song Shuoyun [@fnlctrl]{@link https://github.com/fnlctrl}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 302 */
            /***/ (function (module, exports, __webpack_require__) {

                var buildDistanceInWordsLocale = __webpack_require__(161)
                var buildFormatLocale = __webpack_require__(162)

                /**
                 * @category Locales
                 * @summary Chinese Simplified locale.
                 * @author tonypai [@tpai]{@link https://github.com/tpai}
                 */
                module.exports = {
                    distanceInWords: buildDistanceInWordsLocale(),
                    format: buildFormatLocale()
                }


                /***/
            }),
            /* 303 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(17);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_1__utils_type__ = __webpack_require__(18);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_2_date_fns__ = __webpack_require__(6);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_2_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_date_fns__);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_3__utils_events__ = __webpack_require__(28);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_4__templates_timepicker__ = __webpack_require__(304);
                /* harmony import */
                var __WEBPACK_IMPORTED_MODULE_5__defaultOptions__ = __webpack_require__(305);
                var _extends = Object.assign || function (target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                };

                var _createClass = function () {
                    function defineProperties(target, props) {
                        for (var i = 0; i < props.length; i++) {
                            var descriptor = props[i];
                            descriptor.enumerable = descriptor.enumerable || false;
                            descriptor.configurable = true;
                            if ("value" in descriptor) descriptor.writable = true;
                            Object.defineProperty(target, descriptor.key, descriptor);
                        }
                    }

                    return function (Constructor, protoProps, staticProps) {
                        if (protoProps) defineProperties(Constructor.prototype, protoProps);
                        if (staticProps) defineProperties(Constructor, staticProps);
                        return Constructor;
                    };
                }();

                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }

                function _possibleConstructorReturn(self, call) {
                    if (!self) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return call && (typeof call === "object" || typeof call === "function") ? call : self;
                }

                function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                    }
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
                }


                var timePicker = function (_EventEmitter) {
                    _inherits(timePicker, _EventEmitter);

                    function timePicker() {
                        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                        _classCallCheck(this, timePicker);

                        var _this = _possibleConstructorReturn(this, (timePicker.__proto__ || Object.getPrototypeOf(timePicker)).call(this));

                        _this.options = _extends({}, __WEBPACK_IMPORTED_MODULE_5__defaultOptions__["a" /* default */], options);

                        _this._clickEvents = ['click', 'touch'];
                        _this._supportsPassive = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* detectSupportsPassive */]();
                        _this._id = __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* uuid */]('timePicker');
                        _this.node = null;

                        _this.onPreviousHourStartTimePicker = _this.onPreviousHourStartTimePicker.bind(_this);
                        _this.onNextHourStartTimePicker = _this.onNextHourStartTimePicker.bind(_this);
                        _this.onPreviousMinuteStartTimePicker = _this.onPreviousMinuteStartTimePicker.bind(_this);
                        _this.onNextMinuteStartTimePicker = _this.onNextMinuteStartTimePicker.bind(_this);
                        _this.onPreviousHourEndTimePicker = _this.onPreviousHourEndTimePicker.bind(_this);
                        _this.onNextHourEndTimePicker = _this.onNextHourEndTimePicker.bind(_this);
                        _this.onPreviousMinuteEndTimePicker = _this.onPreviousMinuteEndTimePicker.bind(_this);
                        _this.onNextMinuteEndTimePicker = _this.onNextMinuteEndTimePicker.bind(_this);

                        _this._init();
                        return _this;
                    }

                    /****************************************************
                     *                                                  *
                     * PRIVATE FUNCTIONS                                *
                     *                                                  *
                     ****************************************************/


                    _createClass(timePicker, [{
                        key: '_init',
                        value: function _init() {
                            this._open = false;
                            this._snapshots = [];
                            this.lang = this.options.lang;
                            this.format = this.options.format || 'HH:mm';
                            this.min = this.options.min;
                            this.max = this.options.max;
                            this._time = {
                                start: __WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfToday"](),
                                end: __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfToday"]()
                            };
                            this.start = this.options.start || __WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfToday"]();
                            this.end = this.options.isRange ? this.options.end : __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfToday"]();

                            this._build();
                            this._bindEvents();

                            this.emit('ready', this);
                        }
                    }, {
                        key: '_build',
                        value: function _build() {
                            this.node = document.createRange().createContextualFragment(Object(__WEBPACK_IMPORTED_MODULE_4__templates_timepicker__["a" /* default */])({
                                locale: this.locale,
                                isRange: this.options.isRange,
                                editTimeManually: this.options.editTimeManually,
                                icons: this.options.icons
                            }));

                            this._ui = {
                                container: this.node.firstChild,
                                start: {
                                    container: this.node.querySelector('.timepicker-start'),
                                    hours: {
                                        container: this.node.querySelector('.timepicker-start .timepicker-hours'),
                                        input: this.node.querySelector('.timepicker-start .timepicker-hours input'),
                                        number: this.node.querySelector('.timepicker-start .timepicker-hours .timepicker-input-number'),
                                        previous: this.node.querySelector('.timepicker-start .timepicker-hours .timepicker-previous'),
                                        next: this.node.querySelector('.timepicker-start .timepicker-hours .timepicker-next')
                                    },
                                    minutes: {
                                        container: this.node.querySelector('.timepicker-start .timepicker-minutes'),
                                        input: this.node.querySelector('.timepicker-start .timepicker-minutes input'),
                                        number: this.node.querySelector('.timepicker-start .timepicker-minutes .timepicker-input-number'),
                                        previous: this.node.querySelector('.timepicker-start .timepicker-minutes .timepicker-previous'),
                                        next: this.node.querySelector('.timepicker-start .timepicker-minutes .timepicker-next')
                                    }
                                },
                                end: {
                                    container: this.node.querySelector('.timepicker-end'),
                                    hours: {
                                        container: this.node.querySelector('.timepicker-end .timepicker-hours'),
                                        input: this.node.querySelector('.timepicker-end .timepicker-hours input'),
                                        number: this.node.querySelector('.timepicker-end .timepicker-hours .timepicker-input-number'),
                                        previous: this.node.querySelector('.timepicker-end .timepicker-hours .timepicker-previous'),
                                        next: this.node.querySelector('.timepicker-end .timepicker-hours .timepicker-next')
                                    },
                                    minutes: {
                                        container: this.node.querySelector('.timepicker-end .timepicker-minutes'),
                                        input: this.node.querySelector('.timepicker-end .timepicker-minutes input'),
                                        number: this.node.querySelector('.timepicker-end .timepicker-minutes .timepicker-input-number'),
                                        previous: this.node.querySelector('.timepicker-end .timepicker-minutes .timepicker-previous'),
                                        next: this.node.querySelector('.timepicker-end .timepicker-minutes .timepicker-next')
                                    }
                                }
                            };
                        }
                    }, {
                        key: '_bindEvents',
                        value: function _bindEvents() {
                            var _this2 = this;

                            this._clickEvents.forEach(function (clickEvent) {
                                _this2._ui.start.hours.previous.addEventListener(clickEvent, _this2.onPreviousHourStartTimePicker);
                                _this2._ui.start.hours.next.addEventListener(clickEvent, _this2.onNextHourStartTimePicker);
                                _this2._ui.start.minutes.previous.addEventListener(clickEvent, _this2.onPreviousMinuteStartTimePicker);
                                _this2._ui.start.minutes.next.addEventListener(clickEvent, _this2.onNextMinuteStartTimePicker);

                                if (_this2.options.isRange) {
                                    _this2._ui.end.hours.previous.addEventListener(clickEvent, _this2.onPreviousHourEndTimePicker);
                                    _this2._ui.end.hours.next.addEventListener(clickEvent, _this2.onNextHourEndTimePicker);
                                    _this2._ui.end.minutes.previous.addEventListener(clickEvent, _this2.onPreviousMinuteEndTimePicker);
                                    _this2._ui.end.minutes.next.addEventListener(clickEvent, _this2.onNextMinuteEndTimePicker);
                                }
                            });
                        }
                    }, {
                        key: '_select',
                        value: function _select() {
                            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            this.snapshot();
                            time = __WEBPACK_IMPORTED_MODULE_1__utils_type__["b" /* isDate */](time) ? time : new Date(time);
                            if (this.options.isRange && (!this._isValidTime(this.start) || this._isValidTime(this.start) && this._isValidTime(this.end))) {
                                this.start = time;
                                this.end = __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfToday"]();
                                this.emit('select:start', this);
                            } else if (this.options.isRange && !this._isValidTime(this.end)) {
                                if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["isBefore"](time, this.start)) {
                                    this.end = this.start;
                                    this.start = __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfToday"]();
                                    this.emit('select', this);
                                } else if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["isAfter"](time, this.start)) {
                                    this.end = time;
                                    this.emit('select', this);
                                } else {
                                    this.start = time;
                                    this.end = __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfToday"]();
                                    this.emit('select:start', this);
                                }
                            } else {
                                this.start = time;
                                this.end = __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfToday"]();
                                this.emit('select', this);
                            }
                        }
                    }, {
                        key: '_isValidTime',
                        value: function _isValidTime(time, min, max) {
                            try {
                                if (!time) {
                                    return false;
                                }
                                if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["isValid"](time)) {
                                    if (!min && !max) {
                                        return true;
                                    }
                                    if (min && max) {
                                        return __WEBPACK_IMPORTED_MODULE_2_date_fns__["isWithinRange"](time, min, max);
                                    }
                                    if (max) {
                                        return __WEBPACK_IMPORTED_MODULE_2_date_fns__["isBefore"](time, max) || __WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](time, max);
                                    }
                                    return __WEBPACK_IMPORTED_MODULE_2_date_fns__["isAfter"](time, min) || __WEBPACK_IMPORTED_MODULE_2_date_fns__["isEqual"](time, min);
                                } else {
                                    return false;
                                }
                            } catch (e) {
                                return false;
                            }
                        }

                        /****************************************************
                         *                                                  *
                         * GETTERS and SETTERS                              *
                         *                                                  *
                         ****************************************************/
                        /**
                         * Get id of current TimePicker
                         */

                    }, {
                        key: 'onPreviousHourStartTimePicker',


                        /****************************************************
                         *                                                  *
                         * EVENTS FUNCTIONS                                 *
                         *                                                  *
                         ****************************************************/
                        value: function onPreviousHourStartTimePicker(e) {
                            var _this3 = this;

                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            this.start = __WEBPACK_IMPORTED_MODULE_2_date_fns__["subHours"](this.start, 1);
                            setTimeout(function () {
                                _this3._ui.start.hours.number.classList.add('is-decrement-hide');

                                setTimeout(function () {
                                    _this3._ui.start.hours.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this3.start, 'HH');
                                    _this3._ui.start.hours.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this3.start, 'HH');
                                    _this3._ui.start.hours.number.classList.add('is-decrement-visible');
                                }, 100);

                                setTimeout(function () {
                                    _this3._ui.start.hours.number.classList.remove('is-decrement-hide');
                                    _this3._ui.start.hours.number.classList.remove('is-decrement-visible');
                                }, 1100);
                            }, 100);

                            if (this.options.closeOnSelect === true && this.options.displayMode !== 'inline') {
                                this._select(this.time);
                            }

                            if (this.options.type === 'datetime') {
                                this.emit(this.options.isRange ? 'select:start' : 'select', {
                                    time: this.time,
                                    instance: this
                                });
                            }
                        }
                    }, {
                        key: 'onNextHourStartTimePicker',
                        value: function onNextHourStartTimePicker(e) {
                            var _this4 = this;

                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            this.start = __WEBPACK_IMPORTED_MODULE_2_date_fns__["addHours"](this.start, 1);
                            setTimeout(function () {
                                _this4._ui.start.hours.number.classList.add('is-increment-hide');

                                setTimeout(function () {
                                    _this4._ui.start.hours.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this4.start, 'HH');
                                    _this4._ui.start.hours.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this4.start, 'HH');
                                    _this4._ui.start.hours.number.classList.add('is-increment-visible');
                                }, 100);

                                setTimeout(function () {
                                    _this4._ui.start.hours.number.classList.remove('is-increment-hide');
                                    _this4._ui.start.hours.number.classList.remove('is-increment-visible');
                                }, 1100);
                            }, 100);

                            if (this.options.closeOnSelect === true && this.options.displayMode !== 'inline') {
                                this._select(this.time);
                            }

                            if (this.options.type === 'datetime') {
                                this.emit(this.options.isRange ? 'select:start' : 'select', {
                                    time: this.time,
                                    instance: this
                                });
                            }
                        }
                    }, {
                        key: 'onPreviousMinuteStartTimePicker',
                        value: function onPreviousMinuteStartTimePicker(e) {
                            var _this5 = this;

                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            this.start = __WEBPACK_IMPORTED_MODULE_2_date_fns__["subMinutes"](this.start, this.options.minuteSteps);
                            setTimeout(function () {
                                _this5._ui.start.minutes.number.classList.add('is-decrement-hide');

                                setTimeout(function () {
                                    _this5._ui.start.minutes.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this5.start, 'mm');
                                    _this5._ui.start.minutes.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this5.start, 'mm');
                                    _this5._ui.start.minutes.number.classList.add('is-decrement-visible');

                                    if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this5.start, 'HH') !== _this5._ui.start.hours.input.value) {
                                        _this5._ui.start.hours.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this5.start, 'HH');
                                        _this5._ui.start.hours.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this5.start, 'HH');
                                        _this5._ui.start.hours.number.classList.add('is-decrement-visible');
                                    }
                                }, 100);

                                setTimeout(function () {
                                    _this5._ui.start.minutes.number.classList.remove('is-decrement-hide');
                                    _this5._ui.start.minutes.number.classList.remove('is-decrement-visible');

                                    _this5._ui.start.hours.number.classList.remove('is-decrement-hide');
                                    _this5._ui.start.hours.number.classList.remove('is-decrement-visible');
                                }, 1100);
                            }, 100);

                            if (this.options.closeOnSelect === true && this.options.displayMode !== 'inline') {
                                this._select(this.time);
                            }

                            if (this.options.type === 'datetime') {
                                this.emit(this.options.isRange ? 'select:start' : 'select', {
                                    time: this.time,
                                    instance: this
                                });
                            }
                        }
                    }, {
                        key: 'onNextMinuteStartTimePicker',
                        value: function onNextMinuteStartTimePicker(e) {
                            var _this6 = this;

                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            this.start = __WEBPACK_IMPORTED_MODULE_2_date_fns__["addMinutes"](this.start, this.options.minuteSteps);
                            setTimeout(function () {
                                _this6._ui.start.minutes.number.classList.add('is-increment-hide');

                                setTimeout(function () {
                                    _this6._ui.start.minutes.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this6.start, 'mm');
                                    _this6._ui.start.minutes.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this6.start, 'mm');
                                    _this6._ui.start.minutes.number.classList.add('is-increment-visible');

                                    if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this6.start, 'HH') !== _this6._ui.start.hours.input.value) {
                                        _this6._ui.start.hours.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this6.start, 'HH');
                                        _this6._ui.start.hours.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this6.start, 'HH');
                                        _this6._ui.start.hours.number.classList.add('is-increment-visible');
                                    }
                                }, 100);

                                setTimeout(function () {
                                    _this6._ui.start.minutes.number.classList.remove('is-increment-hide');
                                    _this6._ui.start.minutes.number.classList.remove('is-increment-visible');

                                    _this6._ui.start.hours.number.classList.remove('is-increment-hide');
                                    _this6._ui.start.hours.number.classList.remove('is-increment-visible');
                                }, 1100);
                            }, 100);

                            if (this.options.closeOnSelect === true && this.options.displayMode !== 'inline') {
                                this._select(this.time);
                            }

                            if (this.options.type === 'datetime') {
                                this.emit(this.options.isRange ? 'select:start' : 'select', {
                                    time: this.time,
                                    instance: this
                                });
                            }
                        }
                    }, {
                        key: 'onPreviousHourEndTimePicker',
                        value: function onPreviousHourEndTimePicker(e) {
                            var _this7 = this;

                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            this.end = __WEBPACK_IMPORTED_MODULE_2_date_fns__["subHours"](this.end, 1);
                            setTimeout(function () {
                                _this7._ui.end.hours.number.classList.add('is-decrement-hide');

                                setTimeout(function () {
                                    _this7._ui.end.hours.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this7.end, 'HH');
                                    _this7._ui.end.hours.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this7.end, 'HH');
                                    _this7._ui.end.hours.number.classList.add('is-decrement-visible');
                                }, 100);

                                setTimeout(function () {
                                    _this7._ui.end.hours.number.classList.remove('is-decrement-hide');
                                    _this7._ui.end.hours.number.classList.remove('is-decrement-visible');
                                }, 1100);
                            }, 100);

                            if (this.options.closeOnSelect === true && this.options.displayMode !== 'inline') {
                                this._select(this.time);
                            }

                            if (this.options.type === 'datetime') {
                                this.emit(this.options.isRange ? 'select:start' : 'select', {
                                    time: this.time,
                                    instance: this
                                });
                            }
                        }
                    }, {
                        key: 'onNextHourEndTimePicker',
                        value: function onNextHourEndTimePicker(e) {
                            var _this8 = this;

                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            this.end = __WEBPACK_IMPORTED_MODULE_2_date_fns__["addHours"](this.end, 1);
                            setTimeout(function () {
                                _this8._ui.end.hours.number.classList.add('is-increment-hide');

                                setTimeout(function () {
                                    _this8._ui.end.hours.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this8.end, 'HH');
                                    _this8._ui.end.hours.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this8.end, 'HH');
                                    _this8._ui.end.hours.number.classList.add('is-increment-visible');
                                }, 100);

                                setTimeout(function () {
                                    _this8._ui.end.hours.number.classList.remove('is-increment-hide');
                                    _this8._ui.end.hours.number.classList.remove('is-increment-visible');
                                }, 1100);
                            }, 100);

                            if (this.options.closeOnSelect === true && this.options.displayMode !== 'inline') {
                                this._select(this.time);
                            }

                            if (this.options.type === 'datetime') {
                                this.emit(this.options.isRange ? 'select:start' : 'select', {
                                    time: this.time,
                                    instance: this
                                });
                            }
                        }
                    }, {
                        key: 'onPreviousMinuteEndTimePicker',
                        value: function onPreviousMinuteEndTimePicker(e) {
                            var _this9 = this;

                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            this.end = __WEBPACK_IMPORTED_MODULE_2_date_fns__["subMinutes"](this.end, this.options.minuteSteps);
                            setTimeout(function () {
                                _this9._ui.end.minutes.number.classList.add('is-decrement-hide');

                                setTimeout(function () {
                                    _this9._ui.end.minutes.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this9.end, 'mm');
                                    _this9._ui.end.minutes.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this9.end, 'mm');
                                    _this9._ui.end.minutes.number.classList.add('is-decrement-visible');

                                    if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this9.end, 'HH') !== _this9._ui.end.hours.input.value) {
                                        _this9._ui.end.hours.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this9.end, 'HH');
                                        _this9._ui.end.hours.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this9.end, 'HH');
                                        _this9._ui.end.hours.number.classList.add('is-decrement-visible');
                                    }
                                }, 100);

                                setTimeout(function () {
                                    _this9._ui.end.minutes.number.classList.remove('is-decrement-hide');
                                    _this9._ui.end.minutes.number.classList.remove('is-decrement-visible');
                                }, 1100);
                            }, 100);

                            if (this.options.closeOnSelect === true && this.options.displayMode !== 'inline') {
                                this._select(this.time);
                            }

                            if (this.options.type === 'datetime') {
                                this.emit(this.options.isRange ? 'select:start' : 'select', {
                                    time: this.time,
                                    instance: this
                                });
                            }
                        }
                    }, {
                        key: 'onNextMinuteEndTimePicker',
                        value: function onNextMinuteEndTimePicker(e) {
                            var _this10 = this;

                            if (!this._supportsPassive) {
                                e.preventDefault();
                            }
                            e.stopPropagation();

                            this.end = __WEBPACK_IMPORTED_MODULE_2_date_fns__["addMinutes"](this.end, this.options.minuteSteps);
                            setTimeout(function () {
                                _this10._ui.end.minutes.number.classList.add('is-increment-hide');

                                setTimeout(function () {
                                    _this10._ui.end.minutes.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this10.end, 'mm');
                                    _this10._ui.end.minutes.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this10.end, 'mm');
                                    _this10._ui.end.minutes.number.classList.add('is-increment-visible');

                                    if (__WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this10.end, 'HH') !== _this10._ui.end.hours.input.value) {
                                        _this10._ui.end.hours.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this10.end, 'HH');
                                        _this10._ui.end.hours.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](_this10.end, 'HH');
                                        _this10._ui.end.hours.number.classList.add('is-increment-visible');
                                    }
                                }, 100);

                                setTimeout(function () {
                                    _this10._ui.end.minutes.number.classList.remove('is-increment-hide');
                                    _this10._ui.end.minutes.number.classList.remove('is-increment-visible');
                                }, 1100);
                            }, 100);

                            if (this.options.closeOnSelect === true && this.options.displayMode !== 'inline') {
                                this._select(this.time);
                            }

                            if (this.options.type === 'datetime') {
                                this.emit(this.options.isRange ? 'select:start' : 'select', {
                                    time: this.time,
                                    instance: this
                                });
                            }
                        }

                        /****************************************************
                         *                                                  *
                         * PUBLIC FUNCTIONS                                 *
                         *                                                  *
                         ****************************************************/

                    }, {
                        key: 'isRange',
                        value: function isRange() {
                            return this.options.isRange;
                        }
                    }, {
                        key: 'show',
                        value: function show() {
                            if (!this._open) {
                                this._ui.container.classList.add('is-active');
                                this._open = true;
                                this._focus = true;

                                this.emit('show', this);
                            }
                        }
                    }, {
                        key: 'hide',
                        value: function hide() {
                            this._open = false;
                            this._focus = false;
                            this._ui.container.classList.remove('is-active');
                            this.emit('hide', this);
                        }
                    }, {
                        key: 'toggle',
                        value: function toggle() {
                            if (!this._open) {
                                this.show();
                            } else {
                                this.hide();
                            }
                        }

                        /**
                         * Get / Set TimePicker value
                         * @param {null|time|Object|String} time optional if null then return the current time as String
                         */

                    }, {
                        key: 'value',
                        value: function value() {
                            var _value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                            if (_value) {
                                if (this.options.isRange) {
                                    if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["e" /* isString */](_value)) {
                                        var times = _value.split(' - ');
                                        if (times.length) {
                                            this.start = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](new Date(times[0]), this.format, {
                                                locale: this.locale
                                            });
                                        }
                                        if (times.length === 2) {
                                            this.end = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](new Date(times[1]), this.format, {
                                                locale: this.locale
                                            });
                                        }
                                    }
                                    if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["d" /* isObject */](_value) || __WEBPACK_IMPORTED_MODULE_1__utils_type__["b" /* isDate */](_value)) {
                                        this._select(_value);
                                    }
                                } else {
                                    this._select(_value);
                                }
                            } else {
                                var string = this.start && this._isValidTime(this.start) ? __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.start, this.format, {
                                    locale: this.locale
                                }) : '';

                                if (this.options.isRange) {
                                    if (this.end && this._isValidTime(this.end)) {
                                        string += ' - ' + __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.end, this.format, {locale: this.locale});
                                    }
                                }

                                return string;
                            }
                        }

                        /**
                         * Refresh Timepicker with new year/month days
                         * @method _refreshTimepicker
                         * @return {[type]}        [description]
                         */

                    }, {
                        key: 'refresh',
                        value: function refresh() {
                            this._ui.start.hours.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.start, 'HH');
                            this._ui.start.hours.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.start, 'HH');
                            this._ui.start.minutes.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.start, 'mm');
                            this._ui.start.minutes.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.start, 'mm');
                            if (this.options.isRange) {
                                this._ui.end.hours.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.end, 'HH');
                                this._ui.end.hours.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.end, 'HH');
                                this._ui.end.minutes.input.value = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.end, 'mm');
                                this._ui.end.minutes.number.innerText = __WEBPACK_IMPORTED_MODULE_2_date_fns__["format"](this.end, 'mm');
                            }

                            return this;
                        }
                    }, {
                        key: 'clear',
                        value: function clear() {
                            this.time = {
                                start: __WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfToday"](),
                                end: __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfToday"]()
                            };
                            this.refresh();
                        }
                    }, {
                        key: 'snapshot',
                        value: function snapshot() {
                            this._snapshots.push(_extends({}, this._time));
                        }
                    }, {
                        key: 'render',
                        value: function render() {
                            this.refresh();
                            return this.node;
                        }
                    }, {
                        key: 'id',
                        get: function get() {
                            return this._id;
                        }
                    }, {
                        key: 'time',
                        set: function set(time) {
                            if (__WEBPACK_IMPORTED_MODULE_1__utils_type__["d" /* isObject */](time) && time.start && time.end) {
                                this._time = time;
                            }
                            return this;
                        },
                        get: function get() {
                            return this._time || {
                                start: undefined,
                                end: undefined
                            };
                        }

                        // Set TimePicker language

                    }, {
                        key: 'lang',
                        set: function set() {
                            var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';

                            this._lang = lang;
                            this._locale = __webpack_require__(16)("./" + lang + '/index.js');
                            return this;
                        }
                        // Get current TimePicker language
                        ,
                        get: function get() {
                            return this._lang;
                        }
                    }, {
                        key: 'locale',
                        get: function get() {
                            return this._locale;
                        }
                    }, {
                        key: 'start',
                        set: function set(time) {
                            this._time.start = time ? this._isValidTime(time, this.min, this.max) ? time : this._time.start : __WEBPACK_IMPORTED_MODULE_2_date_fns__["startOfToday"]();
                            return this;
                        },
                        get: function get() {
                            return this._time.start;
                        }
                    }, {
                        key: 'end',
                        set: function set(time) {
                            this._time.end = time ? this._isValidTime(time, this.min, this.max) ? time : this._time.end : __WEBPACK_IMPORTED_MODULE_2_date_fns__["endOfToday"]();
                            return this;
                        },
                        get: function get() {
                            return this._time.end;
                        }

                        // Set min

                    }, {
                        key: 'min',
                        set: function set() {
                            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

                            this._min = time ? this._isValidTime(time) ? time : this._min : undefined;
                            return this;
                        }
                        // Get min
                        ,
                        get: function get() {
                            return this._min;
                        }

                        // Set max

                    }, {
                        key: 'max',
                        set: function set() {
                            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                            this._max = time ? this._isValidTime(time) ? time : this._max : undefined;
                            return this;
                        }
                        // Get max
                        ,
                        get: function get() {
                            return this._max;
                        }

                        // Set time format (set to HH:mm by default)

                    }, {
                        key: 'format',
                        set: function set() {
                            var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'HH:mm';

                            this._format = format;
                            return this;
                        }
                        // Get time format
                        ,
                        get: function get() {
                            return this._format;
                        }
                    }]);

                    return timePicker;
                }(__WEBPACK_IMPORTED_MODULE_3__utils_events__["a" /* default */]);

                /* harmony default export */
                __webpack_exports__["a"] = (timePicker);

                /***/
            }),
            /* 304 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony default export */
                __webpack_exports__["a"] = (function (data) {
                    return '<div class="timepicker' + (data.editTimeManually ? ' is-hidden' : '') + '">\n    <div class="timepicker-start">\n      <div class="timepicker-hours">\n        <span class="timepicker-next">+</span>\n        <div class="timepicker-input">\n          <input type="number">\n          <div class="timepicker-input-number"></div>\n        </div>\n        <span class="timepicker-previous">-</span>\n      </div>\n      <div class="timepicker-time-divider">:</div>\n      <div class="timepicker-minutes">\n        <span class="timepicker-next">+</span>\n        <div class="timepicker-input">\n          <input type="number">\n          <div class="timepicker-input-number"></div>\n        </div>\n        <span class="timepicker-previous">-</span>\n      </div>\n    </div>\n    ' + (data.isRange ? '<div class="timepicker-end">\n      <div class="timepicker-hours">\n        <span class="timepicker-next">+</span>\n        <div class="timepicker-input">\n          <input type="number">\n          <div class="timepicker-input-number"></div>\n        </div>\n        <span class="timepicker-previous">-</span>\n      </div>\n      <div class="timepicker-time-divider">:</div>\n      <div class="timepicker-minutes">\n        <span class="timepicker-next">+</span>\n        <div class="timepicker-input">\n          <input type="number">\n          <div class="timepicker-input-number"></div>\n        </div>\n        <span class="timepicker-previous">-</span>\n      </div>\n    </div>' : '') + '\n  </div>';
                });

                /***/
            }),
            /* 305 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                var defaultOptions = {
                    timeFormat: 'HH:mm:ss',
                    editTimeManually: false,
                    color: 'primary',
                    isRange: false,
                    lang: 'en', // internationalization
                    startTime: undefined,
                    endTime: undefined,
                    minTime: null,
                    maxTime: null,
                    minuteSteps: 5
                };

                /* harmony default export */
                __webpack_exports__["a"] = (defaultOptions);

                /***/
            }),
            /* 306 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                var defaultOptions = {
                    type: undefined,
                    color: 'primary',
                    isRange: false,
                    allowSameDayRange: true,
                    lang: navigator.language.substring(0, 2) || 'en', // internationalization
                    dateFormat: 'MM/DD/YYYY',
                    timeFormat: 'HH:mm',
                    navigationMonthFormat: 'MMMM',
                    navigationYearFormat: 'YYYY',
                    headerMonthYearFromat: 'MMMM YYYY',
                    displayMode: 'default',
                    editTimeManually: false,
                    position: 'auto',
                    showHeader: true,
                    headerPosition: 'top',
                    showFooter: true,
                    showButtons: true,
                    showTodayButton: true,
                    showClearButton: true,
                    cancelLabel: 'Cancel',
                    clearLabel: 'Clear',
                    todayLabel: 'Today',
                    nowLabel: 'Now',
                    validateLabel: 'Validate',
                    enableMonthSwitch: true,
                    enableYearSwitch: true,
                    startDate: undefined,
                    endDate: undefined,
                    minDate: null,
                    maxDate: null,
                    disabledDates: [],
                    disabledWeekDays: undefined,
                    highlightedDates: [],
                    weekStart: 0,
                    startTime: undefined,
                    endTime: undefined,
                    minuteSteps: 5,
                    labelFrom: '',
                    labelTo: '',
                    closeOnOverlayClick: true,
                    closeOnSelect: true,
                    toggleOnInputClick: true,
                    onReady: null,
                    icons: {
                        previous: '<svg viewBox="0 0 50 80" xml:space="preserve">\n      <polyline fill="none" stroke-width=".5em" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "/>\n    </svg>',
                        next: '<svg viewBox="0 0 50 80" xml:space="preserve">\n      <polyline fill="none" stroke-width=".5em" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/>\n    </svg>',
                        time: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 60 60" xml:space="preserve">\n      <g>\n        <path fill="currentcolor" d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>\n\t      <path fill="currentcolor" d="M30,6c-0.552,0-1,0.447-1,1v23H14c-0.552,0-1,0.447-1,1s0.448,1,1,1h16c0.552,0,1-0.447,1-1V7C31,6.447,30.552,6,30,6z"/>\n      </g>\n    </svg>',
                        date: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 60 60" xml:space="preserve">\n      <g>\n        <path d="M57,4h-7V1c0-0.553-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1v3H19V1c0-0.553-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1v3H3C2.447,4,2,4.447,2,5v11v43c0,0.553,0.447,1,1,1h54c0.553,0,1-0.447,1-1V16V5C58,4.447,57.553,4,57,4z M43,2h5v3v3h-5V5V2z M12,2h5v3v3h-5V5V2z M4,6h6v3c0,0.553,0.447,1,1,1h7c0.553,0,1-0.447,1-1V6h22v3c0,0.553,0.447,1,1,1h7c0.553,0,1-0.447,1-1V6h6v9H4V6zM4,58V17h52v41H4z"/>\n        <path d="M38,23h-7h-2h-7h-2h-9v9v2v7v2v9h9h2h7h2h7h2h9v-9v-2v-7v-2v-9h-9H38z M31,25h7v7h-7V25z M38,41h-7v-7h7V41z M22,34h7v7h-7V34z M22,25h7v7h-7V25z M13,25h7v7h-7V25z M13,34h7v7h-7V34z M20,50h-7v-7h7V50z M29,50h-7v-7h7V50z M38,50h-7v-7h7V50z M47,50h-7v-7h7V50z M47,41h-7v-7h7V41z M47,25v7h-7v-7H47z"/>\n      </g>\n    </svg>'
                    }
                };

                /* harmony default export */
                __webpack_exports__["a"] = (defaultOptions);

                /***/
            }),
            /* 307 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony default export */
                __webpack_exports__["a"] = (function (data) {
                    return '<div id=\'' + data.id + '\'>\n    <div class="datetimepicker-dummy is-hidden">\n      <div class="datetimepicker-dummy-wrapper">\n        <input placeholder="' + data.labelFrom + '" readonly="readonly" class="datetimepicker-dummy-input' + (data.isRange ? ' is-datetimepicker-range' : '') + '" type="text">\n        ' + (data.isRange ? '<input placeholder="' + data.labelTo + '" readonly="readonly" class="datetimepicker-dummy-input" type="text">' : '') + '\n      </div>\n      <button class="datetimepicker-clear-button" type="button">\uFF0B</button>\n    </div>\n    <div class="datetimepicker-wrapper' + (data.displayMode === 'dialog' ? ' modal' : '') + '">\n        <div class="modal-background' + (data.displayMode === 'dialog' ? '' : ' is-hidden') + '"></div>\n        <div class="datetimepicker">\n          <div class="datetimepicker-container' + (data.headerPosition === 'top' ? '' : ' has-header-bottom') + '"></div>\n        </div>\n    </div>\n  </div>';
                });

                /***/
            }),
            /* 308 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony default export */
                __webpack_exports__["a"] = (function (data) {
                    return '<div class="datetimepicker-header' + (data.type === 'time' ? ' is-hidden' : '') + (data.type === 'date' ? ' is-date-only' : '') + '">\n\t\t<div class="datetimepicker-selection-details">\n\t\t\t<div class="datetimepicker-selection-from' + (data.labelFrom === '' ? ' is-hidden' : '') + '">' + data.labelFrom + '</div>\n\t\t\t<div class="datetimepicker-selection-start' + (data.isRange ? '' : ' is-centered') + '">\n\t\t\t\t<div class="datetimepicker-selection-wrapper">\n\t\t\t\t\t<div class="datetimepicker-selection-day"></div>\n\t\t\t\t\t<div class="datetimepicker-selection-date">\n\t\t\t\t\t\t<div class="datetimepicker-selection-month"></div>\n\t\t\t\t\t\t<div class="datetimepicker-selection-weekday"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t' + (data.type !== 'date' ? '<div class="datetimepicker-selection-time">\n\t\t\t\t\t<div class="datetimepicker-selection-time-icon">\n\t\t\t\t\t\t<figure class="image is-16x16">\n\t\t\t\t\t\t\t' + (data.icons ? data.icons.time : '') + '\n\t\t\t\t\t\t</figure>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="datetimepicker-selection-hour' + (data.editTimeManually ? ' editable ' : '') + '">\n\t\t\t\t\t\t' + (data.editTimeManually ? '\n\t\t\t\t\t\t\t<input type="text" class="datetimepicker-selection-input-hours" maxlength="2">:\n\t\t\t\t\t\t\t<input type="text" class="datetimepicker-selection-input-minutes" maxlength="2">\n\t\t\t\t\t\t' : '') + '\n\t\t\t\t\t</div>\n\t\t\t\t</div>' : '') + '\n\t\t\t</div>\n\t\t</div>\n\t\t' + (data.isRange ? '\n\t\t<div class="datetimepicker-selection-details">\n\t\t\t<div class="datetimepicker-selection-to' + (data.labelTo === '' ? ' is-hidden' : '') + '">' + data.labelTo + '</div>\n\t\t\t<div class="datetimepicker-selection-end">\n\t\t\t\t<div class="datetimepicker-selection-wrapper">\n\t\t\t\t\t<div class="datetimepicker-selection-day"></div>\n\t\t\t\t\t<div class="datetimepicker-selection-date">\n\t\t\t\t\t\t<div class="datetimepicker-selection-month"></div>\n\t\t\t\t\t\t<div class="datetimepicker-selection-weekday"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t' + (data.type !== 'date' ? '<div class="datetimepicker-selection-time">\n\t\t\t\t\t<div class="datetimepicker-selection-time-icon">\n\t\t\t\t\t\t<figure class="image is-16x16">\n\t\t\t\t\t\t\t' + (data.icons ? data.icons.time : '') + '\n\t\t\t\t\t\t</figure>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="datetimepicker-selection-hour' + (data.editTimeManually ? ' editable ' : '') + '">\n\t\t\t\t\t\t' + (data.editTimeManually ? '\n\t\t\t\t\t\t\t<input type="text" class="datetimepicker-selection-input-hours" maxlength="2">:\n\t\t\t\t\t\t\t<input type="text" class="datetimepicker-selection-input-minutes" maxlength="2">\n\t\t\t\t\t\t' : '') + '\n\t\t\t\t\t</div>\n\t\t\t\t</div>' : '') + '\n\t\t\t</div>\n\t\t</div>' : '') + '\n\t</div>';
                });

                /***/
            }),
            /* 309 */
            /***/ (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony default export */
                __webpack_exports__["a"] = (function (data) {
                    return '<div class="datetimepicker-footer">\n\t\t<button type="button" class="datetimepicker-footer-validate has-text-success button is-small is-text ' + (data.displayMode === 'inline' ? 'is-hidden' : '') + '">' + (data.icons.validate ? data.icons.validate : '') + data.validateLabel + ' </button>\n\t\t<button type="button" class="datetimepicker-footer-today has-text-warning button is-small is-text">' + (data.icons.today ? data.icons.today : '') + data.todayLabel + '</button>\n\t\t<button type="button" class="datetimepicker-footer-clear has-text-danger button is-small is-text">' + (data.icons.clear ? data.icons.clear : '') + data.clearLabel + '</button>\n\t\t<button type="button" class="datetimepicker-footer-cancel button is-small is-text ' + (data.displayMode === 'inline' ? 'is-hidden' : '') + '">' + (data.icons.cancel ? data.icons.cancel : '') + data.cancelLabel + '</button>\n\t</div>';
                });

                /***/
            })
            /******/])["default"];
});


var bulmaCalendar = window.bulmaCalendar;

function bulmaCalendarRegist(instance, id) {
    instance.on('select', function (datepicker) {
        console.log(datepicker.data.value());
        DotNet.invokeMethodAsync("BulmaRazor","JSSetSelect",datepicker.data.value())
    });
}

export {bulmaCalendar, bulmaCalendarRegist};