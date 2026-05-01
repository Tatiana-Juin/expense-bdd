import  { useState,useEffect } from 'react'
import { getExpenses } from '../services/expenseApi'



export default function ExpenseList() {
    // useState => pour les données dynamique 
    const [datas,setDatas] = useState([]);
    // affiche au chargement de la page  
    useEffect(() => {
        // creer une fonction asynchone car useAffect ne peut pas etre asynchrone
        const fetchData = async() =>{
            // recupere les donnée de getExpenses
            const data = await getExpenses()
            // met a jours les données 
            setDatas(data)
        }
        // appelle de la fonction 
        fetchData();
    }, []);
    
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> {data.price} </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold "> {data.price} </td>
                        
                        </tr>
                    ) )}

                </tbody>

            </table>

        </div>
    </>
  )
}
