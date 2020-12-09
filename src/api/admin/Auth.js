import request from '@/utils/request'

/**
 *  获取登录用户
 * @param data
 * @returns {AxiosPromise}
 */
export function getLoginUser(data) {
    return request({
        url: '/user/login/list',
        method: 'get',
        params: data
    })
}
