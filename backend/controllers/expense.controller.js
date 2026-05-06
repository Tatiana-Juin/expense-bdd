const expenseService = require("../services/expense.service")

// Pour voir toute les depenses
exports.getAllExpenses = async(req, res) =>{
    try {
        const expenses = await expenseService.getAllExpenses()
        res.json(expenses)
    } catch (error) {
        res.status(500).json({message : `Erreur tu ne peux pas afficher toute les dépense  `})
    }
    
}

// Pour créer une nouvelle depense 
exports.createExpense = async(req,res)=>{
    try {
        // recupere mes données 
        const { name, price, date } = req.body

        const priceNumber = Number(price)
        if(!name || name.trim()===""|| priceNumber <=0 ||isNaN(priceNumber) || !date){
            return res.status(400).json({message:`Tout les champs sont obligatoire et le montant doit etre supperieur a 0 `})
        }
        // Si on fait cela c'est pour que les donnée ne soit pas en brute dans newExpens et surout que price soit un nombre si on le fait pas et que dans newExpense on met req.body price est un string 
        // // conversion + sécurisation du prix
          const expenseData = {
            name,
            price: priceNumber,
            date
        }

        const newExpense = await expenseService.createExpense(expenseData)
       return res.status(201).json(newExpense)
    } catch (error) {
       return res.status(500).json({message: `erreur lors de l'insertion duc oter du serveur  `})
    }
  
}

// Pour supprimer une depense
exports.deleteExpense = async(req,res) =>{
   
    try {
         const deleteExpense = await expenseService.deleteExpense(req.params.id)
          if(!deleteExpense){
            return res.status(404).json({message : "Dépense non trouver"})
        }
         res.json({message : "Dépense supprimer"})
    } catch (error) {
        res.status(500).json({message : `Erreur lors de la suppression `})
    }
    
}
// Pour la modification 
exports.updateExpense = async (req, res) => {
  try {
    const { name, price, date } = req.body;
    const id = req.params.id;

    const priceNumber = Number(price);

    if (!name || name.trim() === "" || priceNumber <= 0 || isNaN(priceNumber) ||!date) {
      return res.status(400).json({message: "Tous les champs sont obligatoires et le montant doit être supérieur à 0"});
    }

    const updateData = {
      name,
      price: priceNumber,
      date
    };

    const isUpdated = await expenseService.updateExpense(id, updateData);

    if (!isUpdated) {
      return res.status(404).json({message: "Dépense non trouvée"});
    }

    
    return res.status(200).json({message: "Dépense modifiée"});

  } catch (error) {
    console.error("Erreur updateExpense :", error.message);
    return res.status(500).json({
      message: "Erreur lors de la modification"
    });
  }
};

exports.getTotal = async(req,res)=>{
   
    try {
         const total = await expenseService.getTotal()
        //  const total = result[0].total
        res.json({total}) 
    } catch (error) {
        res.status(500).json({message: `Erreur pour calculer le total `})
    }
    
   
}


