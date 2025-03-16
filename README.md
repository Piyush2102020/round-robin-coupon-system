# Round Robin Coupon System

A **Round Robin Coupon System** built using the **MERN stack** with an **admin panel** for managing users and assigned coupons. This project allows users to get a coupon without logging in, while the admin can track which coupon is assigned to whom. It also features **IP tracking** and a **cooldown time** for users before they can claim another coupon.

## Features

### User Side
- Users can claim a coupon without logging in.
- Coupons are assigned in a **round-robin** manner.
- **IP tracking** is implemented to prevent abuse.
- Cooldown time before a user can request another coupon.

### Admin Panel
- **Login authentication** for admin access.
- View all assigned coupons and user details.
- Track coupon distribution history.
- Manage user accounts.

## Tech Stack

- **Frontend:** React (TypeScript)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Other:** IP tracking, Cooldown system  

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/Piyush2102020/round-robin-coupon-system.git
cd round-robin-coupon-system
