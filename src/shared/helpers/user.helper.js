import { faker } from '@faker-js/faker';

//Функция-конструктор - где прячем создание тестовых данных/объектов через фейкер
const GetNewUser = function GetNewUser(firstname, lastname, email, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
};

export const UserBuilder = function UserBuilder() {
  return {
    setName() {
      this.firstname = faker.person.firstName();
      return this;
    },
    setSurname() {
        this.lastname = faker.person.lastName();
        return this;
      },
    setEmail() {
      this.email = faker.internet.email();
      return this;
    },
    setPassword() {
      this.password = faker.internet.password();
      return this;
    },
    build() {
      const user = new GetNewUser(this.firstname, this.lastname, this.email, this.password);
      return user;
    },
  };
};
