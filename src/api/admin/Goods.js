import request from '@/utils/request'

/**
 * 获取物品列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getGoodsList(data) {

    return request({
        url: '/goods/list',
        method: 'get',
        params: data
    })
}
