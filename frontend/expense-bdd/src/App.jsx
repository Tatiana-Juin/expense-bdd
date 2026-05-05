
// import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useState } from 'react'
import ExpenseList from './components/ExpenseList'
import NewExpenseForm from './components/NewExpenseForm'

function App() {
  
  // pour faire switch ajout depense
   const [depenseEdit,setDepenseEdit] = useState(false);

  return (
    <div className='max-w-2xl mx-auto p-4 md:p-8 min-h-screen '>
       <h1 className='text-3xl font-extrabold text-center text-gray-800 mb-8'> Expense - Gestionnaire de depense </h1>
        <div className='flex justify-center mb-10'>
          <button className="px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300" onClick={()=>setDepenseEdit(true)}>Nouvelle depense</button>
      </div>
      {depenseEdit &&(
        <NewExpenseForm setDepenseEdit={setDepenseEdit}/>
      )}
      
      <ExpenseList />
   
    </div>
  )
}

export default App
