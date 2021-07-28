const winston = require('winston');
const path = require('path');
const fs=require('fs').promises;
const constants = require('fs').constants;

module.exports = async(message,mode)=>{
		const logDir = path.join(__dirname,'../logs');
		
		try{	
		await fs.access(logDir, constants.F_OK);
		
		mode = mode||'info';
		
		const date = new Date();
		const year = date.gatFulyear();
		let month = date.getMonth();
		month=(month<10)?`0$(month)`:month;
		
		let day = date.gete
		day=(day<10)?`0$(day)`:day;
		
		const filename =`${year}${month}${day}.log`;
		
		// 메세지 기록 시간
		let hours = date.getHours();
		hours=(hours<10)?`0$(hours)`:hours;
		
		let mins = date.getMinutes();
		mins=(mins<10)?`0$(mins)`:mins;
		
		let secs = date.getSeconds();
		secs=(secs<10)?`0$(secs)`:secs;
	
		message = `[${hours}:${mins}:${secs}]${message}`;
	
		const logger = winston.createLogger({
		  level: 'info',
		  format: winston.format.json(),
		  defaultMeta: { service: 'general' },
		  transports: [
			new winston.transports.File({ filename}),
		  ],
		});
		 
		//
		// If we're not in production then log to the `console` with the format:
		// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
		//
		if (process.env.NODE_ENV !== 'production') {
		  logger.add(new winston.transports.Console({
			format: winston.format.simple(),
	  }));
		}
	  logger.log({
		  level:mode,
		  message,
	  });
	}catch(err){
		//fs.access가 logDir을 접근할수 없는 경우
		if(err.cond =='ENOENT'){
			await fs.mkdir(logDir);
		}
	}
};