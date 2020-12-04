import request from '@/utils/request'


/**
 *  获取字典数据列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getSensitiveWordList(data) {
    return request({
        url: '/sensitive-word/list',
        method: 'get',
        params: data
    })
}

/**
 * 添加字典数据
 * @param data
 * @returns {AxiosPromise}
 */
export function addSensitiveWord(data) {
    return request({
        url: '/sensitive-word/save',
        method: 'post',
        data: data
    })
}

/**
 *  删除字典数据
 * @param id
 * @returns {AxiosPromise}
 */
export function removeSensitiveWord(id) {
    return request({
        url: '/sensitive-word/remove/'+id,
        method: 'delete',
    })
}

/**
 *  修改字典数据
 * @param data
 * @returns {AxiosPromise}
 */
export function updateSensitiveWord(data) {
    return request({
        url: '/sensitive-word/update',
        method: 'put',
        data: data
    })
}

/**
 * 字典数据数据回显
 * @param id
 * @returns {AxiosPromise}
 */
export function echoSensitiveWord(id) {
    return request({
        url: '/sensitive-word/echo/'+id,
        method: 'get'
    })
}



