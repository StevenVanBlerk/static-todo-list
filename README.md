This is a Next.js project bootstrapped with `create-next-app`

This project is being hosted by Vercel and can be seen online from [here](https://static-todo-list-stevenvb.vercel.app/).

Alternatively, you can run this project locally 👇

## How to run me locally (from root directory)

Install packages as per usual

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) within your browser to see the page.

## Some extra details

All generic components can be found within
`src/components/`

Not so generic components, built out of generic components, can be found within
`src/composites/`

For the sake of simplicity, I've kept the project to a single page. This page can be seen at
`src/pages/index.js`

All global styling can be found within
`src/styles/globals.css`

All styling in this project has been done within `styles.module.css` files located directly alongside their relevant component.
The only styling not done this way is any styling that is dependant on JavaScript variables, e.g. `src/components/ProgressBar/`. These are using `styled-components` to handle these variables.
