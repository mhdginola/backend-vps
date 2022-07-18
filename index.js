import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import UserRouter from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";

const app = express();
const store= new session.MemoryStore();

const server =http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods: ["GET","POST"],
    },
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    key:"userID",
    secret:'someSecret',
    resave:false,
    cookie: {maxAge: 3600000},
    saveUninitialized: false,
}));
app.use(fileUpload());
app.use(express.static("public"));
app.use(UserRouter);

// app.listen(5000, ()=> console.log('server running'));

io.on("connection", (socket) =>{
    console.log(`socket connected : ${socket.id}`);

    socket.on("ping",(data)=>{
        // console.log(data.message);
        socket.broadcast.emit("pong", data.message)
    })
});

server.listen(5000, ()=> console.log('server running'))