const apiUrl = import.meta.env.PUBLIC_API_URL;
export const getReviews = async () => {
  try {
    const response = await fetch(`${apiUrl}/reviews/rating`, {
      method: `GET`,
      headers: {
        "Content-Type": `application/json`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`text`, error);
  }
};
