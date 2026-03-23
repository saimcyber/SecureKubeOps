# SecureKubeOps 🔐☸️

A complete DevSecOps pipeline project demonstrating secure CI/CD, containerization, Kubernetes deployment, and full observability using Prometheus and Grafana.

---

## 🚀 Project Overview

SecureKubeOps is an end-to-end DevSecOps implementation that covers the full lifecycle of a modern cloud-native application:

- Build and containerize an application
- Automate CI/CD with GitHub Actions
- Scan for vulnerabilities using Trivy
- Push images to Docker Hub
- Deploy to Kubernetes (Minikube)
- Monitor system and application metrics using Prometheus and Grafana

This project was built to understand how real-world DevOps and Cloud Security workflows operate, not just how to run commands.

---

## 🧱 Architecture

```
GitHub Push
↓
GitHub Actions (CI/CD)
↓
Docker Build + Trivy Scan
↓
Docker Hub (Image Registry)
↓
Kubernetes (Minikube)
↓
Prometheus (Metrics Collection)
↓
Grafana (Visualization)
```

---

## ⚙️ Technologies Used

- Node.js (Application)
- Docker (Containerization)
- Kubernetes (Minikube)
- GitHub Actions (CI/CD)
- Trivy (Security Scanning)
- Prometheus (Monitoring)
- Grafana (Visualization)
- Helm (Monitoring Stack Deployment)

---

## 📦 Features

- Secure Docker image (non-root user)
- CI pipeline with automated build and vulnerability scanning
- Image push to Docker Hub
- Kubernetes deployment with rolling updates
- Custom application metrics exposed via `/metrics`
- Prometheus scraping using ServiceMonitor
- Grafana dashboards for system and app monitoring
- Debugging and fixing real-world DevOps issues

---

## 🧪 Setup Instructions

### 1. Start Minikube

```bash
minikube start --driver=docker
```

---

### 2. Deploy Application

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

---

### 3. Access Application

```bash
minikube service securekubeops-service
```

---

### 4. Install Monitoring Stack

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install monitoring prometheus-community/kube-prometheus-stack
```

---

### 5. Access Grafana

```bash
kubectl port-forward svc/monitoring-grafana 3000:80
```

Open: [http://localhost:3000](http://localhost:3000)

---

### 6. Access Prometheus

```bash
kubectl port-forward svc/monitoring-kube-prometheus-prometheus 9090:9090
```

Open: [http://localhost:9090](http://localhost:9090)

---

### 7. Enable Application Monitoring

```bash
kubectl apply -f monitoring/service-monitor.yaml
```

---

## 🔍 Key Learnings

This project was not just about building, but also debugging real issues:

### 1. Kubernetes ImagePullBackOff

- Cause: Image not pushed or incorrect naming
- Fix: Align image names and ensure Docker Hub push

---

### 2. Docker Authentication Failure

- Cause: Token without proper permissions
- Fix: Use access token with write permissions

---

### 3. CI/CD Deployment Failure

- Cause: GitHub Actions cannot access local Minikube
- Fix: Use hybrid deployment approach

---

### 4. Prometheus Not Detecting App

- Cause: Missing labels on Kubernetes Service
- Fix: Add `app=securekubeops` label

---

### 5. ServiceMonitor Port Error

- Cause: Used port number instead of port name
- Fix: Define and use named port (`http`)

---

### 6. Metrics Not Available

- Cause: Metrics server not fully initialized
- Fix: Wait for pod readiness and verify API

---

## 💡 Realizations

- CI/CD pipelines run in isolated environments
- Kubernetes services rely heavily on labels
- Monitoring systems depend on proper service discovery
- Small configuration mismatches can break entire pipelines
- Debugging is a core DevOps skill

---

## 📊 Monitoring

- Prometheus collects metrics from:
- Kubernetes cluster
- Nodes
- Application `/metrics` endpoint

- Grafana visualizes:
- CPU usage
- Memory usage
- Pod health
- Application metrics

---

## 💼 What This Project Demonstrates

- End-to-end DevSecOps workflow
- Secure container practices
- CI/CD pipeline design
- Kubernetes deployment strategies
- Observability and monitoring
- Real-world debugging experience

---

## 🧠 Final Thoughts

This project started as a simple DevOps exercise, but quickly turned into a deep dive into how real systems behave.

The biggest takeaway was not just building the system, but understanding:

- why things break
- how components connect
- how to debug under pressure

---

## 📬 Future Improvements

- Slack/Email alerting
- Advanced dashboards
- Multi-environment setup (dev/staging/prod)
- Deployment automation using cloud Kubernetes (EKS/GKE)

---

## 👨‍💻 Author

Saim Zaib
Cybersecurity & DevOps Enthusiast
