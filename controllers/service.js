var sqlite3 = require('sqlite3');
var mkdirp = require('mkdirp');
var User = require('../models/user');
var Service = require('../models/service');

mkdirp.sync('./var/db');


// SERVICES

const log = function(req,res,next){
  Service.findAll()
  .then(services => {
  	console.log(services);
  	return(services)
  })
  .then(services => res.status(200).send(services))
  .catch(err=>next(err))
}


const add = function(req, res, next) {
	console.log(req.body.userid);
	if(!req.user){
		req.user = {"id":req.body.userid}
	}
	console.log(req.user.id);
	Service.create({
		name:req.body.name,
		user_id : req.user.id,
		description : req.body.description,
		geo_lat : req.body.geo_lat,
		geo_lon : req.body.geo_lon

	}).then(service => {
		res.redirect('/' + (req.body.filter || ''));
	}).catch(err =>{
		console.log(err);
		next(err)});

}



const deleteService = function(req, res, next) {
  db.run('DELETE FROM services WHERE id = ?)', [
    req.params.id
  ], function(err) {
    if (err) { return next(err); }
    return res.redirect('/' + (req.body.filter || ''));
  });

}






module.exports ={
	add,
	log,
	deleteService,
}	