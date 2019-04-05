const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
	res.header({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	})
	if(req.method === 'OPTIONS') {
		res.header({
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, PATCH, DELETE'
		});
		return res.status(200).json({});
	}
	next();
})
app.listen(process.env.PORT || 8501);
console.log('Server started');
module.exports = app;