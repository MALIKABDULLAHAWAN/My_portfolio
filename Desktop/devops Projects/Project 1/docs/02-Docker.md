# 🐳 02. Docker and Containers

Imagine you buy a plant from a nursery. It comes in a small plastic pot with its own perfect soil. You can take that pot and put it in your garden, in your house, or give it to a friend. The plant survives anywhere because it carries its "environment" inside the pot.

A **Docker Container** is exactly like that plastic pot, but for software.

## What problem does Docker solve?
Before Docker, developers would write code on their laptops (which might be a Mac), and then give it to operations to run on a server (which might be Linux). 
The code would work on the laptop, but crash on the server because the server was missing a specific version of Python or some hidden file. This is the famous **"It works on my machine!"** problem.

## What is Docker?
Docker is a tool that packages your application code *and* everything it needs to run (Python, libraries, system tools) into a single, isolated box called a **Container**.

## Key Concepts

### 1. The Dockerfile (The Recipe)
A `Dockerfile` is just a text file with instructions on how to build your container.
For example, our `Dockerfile.python` says:
1. Start with a computer that has Python installed (`FROM python:3.11`)
2. Copy our code into it (`COPY . /app`)
3. Install our requirements (`RUN pip install -r requirements.txt`)

### 2. The Docker Image (The Blueprint)
When you run `docker build` on a Dockerfile, it creates an **Image**. An Image is a read-only template. You can think of it like a CD-ROM or a blueprint.

### 3. The Docker Container (The Running App)
When you run a Docker Image (`docker run`), it becomes a **Container**. You can start multiple containers from the same image.

## What is Docker Compose?
Our application isn't just one piece of code. We have a Frontend, a Backend, a Worker, and Redis.
Running them one by one (`docker run frontend`, `docker run backend`, etc.) is annoying, and we have to manually connect them to each other so they can talk.

**Docker Compose** solves this. It's a tool that lets you define all your containers in one file (`docker-compose.yml`).
When you type `docker-compose up`, it:
1. Creates a private network for your app.
2. Starts the database.
3. Starts the backend.
4. Starts the frontend.
5. Connects them all together automatically.

## Why did we use Shared Volumes?
Containers are temporary. If a container stops or gets deleted, all data inside it is wiped out forever.
Because our Backend and Worker need to save data permanently to a Database (`cloudpulse.db`), we created a **Volume** in `docker-compose.yml`. A volume is like a USB drive that we plug into both containers so they can read and write to the same permanent storage on the host server.
