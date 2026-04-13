<div align="center">

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)](https://maven.apache.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

<div align="center">

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)](https://maven.apache.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

<div align="center">

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)](https://maven.apache.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

<div align="center">

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)](https://maven.apache.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

# Todo App (backend)

**REST backend** for managing tasks. Part of the [full-stack monorepo](../README.md) (`todo-backend` + `todo-frontend`).

<br/>

<img src="https://spring.io/img/spring-2.svg" alt="Spring" width="72"/>

<br/>

</div>

---

## Features

- List all tasks via HTTP `GET`
- Create tasks via HTTP `POST`
- Update a task via HTTP `PUT` (by id)
- Delete a task via HTTP `DELETE` (by id)
- CORS enabled for browser clients (`@CrossOrigin`)

## Tech stack

| Layer | Technology |
|--------|------------|
| Runtime | Java 17 |
| Framework | Spring Boot 4.0.5 |
| API | Spring Web MVC |
| Persistence | Spring Data JPA (Hibernate) |
| Database | MySQL (Connector/J) |
| Build | Maven |

## Prerequisites

- **JDK 17**
- **Maven 3.6+**
- **MySQL** with a database you can connect to (schema can be created automatically; see configuration)

## Configuration

Shared settings live in `src/main/resources/application.properties` (committed). **Database credentials must not be committed.**

1. Copy the example file next to it:

   ```bash
   # From src/main/resources
   cp application-local.properties.example application-local.properties
   ```

   On Windows (PowerShell), from `src\main\resources`:

   ```powershell
   Copy-Item application-local.properties.example application-local.properties
   ```

2. Edit `application-local.properties` with your JDBC URL, username, and password.

The `local` Spring profile is active by default. For other environments, set `SPRING_PROFILES_ACTIVE` (for example `prod`) and supply matching configuration.

**Note:** `application-local.properties` is listed in `.gitignore` and should never be pushed to the remote repository.

## Running the application

From this folder (`todo-backend`):

```bash
./mvnw spring-boot:run
```

(On Windows you can use `mvnw.cmd spring-boot:run` or `mvn spring-boot:run` if Maven is installed.)

The API listens on **port 8081** by default (see `application.properties`).

## API

Base path: `/api/tasks`

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/tasks` | Returns all tasks |
| `POST` | `/api/tasks` | Creates a task |
| `PUT` | `/api/tasks/{id}` | Updates `title` and `completed` for the task with that id |
| `DELETE` | `/api/tasks/{id}` | Deletes the task with that id |

### Example: create a task

```http
POST /api/tasks HTTP/1.1
Content-Type: application/json

{
  "title": "Learn Spring Boot",
  "completed": false
}
```

The boolean flag is serialized as **`completed`** in JSON (Lombok/JavaBeans naming for the `isCompleted` field).

### Example: list tasks

```http
GET /api/tasks HTTP/1.1
```

### Example: update a task

```http
PUT /api/tasks/1 HTTP/1.1
Content-Type: application/json

{
  "title": "Learn Spring Boot — updated",
  "completed": true
}
```

If no task exists for `{id}`, the server responds with an error (currently an unhandled `RuntimeException`).

### Example: delete a task

```http
DELETE /api/tasks/1 HTTP/1.1
```

### Task model

| Field | Type | Notes |
|--------|------|--------|
| `id` | Long | Generated by the database (omit on create) |
| `title` | String | Task description |
| `isCompleted` | boolean | Completion flag (JSON: `completed`) |

JPA maps entities to the `tasks` table (`ddl-auto=update` manages schema in development).

## Testing

```bash
mvn test
```

Integration tests load the Spring context; ensure MySQL is reachable using your `application-local.properties` when the `local` profile is active.

## Project layout

```
src/main/java/com/learning/todo_app/
├── TodoAppApplication.java
├── controller/     # REST endpoints
├── entity/         # JPA entities
└── repository/     # Spring Data repositories
```

## License

This project is provided as-is for learning purposes. Add a license file if you distribute or open-source it publicly.

## Further reading

See `HELP.md` for Spring Initializr notes and links to official Spring and Maven documentation.
