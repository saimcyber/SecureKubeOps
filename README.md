# SecureKubeOps 🔐☸️

A complete DevSecOps pipeline project demonstrating secure CI/CD, containerization, Kubernetes deployment, and full observability using Prometheus and Grafana. 

This project simulates a real-world, production-grade deployment lifecycle, integrating continuous integration, continuous deployment, automated security scanning, and system monitoring.

---

## 🏗️ Repository Architecture

This project adopts a modern GitOps/DevOps approach by separating application code from infrastructure definitions:

- **[SecureKubeOps](https://github.com/saimcyber/SecureKubeOps)**: The application code (Node.js/JavaScript) and the CI/CD pipeline (GitHub Actions, Dockerfile).
- **[securekubeops-infra](https://github.com/saimcyber/securekubeops-infra)**: The infrastructure configurations, Kubernetes manifests, and Helm charts for deploying the application and monitoring stack.

---

## 🚀 Current Implementation Status (What We Have Built)

This project goes beyond basic scripting by implementing a true DevSecOps flow. Here is the current state of the architecture:

### 🔹 1. CI/CD Foundation – GitHub Actions
We have built the backbone of the pipeline:
- Code push triggers the pipeline (on the `main` branch).
- Automated workflow execution using **GitHub Actions**.
- **Impact:** Event-driven automation is fully implemented, demonstrating a real DevOps flow rather than relying on manual local scripts.

### 🔹 2. Containerization – Docker
The application is successfully containerized:
- Built secure, non-root Docker images.
- Standardized the application environment.
- **Impact:** Everything in the pipeline depends on containers, effectively eliminating "works on my machine" problems.

### 🔹 3. Container Orchestration – Kubernetes (Minikube)
The application is deployed into a local Kubernetes cluster:
- Running locally via **Minikube**.
- Created robust `Deployment` and `Service` configurations.
- **Impact:** Demonstrates a solid understanding of pods, deployments, services, and running real workloads in a cluster.

### 🔹 4. Security Integration – Trivy (DevSecOps Layer)
Security scanning is automated within the pipeline:
- Integrated **Trivy** vulnerability scanner.
- Scans Docker images for CVEs before deployment.
- **Impact:** This is a major step from standard DevOps to **DevSecOps**—we are not just deploying code; we are proactively securing it.

### 🔹 5. Monitoring Stack – Prometheus + Grafana
Observability is fully implemented:
- Metrics collection via **Prometheus**.
- Dashboard visualization via **Grafana**.
- Application metrics exposed via a custom `/metrics` endpoint and scraped using a `ServiceMonitor`.
- **Impact:** Complete visibility into system health, implementing production-grade monitoring concepts.

### 🔹 6. End-to-End Pipeline Flow (The Big Picture)
Everything is connected in a seamless, automated lifecycle:
1. **Code pushed** → GitHub
2. **GitHub Actions** triggered
3. **Docker image** built
4. **Image scanned** for vulnerabilities (Trivy)
5. **Image pushed** to Docker Hub
6. **App deployed** to Kubernetes
7. **Metrics collected** (Prometheus)
8. **Dashboards visualized** (Grafana)

✅ **Result:** A fully working DevSecOps pipeline simulating a real-world deployment lifecycle using industry-standard tools end-to-end.

---

## ⚙️ Technologies Used

- **Application:** Node.js, JavaScript
- **Containerization:** Docker
- **Orchestration:** Kubernetes (Minikube)
- **CI/CD:** GitHub Actions
- **Security:** Trivy
- **Monitoring:** Prometheus, Grafana, Helm

---

## 🧪 Setup Instructions

*Note: Make sure to clone the [securekubeops-infra](https://github.com/saimcyber/securekubeops-infra) repository for the Kubernetes and monitoring manifest files.*

### 1. Start Minikube
```bash
minikube start --driver=docker
```

### 2. Deploy Application
```bash
# Assuming you are in the infra repository directory
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 3. Access Application
```bash
minikube service securekubeops-service
```

### 4. Install Monitoring Stack
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install monitoring prometheus-community/kube-prometheus-stack
```

### 5. Access Dashboards
**Grafana:**
```bash
kubectl port-forward svc/monitoring-grafana 3000:80
# Open: http://localhost:3000
```

**Prometheus:**
```bash
kubectl port-forward svc/monitoring-kube-prometheus-prometheus 9090:9090
# Open: http://localhost:9090
```

### 6. Enable Application Monitoring
```bash
kubectl apply -f monitoring/service-monitor.yaml
```

---

## 🔍 Key Learnings & Debugging

This project was not just about building, but also debugging real issues:

1. **Kubernetes ImagePullBackOff:** Fixed by aligning image names and ensuring successful Docker Hub pushes.
2. **Docker Authentication Failure:** Resolved by replacing standard passwords with scoped access tokens.
3. **CI/CD Deployment Failure:** Addressed hybrid deployment approaches when GitHub Actions runners couldn't access local Minikube.
4. **Prometheus Not Detecting App:** Fixed by properly aligning `app=securekubeops` labels on Kubernetes Services and ServiceMonitors.
5. **Metrics Not Available:** Learned to wait for pod readiness and verify the metrics server API.

---

## 💡 Realizations

- CI/CD pipelines run in isolated environments; networking and auth must be explicitly handled.
- Kubernetes services rely heavily on precise label matching.
- Monitoring systems depend on proper service discovery configuration.
- Small configuration mismatches can break entire pipelines.
- **Debugging is a core DevOps skill.**

---

## 📬 Future Improvements

- Slack/Email alerting integration via Alertmanager.
- Advanced custom Grafana dashboards.
- Multi-environment setup (dev/staging/prod).
- Deployment automation using cloud-managed Kubernetes (EKS/GKE).

---

## 👨‍💻 Author

**Saim Zaib**  
Cybersecurity & DevOps Enthusiast
