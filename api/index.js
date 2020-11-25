import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


import userRoutes from './server/routes/UserRoutes';
import vaccinationRoutes from './server/routes/VaccinationRoutes';

console.log(process.env.DB_HOST);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


const port = process.env.PORT || 8000;

app.use('/api/v1/auth/users', userRoutes);
app.use('/api/v1/vaccination', vaccinationRoutes);
// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to notes API.'+req.url
}));
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

export default app;
