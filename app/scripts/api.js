'use strict';

/**
 * Api Config
 */
var Api = {
  //host地址
  host: 'http://192.168.10.107:8000/api/',
  //user
  user: {
    //login
    login: {
      m: 'post',
      u: 's/login'
    },
    logout: {
      m: 'post',
      u: 's/logout'
    },
    courses: {
      m: 'post',
      u: 's/courses/list'
    }
  }
}
