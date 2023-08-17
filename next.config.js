// module.exports = {
//   webpack: (config) => {
//     config.module.rules.push(
//       {
//         test: /\.(png|jpg|gif|svg)$/i,
//         exclude: [/\.inline.svg$/],
//         use: [{ loader: "url-loader" }],
//       },
//       {
//         test: /\.inline.svg$/,
//         use: [{ loader: "@svgr/webpack" }],
//       }
//     );

//     return config;
//   },
// };
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
