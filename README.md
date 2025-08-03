# WeaveLink

WeaveLink is a lightweight, responsive web platform built to support Indian handloom artisans by providing them a digital space to showcase and manage their handcrafted products. It was developed as part of the Aathi Handloom Hackathon to promote cultural preservation through accessible technology.

---

## What It Does

WeaveLink enables two key user roles:

- **Weavers**: Can register, log in, and manage their product listings including adding images, writing descriptions, and categorizing items like sarees, shawls, and bedsheets.
- **Buyers**: Can browse listed products, filter by category, and search across listings.

The platform works across devices and provides a clean, intuitive interface for both roles.

---

## How It Works

- **Frontend** is built using React, Vite, and TailwindCSS with component libraries from ShadCN.
- **Supabase** handles:
  - Authentication (user login/signup)
  - PostgreSQL database for products and user profiles
  - Image storage (product photos)

The marketplace displays all products publicly, while the weaver dashboard provides authenticated access to manage listings.

---

## Benefits

- **Empowers artisans**: Helps weavers without technical knowledge go digital with minimal effort.
- **Preserves culture**: Promotes India’s traditional handloom craftsmanship in a modern way.
- **Quick to deploy**: Fully serverless stack allows instant deployment on platforms like Vercel.
- **Scalable & extendable**: Can easily be extended to support payments, order tracking, or multilingual support.

---

## Ideal Use Case

- Rural artisans and craft clusters who need a lightweight, no-fuss e-commerce experience.
- NGOs and organizations working with handloom workers who want to create a digital catalog.
- Students or teams building community-centric projects for local empowerment.

