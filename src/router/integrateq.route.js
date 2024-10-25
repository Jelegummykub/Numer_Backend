const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/equation/value',
    body('equationintegrat').notEmpty().withMessage("กรุณากรอกโจทย์"),

    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                result: false,
                status: "error",
                msg: "ข้อผิดพลาดในการ validate",
                errors: errors.array()
            })
        }
        const { equationintegrat } = req.body

        try {
            const createequation = await prisma.integrat.create({
                data: { equationintegrat: String(equationintegrat) }
            })
            return res.status(200).json({
                result: true,
                status: "success",
                msg: "เพิ่มโจทย์สำเร็จ",
                data: createequation
            })
        } catch (error) {
            console.error("เพิ่มไม่สำเร็จ", error)
            return res.status(500).json({
                result: false,
                status: "error",
                msg: "เพิ่มโจทย์ไม่สำเร็จ",
            })
        }
    }
)


router.get('/value', async (req, res) => {
    try {
        const readequation = await prisma.integrat.findMany()
        return res.status(200).json({
            result: true,
            status: "success",
            data: readequation
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
