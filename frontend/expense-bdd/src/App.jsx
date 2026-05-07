
// import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useState,useEffect } from 'react'
import ExpenseList from './components/ExpenseList'
import NewExpenseForm from './components/NewExpenseForm'
import { getExpenses,deleteExpense,getTotal  } from './services/expenseApi'


function App() {
  
  // pour faire switch formulaire ouvert et fermer
   const [depenseEdit,setDepenseEdit] = useState(false);
   const [datas,setDatas] = useState([]);

  //  Pour la modificatioon - editer la modification 
  const [expenseToEdit,setExpenseToEdit] = useState(null);

  // pour le state du total 
  const [total,setTotal] = useState(0);
 
  //  la premiere fois au chargement de la page 
    useEffect(() => {
           // creer une fonction asynchone car useAffect ne peut pas etre asynchrone
           const fetchData = async() =>{
               // recupere les donnée de getExpenses
               const data = await getExpenses()
               // met a jours les données 
               setDatas(data)
              //  pour le total
               const totalData = await getTotal();
               setTotal(Number(totalData.total))
           }
           // appelle de la fonction 
           fetchData();
       }, []);

      //  pour aider a recharger la page a l'ajout de nouvelle depense 
       const handleAddExpense = (newExpense) => {
          setDatas((prev) => [...prev, newExpense]);
          setTotal((prev) => prev + Number(newExpense.price));
      };

      // Pour suppriemr une depnse à l'affichage mais aps dans la  bdd  
      const handleDeleteExpense = (id) =>{

        const expenseToDelete = datas.find(
          (expense) => expense.id ===id
        );

        if(expenseToDelete){
          setTotal( (prev) => prev - Number(expenseToDelete.price) )
        }

        setDatas((prev) => prev.filter((expense)=> expense.id !== id ));
      }

      // Pour la afficher le rendu a chaque modification d emaniere prope 
      const handleUpdateExpense = (updatedExpense) => {
        
        const oldExpense = datas.find(
          (expense) => expense.id === updatedExpense.id
        );

        if(oldExpense){
          const difference = Number(updatedExpense.price) - Number(oldExpense.price);
          setTotal((prev) => prev + difference);

        }

        setDatas((prev) =>
            prev.map((expense) =>
              expense.id === updatedExpense.id ? updatedExpense : expense
          )
        );
    };

  return (
    <div className='min-h-screen bg-gray-100 py-10 '>
      <div className="max-w-5xl mx-auto px-4">

        <h1 className='text-4xl font-extrabold text-center text-gray-800 mb-10'> Expense - Gestionnaire de depense </h1>
        <div className='flex justify-center mb-10'>
          
          <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow hover:bg-green-600 transition" onClick={()=>setDepenseEdit(true)}>Nouvelle depense</button>
        </div>
      {/* ouvertire du formulaire */}
      {depenseEdit &&(
        <NewExpenseForm setDepenseEdit={setDepenseEdit}  onAddExpense={handleAddExpense} expenseToEdit={expenseToEdit}
        setExpenseToEdit={setExpenseToEdit}  onUpdateExpense={handleUpdateExpense} />
      )}
      
        <ExpenseList datas={datas}  onDeleteExpense = {handleDeleteExpense} onEditExpense={setExpenseToEdit} setDepenseEdit={setDepenseEdit} />
      </div>

        {/* À placer juste après <ExpenseList /> dans App.jsx */}
      <div className="sticky bottom-4 mt-6">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-4 flex justify-between items-center max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total</p>
              <p className="text-sm text-gray-500">{datas.length} dépenses enregistrées</p>
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-3xl font-black text-gray-900 leading-none">
              {total.toFixed(2)} €
            </span>
          </div>
        </div>
      </div>
    
   
    </div>
  )
}

export default App
