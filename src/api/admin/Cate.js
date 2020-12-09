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
