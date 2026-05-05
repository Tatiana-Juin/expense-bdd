import React, { useState } from 'react'
import { createExpense } from '../services/expenseApi';

export default function NewExpenseForm({setDepenseEdit, onAddExpense }) {
  const [name,setName] = useState("");
  const [price, setPrice] = useState("");
  const [date,setDate] = useState("");
  // pour les erreur 
  const [errorMessage,setErrorMessage] = useState("");
  // fonction pour l'ajout 
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setErrorMessage("");
    try {

        if(name.trim()==""){
          setErrorMessage("Le nom est obligatoire")
           return;
      }

      if(Number(price) <=0 || isNaN(Number(price))){
        setErrorMessage("Le montant doit etre superieur a 0 ");
        return;
      }

      if(!date){
        setErrorMessage("Tu doit saisir une date  ");
        return;
      }
      // creation de l'objet a envoyer a dataExpense
      const newData = {
        name,
        price : Number(price),
        date 
      }
      const datasExpense =  await createExpense(newData)
      onAddExpense(datasExpense);
      setName("");
      setPrice("");
      setDate("");
    } catch (error) {
      console.error(`Il a un probleme lors de l'ajout ${error}`);
      // throw error;
      setErrorMessage("Erreur lors de l'ajout");
    }

    
    
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Ajouter une dépense</h2>
        
          <form  className="space-y-4" onSubmit={handleSubmit}>

              {/* NOM DE LA DEPENSE  */}
              <div className="flex flex-col">
                  <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">Nom</label>

                  <input  type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              

              {/* DATE */}
              <div className="flex flex-col">
                  <label htmlFor="date" className="mb-1 text-sm font-medium text-gray-700">Date</label>
                  <input type="date" name="date" id="date" value={date} onChange={(e)=>setDate(e.target.value)}  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              

              {/* MONTANT */}
              <div className="flex flex-col">
                  <label htmlFor="price" className="mb-1 text-sm font-medium text-gray-700">Prix</label>
                  <input type="number" name="price" id="price" step="0.01" min="0.01" value={price} onChange={(e)=>setPrice(e.target.value)}  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              
              {/* BOUTON AJOUTER OU ANNULLER  */}
              <div className="flex justify-end space-x-4 pt-4">

                  <button type="submit"  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out" >Ajouter depense</button>

                  <button type="button" onClick={()=>{ setName("");setDate(""),setPrice("");setErrorMessage("");setDepenseEdit(false)}} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">Annuler</button>
              </div>
               {errorMessage && (
                    <div className="mt-4 bg-red-50 border border-red-100 text-red-500 px-4 py-2 rounded-xl text-center font-medium text-sm">
                        {errorMessage}
                    </div>
                )}

          </form>
        </div>
  )
}
