var http = require('http');
var url  = require('url');
var util = require('util');
var zlib = require('zlib');
//var nc  = require('ncurses');
//var StringDecoder = require('StringDecoder');

var spaces_b200 = new Buffer(200); spaces_b200.fill(" ");
var spaces_200 = spaces_b200.toString();

var requests_status = "";
var requests_data = {};
var request_id_next = 1;


var server = http.createServer(function(request, response) {
    var request_url = url.parse(request.url);



    var proxy_options = {};
    proxy_options.headers = request.headers;
    proxy_options.path = request_url.path;
    proxy_options.method = request.method ;
    proxy_options.host = request_url.hostname;
    proxy_options.port = request_url.port || 80;

    var spaces = new Buffer(90); spaces.fill(' ');
    var request_url_substr = (request.url + spaces ).substr(0,90);
    request.id = "request_id_" + ( request_id_next++ );

    requests_data[request.id] = {
        'url'		: request_url_substr ,
        'status'	: 'open' ,
        'is_text'	: 0 ,
        'progress'   : '' ,
        'timeout'   : ''
    }

    var proxy_request = http.request( proxy_options , function(proxy_response){
        var content_type =  proxy_response.headers['content-type'] || "" ;
        var is_text = content_type.match('text\/html') || 0;
        var mybuffer = '';
        var output = '';
        proxy_request.myresponse = proxy_response;
        proxy_request.do_close = 0;
        requests_data[request.id].status="request";

        if ( request.url.match(/\.(ico|xml|css|js|jpg|gif|png)/i) ){
            is_text = 0;
        }
        if ( request.url.match(/(owa|facebook|gravatar|vimeo|stumbleupon)/) ){
            is_text = 0;
        }
        if( is_text ) {
            requests_data[request.id].is_text = 1;
            proxy_response.setEncoding('binary');
        }

        // this only works if we dont change the content-lenght, but only rearrange
        response.writeHead(proxy_response.statusCode, proxy_response.headers);

        var len = parseInt(proxy_response.headers['content-length'], 10);
        var cur = 0;

        // there could be optimization to grab javascripts already from
        // chunks, and reinsert them at the on('end'), but its quite complicated
        // because a string can be split up in 2 chunks... load full buffer for now.
        proxy_response.on('data', function(chunk){
            if ( is_text ) {
                mybuffer += chunk.toString('binary') ;
                //buffers.push( chunk );
            } else {
                response.write(chunk,'binary');
            }

            if ( len > 10000 ) {
                cur += chunk.length;
                var spaces = new Buffer(16); spaces.fill("\t");
                var progress = (100.0 * cur / len).toFixed(2) + "% " + (cur/1000.0/1000.0).toFixed(3) + " mb";
                requests_data[request.id].progress = progress;
            }
            requests_data[request.id].status="data";

            if ( proxy_request.do_close == 1) {
                proxy_request.abort();
            }
        });



        proxy_response.on('end', function() {
            if ( is_text  ) {
                // workaround: to get multiline regex we convert nl to uffff and back
                //buffers_all = Buffer.concat( buffers );
                //var decoder = new StringDecoder('utf8');
                //output = decoder.write( buffers_all ).toString('utf8');

                output = mybuffer.toString().replace(/\n/g,'\uffff');
                // find javascripts
                matches = output.match(/\<script.*?\<\/script\>/gi ) || [];

                if( matches.length > 0 && output.match(/\<\/body\>/i) /* google redirects with missing body */) {
                    // remove javascripts
                    output = output.replace(	/\<script.*?\<\/script\>/gi , "" );

                    // insert js before /body
                    output = output.replace( /\<\/body\>/i , ""+ matches.join('') + "</body>" );
                }
                // send to browser
                output = output.replace(/\uffff/g,'\n');

                //response.write( buffers_all );
                response.write( output ,'binary');
            }
            requests_data[request.id].status="ended";
            response.end();
        });

    }).on('error' , function(e){
            requests_data[request.id].status = 'error' ;
            requests_data[request.id].error  = e.message ;
        }).on('close' , function() {
            requests_data[request.id].status="closed";
            //POST ?
            if ( proxy_request ) {
                proxy_request.end();

            }

        }).on('end' , function() {
            //console.log('sent post data');
            requests_data[request.id].status="ended";
            proxy_request.end();
        })

    request.on('data', function(chunk) {
        requests_data[request.id].status="up data";
        requests_status = "request data " + (request_url.path + spaces_200 ).toString().substr(0,40) ;
        proxy_request.write(chunk);
    });
    request.on('end', function() {
        requests_data[request.id].status="up end";
        requests_status = "request end " + (request_url.path + spaces_200).toString().substr(0,40) ;
        proxy_request.end();
    });
    request.on('close', function() {
        requests_status = "request close " + (request_url.path + spaces_200).toString().substr(0,40) ;
        proxy_request.do_close = 1;
        //proxy_request.end();
    });

}).listen(
    8080
).on('error',  function(e) {
        console.log('got server error' + e.message );
    });

// set to 0 if you want to turn off ncurses display-refresh, 
// change refreshtimer in setInterval (default 1000 = 1seconds)
if ( 0 ) {
    // provide logging
    var win = new nc.Window();
    nc.showCursor = false;

    var log_counter = 0;
    setInterval( function(){
            //console.log( requests_data );

            log_counter++;
            var ln = 1;
            var nc_lines = nc.lines;

            //for ( ln = 0; ln < Object.keys(requests_data).length ; ln++ ){
            win.addstr(0,1, "proxy server 8080 :" + (log_counter/60.0).toFixed(1) + "m " /*+ (ln -1 )+" connections   "*/);
            //win.addstr(0,30, "status" + requests_status );

            for ( key in requests_data ){
                var request_data = requests_data[key];

                ln++;
                //if ( ln <= nc_lines + 2) {
                //win.addstr( ln , 0 , log_counter +"" );
                win.addstr( ln , 0 , (request_data['url'] +"").substr(0,70) );
                win.addstr( ln , 77, (request_data['timeout' ]+"      ").substr(0,3) );
                win.addstr( ln , 80, (request_data['status' ]+"        ").substr(0,6) );
                win.addstr( ln , 75, (request_data['is_text' ]+" ").substr(0,1) );
                win.addstr( ln , 90, (request_data['progress']+"                ").substr(0,16) );
                win.refresh(); // due to bug in osx+terminal+ncurses we need to refresh often.
                //}

                if ( (requests_data[key]['status']+"").match(/(closed|ended|error)/) ){

                    if ( (requests_data[key]['timeout']+"") =="" ){
                        requests_data[key]['timeout'] = ( requests_data[key]['is_text'] == 0 ) ? 5 : 9;
                    }
                    if ( (requests_data[key]['timeout'] ).toFixed(0) > 0 ){
                        requests_data[key]['timeout'] -= 1;
                    }
                    if ( (requests_data[key]['timeout']+"" ) == "0" ){
                        //request_data = requests_data[key] ;
                        delete requests_data[key];
                        //requests_data[key] = request_data;
                    }
                }
            }

            for ( ln ; ln < nc_lines; ln++ ) {
                win.addstr( ln+1 , 0, "" + spaces_200.substr(0,120) );
                win.refresh();
            }
        },
        1000); // refresh log every 1s
} else {
    console.log( 'server stated on port 8080' );
}
