module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Easy Invoice API",
    version: "1.0.0",
  },
  servers: [{ url: `http://localhost:${process.env.PORT}` }],
  tags: [
    // ─── root endpoints ───────────────────────────
    { name: "Auth", description: "Authentication" },
    { name: "Dashboard", description: "Dashboard data" },
    { name: "Profile", description: "User profile" },

    // ─── dropdown ─────────────────────────────────
    { name: "Dropdown", description: "Dropdown options" },

    // ─── base ─────────────────────────────────────
    { name: "Brand", description: "Brand management" },
    { name: "Category", description: "Category management" },
    { name: "Company", description: "Company management" },
    { name: "Product", description: "Product management" },

    // ─── operation ────────────────────────────────
    { name: "Invoice", description: "Invoice management" },

    // ─── report ───────────────────────────────────
    { name: "Packaging Report", description: "Packaging reports" },
    { name: "Company Report", description: "Company reports" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
