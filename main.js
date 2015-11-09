//
var getCssByClassName ={
    main:function(className,strCss,animateState){
      var temp1 = strCss.replace(/\s/g,'');
      var arrCss=[];
      arrCss.push(this.getMainCss(className,temp1));
      if(animateState){
        arrCss.push(this.getKeyframesCss(className,temp1));
        arrCss.push(this.getWebkitKeyframesCss(className,temp1));
      }
      return arrCss.join("");
    },
    getMainCss:function(className,str){
      var temp2 = str.match(new RegExp("\\."+className+"\\{[^\\}]+\\}", "ig"));
      return temp2[0];
    },
    getKeyframesCss:function(className,str){
      var temp3 = str.match(new RegExp("@keyframes"+className+"{"+"\\S+"+"}}", "ig"));
      temp3 = temp3[0].replace('@keyframes','@keyframes ');
      return temp3;
    },
    getWebkitKeyframesCss:function(className,str){
      var temp2 = str.match(new RegExp("@-webkit-keyframes"+className+"{"+"\\S+"+"}}", "ig"));
      temp2 = temp2[0].replace('@-webkit-keyframes','@-webkit-keyframes ');
      return temp2;      
    }
}
//
var fs = require('fs');
var htmlName = 'index',cssName='animate';

//读取文件
fs.readFile(htmlName+'.html', 'utf8', function (htmlErr, htmlData) {
    if (htmlErr) throw htmlErr;
	var arrClass=[];
	var re=new RegExp('data-animate-type="(\\S+)"','ig');
	while(match = re.exec(htmlData)){
		arrClass.push(match[1]);
	}
	console.log(arrClass);
    fs.readFile(cssName+'.css','utf8',function(cssErr,cssData){
		var str='',css,newFileStr;
		for(var i=0,len=arrClass.length;i<len;i++){
			if(arrClass[i].indexOf('*')!=-1){
				css = getCssByClassName.main(arrClass[i],cssData);
			}else{
				css = getCssByClassName.main(arrClass[i],cssData,true);
			}
			str+=css;
		}

		str = '<style type="text/css">'+str+'</style>';
		newFileStr = htmlData.replace('<style type="text/CSSFilter"></style>',str)
		fs.appendFile(htmlName+'_.html', newFileStr, function (err) {
		  if (err) throw err;

		});
    });
});
