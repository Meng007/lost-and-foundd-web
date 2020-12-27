import request from '@/utils/request'

/***
 *  添加留言
 * @param data
 * @returns {AxiosPromise}
 */
export function addComment(data) {
    return request({
        url: '/message/save',
        method: 'post',
        data: data
    })
}

/***
 *  获取留言列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getCommentList(data) {
    return request({
        url: '/message/list',
        method: 'get',
        params: data
    })
}
