# Full-Stack Web Aplication - ECom by Chinmay
An E-Commerce Full Stack Website made on the MERN tech stack using TypeScript.



## Architechture

![Architecture.jpg](./Images/Architecture.jpg)
</br></br></br>

- User specific data of every user is stored as an encrypted document on a **MongoDB(NoSQL)** database and is update on interaction with the application.

- Implemented **User Authentication** using **JWT** & Data Encryption through hashing to securely verify & store user data

- Integrated **Redis** into architechture to improve app performace by caching user data for faster retrival and reduced latency

- Containerized the application using **Docker** and **Docker-Compose** and utilised **NginX** to act as a reverse proxy server

- Deployed on **AWS EC2** using **AWS Elastic Beanstalk** & **GitHub Actions** for deployment, scaling & load balancing

</br>



## Website Images

![Homepage.jpg](./Images/Homepage.png)
</br></br></br>
![Cart.jpg](./Images/Cart.png)
</br></br></br>
![Login.jpg](./Images/Login.png)
</br></br></br>
![Register.jpg](./Images/Register.png)



## Technologies Used:

1. React
2. Express
3. MongoDB
4. Redis
5. NginX
6. Docker & Docker-Compose
7. AWS EC2
8. AWS Elastic Beanstalk
9. Github Actions
10. NodeJs
11. Mongoose
12. axios
13. jasonwebtoken & jose
14. bcrypt
15. nodemon



## Building
```
docker-compose up -d
```

The website will be hosted on http://localhost:80
