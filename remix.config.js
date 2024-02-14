/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  routes:  async (defineRoutes) => {
    return defineRoutes((route) => {
      route("/", "routes/_index.tsx", () => {
        route("/ticket/:ticketId", "routes/ticket.$ticketid.tsx");
      });
    });
  },
};
