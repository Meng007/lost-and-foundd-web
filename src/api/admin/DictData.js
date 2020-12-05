import request from '@/utils/request'


/**
 *  获取字典数据列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getDictDataList(data) {
    return request({
        url: '/dict-data/list',
        method: 'get',
        params: data
    })
}

/**
 * 添加字典数据
 * @param data
 * @returns {AxiosPromise}
 */
export function addDictData(data) {
    return request({
        url: '/dict-data/save',
        method: 'post',
        data: data
    })
}

/**
 *  删除字典数据
 * @param id
 * @returns {AxiosPromise}
 */
export function removeDictData(id) {
    return request({
        url: '/dict-data/remove/'+id,
        method: 'delete',
    })
}

/**
 *  修改字典数据
 * @param data
 * @returns {AxiosPromise}
 */
export function updateDictData(data) {
    return request({
        url: '/dict-data/update',
        method: 'put',
        data: data
    })
}

/**
 * 字典数据数据回显
 * @param id
 * @returns {AxiosPromise}
 */
export function echoDictData(id) {
    return request({
        url: '/dict-data/echo/'+id,
        method: 'get'
    })
}

