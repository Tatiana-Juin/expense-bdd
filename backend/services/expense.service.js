const db = require("../config/db")

// Pour selectionner toutes les depenses
module.exports.getAllExpenses = async()=>{
    try {
        const[records] =  await db.query("SELECT id_expense, name_expense, price_expense, date_expense FROM expenses")
        // cela de retourner id , name,price et date ca sera plus facile pour le front 
        const allExpense = records.map((expense) =>{
            return {
                id: expense.id_expense,
                name: expense.name_expense,
                price: expense.price_expense,
                date: expense.date_expense
            }
        })
        return allExpense
    } catch (error) {
        console.error(`erreur du sql getAllExpenses ${error.message}`)
        // arrete le code - stop + erreur 
        throw error
    }
    
}
// Pour l'ajout d'une nouvelle depenses 
module.exports.createExpense = async(expenseData) =>{
    try {
        const { name, price, date } = expenseData;
        // requete pour l'insertion 
        const [result] = await db.query("INSERT INTO expenses (name_expense, price_expense, date_expense) VALUES (?,?,?)",[name,price,date])
        
        // je met id pour quand je ferais la suppresssion 
        const newExpense = {
            id: result.insertId,
            name,
            price,
            date
        };
        return newExpense

    } catch (error) {
        console.error(`erreur lors de la reaquete createExpense ${error.message}`)
        throw error;
    }
 
}

// POUR LA SUPPRESSION
module.exports.deleteExpense = async(id) =>{
    try {
        
        const [result] = await db.query("DELETE FROM expenses WHERE id_expense = ? ",[id])
        // affectedRows => est ce que renvoie mysql2 affectedRows : 1 propriete fournie par mysql 
        if(result.affectedRows ===0){
            return false;
        }
        return true;
        
    } catch (error) {
        console.error("Une erreur est survenue a la suppression")
         throw error;
    }
}

module.exports.updateExpense = async(id,expenseData) =>{
    try {
        const {name,price,date} = expenseData;
        const [result] = await db.query("UPDATE expenses SET name_expense = ?, price_expense = ?, date_expense = ? WHERE id_expense = ? ",[name,price,date,id])
        // pour verifier s'il a une modification 
         if(result.affectedRows ===0){
            return false;
        }
        return true;

    } catch (error) {
        console.error("Une erreur est survenue lors de la modification");
        throw error;
        
    }
}

module.exports.getTotal = async()=>{
    try {
        const [row] = await db.query("SELECT SUM(price_expense) AS total FROM expenses")

        const resultTotal = row[0].total;
        if(resultTotal ===null){
            return 0
        }
        return resultTotal;
        
    } catch (error) {
        console.error("Erreur lors du calcule de la somme ");
        throw error;
        
    }
}