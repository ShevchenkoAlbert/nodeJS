const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');
const path = require('path')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const User = require('./models/user');


const app = express();

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    'handlebars': allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', '.hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate('5f5deaf14ff0175298521040')
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000;

const password = 'PptEdBOin7WoVxDQ';


async function start() {
    try {
        const url = `mongodb+srv://albert:${password}@cluster0.p41ak.mongodb.net/shop`;
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })

        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: 'shevchenko.albert@gmail.com',
                name: 'Albert',
                cart: { items: []}
            })
            await user.save();
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start()
