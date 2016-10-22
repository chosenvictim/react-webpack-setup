var koa         = require("koa");
var serve       = require("koa-static");
var path        = require('path');
var config      = require("./config");

var server = koa();
server.use(serve(path.join(__dirname, 'dist')));

server.use(function*(next) {
    try {
        yield next;
    } catch (err){
        console.log('from serverjs',err);
        this.status = err.status || 500;
        if(typeof(err.errors) === 'string' || typeof(err.errors) === 'undefined')
            this.body = [
                {
                    "type" : "custom",
                    "message" : err.errors ? err.errors : err.message,
                    "rule" : "custom"
                }
            ];
        else {
            let errorBody = [];
            for (var error of err.errors) {

                let errorField = Object.keys(error)[0];
                errorBody.push({
                    "type" : error[errorField]["type"],
                    "field" : errorField,
                    "message" : errorConf[error[errorField]["message"]],
                    "rule" : error[errorField]["rule"],
                    "code" : parseInt(error[errorField]["message"],10)
                });
            }
            this.body = errorBody;
        }
    }
});

server.listen(config.serverPort, (err) => {
    if(err) {
        console.error("Server Error: " + err);
    }
    console.info('==> ✅ Server is running on port: ' + config.serverPort);
});