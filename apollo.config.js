module.exports = {
  service: {
    name: process.env.NODE_ENV === "production" ? "k64-playground-prod-graph-v1" : "k64-playground-graph"
  }
}