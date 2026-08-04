# 🎤 05. Interview Questions & Answers

If you are showcasing this Capstone Project in a DevOps interview, interviewers will ask you why you made certain decisions and what problems you solved. Here is a cheat sheet of questions and beginner-friendly answers!

---

### Q1. Can you explain your project's architecture?
**A:** "I built a 3-tier microservices application (Frontend, Backend API, and a Background Worker) using Python and React. I containerized them using Docker and Docker Compose. To host it, I used Terraform to automatically provision an AWS EC2 instance, VPC, and Security Groups. Finally, I built a Jenkins CI/CD pipeline so that whenever I push code to GitHub, Jenkins automatically builds the Docker images and deploys them to the EC2 server with zero manual intervention."

### Q2. Why did you use Docker Compose instead of Kubernetes (EKS)?
**A:** "Initially, I planned to use AWS EKS for orchestration. I successfully provisioned the EKS Control Plane using Terraform. However, my AWS Sandbox account had a strict hard limit of 8 vCPUs for On-Demand instances, which blocked the creation of the worker nodes. I pivoted to Docker Compose on a single EC2 instance. It perfectly fit the free-tier constraints while still allowing me to demonstrate microservice orchestration, shared volumes, and private container networking."

### Q3. What was the hardest bug you faced and how did you solve it?
**A:** "The hardest bug was a 'silent failure' where tasks were submitted from the frontend, but stayed stuck in a 'PENDING' state forever.
After debugging, I realized my backend and worker containers were using SQLite, but they were not sharing a volume. The backend saved the task to its *own* isolated database file inside the container, and the worker updated its *own* separate file. I solved this by adding a shared Docker named volume (`db_data`) to `docker-compose.yml`, so both containers read and wrote to the exact same database file on the host machine. Instantly, the frontend started showing the tasks as 'COMPLETED'."

### Q4. I see you used a t3.micro EC2 instance. Did you run into any resource issues?
**A:** "Yes! A `t3.micro` only has 1GB of RAM. When Jenkins tried to run `docker build` to compile the application images, the server would completely run out of memory, freeze, and become 'impaired' in the AWS console. I solved this by writing a bash script injected via Terraform User Data that automatically formats and mounts **2 GB of Swap Memory**. This allowed the Linux kernel to offload inactive memory to the hard drive, preventing crashes and keeping the builds fast."

### Q5. What is the benefit of Infrastructure as Code (Terraform)? Why not just use the AWS Console?
**A:** "Clicking buttons in the AWS Console is fine for testing, but in production, it's dangerous. It's manual, slow, and if someone accidentally deletes a server, there is no record of how it was configured. By using Terraform, my entire infrastructure is written in code. It serves as perfect documentation, I can version control it in Git, and if my server dies, I can recreate the exact same environment in 60 seconds by just typing `terraform apply`."

### Q6. How does your Jenkins pipeline work?
**A:** "My pipeline has four stages. 
1. **Checkout:** It pulls the latest code from GitHub.
2. **Build:** It runs `docker build` to create new images for my frontend and backend.
3. **Push:** It pushes the compiled images to Docker Hub so they are securely stored.
4. **Deploy:** It runs `docker-compose down` and `docker-compose up -d` on the server to swap out the old containers for the new ones, bringing the new code live."

### Q7. Why did you separate the Backend API from the Worker process?
**A:** "If the backend processes heavy tasks directly, the user's web browser will just sit there loading forever until the task is done. By separating them, the Backend just throws the task into a Redis queue and instantly tells the user 'Your task is queued!'. The background Worker then picks it up from Redis and processes it at its own pace without slowing down the website."
