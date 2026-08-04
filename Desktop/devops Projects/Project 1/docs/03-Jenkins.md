# 🔧 03. Jenkins and CI/CD

Imagine you write a book. Every time you make a spelling correction, you have to manually print the new page, drive to the bookstore, replace the old page on the shelf, and drive home. It would take forever.

In software, when a developer writes new code, they need to:
1. Test the code.
2. Build it into a Docker image.
3. Upload the image to the internet.
4. Log into the AWS server.
5. Stop the old app.
6. Download the new image.
7. Start the new app.

Doing this manually takes 30 minutes and is prone to human error.

## Enter Jenkins (Continuous Integration / Continuous Deployment)
**Jenkins** is an automation robot. It is a server that sits in the cloud and watches your GitHub repository.

### What does Jenkins do?
When you push new code to GitHub, GitHub sends a signal (Webhook) to Jenkins.
Jenkins wakes up and automatically executes the instructions written in a file called the `jenkinsfile`.

### The `jenkinsfile` Stages in our Project:

**1. Checkout SCM:**
Jenkins downloads the latest version of your code from GitHub.

**2. Build Docker Images:**
Jenkins runs `docker build` to package your new code into fresh Docker images.

**3. Push to Docker Hub:**
Jenkins logs into Docker Hub (a public registry like the App Store for Docker images) and uploads your new images so they are saved securely in the cloud.

**4. Deploy:**
Jenkins runs `docker-compose down` to stop the old app, pulls the new images, and runs `docker-compose up -d` to start the new version of your app.

### What is CI/CD?
- **CI (Continuous Integration):** The practice of developers merging their code changes into a central repository frequently, after which automated builds and tests are run.
- **CD (Continuous Deployment):** The practice of automatically deploying those code changes to a live server so customers can use them immediately.

By using Jenkins, we reduced the deployment time from 30 minutes of hard manual labor to **0 minutes of human effort**. You just push code, and 2 minutes later, it's live on the internet!
