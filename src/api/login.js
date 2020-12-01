import request from '@/utils/request'

/**
 *  登录
 * @param username
 * @param password
 * @param code
 * @param uuid
 * @returns {AxiosPromise}
 */
export function login(username, password) {
    const data = {
        username,
        password
    }
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}

/**
 *  获取用户登录信息
 * @returns {AxiosPromise}
 */
export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'get'
    })
}

/**
 *  退出登录
 * @returns {AxiosPromise}
 */
export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}
