import "../css/app.css"

import { createInertiaApp } from "@inertiajs/react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"
import { createRoot } from "react-dom/client"
import { initializeTheme } from "./hooks/use-appearance"

const appName = import.meta.env.VITE_APP_NAME || "Laravel"
const theme = createTheme()

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(
      <ThemeProvider theme={theme}>
        <App {...props} />
      </ThemeProvider>
    )
  },
  progress: {
    color: "#4B5563",
  },
})

// This will set light / dark mode on load...
initializeTheme()
