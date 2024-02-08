export async function sleep(second: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, second * 1000);
  });
}
