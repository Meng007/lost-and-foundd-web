import request from '@/utils/request'

/**
 *  获取用户列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getUserList(data) {
    return request({
        url: '/user/list',
        method: 'get',
        params: data
    })
}

export function removeUser(id) {
    return request({
        url: '/user/remove/'+id,
        method: "delete"
    })
}


