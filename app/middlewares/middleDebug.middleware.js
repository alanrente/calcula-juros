export default function (req, res, next) {
  const { url, method } = req;
  console.log(`REQUEST[${`${method}`.padEnd(8).padStart(9)}][${url}]`);
  next();
}
