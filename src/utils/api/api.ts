export default async function api(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "UPDATE",
  body?: object,
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token") ?? ""}`,
        },
        body: JSON.stringify(body),
      },
    );

    const json = await response.json();

    if (response.status > 399) {
      return {
        ...json,
        errorText: json.status,
      };
    }

    return json;
  } catch (e) {
    console.log(e);
    return { errorText: "Неизвестная ошибка, попробуйте позже" };
  }
}
