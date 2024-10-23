const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/equation/matrix' ,
    body('equation').notEmpty().withMessage("กรุณากรอกโจทย์"),
    body('matrix').isArray().withMessage("กรุณากรอก matrix เป็นอาเรย์"),

    async(req , res) => {
        const { equation , matrix } = req.body

        if (matrix === undefined) {
            return res.status(400).json({
                result: false,
                status: "error",
                msg: "matrix ไม่สามารถเป็น undefined ได้",
            });
        }

        try {
            const creatematrix = await prisma.matrixequation.create({
                data : {
                    equation : String(equation),
                    matrix : JSON.stringify(matrix)
                }
            })
            return res.status(200).json({
                result : true,
                status : "success",
                mag : "เพิ่มโจทย์สำเร็จ",
                data : creatematrix
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

router.get('/matrix', async (req , res) => {
    try {
        const readequation = await prisma.matrixequation.findMany()
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