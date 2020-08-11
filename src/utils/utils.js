// 防抖操作
export function getDebounce(thisobj,fn,wait){
  if (thisobj.fun!==null){
      clearTimeout(thisobj.fun)
  }
  thisobj.fun = setTimeout(fn,wait)
}