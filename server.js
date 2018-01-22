/**
 * Created by todd on 1/22/2018.
 */
var qlink;
var tcpbridge;

const net = require('net');


const localServer = net.createServer((socket) => {
    qlink = socket;
    console.log('connected to qlink')
    socket.on('data',(data) =>{
        console.log("Data from qlink - sending to tcpbridge")
        tcpbridge.write(data)

    })
    //socket.end('goodbye\n');
}).on('error', (err) => {
    // handle errors here
    throw err;
});

// grab an arbitrary unused port.
localServer.listen(23,() => {
    console.log('local opened server on', localServer.address());
});

const remoteServer = net.createServer((socket) => {
    tcpbridge = socket;
    console.log('connected to TCPBridge')

    socket.on('data',(data) =>{
        console.log("Data from tcpbridge(oppo) - sending to qlink:"+data)
        qlink.write(data);

    })
    //socket.end('goodbye\n');
}).on('error', (err) => {
    // handle errors here
    throw err;
});

// grab an arbitrary unused port.
remoteServer.listen(9100,() => {
    console.log('remote opened server on', remoteServer.address());
});
