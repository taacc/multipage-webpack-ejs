/*
 * @Description: 文件说明
 * @Author: Tovi
 * @Date: 2020-02-26 19:52:07
 * @LastEditTime: 2020-03-19 15:10:04
 * @LastEditors: Tovi
 */
/**
 * api服务器
 */
export const HOST = process.env.HOST;
/**
 * 图片默认下载路径
 */
export const IMAGE_DOWNLOAD_PATH = process.env.IMAGE_HOST;

/**
 *是否使用https
 */
export const PROTOCOL_PREFIX = process.env.IS_USE_HTTPS == true ? 'https' : 'http';

/**
 * IMBRA下载路径
 */
export const IMBRA_DOWNLOAD_URL = `${PROTOCOL_PREFIX}://${HOST}/front/static/imgs/IMBRA_personal_background_form.pdf`;

/**
 * IMBRA下载路径
 */
export const IMBRA_DOWNLOAD_URL_ROMANCE_MEET = `${PROTOCOL_PREFIX}://${HOST}/static/IMBRA_for_Romance_Meet.pdf`;