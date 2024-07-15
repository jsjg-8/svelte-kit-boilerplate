# Svelte-Kit Boilerplate

![Svelte-Kit Boilerplate User Interface](https://github.com/delay/sveltekit-auth/assets/638246/3fbb5318-cf46-40ab-a33b-9660019beec8)
Welcome to the Svelte-Kit Boilerplate! This project is an updated and enhanced version of the original Sveltekit Auth. It provides a robust foundation for building modern web applications with Svelte-Kit, complete with authentication, UI components, and more.

## Features

- **Authentication**: Utilizes [Lucia](https://lucia-auth.com/) for robust authentication.
- **UI Components**: Leverages [shadcn-svelte](https://www.shadcn-svelte.com/) for beautifully designed UI elements.
- **Icons**: Includes [Lucide](https://lucide.dev) for scalable and customizable icons.
- **Database Connectivity**: Uses [Drizzle](https://orm.drizzle.team/) for efficient and type-safe database interactions.
- **Form Management**: Employs [Superforms](https://superforms.vercel.app) and [Zod](https://zod.dev) for form validation and management.
- **Email Features**: Supports email verification, password reset, and email re-verification on changes. Supports mailtrap, SES, mailgun, and SMTP.
- **User Roles**: Implements a user role system.
- **Profile Management**: Allows users to edit their profiles, including changing email addresses and passwords.
- **Themes**: Supports light and dark modes.
- **Logging**: Integrated error logging system using [Axiom](https://jeffmcmorris.medium.com/awesome-logging-in-sveltekit-6afa29c5892c).
- **OAuth**: Provides a Google OAuth login example.
- **Performance**: Achieves excellent scores on [Google PageSpeed Insights](https://pagespeed.web.dev).

## Getting Started

1. **Clone the repository**:

    ```sh
    git clone https://github.com/your-username/svelte-kit-boilerplate.git
    cd svelte-kit-boilerplate
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file and add necessary environment variables for your authentication, database, and other services.

4. **Run the development server**:

    ```sh
    npm run dev
    ```

5. **Build for production**:

    ```sh
    npm run build
    ```
