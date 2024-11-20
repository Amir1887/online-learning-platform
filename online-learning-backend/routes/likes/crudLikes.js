const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

// Check if a like exists  
router.get("/likes/check-user", async (req, res) => {  
  const { lessonId, userId } = req.query;  
  
  try {  
    const existingUserLike = await prisma.like.findFirst({  
      where: {  
        lessonId: parseInt(lessonId),  
        userId: parseInt(userId)   
      },  
    });  
    res.status(200).json(existingUserLike);  
  } catch (error) {  
    res.status(500).json({ error: "Failed to check like status of user Post" });  
  }  
});  


// Handle like creation  
router.post("/make-likes-user", async (req, res) => {  
  const { postId, userId } = req.body;  

  try {  
    const existingLike = await prisma.like.findFirst({  
      where: {  
        lessonId: parseInt(lessonId),  
        userId: parseInt(userId)   
      },  
    });  

    if (existingLike) {  
      return res.status(409).json({ message: "Already liked" });  
    }  

    const newLikeData = await prisma.like.create({  
      data: { lessonId: parseInt(lessonId), userId: parseInt(userId)  }
    });  
    res.status(201).json(newLikeData);  
  } catch (error) {  
    res.status(500).json({ error: "Failed to insert new like data" });  
  }  
});  


// Get like count for a specific post
router.get("/likes/count", async (req, res) => {
  const { lessonId } = req.query;

  try {
    const likeCount = await prisma.like.count({
      where: { postId: parseInt(postId) },
    });
    res.status(200).json({ count: likeCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch like count" });
  }
});


// Delete a like  
router.delete("/delete-user-likes", async (req, res) => {  
  const { postId, userId } = req.query;  

  try {  
    const deletedLike = await prisma.like.deleteMany({  
      where: {  
        postId: parseInt(postId),  
        ...(userId ? { userId: parseInt(userId) } : {}) 
      },  
    });  

    if (deletedLike.count === 0) {  
      return res.status(404).json({ message: "Like not found" });  
    }  

    res.status(204).json({ message: "Like removed" });  
  } catch (error) {  
    res.status(500).json({ error: "Failed to delete like" });  
  }  
});
// Delete a like  
router.delete("/delete-org-likes", async (req, res) => {  
  const { postId, organizationId } = req.query;  

  try {  
    const deletedLike = await prisma.like.deleteMany({  
      where: {  
        postId: parseInt(postId),   
        ...(organizationId ? { organizationId: parseInt(organizationId) } : {}),  
      },  
    });  

    if (deletedLike.count === 0) {  
      return res.status(404).json({ message: "Like not found" });  
    }  

    res.status(204).json({ message: "Like removed" });  
  } catch (error) {  
    res.status(500).json({ error: "Failed to delete like" });  
  }  
});
 



module.exports = router;
