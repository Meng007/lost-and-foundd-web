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
