
// import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useState,useEffect } from 'react'
import ExpenseList from './components/ExpenseList'
import NewExpenseForm from './components/NewExpenseForm'
import { getExpenses,deleteExpense  } from './services/expenseApi'

function App() {
  
  // pour faire switch ajout depense
   const [depenseEdit,setDepenseEdit] = useState(false);
   const [datas,setDatas] = useState([]);

  //  Pour la modification 
  const [expenseToEdit,setExpenseToEdit] = useState(null);
 
  //  la premiere fois au chargement de la page 
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

      //  pour aider a recharger la page a l'ajout de nouvelle depense 
       const handleAddExpense = (newExpense) => {
          setDatas((prev) => [...prev, newExpense]);
      };

      // Pour suppriemr une depnse à l'affichage mais aps dans la  bdd  
      const handleDeleteExpense = (id) =>{
        setDatas((prev) => prev.filter((expense)=> expense.id !== id ));
      }

  return (
    <div className='max-w-2xl mx-auto p-4 md:p-8 min-h-screen '>
       <h1 className='text-3xl font-extrabold text-center text-gray-800 mb-8'> Expense - Gestionnaire de depense </h1>
        <div className='flex justify-center mb-10'>
          <button className="px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300" onClick={()=>setDepenseEdit(true)}>Nouvelle depense</button>
      </div>
      {depenseEdit &&(
        <NewExpenseForm setDepenseEdit={setDepenseEdit}  onAddExpense={handleAddExpense} expenseToEdit={expenseToEdit}
        setExpenseToEdit={setExpenseToEdit} />
      )}
      
      <ExpenseList datas={datas}  onDeleteExpense = {handleDeleteExpense} onEditExpense={setExpenseToEdit} setDepenseEdit={setDepenseEdit} />
   
    </div>
  )
}

export default App
