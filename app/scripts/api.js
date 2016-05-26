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
    }
  },
  course: {
    getcourselist: {
      m: 'post',
      u: 'c/list'
    },
    getcourseview: {
      m: 'post',
      u: 'c/info'
    }
  }
}
