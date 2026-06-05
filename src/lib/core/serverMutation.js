
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const serverMutation = async (url, data) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    // handle 401, 403, 500, etc
    return res.json();
};