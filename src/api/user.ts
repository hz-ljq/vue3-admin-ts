import request from '@/utils/axiosReq'
import { ObjTy } from '~/common'

export function loginReq(data: ObjTy) {
  // return request({
  //   url: "/integration-front/user/loginValid",
  //   data,
  //   method: "post",
  //   bfLoading: false,
  //   isParams: true,
  //   isAlertErrorMsg: false,
  // });

  return new Promise((resolve) => {
    console.log(6)
    setTimeout(() => {
      let response = {
        msg: '操作成功!',
        flag: true,
        code: 20000,
        data: {
          jwtToken:
            'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjQyNjI1ODYsImV4cCI6MTY2NDUyMTc4NiwiZW1haWwiOm51bGwsInVzZXJuYW1lIjoiYWRtaW4ifQ.rti6QhMJ1-ONS0cgop3N6pem5WodeXIj7DxATiBl6wk',
          username: 'admin'
        }
      }
      resolve(response)
    }, 500)
  })
}

export function getInfoReq() {
  // return request({
  //   url: "/integration-front/user/getUserInfo",
  //   bfLoading: false,
  //   method: "post",
  //   isAlertErrorMsg: false,
  // });

  return new Promise((resolve) => {
    setTimeout(() => {
      let response = {
        msg: '操作成功!',
        flag: true,
        code: 20000,
        data: { exp: 1664508408, iat: 1664249208, username: 'admin' }
      }
      resolve(response)
    }, 500)
  })
}

export function logoutReq() {
  // return request({
  //   url: "/integration-front/user/loginOut",
  //   method: "post",
  // });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}
