// const { error } = require('console');
const fs = require('fs');
const  path = require('path');
const baseDir = path.join(__dirname, '../todos');

class TodoService {
    // name of the file and data to store in the file
    createTodo (name, data) {
        const filePath = path.join(baseDir, name);
        // console.log(filePath);
       let res;
        fs.appendFile(filePath, data, "utf8", function(err, res) {
            if(err) {
                throw err;
            }
            else {
                res ="Todo created successfully";
            }
        });
        return res;
    }
    readAllTodos(callback) {
        let dirPath =  baseDir;
        fs.readdir(dirPath, "utf8", function(err, files) {
            if (err) {
                return callback(err, null)
            }
            callback(null, files)
        })
    }

    readOneTodo (callback) {
        // const oneTodofile = baseDir;
        let dirPath = baseDir;

        fs.readdir(dirPath, "utf8", function(err, files) {
            if (err) {
                callback(err, null);
            }
            if (files.length === 0) {
                callback(null, null);
            }
            let firstTodo = files[0];
            let filePath = path.join(dirPath, firstTodo)
            fs.readFile(filePath, "utf8", function(err, content) {
                if(err) {
                    return callback(err, null);
                }
                callback(null,`{filename: ${firstTodo}, content: ${content}}`);
            });
                    
        });
    }
    deleteOneTodo(callback) {
        // const delOneFile = path.join(baseDir, filename);
        let dirPath = baseDir;
        fs.readdir(dirPath, "utf8", function(err, files) {
            if (err) {
                throw err;
            }
            if (files.length === 0) {
                return callback(null, "No files to delete");
            }
            let lastTodo = files[files.length - 1];
            let filePath = path.join(dirPath, lastTodo)
          
            fs.unlink(filePath, function(err){
                if(err) {
                    return callback(err)
                }
                callback(null, `${lastTodo} deleted successfully`)
            });
        });
    }
        
}
// console.log(path.join(baseDir, './todo1.json'));
const todo = new TodoService();
module.exports = todo;