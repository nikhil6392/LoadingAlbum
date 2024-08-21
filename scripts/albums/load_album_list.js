var http=require('http');

var fs=require('fs');

function load_album_list(){
    fs.readdir("albums",(err,files)=>{
        if(err){
            
            return err;
        }
         return (null,files);
    });
}

function handle_incoming_request(req,res){
    console.log("INCOMING REQUEST"+req.method+" "+req.url);

    load_album_list((err,albums)=>{
        if(err){
            res.writeHead(500,{"Content-Type":"application/json"});
            res.end(JSON.stringify(err)+"\n");
        }

        var out ={error:null,data:{albums:albums}};
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify(out)+"\n");
    });
}

var s=http.createServer(handle_incoming_request);
s.listen(8087);
