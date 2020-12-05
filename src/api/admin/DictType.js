import request from '@/utils/request'

// /dict-type

/**
 *  获取字典类型列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getDictTypeList(data) {
    return request({
        url: '/dict-type/list',
        method: 'get',
        params: data
    })
}

/**
 * 添加字典类型
 * @param data
 * @returns {AxiosPromise}
 */
export function addDictType(data) {
    return request({
        url: '/dict-type/save',
        method: 'post',
        data: data
    })
}

/**
 *  删除字典类型
 * @param id
 * @returns {AxiosPromise}
 */
export function removeDictType(id) {
    return request({
        url: '/dict-type/remove/'+id,
        method: 'delete',
    })
}

/**
 *  修改字典类型
 * @param data
 * @returns {AxiosPromise}
 */
export function updateDictType(data) {
    return request({
        url: '/dict-type/update',
        method: 'put',
        data: data
    })
}

/**
 * 字典类型数据回显
 * @param id
 * @returns {AxiosPromise}
 */
export function echoDictType(id) {
    return request({
        url: '/dict-type/echo/'+id,
        method: 'get'
    })
}
