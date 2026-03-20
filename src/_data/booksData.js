import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import fetchBookData from "../_utils/fetchBookData.js";

export default async function () {
  const booksYaml = fs.readFileSync(
    path.join(process.cwd(), "src", "_data", "books.yaml"),
    "utf-8",
  );
  const { shelves } = yaml.load(booksYaml);
  const isbns = shelves.flatMap((s) => s.books.filter(Boolean));

  const results = await Promise.allSettled(isbns.map((isbn) => fetchBookData(isbn)));

  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.warn(`📚 Skipped ${isbns[i]}: ${result.reason?.message ?? result.reason}`);
    }
  });
}
