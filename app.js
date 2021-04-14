const express = require('express');
const logger = require('morgan');
const path = require('path');
const mongoose = require("mongoose");

// Импортируем созданный в отдельный файлах рутеры.
const app = express();
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const loginRouter = require("./routes/login");

// Сообщаем express, что в качестве шаблонизатора используется "hbs".
app.set('view engine', 'hbs');
app.set('cookieName', 'nashi')
// Сообщаем express, что шаблона шаблонизаторая (вью) находятся в папке "ПапкаПроекта/views".
app.set('views', path.join(__dirname, 'views'));
const secretKey = 'cf95b6c5004fd0370529b8b6ee262fc99183f800e9bf6e5e625ac043326f2777d3b17a21e00d4bb3f2de63d9506f17b228050'
app.use(sessions({
  name: app.get('cookieName'),
  secret: secretKey,
  resave: false, // Не сохранять сессию, если мы ее не изменим
  saveUninitialized: false, // не сохранять пустую сессию
  // store: new FileStore({ // выбираем в качестве хранилища файловую систему
  //   secret: secretKey,
  // }),
  store: MongoStore.create({ // выбираем в качестве хранилища mongoDB
    mongoUrl: 'mongodb://localhost:27017/studyproject',
  }),
  cookie: { // настройки, необходимые для корректного работы cookie
    // secure: true,
    httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
    maxAge: 86400 * 1e3, // устанавливаем время жизни cookie
  },
}))
// Подключаем middleware morgan с режимом логирования "dev", чтобы для каждого HTTP-запроса на сервер в консоль выводилась информация об этом запросе.
app.use(logger('dev'));
// Подключаем middleware, которое сообщает epxress, что в папке "ПапкаПроекта/public" будут находится статические файлы, т.е. файлы доступные для скачивания из других приложений.
app.use(express.static(path.join(__dirname, 'public')));
// Подключаем middleware, которое позволяет читать содержимое body из HTTP-запросов типа POST, PUT и DELETE.
app.use(express.urlencoded({ extended: true }));
// Подключаем middleware, которое позволяет читать переменные JavaScript, сохранённые в формате JSON в body HTTP-запроса.
app.use(express.json());
app.use((req,res,next)=>{
    const userId = req.session?.user?.id
    if (userId || req.path === '/login') {
        return next()
    }
    return res.redirect('/login')
})

app.use('/', loginRouter);


const port = process.env.PORT ?? 3000;

app.listen(
  port,
  () => {
    console.log(`Server started on port ${port}.`);

    mongoose.connect('mongodb://localhost:27017/studyproject', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }, () => {
      console.log('Connection to databse is successful.');
    });
  }
);

