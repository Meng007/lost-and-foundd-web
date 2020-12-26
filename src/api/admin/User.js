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

/**
 * 删除用户
 * @param id
 * @returns {AxiosPromise}
 */
export function removeUser(id) {
    return request({
        url: '/user/remove/'+id,
        method: "delete"
    })
}

/**
 *  修改用户
 * @param data
 * @returns {AxiosPromise}
 */
export function updateUser(data){
    return request({
        url: '/user/update',
        method: 'put',
        data: data
    })
}

/**
 *  获取用户详情
 * @returns {AxiosPromise}
 */
export function getUserInfo() {
    return request({
        url: '/user/info',
        method: 'get'
    })
}
