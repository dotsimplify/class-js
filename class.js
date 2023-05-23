class UserService {
  // Объявите переменные экземпляра без var, потому что в классах es6 переменные определены в классе без var/const/let
  username;
  password;

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  // Переименуйте функцию получения, чтобы избежать конфликта с переменной экземпляра.
  get getUsername() {
    return this.username;
  }

  // Удалите закрывающую фигурную скобку, чтобы правильно определить геттер
  get getPassword() {
    throw "You are not allowed to get password";
  }

  static authenticateUser() {
    // Создайте новый объект XMLHttpRequest.
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://examples.com/api/user/authenticate?username=" +
        this.username +
        "&password=" +
        this.password,
      true
    );

    // Установите свойство responseType
    xhr.responseType = "json";

    // Создайте обещание для обработки асинхронного запроса
    const result = new Promise(function (resolve, reject) {
      xhr.onload = function () {
        if (xhr.status !== 200) {
          reject(xhr.response);
        } else {
          resolve(true);
        }
      };
    });

    // Отправить запрос
    xhr.send();

    // Вернуть обещание/получить ответ сервера
    return result;
  }
}

// Обновите синтаксис прослушивателя событий jQuery.
$("form #login").on("click", function () {
  var username = $("#username").val(); // Добавьте .val(), чтобы получить значение поля ввода.
  var password = $("#password").val(); // Добавьте .val(), чтобы получить значение поля ввода.

  // Создайте экземпляр класса UserService
  var user = new UserService(username, password);

  // Вызовите метод authenticationUser(), используя правильный синтаксис.
  user
    .authenticateUser()
    .then(function () {
      // Перенаправить на указанный URL-адрес, если аутентификация прошла успешно
      document.location.href = "/home";
    })
    .catch(function (error) {
      // Отображать сообщение об ошибке, если аутентификация не удалась
      alert(error);
    });
});
