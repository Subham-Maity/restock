export function signOut(userId: any): Promise<{ data: any }> {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
