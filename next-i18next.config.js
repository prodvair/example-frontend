module.exports = {
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "en"],

    detection: {
      order: ["path", "cookie", "htmlTag", "localStorage", "subdomain"],
      caches: ["cookie"],
    },
  },
  backend: {
    loadPath: "/assets/locales/{{lng}}.json",
    allowMultiLoading: false,
  },
  react: {
    useSuspense: false,
  },

  reloadOnPrerender: process.env.NODE_ENV === "development",
};
