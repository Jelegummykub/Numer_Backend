const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/interpolation/value' ,
    body('valuex').notEmpty().withMessage("กรุณากรอกค่า x"),
    body('fx').notEmpty().withMessage("กรุณากรอก fx"),

    async(req , res) => {
        const { valuex , fx } = req.body


        try {
            const createinter = await prisma.interpolation.create({
                data : {
                    valuex : String(valuex),
                    fx : String(fx)
                }
            })
            return res.status(200).json({
                result : true,
                status : "success",
                msg : "เพิ่มโจทย์สำเร็จ",
                data : createinter
            })
        } catch (error) {
            console.error("ไม่สามารถเพิ่มโจทย์ได้" , error)
            return res.status(500).json({
                result : false,
                status : "error",
                msg : "ไม่สามารถเพิ่มโจทย์ได้"
            })
        }
    }
)

router.get('/interpolation' , async(req , res) => {
    try {
        const readdata = await prisma.interpolation.findMany()
        const resultData = readdata.map(item => ({
            valuex : JSON.stringify(item.valuex),
            fx : JSON.stringify(item.fx),
            id : item.id
        }))
        return res.status(200).json({
            result: true,
            status: "success",
            data: resultData
        })
    } catch (error) {
        console.error("ไม่สามารถอ่านได้", error)
        return res.status(500).json({
            result: false,
            status: "error",
            msg: "เกิดข้อผิดพลาดในการอ่านข้อมูล"
        })
    }
}
    
)


module.exports = router
