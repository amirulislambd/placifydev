export const ResponseImgBb = async (imgData) => {
  const formData = new FormData();
  formData.append("image", imgData);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );
  return res.json();
};
