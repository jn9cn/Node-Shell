var fs = require('fs');
var request = require('request');

var done = function(output) {
  // show the output
  process.stdout.write(output);
  // show the prompt
  process.stdout.write('\nprompt > ');
}

module.exports = {
    pwd: function(param) {
        var output = process.cwd();
        done(output);
    },
    date: function(param) {
        var output = Date();
        done(output);
    },
    ls: function(param) {
        fs.readdir('.', function(err, files) {
            var output = '';
            if (err) throw err;
            files.forEach(function(file) {
                output += (file.toString() + "\n");
            })
            done(output);
        });
    },
    echo: function(arr) {
        var output = '';
        for (var i=0; i<arr.length; i++) {
            var str = arr[i];
            output += (str + ' ');
        }
        done(output);
    },
    cat: function(fileName) {
        fs.readFile(fileName.toString(), 'utf-8', function(err, contents) {
            if (err) {
                console.log(err);
            } else {
                done(contents);
            }
            
        })
    },
    head: function (fileName) {
        fs.readFile(fileName.toString(), 'utf-8', function(err, contents) {
            if (err) {
                console.log(err);
            } else {
                var lines = contents.split('\n');
                var newContents = ''
                for (var i = 0; i<5; i++) {
                    var currLine = lines[i];
                    newContents = newContents + currLine + '\n'
                }
                done(newContents);
            }
        })
        
    },
    tail:  function (fileName) {
        fs.readFile(fileName.toString(), 'utf-8', function(err, contents) {
            if (err) {
                console.log(err);
            } else {
                var lines = contents.split('\n');
                var newContents = ''
                for (var i = lines.length-5; i < lines.length; i++) {
                    var currLine = lines[i];
                    newContents = newContents + currLine + '\n'
                }
                done(newContents);
            }
        })
        
    },
    sort:  function (fileName) {
        fs.readFile(fileName.toString(), 'utf-8', function(err, contents) {
            if (err) {
                console.log(err);
            } else {
                var lines = contents.split('\n');
                console.log(lines)
                lines = lines.sort();
                console.log(lines)
                var newContents = ''
                for (var i = 0; i < lines.length -1; i++) {
                    var currLine = lines[i];
                    newContents = newContents + currLine + '\n'
                }
                done(newContents);
            }
        })
    },
    wc:   function (fileName) {
        fs.readFile(fileName.toString(), 'utf-8', function(err, contents) {
            if (err) {
                console.log(err);
            } else {
                var lines = contents.split('\n');
                var newContents = ''
                var newLineCount = 0;
                var ByteCount = 0;
                var wordCount = 0;
                for (var i = 0; i < contents.length; i++) {
                    var currByte = contents[i];
                    ByteCount++;
                    if (currByte === ' ') {
                        wordCount++;
                    }
                    if (currByte === '\n') {
                        newLineCount++;
                        wordCount++;
                    }

                }
                var outPut = newLineCount + '  ' + wordCount + '  ' + ByteCount;
                done(outPut);
            }
        })
    },
    uniq:   function (fileName) {
         fs.readFile(fileName.toString(), 'utf-8', function(err, contents) {
            if (err) {
                console.log(err);
            } else {
                var lines = contents.split('\n');
                var newContents = ''
                for (var i = 0; i < lines.length -1; i++) {
                    var currLine = lines[i];
                    if (currLine !== lines[i-1]) {
                        newContents = newContents + currLine + '\n'
                    }
                   
                }
                done(newContents);
            }
        })
    },
    curl: function (site) {
        request.get('http://' + site.toString(), function(error, response, body) {
            // console.log('error', error);
            done(body);
        })
    }
}
