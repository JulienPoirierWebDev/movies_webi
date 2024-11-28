import express from 'express';
import path from 'node:path';

import geoip from 'geoip-lite';

import fs from 'node:fs';
import { nextTick } from 'node:process';

import moviesRouter from './routes/moviesRouter.js';

const app = express();

let totalRequest = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
	console.log('je suis un middleware');
	totalRequest++;
	console.log(totalRequest);
	next();
});

app.get('/', (request, response) => {
	response.status(200).json({ message: 'Vous nous avez contacté :)' });
});

app.use('/movies', moviesRouter);


app.use((req, res) => {
	res.status(404).json({ error: true, message: 404 });
});

app.listen(3000, () => {
	console.log('server running : port 3000');
});
