const express = require('express');
const router = express.Router();

router.get('/list',(req,res)=>{
	return res.render('board/list',{ title : '게시판 목록'});
});

router.get('/view',(req,res)=>{
	return res.render('board/view',{title : '게시글 조회'});
});


module.exports=router;