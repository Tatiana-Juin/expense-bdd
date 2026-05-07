
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

        <div className="bg-white shadow-md rounded-xl p-4 mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700"> Total des dépenses </h2>

          <p className="text-3xl font-bold text-green-600 mt-2">{total.toFixed(2)} €</p>
        </div>
    
   
    </div>
  )
}

export default App
