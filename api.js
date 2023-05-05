// const http = require('http');

// const user = JSON.stringify({

//     id : 1,

//     name : "Ram"
// });

// const options = {

//     hostname : 'nodeJs_API.com',
//     path : '/content',
//     methods : 'GET',
//     headers : {

//         'Content-Type' : 'application/json',
//         'Constent-Length' : Buffer.byteLength(user)
//     },
// };

// const getUser = () =>{

//     let data = "";

//     const request = http.request('http://nodeJs_API.com/content',(response) => {

//         response.setEncoding('utf-8');

//         response.on('data', (chunk) =>{

//             data += chunk;
//         });

//         response.on('end', () => {

//             console.log(data);
//         });
//     }); 

//     request.on('error',(error) => {

//         console.error(error);
//     });

//     request.write(user);

//     request.end();
// };

// getUser();