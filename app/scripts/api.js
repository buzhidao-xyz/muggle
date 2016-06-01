'use strict';

/**
 * Api Config
 */
var Api = {
  //host地址
  host: 'http://192.168.10.17/api/',
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