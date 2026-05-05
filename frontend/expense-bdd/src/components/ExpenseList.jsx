import  { useState,useEffect } from 'react'
import { deleteExpense } from '../services/expenseApi'
// import { getExpenses } from '../services/expenseApi'



export default function ExpenseList({datas,onDeleteExpense}) {
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
        <div className="shadow-lg rounded-xl overflow-hidden bg-white mt-8">
            <table className="min-w-full divide-y divide-gray-200">

                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom de la dépense
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant (€)
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {datas.map((data) =>(
                        <tr key={data.id} className="hover:bg-gray-50 transition duration-150 ease-in-out" > 
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {data.name} </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> {new Date(data.date).toLocaleDateString()} </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold "> {data.price} € </td>
                            <td><button onClick={()=>handleDelete(data.id)} className=" mt-3 px-6 py-3 text-lg font-medium text-white bg-red-500 rounded-lg shadow-md hover:bg-red-500  ">Supprimer</button></td>
                            
                        
                        </tr>
                    ) )}

                </tbody>

            </table>

        </div>
    </>
  )
}
