import request from '@/utils/request'

/**
 * 获取角色列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getRoleList(data) {
    return request({
        url: '/role/list',
        method: 'get',
        params: data
    })

}

/**
 * 删除角色
 * @param id
 * @returns {AxiosPromise}
 */
export function removeRole(id) {
    return request({
        url: '/role/remove/'+id,
        method: "delete"
    })
}

/**
 * 修改角色
 * @param data
 * @returns {AxiosPromise}
 */
export function updateRole(data) {
    return request({
        url: '/role/update',
        method: 'put',
        data: data
    })
}

/**
 * 添加角色
 * @param data
 * @returns {AxiosPromise}
 */
export function saveRole(data) {
    return request({
        url: '/role/save',
        method: 'post',
        data: data
    })
}
