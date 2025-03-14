class UrlBuilderHelper {
  taskManagerApi() {
    return `http://localhost:8000/api`;
  }
}
export const UrlBuilder = new UrlBuilderHelper();
