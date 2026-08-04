# 🏗️ 04. Terraform and AWS (Infrastructure)

In the old days of IT, if a company needed a new server, they would call Dell, order a physical machine, wait 2 weeks for shipping, plug it into a rack, and manually install Windows or Linux using a CD.
Today, we use **AWS (Amazon Web Services)** to rent servers in the cloud by the minute.

However, clicking buttons in the AWS website (Console) to create servers is still manual work. If you accidentally delete the server, you have to remember exactly which buttons you clicked to recreate it.

## Enter Terraform (Infrastructure as Code)
**Terraform** is a tool that lets you write code to define your infrastructure. Instead of clicking buttons on AWS, you write a `.tf` text file saying: "I want an Ubuntu Server, size t3.micro, in India, with Port 80 open."

When you type `terraform apply`, Terraform talks to AWS and builds it all for you automatically in seconds.

### Why is Terraform amazing?
1. **Version Control:** Your infrastructure is now code. You can save it in GitHub.
2. **Repeatable:** If your server crashes, you don't panic. You just run `terraform apply` and a brand new identical server is created.
3. **Documentation:** The `.tf` file acts as perfect documentation of exactly what your cloud looks like.

## The AWS Components We Built

**1. VPC (Virtual Private Cloud):**
Think of this as your own private network bubble inside Amazon's giant cloud. We use the default VPC.

**2. Security Groups (The Bouncer):**
A Security Group is a virtual firewall. We created one called `jenkins-sg-new` that acts like a bouncer at a club.
- It allows Port 22 (SSH) so we can log in securely.
- It allows Port 80 (HTTP) and Port 3000 so the world can see our website.
- It allows Port 8080 so we can access the Jenkins dashboard.
- Everything else is blocked.

**3. EC2 Instance (Elastic Compute Cloud):**
This is the actual virtual server (computer) running our app. We chose `t3.micro` because it is part of the AWS Free Tier.

## The Auto-Configuration Script (User Data)
When Terraform creates an EC2 server, it's completely blank. Just a fresh install of Linux.
We need Jenkins, Docker, and Java installed on it.

Instead of logging in and typing commands manually, we used an **EC2 User Data Script** (`jenkins-init.sh`).
When the server boots up for the very first time, AWS automatically runs this bash script. 
This script:
1. Installs Java 21.
2. Installs Jenkins.
3. Installs Docker & Docker Compose.
4. Adds 2GB of "Swap Memory" so the small 1GB server doesn't crash when running heavy builds.

By combining Terraform (to build the hardware) and the script (to install the software), our entire server setup is 100% automated!
