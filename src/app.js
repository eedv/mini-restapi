const app = require('express')();
var bodyParser = require('body-parser');

app.options('*', function(req, res) {
	res.header({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, PATCH, DELETE',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	});
	res.end();
});
app.use(bodyParser.json());
app.listen(process.env.PORT || 8501);
console.log('Server started');
module.exports = app;