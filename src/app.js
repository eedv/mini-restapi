const app = require('express')();

app.options('*', function(req, res) {
	res.header({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	});
	res.end();
});
app.use(bodyParser.json());
app.listen(process.env.PORT || 8501);
console.log('Server started');
module.exports = app;