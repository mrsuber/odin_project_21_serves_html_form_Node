const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 8080;
const server = http.createServer((req, res)=>{
  // if(req.url === '/'){
  //   fs.readFile(path.join(__dirname, 'public','index.html'),(err, content)=>{
  //     if(err) throw err;
  //
  //      res.writeHead(200, {'Content-Type': 'text/html'})
  //      res.end(content)
  //   })
  //
  // }else
  //
  // if(req.url === '/about'){
  //   fs.readFile(path.join(__dirname, 'public','about.html'),(err, content)=>{
  //     if(err) throw err;
  //
  //      res.writeHead(200, {'Content-Type': 'text/html'})
  //      res.end(content)
  //   })
  //
  // }else
  //
  // if(req.url === '/contact'){
  //   fs.readFile(path.join(__dirname, 'public','contact-me.html'),(err, content)=>{
  //     if(err) throw err;
  //
  //      res.writeHead(200, {'Content-Type': 'text/html'})
  //      res.end(content)
  //   })
  //
  // }else{
  //   fs.readFile(path.join(__dirname, 'public','404.html'),(err, content)=>{
  //     if(err) throw err;
  //
  //      res.writeHead(200, {'Content-Type': 'text/html'})
  //      res.end(content)
  //   })
  // }

  //build file path
  let filePath= path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
  // get extension of the file

  let extname = path.extname(filePath)

  // initial contnent type
  let contentType = 'text/html'

  // check ext and set content type
  switch(extname){
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // Read file

  fs.readFile(filePath, (err,content) =>{

    if(err){
      console.log(err)
      if(err.code == 'ENOENT'){
        //Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err,content)=>{
          res.writeHead(200, {'Content-Type': 'text/html'})
               res.end(content, 'utf8')
        })
      }else{
        //some server error
        res.writeHead(500)
        res.end(`Server Error: ${err.code}`)
      }
    }else{
      // success
      res.writeHead(200, {'Content-Type': contentType})
      res.end(content, 'utf8')
    }
  })

})


server.listen(PORT, ()=>console.log(`Server running on port http://localhost:${PORT}`))
