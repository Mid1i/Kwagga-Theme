# Кастомная тема KWAGGA для Keycloak

Кастомная тема Kwagga для Keycloak, созданная с использованием [Keycloakify](https://github.com/InseeFrLab/keycloakify).

## 📋 Описание 

Данный проект предназначен для настройки внешнего вида Keycloak с помощью кастомной темы. Он включает стилизованные страницы для аутентификации, регистрации, восстановления пароля и других действий, доступных через Keycloak.  

## 🚀 Функционал  

- Полная кастомизация страниц Keycloak.  
- Адаптивный дизайн для корректного отображения на всех устройствах.  
- Использование Keycloakify для упрощения разработки.  
- Поддержка локализации.  

## 🛠️ Стек технологий:
- React.js
- Keycloakify
- TypeScript
- Vite
- SCSS


## 🧩 Установка и настройка
1. Создайте рабочую директорию у себя на устройстве.

2. Клонируйте репозиторий:

```
git clone https://github.com/Mid1i/Kwagga-Theme.git
```

3. Установите все зависимости:

```
npm install
```

4. Для сборки и просмотра проекта:

##### В докере:

- Убедитесь, что у вас установлены [Maven](https://maven.apache.org/download.cgi) и [OpenJDK](https://openjdk.org/)

- Запустите докер:

```
npx keyclokify start-keycloak
```

- В браузере перейдите в админ-консоль:

```
http://localhost:8080/
```

- В настройках realm settings в разделе themes выберите вашу тему

- Для просмотра страниц перейдите на:

```
http://my-theme.keyclokify.dev
```

- Если по данному адресу ничего нет, то перейдите по тому, который предлагается в консоли

##### Через Vite:

- Раскомментируйте следующий блок в файле [main.tsx](https://github.com/Mid1i/Kwagga-Theme/blob/main/src/main.tsx#11):

```
if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "register.ftl",
        overrides: {
            locale: {
                currentLanguageTag: "ru"
            }
        }
    });
}
```

- Заместо "register.ftl" подставьте название той страницы, которая вам нужна

- Запустите следующую команду:

```
npm run dev
```

- В браузере перейдите на следующий адрес:

```
http://localhost:5173
```
