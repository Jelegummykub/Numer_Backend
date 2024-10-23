const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.post('/equation/root' ,
    body('equation').notEmpty().withMessage("กรุณากรอกโจทย์"),

    async(req , res) => {

        const { equation } = req.body

        try {
            const createroot = await prisma.rootequation.create({
                data : { equation : String(equation)}
            })
            return res.status(200).json({
                result : true,
                status : "success",
                msg : "เพิ่มโจทย์สำเร็จ",
                data : createroot
            })
            
        } catch (error) {
            console.error("เพิ่มไม่สำเร็จ" , error)
            return res.status(500).json({
                result : false,
                status : "error",
                msg : "เพิ่มโจทย์ไม่สำเร็จ",
            })
        }
    }
)

router.get('/root', async (req , res) => {
    try {
        const readequation = await prisma.rootequation.findMany()
        return res.status(200).json({
            result : true,
            status : "success",
            data : readequation
        })
    } catch (error) {
        console.error("ไม่สามารถอ่านได้" , error)
        return res.status(500).json({
            result : false,
            status : "error",
            msg : "เกิดข้อผิดพลาดในการอ่านข้อมูล"
        })
    }
})



module.exports = router
