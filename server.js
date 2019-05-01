const express = require('express');



const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);
server.use('api/users', usersRouter);