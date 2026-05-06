import  { useState,useEffect } from 'react'
import { deleteExpense } from '../services/expenseApi'

export default function ExpenseList({datas,onDeleteExpense,onEditExpense,setDepenseEdit}) {
    
    // fonction pour supprimer dans la bdd la depense
    const handleDelete = async(id) =>{
        try {
            await deleteExpense(id);
            onDeleteExpense(id)
        } catch (error) {
            console.error("Erreur de  suppression");
            
        }
    }

  return (
    <>
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <table className="w-full">

                <thead className="g-gray-100 text-gray-600 text-sm uppercase">
                    <tr>
                        <th className="p-4 text-left">
                        Nom de la dépense
                        </th>
                        <th className="p-4 text-left">
                            Date
                        </th>
                        <th className="p-4 text-left">
                        Montant (€)
                        </th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {datas.map((data) =>(

                        <tr key={data.id} className="border-b hover:bg-gray-50 transition" > 
                            <td className="p-4 font-medium text-gray-800"> {data.name} </td>
                            
                            <td className="p-4 text-gray-500"> {new Date(data.date).toLocaleDateString()} </td>
                            <td className="p-4 text-right font-semibold text-gray-800 "> {data.price} € </td>
                            {/* ajout ou modification */}
                            <td><button onClick={() => {onEditExpense(data);setDepenseEdit(true);}} className=" px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600  ">Modifier</button></td>

                            <td><button onClick={()=>handleDelete(data.id)} className=" px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600  ">Supprimer</button></td>
                            
                        </tr>
                    ) )}

                </tbody>

            </table>

        </div>
    </>
  )
}
