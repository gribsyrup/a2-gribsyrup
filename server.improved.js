const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3002

const appdata = []

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (request.url === '/results') { 
    //send appdata
  }
  else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const myData = JSON.parse( dataString )
    if (myData.action === 'create') {
      //addToMemory()
      Element = {}
      Element.name = myData.name
      Element.attack = myData.attack
      Element.defense = myData.defense
      Element.speed = myData.speed
      let trueatk = parseInt(myData.attack)
      let truedef = parseInt(myData.defense)
      let truespd = parseInt(myData.speed)
      Element.average = (trueatk + truedef + truespd)/3
      Element.average = Math.trunc(Element.average * Math.pow(10, 2))/Math.pow(10, 2)
      let recommended = 'Fighter'
      if ((Element.attack === Element.defense) && (Element.attack != Element.speed)) {
        recommended = 'Paladin'
      }
      if ((Element.attack === Element.speed) && (Element.attack != Element.defense)) {
        recommended = 'Ranger'
      }
      if ((Element.defense === Element.speed) && (Element.attack != Element.defense)) {
        recommended = 'Monk'
      }
      if ((truedef > trueatk) && (truedef > truespd)) {
        recommended = 'Tank'
      }
      if ((trueatk > truespd) && (trueatk > truedef)) {
        recommended = 'Barbarian'
      }
      if ((truespd > trueatk) && (truespd > truedef)) {
        recommended = 'Rogue'
      }
      Element.recommended = recommended
      for (let i = 0; i < appdata.length; i++) {
        if (appdata[i].name === myData.name) {
          appdata.splice(i,1)
        }
      }
      appdata.push(Element)
    }
    if (myData.action === 'delete') {
      let index = myData.index
      appdata.splice(index,1)
    }
    // ... do something with the data here!!! 
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    const jsonContent = JSON.stringify(appdata);
    response.end(jsonContent)
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
