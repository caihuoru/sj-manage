import api from '.'
import { post } from '@/plugins/axios'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter: any) {
  return post('/ag/login', parameter, {})
}

export function getSmsCaptcha (parameter: any) {
  return post(api.SendSms, parameter, {})
}

export function getInfo () {
  return post('/user/info', {}, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout () {
  return post('/auth/logout', {}, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}