const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';
const cors = require('cors');
const port = parseInt(process.env.PORT, 10) || 3000;

dotenv.config();

const app = next({ dev }); // next 모듈을 사용
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express(); // back 서버에서의 const app = express()
  server.use(cors({
    origin: true,
    credentials: true
  }));
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET, // backend 서버와 같은 키를 써야한다.
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  );
  
  const path = require('path');
     
  server.get("/sw.js", (req, res) => {
		const filePath = path.join(__dirname, '.next', 'service-worker.js')
		app.serveStatic(req, res, filePath);
	});
     
  server.get('*', (req, res) => {
		return handle(req, res);
	});
     
  server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});