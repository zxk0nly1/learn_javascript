var ejs=require('ejs');

//var fs=require('fs');

var obj={
	name:"veb",
	age:20,
	list:["a","b","c","d"],
	login:true,
	s:"<h1>abc</h1>"
}

ejs.renderFile("index.html",obj,function(err,data){
	console.log(data);
})
// 插值 <%= name %>


/*
var str=fs.readFile("index.html",function(err,data){
	
	
	var res=ejs.render(data.toString(),obj);

	console.log(res);
})
*/
/*var str=`
		<h1><%=name%></h1>
		<h2><%=age%></h2>
`*/
/* 
<% for(var i=0;i<list.length;i++){%>
			<li><%=list[i]%></li>
		<% } %>  */
