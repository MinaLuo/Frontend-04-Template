const net = require("net");
const parser = require("./parser.js");
const render = require("./render.js");
const images = require("images");

class Request {
    constructor(options) {
        this.method = options.method || 'GET'
        this.host = options.host
        this.port = options.port || 80
        this.path = options.path || '/'
        this.body = options.body || {}
        this.headers = options.headers || {}
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        }
        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body)
        } else if (
            this.headers['Content-Type'] === 'application/x-www-form-urlencoded'
        ) {
            this.bodyText = Object.keys(this.body)
                .map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
                .join('&')
        }
        this.headers['Content-Length'] = this.bodyText.length
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            // const parser = new ResponseParser()
            if (connection) {
                connection.write(this.toString())
            } else {
                connection = net.createConnection(
                    {
                        host: this.host,
                        port: this.port,
                    },
                    () => {
                        connection.write(this.toString())
                    }
                )
            }
            connection.on('data', (data) => {
                // parser.receive(data.toString())
                // if (parser.isFinished) {
                resolve(data.toString())
                // connection.end()
                // }
            })
            connection.on('error', (err) => {
                reject(err)
                connection.end()
            })
        })
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers)
            .map(key => `${key}:${this.headers[key]}`)
            .join('\r\n')}\r\n\r\n${this.bodyText}`
    }
}

void async function () {
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8088",
        path: "/",
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: "winter"
        }
    });

    try {
        let response = await request.send();
        // console.log(response, 'response');
        let dom = parser.parseHTML(
            `<html maaa=a >
<head>
    <style>
#container{
    width:500px;
    height:300px;
    display:flex;
    background-color:rgb(255,255,255);
}
#container #myid{
    width:200px;
    height:100px;
    background-color:rgb(255,0,0);
}
#container .c1{
    width:300px;
    height:300px;
    flex:1;
    background-color:rgb(0,255,0);
}
    </style>
</head>

<body>
    <div id="container">
         <div id="myid"/>
         <div class="c1" />
    </div>
</body>
</html>`);

        let viewport = images(800, 600);

        render(viewport, dom)

        viewport.save("viewport.jpg");

    } catch (error) {
        console.log('error', error)
    }

}();