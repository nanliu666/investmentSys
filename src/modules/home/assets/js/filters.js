/**
 * 过滤器
 *
 */
// moment 开启cnd加速，不需要在这里import
//格式化日期YYY-MM-DD
let dataFrm = (date, format) => {
  return moment(date).format(format)
}

//截取指定字符串
let strSubstring = (str, strIndex) => {
  return str.substring(0, strIndex)
}

//文件名称处理,获取文件名称
let splitFileName = (text) => {
  var pattern = /\.{1}[a-z]{1,}$/;
  if (pattern.exec(text) !== null) {
    return (text.slice(0, pattern.exec(text).index));
  } else {
    return text;
  }
}
//文件名称处理,获取文件后缀
let postfixFileName = (text) => {
  let fileName = text.lastIndexOf("."); //取到文件名开始到最后一个点的长度
  let fileNameLength = text.length; //取到文件名长度
  let fileFormat = text.substring(fileName + 1, fileNameLength); //截
  return fileFormat
}

//格式化数字 逢千加逗号
let formatNumber = (number, decimals = 2, dec_point = '.', thousands_sep = ',', roundtag) => {
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数 默认2位
   * dec_point：小数点符号 默认为.
   * thousands_sep：千分位符号 默认为,
   * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
   * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  roundtag = roundtag || "ceil"; //"ceil","floor","round"
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {

      var k = Math.pow(10, prec);
      console.log();

      return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

//字符串首字母大写
let firstUpperCase = (str) => {
  var newarr, newarr1 = [];
  newarr = str.toLowerCase().split(" ");
  for (var i = 0; i < newarr.length; i++) {
    newarr1.push(newarr[i][0].toUpperCase() + newarr[i].substring(1));
  }
  return newarr1.join(' ');
};


export {
  dataFrm,
  strSubstring,
  formatNumber,
  postfixFileName,
  firstUpperCase,
  splitFileName
}
