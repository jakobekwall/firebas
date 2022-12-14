const express = require("express")
const cors = require("cors")
const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccount.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = new express();

app.use(express.json());

app.use(cors({
    origin: "*"
}));


app.get("/", (req, res) => {
    res.send("yjena")
});

app.get("/shoppinglist", async (req, res) => {
    try {
        const shoppinglist = [];
        const query = await db.collection("shoppinglist").get();

        query.forEach(doc => {
            shoppinglist.push({
                id: doc.id,
                ...doc.data()
            })

        })
        res.json({ lists: shoppinglist })

    }
    catch (err) {
        console.log(err)
    }
});

app.put("/shoppinglist", async (req, res) => {
    const { id } = req.body;

    try {
        const ref = await db.collection("shoppinglist").doc(id).get();

        res.json(ref.data())
    }

    catch (err) {
        console.log(err)
    }
})


app.listen(1234, () => {
    console.log("eyy lissna din lille nacas")
})