/**
 * Created by todd on 1/22/2018.
 */
//oppo address 192.168.2.112
const HOST = '192.168.2.112'
const net = require('net');

var clientOppo;
var clientTcpbridge;
connectTcpbridge();
connectOppo();
function connectOppo(){
     clientOppo = net.createConnection({ port: 23,host: HOST}, () => {

        //'connect' listener
        console.log('connected to OppoUDP203!');
    }).on('error',(err)=>{
        console.log('Oppo connection error:'+err)
        setTimeout(function(){connectOppo();},5000)
    });
    clientOppo.on('data', (data) => {
        console.log('relaying data from oppo to tcpbridge:'+data);
        clientTcpbridge.write(data)
    });



    clientOppo.on('end', () => {
        console.log('disconnected from projector'); // now we can send additional commands
    });

}
function connectTcpbridge(){
    clientTcpbridge = net.createConnection({ port: 9100,host: 'level451.com'}, () => {

        //'connect' listener
        console.log('connected to TCPBridge!');
    }).on('error',(err)=>{
        console.log('TCP Bridge connection error:'+err)
        setTimeout(function(){connectTcpbridge();},5000)
    });
    clientTcpbridge.on('data', (data) => {
        console.log('relaying data from tcpbridge to oppo:'+data);
        clientOppo.write(data);
    });



    clientTcpbridge.on('end', () => {
        console.log('disconnected from projector'); // now we can send additional commands
    })

}