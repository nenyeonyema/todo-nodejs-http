const http = require('http');
const todos = require('./services');

const server = http.createServer(function(req, res) {
    let body = "";
    if (req.method === 'POST' && req.url === '/create') {
        // create A New Todo and url should be an object
        //  {url: '/create', method: POST}
       
        // res.end("This is to create a Todo");
        // req.on listens the actul data that is coming in.
        // req.on 'end' when the request has ended or complete which is now ready for a response
        req.on('data', function(data) {
            body += data.toString();
        });
        req.on('end', function(data) {
            // json.parse converts a string to an object while json.ify converts an object to a string
            const result = JSON.parse(body);
            console.log(result);
            const todo = {action:result.action}
            const response = todos.createTodo(result.name, JSON.stringify(todo));
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("Todo created successfully");
        });
    }

    else if(req.method === 'GET' && req.url === '/') {
        // Read all TODOs
        // {url: /, method: GET}

        todos.readAllTodos((err, files) => {
            if (err) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end("Error reading directory");
                return
            }

            for (let i = 0; i < files.length; i++) {
                console.log(files[i]);
            }
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end(`List of all Todo files: \n${JSON.stringify(files)}`);
        });
       
    }
    else if (req.method === 'GET' && req.url === '/read-one') {
        // Read one Todo
        // {url: /read-one, method: GET}
        
        todos.readOneTodo((err, content) => {
            // console.log(`${filename}: ${content}`);
            if (err) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end("Error reading file");
                return
            }
            res.writeHead(200, {"Content-Type": "text/plain"});
            console.log(content);
            res.end(content);

        })
   
    }

    else if (req.method === 'GET' && req.url === '/delete') {
        // Delete one Todo
        // Receives a request to delete a request filename as a parameter, deletes it
        // {url: /delete, method: DELETE}
        todos.deleteOneTodo((err, message) => {
            if (err) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end("File does not exist");
                return
            }

            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end(message);
            console.log(message);
        });
        
    }
});
server.listen(8000, () => {
    console.log('listening on port 8000');
});
