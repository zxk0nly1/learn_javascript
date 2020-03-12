var http=require("http");
var ejs=require("ejs");
var server=http.createServer(function(req,res){
	if(req.url=="/"){
		var obj={name:"veb",age:20}
		ejs.renderFile("./public/index.html",obj,function(err,data){
			res.end(data);
		})
	}else{
		res.end("not found");
	}
})
console.log("server started at localhost:9090");
server.listen(9090);