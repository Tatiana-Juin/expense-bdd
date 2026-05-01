// importer express 
const express = require("express")
// creer mon applciation avec express 
const app = express()
// defini mon port 
const PORT = 3000
// middleware json 
app.use(express.json())
// importer routes et on le relie avec app.use 
const expenseRoutes = require("./routes/expense.route")
app.use("/api/expenses",expenseRoutes)

// app.get("/api/expenses",getAllExpenses)
app.listen(PORT, ()=>{
    console.log(`serveur sur le port ${PORT}`);
    
})