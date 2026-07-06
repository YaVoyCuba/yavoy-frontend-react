module.exports = {
  locales: ["en", "es"],
  sourceLocale: "es",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
}
