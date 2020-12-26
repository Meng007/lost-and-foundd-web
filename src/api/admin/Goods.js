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

/**
 *  删除物品
 * @param id
 * @returns {AxiosPromise}
 */
export function removeGoods(id){
    return request({
        url: '/goods/remove/+'+id,
        method: 'delete'
    })
}

/**
 * 修改物品
 * @param data
 * @returns {AxiosPromise}
 */
export function updateGoods(data){
    return request({
        url: '/goods/update',
        method: 'put',
        data: data
    })
}

/**
 * 获取物品详情
 * @param id
 * @returns {AxiosPromise}
 */
export function getGoodsInfo(id){
    return request({
        url: '/goods/info/'+id,
        method: 'get'
    })
}

/**
 *  物品置顶操作
 * @param id
 * @returns {AxiosPromise}
 */
export function goodsTopping(id){
    return request({
        url: '/goods/topping/'+id,
        method: 'put'
    })
}

/**
 * 文件上传
 * @param data
 * @returns {AxiosPromise}
 */
export function fileUpload(data) {
    return request({
        url: '/file/upload',
        method: 'post',
        data: data
    })
}

/**
 * 保存物品
 * @param data
 * @returns {AxiosPromise}
 */
export function saveGoods(data) {
    return request({
        url: '/goods/save',
        method: 'post',
        data: data
    })
}

/**
 * 获取失物
 * @param data
 * @returns {AxiosPromise}
 */
export function getLostGoods(data) {
    return request({
        url: '/goods/lost/list',
        method: 'get',
        params: data
    })
}

/**
 * 获取招领
 * @param data
 * @returns {AxiosPromise}
 */
export function getTakeGoods(data) {
    return request({
        url: '/goods/take/list',
        method: 'get',
        params: data
    })
}

/**
 *  获取分类
 * @returns {AxiosPromise}
 */
export function getGoodsCate() {
    return request({
        url: '/cate/goods/list/'+1,
        method: 'get'
    })
}

/**
 *  用户获取自己的物品列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getUserList(data) {
    return request({
        url: '/goods/my-list',
        method: 'get',
        params: data
    })
}

/**
 *  物品搜索
 * @param data
 * @returns {AxiosPromise}
 */
export function getSearchGoods(data) {
    return request({
        url: '/goods/search',
        method: 'get',
        params: data
    })
}
