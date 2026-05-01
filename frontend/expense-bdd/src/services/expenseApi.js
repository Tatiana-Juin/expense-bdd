const API_URL_DEV = import.meta.env.VITE_API_URL_DEV;

// Pour afficher toute les depenses 
export const getExpenses = async () => {
  const res = await fetch(API_URL_DEV);
  return await res.json();
};
// Pour creer une depense 
export const createExpense = async (data) => {
  const res = await fetch(API_URL_DEV, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await res.json();
};
// Pour supprimer une depense
export const deleteExpense = async (id) => {
  const res = await fetch(`${API_URL_DEV}/${id}`, {
    method: "DELETE"
  });

  return await res.json();
};

// pour calculer le total 
export const getTotal = async () => {
  const res = await fetch(`${API_URL_DEV}/total`);
  return await res.json();
};