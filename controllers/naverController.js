var naver = require('../config/naver_key.js')

var request = require('request')

var option = (app_url)=>{
	return{
		url : app_url,
		headers : {
			'X-Naver-Client-Id' : naver.CLIENT_ID,
			'X-Naver-Client-Secret' : naver.CLIENT_SEC
		}
	}
}

module.exports =(app)=>{
	
	app.get('/',(req,res)=>{res.render('index',{books:[]})})
	
	app.post('/naver/book',(req,res)=>{
		let bookName = req.body.query
		let api_url = 'https://openapi.naver.com/v1/search/book.json'
		
		api_url += '?query=' + encodeURI(bookName) + '&display=10'
		
		
		request.get(option(api_url),(err,response,data)=>{
			
			if(!err && response.statusCode ==200){
				let books =JSON.parse(data).items
				res.render('index',{body:'book',books:books})
			}else{
				res.status(response.statusCode).end('오류발생')
			}
			
		})
		
	})
	
}