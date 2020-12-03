import request from '@/utils/request'

export function getGoodsList(data) {

    return request({
        url: '/goods/list',
        method: 'get',
        params: data
    })
}
