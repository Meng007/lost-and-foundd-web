import request from '@/utils/request'

/**
 *  获取分类列表
 * @returns {AxiosPromise}
 */
export function getCateList() {
    return request({
        url: '/cate/list',
        method: 'get'
    })
}

/**
 * 获取分类
 * @param pid
 * @returns {AxiosPromise}
 */
export function getSysCateList(pid) {
    return request({
        url: '/cate/goods/list/'+pid,
        method: 'get'
    })
}

/**
 * 添加系统分类
 * @param data
 * @returns {AxiosPromise}
 */
export function addCate(data) {
    return request({
        url: '/cate/save',
        method: 'post',
        data: data
    })

}

/**
 * 删除分类
 * @param id
 * @returns {AxiosPromise}
 */
export function removeCate(id) {
    return request({
        url: '/cate/remove/'+id,
        method: 'delete'
    })

}
