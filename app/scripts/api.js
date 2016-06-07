'use strict';

/**
 * Api Config
 */
var Api = {
  //host地址
  host: 'http://192.168.10.17/api/',
  // host: 'http://192.168.10.107:8000/api/',
  default_courseid: '5746c7776dde6d1d18b35eee',
  //user
  user: {
    //login
    login: {
      m: 'post',
      u: 's/login'
    },
    //authlogin
    authlogin: {
      m: 'post',
      u: 's/auth/login'
    },
    //logout
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
    getcourseinfo: {
      m: 'post',
      u: 'c/info'
    },
    getcourseview: {
      m: 'post',
      u: 's/course/info'
    },
    learnchapter: {
      m: 'post',
      u: 's/course/read'
    },
    getchapterinfo: {
      m: 'post',
      u: 'c/chapter/details'
    },
    getmycourselist:{
      m:'post',
      u:'s/course/list'
    }
  }
}