# 🧮 OLMAT Client

## Eng
OLMAT Client is a participant-facing registration system for the OLMAT (Olimpiade Matematika). This web application enables users (students/schools) to register for the event, manage their profiles, view announcements, and track the status of their registrations.

## Id
OLMAT Client adalah sistem pendaftaran untuk peserta Olimpiade Matematika (OLMAT). Aplikasi web ini memungkinkan pengguna (siswa/sekolah) untuk mendaftar acara, mengelola profil, melihat pengumuman, dan melacak status pendaftaran mereka.


## 🚀 Live Demo

🔗 [Live Website](https://olmat-client.vercel.app/)  
🔐 Demo Account:
- Email: `user@user.com`
- Password: `qweqweqwe`

## 🧰 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Typescript**: Strong typing for maintainable code
- **Deployment**: [Vercel](https://vercel.com/)

## ✨ Features

- 📝 Account registration & login
- 👤 Profile management with biodata & password change
- 🏫 Dynamic school selection by subdistrict
- 📄 Participant data submission with validation
- 📢 Announcement viewing system
- 📦 Status tracking for event registration
- 🔐 Token-based authentication

## 📂 Project Structure
├── app/ # Next.js app directory
├── components/ # Shared UI components (form inputs, layout)
├── lib/ # API clients, helpers, and constants
├── store/ # Global state via Zustand
├── validations/ # Form schema validation using Zod


## 📦 Getting Started

Clone and run locally:

```bash
git clone https://github.com/mcramaaa/olmat-client.git
cd olmat-client
npm install
npm run dev


