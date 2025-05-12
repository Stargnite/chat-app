# 🧠 Vindove Chat Widget

A React chat widget for instant integration into your app. Built with **TypeScript**, **TailwindCSS**, and designed for seamless developer experience.

---

## 📦 Installation

Install the package via npm:

```bash
npm install vindove-chat-widget
```

## Importation

Import the widget into your app:

```bash
import {ChatWidget} from "vindove-chat-widget";
```

## Props expectation

The imported chatWidget is expecting the props of the user details with the following types:

```bash
1. id: number,
2. name: string,
3. email: string,
4. picture: string,
```

## Usage 

This is how the Component should look like when it is implemented correctly:

```bash
<ChatWidget
    currentUser={{
    id: 3731,
    name: "Your Name",
    email: "shubham18822@gmail.com",
    picture: "https://your-picture-url.com/avatar.jpg",
    }}
/>
```

# Features

* ⚡ Fast and lightweight
* 🎨 Tailwind-based design system
* 🧩 Easily composable and extendable
* 🔒 Built with TypeScript for safety
* 🛠 Plug and play setup