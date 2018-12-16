
/**
 * @param {mode}  
 * development
 * production 
 */
let Imgurl = '';
let ipUrl  = '';

if(process.env.NODE_ENV === 'development'){
   Imgurl = 'https://you1mei.com/public/uploads/case/';
   ipUrl  = 'https://you1mei.com';
   // Imgurl = 'https://192.168.0.103/public/uploads/case/';
   // ipUrl  = 'http://192.168.0.103';
} else{
   Imgurl = '/public/uploads/case/';
   ipUrl  = '';
}

export {
   Imgurl,
   ipUrl
}




