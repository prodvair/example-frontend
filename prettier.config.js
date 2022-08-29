module.exports = {
  arrowParens: "always",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  importOrder: [
    "^(react)(/(.*))?$",
    "^(next)(/(.*))?$",
    "<THIRD_PARTY_MODULES>",
    "^@/pages/(.*)$",
    "^@/modules/(.*)/types/(.*)$",
    "^@/modules/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
