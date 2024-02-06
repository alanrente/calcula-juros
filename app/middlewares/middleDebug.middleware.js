export default function (req, res, next) {
  const { url, method } = req;
  console.log(
    `REQUEST[${`${method}`
      .padEnd(6, " ")
      .padStart(6, " ")}][${new Date().toISOString()}][${url}]`
  );
  next();
}
