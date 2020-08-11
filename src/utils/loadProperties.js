/*
 * @Description: 加载语言
 * @Author: Tovi
 * @Date: 2020-03-02 18:33:06
 * @LastEditTime: 2020-04-01 17:38:31
 * @LastEditors: Tovi
 */

export const loadLanguage = (name,lang,path) => {
    return new Promise((resolve) => {
        try {
            $.i18n.properties({
                name:name,    //属性文件名     命名格式： 文件名_国家代号.properties
                path:path,   //注意这里路径是你属性文件的所在文件夹
                mode:'map',  
                language:lang,     //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
                callback:function(){
                    $("[data-locale]").each(function(){
                        $(this).html($.i18n.prop($(this).data("locale")));  
                    });
                    resolve();
                }
            });
        } catch(error){
            console.log('i18n 已写入')
        }

    })
}