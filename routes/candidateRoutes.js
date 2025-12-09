import express from "express";
import { 
    createCandidate,
    getAllCandidates,
    getCandidateById,
    updateCandidate,
    deleteCandidate 
} from "../models/candidateModel.js";

const router = express.Router();

router.post('/candidates', async (req, res) => {

    try{
        const result = await createCandidate(req.body);

        res.json({ success: true, id: result.insertId});
    }catch(error){

        res.status(500).json({ error: error.message});
    }

});


// READ ALL
router.get("/candidates", async (req, res) => {
  try {
    const candidates = await getAllCandidates();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ ONE
router.get("/candidates/:id", async (req, res) => {
  try {
    const candidate = await getCandidateById(req.params.id);
    if (!candidate) return res.status(404).json({ error: "Candidate not found" });
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/candidates/:id", async (req, res) => {
  try {
    const result = await updateCandidate(req.params.id, req.body);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Candidate not found" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/candidates/:id", async (req, res) => {
  try {
    const result = await deleteCandidate(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Candidate not found" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;